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
  UnorderedList,
  useBreakpointValue,
} from "@chakra-ui/react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const AboutModal: React.FC<Props> = (props) => {
  const modalSize = useBreakpointValue(["xs", "md", "lg"]);
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
        <ModalHeader>このサイトについて</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UnorderedList>
            <ListItem>オリジナルの漢字テストが作成可能</ListItem>
            <ListItem>最大20問まで作成可能</ListItem>
            <ListItem>読み問題/書き問題両対応</ListItem>
            <ListItem>解答画像も同時に生成</ListItem>
            <ListItem>作成した問題の内容の収集等は一切行っていません</ListItem>
            <ListItem>画像の非商用利用は自由、商用利用は一部制限付きで自由</ListItem>
            <UnorderedList>
              <ListItem>詳しくは利用規約をご覧ください</ListItem>
            </UnorderedList>
          </UnorderedList>
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

export default AboutModal;
