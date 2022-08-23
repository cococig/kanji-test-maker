import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import TermModal from "./TermModal";

export default function Footer() {
  const {
    isOpen: isOpenPrivacyPolicy,
    onOpen: onOpenPrivacyPolicy,
    onClose: onClosePrivacyPolicy,
  } = useDisclosure();
  const { isOpen: isOpenTerm, onOpen: onOpenTerm, onClose: onCloseTerm } = useDisclosure();
  return (
    <Box
      bg={useColorModeValue("#4b6251", "#4b6251")}
      color={useColorModeValue("whiteAlpha.800", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={4} spacing={4} justify={"center"} align={"center"}>
        <Stack direction={"row"} spacing={6}>
          <Link onClick={onOpenPrivacyPolicy}>プライバシーポリシー</Link>
          <PrivacyPolicyModal isOpen={isOpenPrivacyPolicy} onClose={onClosePrivacyPolicy} />
          <Link onClick={onOpenTerm}>利用規約</Link>
          <TermModal isOpen={isOpenTerm} onClose={onCloseTerm} />
          <Link href={"https://twitter.com/cococig"}>Contact</Link>
        </Stack>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={"center"}
          align={{ base: "center", md: "center" }}
        >
          <Text>
            © 2022 <Link href="https://twitter.com/cococig">Cococig</Link>. All rights reserved
          </Text>
        </Container>
      </Box>
    </Box>
  );
}
