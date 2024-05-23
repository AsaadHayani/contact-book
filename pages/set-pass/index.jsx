import React from "react";
import LayoutAuth from "../components/LayoutAuth";
import SetPass from "./SetPass";
import Title from "../components/Title";
import Path from "../components/Path";

const Index = () => {
  return (
    <>
      <Title title="Set Password" />
      <LayoutAuth children={<SetPass />} title="Set Password" />
    </>
  );
};

export default Index;
