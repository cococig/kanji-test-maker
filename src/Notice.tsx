import { Box, Heading, ListItem, UnorderedList, useColorModeValue, Text } from "@chakra-ui/react";

const Notice: React.FC = () => {
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("whiteAlpha.900", "gray.700")}
      boxShadow={"lg"}
      p={8}
      m={"5"}
      w={"fit-content"}
      justifySelf={"center"}
      alignSelf={"center"}
    >
      <Heading>お知らせ</Heading>
      <UnorderedList>
        <ListItem>
          <Text>
            （2022/09/04）スマートフォンで画像のフォントが正しく選択されていなかった問題を修正しました。
            <br />
            修正されていない方はキャッシュを削除してみてください。
          </Text>
        </ListItem>
      </UnorderedList>
    </Box>
  );
};

export default Notice;
