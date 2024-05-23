import Typography from "@mui/material/Typography";
import Head from "next/head";
import Link from "next/link";

const Index = ({ users }) => {
  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="keywords" content="users" />
      </Head>
      {users.map((user) => {
        return (
          <Link href={`users/${user.id}`} key={user.id}>
            <Typography variant="h5" color="primary">
              {user.name}
            </Typography>
          </Link>
        );
      })}
    </>
  );
};

export default Index;

export const getStaticProps = async () => {
  const api = `https://jsonplaceholder.typicode.com/users`;
  const data = await fetch(api);
  const response = await data.json();
  console.log(response.data);
  return { props: { users: response } };
};
