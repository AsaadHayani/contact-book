import React from "react";
import Title from "../components/Title";
import LayoutAuth from "../components/LayoutAuth";
import SetPass from "./SetPass";

const Index = () => {
  return (
    <>
      <Title title="Set Password" />
      <LayoutAuth title="Set Password">
        <SetPass />
      </LayoutAuth>
    </>
  );
};

export default Index;
