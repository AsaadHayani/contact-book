import FormLogin from "./FormLogin";
import LayoutAuth from "../components/LayoutAuth";
import Title from "../components/Title";

const Index = () => {
  return (
    <>
      <Title title="Sign In" />
      <LayoutAuth title="Sign In">
        <FormLogin />
      </LayoutAuth>
    </>
  );
};

export default Index;
