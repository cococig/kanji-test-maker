import {
  Button,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  UnorderedList,
  useBreakpointValue,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const TermModal: React.FC<Props> = (props) => {
  const modalSize = useBreakpointValue(["xs", "md", "4xl"]);
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
        <ModalHeader>利用規約</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text as={"h1"} fontSize={"xl"}>
            画像の利用について
          </Text>
          <Text fontSize={"md"}>
            漢字テストメーカーにより生成された画像は商用・非商用を問わず無償でご利用いただけます。使用にあたって報告等は不要です。
            <br />
            ただし、本サイトで生成した画像や本サイトを利用したことによるいかなるトラブル・損害も、一切の責任を負いかねます。
            <br />
            画像の加工については、以下の通りとします。
          </Text>
          <br />
          <Text as={"h2"} fontWeight={"bold"} fontSize={"lg"}>
            非商用利用の場合
          </Text>
          <UnorderedList>
            <ListItem>画像の二次配布・編集・加工等、全て自由です。</ListItem>
          </UnorderedList>
          <br />
          <Text as={"h2"} fontWeight={"bold"} fontSize={"lg"}>
            商用利用の場合
          </Text>
          <UnorderedList>
            <ListItem>
              画像右下の「漢字テストメーカー」の文字を残していただければ、自由に編集・加工等して頂いて構いません。
            </ListItem>
            <ListItem>
              やむを得ず「漢字テストメーカー」の文字を取り除く場合、当サイトの名称とリンクの容易に確認できる箇所への記載をお願いします。
            </ListItem>
            <ListItem>二次配布を行う場合も、必ず当サイトのリンクを記載してください。</ListItem>
            <ListItem>その他、不明点についてはTwitterにてお問い合わせください。</ListItem>
          </UnorderedList>
          <br />
          <Text as={"h1"} fontSize={"xl"}>
            その他
          </Text>
          <Text fontSize={"md"}>本利用規約は、予告なく変更する場合があります。</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme={"blue"} mr={3} onClick={props.onClose}>
            閉じる
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TermModal;
