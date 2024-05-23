import React from "react";
import LayoutAuth from "../components/LayoutAuth";
import FormRegister from "./FormRegister";
import Title from "../components/Title";

const Index = () => {
  return (
    <>
      <Title title="Register" />
      <LayoutAuth children={<FormRegister />} title="Create Account" />
    </>
  );
};

export default Index;
