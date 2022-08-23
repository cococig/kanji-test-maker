import {
  Button,
  Divider,
  Heading,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  OrderedList,
  Text,
  UnorderedList,
  useBreakpointValue,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UsageModal: React.FC<Props> = (props) => {
  const modalSize = useBreakpointValue(["xs", "md", "3xl"]);
  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      scrollBehavior="inside"
      size={modalSize}
      isCentered
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>つかいかた</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <OrderedList>
            <ListItem>「問題文」に問題の全文を入力</ListItem>
            <ListItem>「問題の漢字」に問題にしたい部分の文字を入力</ListItem>
            <ListItem>「よみがな」に問題にしたい部分のよみがなを入力</ListItem>
            <ListItem>「読み/書き」で読み問題・書き問題を選択</ListItem>
            <ListItem>「作成する」ボタンをクリック</ListItem>
          </OrderedList>
          <br />
          <Heading fontSize={"lg"} mb="2">
            つかいかたのコツ
          </Heading>
          <Text as={"h1"} fontSize={"md"}>
            問題文の目安の文字数
          </Text>
          <Text fontSize={"md"}>
            問題文をきれいに表示するためには以下の長さに納めるのがオススメです。
            <br />
            この長さを超えると、読み問題の場合はフォントが小さくなります。
            <br />
            また、書き問題の場合は動作を停止する場合があります。その場合はリロードしてください。
          </Text>
          <UnorderedList>
            <ListItem>10問以下の場合</ListItem>
            <UnorderedList>
              <ListItem>読み問題の場合：約29文字</ListItem>
              <ListItem>書き問題の場合：28-(問題部分の文字数)文字</ListItem>
            </UnorderedList>
            <ListItem>11問以上の場合</ListItem>
            <UnorderedList>
              <ListItem>読み問題の場合：約13文字</ListItem>
              <ListItem>書き問題の場合：12-(問題部分の文字数)文字</ListItem>
            </UnorderedList>
          </UnorderedList>
          <br />
          <Text as={"h1"} fontSize={"md"}>
            漢字以外も入力可能
          </Text>
          <Text fontSize={"md"}>
            実は「問題文」「問題の漢字」には漢字以外も入力できます。
            <br />
            ただし「問題の漢字」には「問題文」に含まれている文字が入力されている必要があります。
            <br />
            色々な文字種で読み問題・書き問題を作ってみよう！
          </Text>
        </ModalBody>
        <Divider />
        <ModalFooter>
          <Button colorScheme={"blue"} mr={3} onClick={props.onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UsageModal;
