import React from "react";
import LayoutAuth from "../components/LayoutAuth";
import ChangePass from "./ChangePass";
import Title from "../components/Title";

const Index = () => {
  return (
    <>
      <Title title="Change Password" />
      <LayoutAuth children={<ChangePass />} title="Change Password" />
    </>
  );
};

export default Index;
