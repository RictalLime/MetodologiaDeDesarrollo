import React from "react";
import Layout from "@/layout/Layout";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Cargar favicon correctamente */}
      <link rel="icon" href="/favicon.ico" />
      <title>Gerva Comercial</title>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}