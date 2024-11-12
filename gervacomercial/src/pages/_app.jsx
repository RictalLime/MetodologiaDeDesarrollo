import React from "react";
import Layout from "@/layout/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
        <link rel="stylesheet" href="@/favicon.ico" />
        <title> Gerva Comercial</title>
      <Component {...pageProps} />
    </Layout>
  );
}
