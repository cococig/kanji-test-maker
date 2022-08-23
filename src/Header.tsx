import React from "react";
import { Box, Flex, Heading, Stack, useDisclosure, Link } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import AboutModal from "./AboutModal";
import UsageModal from "./UsageModal";

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpenAbout, onOpen: onOpenAbout, onClose: onCloseAbout } = useDisclosure();
  const { isOpen: isOpenUsage, onOpen: onOpenUsage, onClose: onCloseUsage } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());
  return (
    <Flex
      as={"nav"}
      align="center"
      justify={"space-between"}
      wrap="wrap"
      padding={6}
      bg="#4b6251"
      color={"whiteAlpha.900"}
      position={"sticky"}
      top={0}
      zIndex={"sticky"}
    >
      <Flex align={"center"} mr={5} width={"80%"}>
        <Heading as={"h1"} size="lg" letterSpacing={"tighter"}>
          漢字テストメーカー
        </Heading>
      </Flex>
      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <HamburgerIcon />
      </Box>
      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Link onClick={onOpenAbout}>このサイトについて</Link>
        <AboutModal isOpen={isOpenAbout} onClose={onCloseAbout} />
      </Stack>
      <Stack
        direction={{ base: "column", md: "row" }}
        display={{ base: isOpen ? "block" : "none", md: "flex" }}
        width={{ base: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
        mt={{ base: 4, md: 0 }}
      >
        <Link onClick={onOpenUsage}>つかいかた</Link>
        <UsageModal isOpen={isOpenUsage} onClose={onCloseUsage} />
      </Stack>
    </Flex>
  );
};

export default Header;
