import Head from "next/head";
import React from "react";

const Title = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name="keywords" content={title} />
    </Head>
  );
};

export default Title;
