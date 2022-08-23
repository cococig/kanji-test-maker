import {
  Button,
  Image,
  Flex,
  Heading,
  Divider,
  SimpleGrid,
  HStack,
  Alert,
  AlertIcon,
  VStack,
  Stack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useFieldArray, useForm } from "react-hook-form";
import React, { useState } from "react";
import { AddIcon, DownloadIcon } from "@chakra-ui/icons";
import { createImage } from "./imageGenerator";
import QuestionCard from "./QuestionCard";
import { FaTwitter } from "react-icons/fa";

const Form = () => {
  const [questionImage, setQuestionImage] = useState<string | undefined>(undefined);
  const [answerImage, setAnserImage] = useState<string | undefined>(undefined);
  const {
    handleSubmit,
    register,
    control,
    watch,
    formState: { isValid },
    setValue,
  } = useForm({
    defaultValues: {
      examForm: [{ all: "", question: "", yomigana: "", yomikaki: false }],
    },
    mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "examForm",
  });
  const watchFieldArray = watch("examForm");
  const controlledFields = fields.map((field, index) => {
    return {
      ...field,
      ...watchFieldArray[index],
    };
  });
  const onSubmit = (data: QuestionData) => {
    const [qImage, aImage] = createImage(data);
    setQuestionImage(qImage);
    setAnserImage(aImage);
  };
  const onClickTweetButton = () => {
    const url = `https://twitter.com/intent/tweet?text=%E6%BC%A2%E5%AD%97%E3%83%86%E3%82%B9%E3%83%88%E3%82%92%E4%BD%9C%E3%81%A3%E3%81%9F%E3%82%88%EF%BC%81%0D&url=${window.location.href}&hashtags=%E6%BC%A2%E5%AD%97%E3%83%86%E3%82%B9%E3%83%88%E3%83%A1%E3%83%BC%E3%82%AB%E3%83%BC&original_referer=${window.location.href}`;
    window.open(url, "_blank");
  };
  const guidanceAlertBreak = useBreakpointValue([<br />, ""]);

  return (
    <Flex
      direction={"column"}
      mx={"auto"}
      my={8}
      maxW="4xl"
      w={"100%"}
      justify={"flex-start"}
      align={"center"}
      flexGrow={1}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <SimpleGrid columns={[1, 2]} spacing={10}>
          {controlledFields.map((field, index) => (
            <QuestionCard register={register} index={index} remove={remove} key={field.id} />
          ))}
        </SimpleGrid>
        <Flex justify={"center"} my={5}>
          <HStack>
            <Button
              variant="solid"
              onClick={() =>
                controlledFields.length < 20 &&
                append({
                  all: "",
                  question: "",
                  yomigana: "",
                  yomikaki: false,
                })
              }
              leftIcon={<AddIcon />}
            >
              1問追加
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                if (controlledFields.length + 5 < 20) {
                  append(
                    Array.from({ length: 5 }, (v, k) => k).map(() => {
                      return {
                        all: "",
                        question: "",
                        yomigana: "",
                        yomikaki: false,
                      };
                    }),
                  );
                } else if (20 - controlledFields.length > 0) {
                  append(
                    Array.from({ length: 20 - controlledFields.length }, (v, k) => k).map(() => {
                      return {
                        all: "",
                        question: "",
                        yomigana: "",
                        yomikaki: false,
                      };
                    }),
                  );
                }
              }}
              leftIcon={<AddIcon />}
            >
              5問追加
            </Button>
            <Button
              variant="solid"
              onClick={() => {
                append(
                  Array.from({ length: 20 - controlledFields.length }, (v, k) => k).map(() => {
                    return {
                      all: "",
                      question: "",
                      yomigana: "",
                      yomikaki: false,
                    };
                  }),
                );
              }}
              leftIcon={<AddIcon />}
            >
              20問追加
            </Button>
          </HStack>
        </Flex>
        {process.env.NODE_ENV === "development" ? (
          <Button
            colorScheme={"gray"}
            variant="ghost"
            size={"xs"}
            onClick={() =>
              controlledFields.map((field, index) => {
                return setValue(`examForm.${index}`, {
                  all: "漢字テスト",
                  question: "漢字",
                  yomigana: "かんじ",
                  yomikaki: false,
                });
              })
            }
          >
            （デバッグ用）一括入力
          </Button>
        ) : null}
        <Flex justify={"center"}>
          <Button type="submit" disabled={!isValid} size="lg" bg={"#1a274b"} color={"white"}>
            作成する！
          </Button>
        </Flex>
      </form>
      <VStack display={questionImage ? "inline" : "none"} w={"100%"}>
        <Divider my={5} borderColor={"#4b6251"} />
        <Flex justify={"center"}>
          <Heading size={"lg"} color={"#1a274b"}>
            プレビュー
          </Heading>
        </Flex>
        <VStack>
          <Image src={questionImage} alt={"問題の画像"} w={"95%"}></Image>
          <Image src={answerImage} alt={"解答の画像"} w={"95%"}></Image>
        </VStack>
        <Flex justify={"center"}>
          <Alert status="info" rounded="base" variant={"left-accent"} my={5} w={"95%"}>
            <AlertIcon />
            作成した問題を保存してツイート{guidanceAlertBreak}しよう！
          </Alert>
        </Flex>
        <Stack align={"center"} justify={"center"} direction={["column", "row"]}>
          <Button
            as="a"
            href={questionImage}
            leftIcon={<DownloadIcon />}
            w={["95%", "auto"]}
            download
          >
            問題をダウンロード
          </Button>
          <Button
            as="a"
            href={answerImage}
            leftIcon={<DownloadIcon />}
            w={["95%", "auto"]}
            download
          >
            解答をダウンロード
          </Button>
          <Button
            colorScheme={"twitter"}
            leftIcon={<FaTwitter />}
            w={["95%", "auto"]}
            onClick={onClickTweetButton}
          >
            結果をツイート
          </Button>
        </Stack>
      </VStack>
    </Flex>
  );
};

export default Form;
