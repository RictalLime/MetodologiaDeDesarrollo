import {
  createServerClient,
  serializeCookieHeader,
  createBrowserClient,
} from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseClient = createBrowserClient(supabaseUrl, supabaseKey);

export function createClient({ req, res }) {
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return Object.keys(req.cookies).map((name) => ({
          name,
          value: req.cookies[name] || "",
        }));
      },
      setAll(cookiesToSet) {
        res.setHeader(
          "Set-Cookie",
          cookiesToSet.map(({ name, value, options }) =>
            serializeCookieHeader(name, value, options)
          )
        );
      },
    },
  });

  return supabase;
}
