import React from "react";
import Title from "../components/Title";
import LayoutAuth from "../components/LayoutAuth";
import SetPass from "./SetPass";

const Index = () => {
  return (
    <>
      <Title title="Reset Password" />
      <LayoutAuth children={<SetPass />} title="Set Password" />
    </>
  );
};

export default Index;
