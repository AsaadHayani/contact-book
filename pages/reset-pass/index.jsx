import { useRouter } from "next/router";
import React from "react";
import Title from "../components/Title";
import LayoutAuth from "../components/LayoutAuth";
import SetPass from "./SetPass";

const Index = () => {
  const router = useRouter();
  const { id, code } = router.query;
  console.log("id " + id);
  console.log("code " + code);
  return (
    <>
      <Title title="Reset Password" />
      <LayoutAuth children={<SetPass />} title="Set Password" />
    </>
  );
};

export default Index;
