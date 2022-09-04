import { Flex, Image } from "@chakra-ui/react";
import Footer from "./Footer";
import Form from "./Form";
import Header from "./Header";
import Notice from "./Notice";

const App = () => {
  return (
    <Flex flexDirection={"column"} minHeight={"100vh"}>
      <Image
        src={`${process.env.PUBLIC_URL}/hero.webp`}
        alt="トップページの紹介画像"
        w={"100%"}
        h={"auto"}
      />
      <Header />
      <Notice />
      <Form />
      <Footer />
    </Flex>
  );
};

export default App;
