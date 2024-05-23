import Head from "next/head";
import React from "react";

const Id = ({ user }) => {
  return (
    <>
      <Head>
        <title>User</title>
        <meta name="keywords" content="user" />
      </Head>
      <h1>ID: {user.id}</h1>
      <h1>{user.name}</h1>
      <h1>{user.website}</h1>
    </>
  );
};

export default Id;

// export const getStaticPaths = async () => {
//   const api = `https://jsonplaceholder.typicode.com/users`;
//   const data = await fetch(api);
//   const response = await data.json();
//   const paths = response.map((item) => {
//     return { params: { id: item.id.toString() } };
//   });
//   return { paths, fallback: false };
// };

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   const api = `https://jsonplaceholder.typicode.com/users/${id}`;
//   const data = await fetch(api);
//   const response = await data.json();
//   return { props: { user: response } };
// };
