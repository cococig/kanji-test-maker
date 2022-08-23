import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  Spacer,
  Stack,
  Switch,
  useColorModeValue,
} from "@chakra-ui/react";
import { UseFieldArrayRemove, UseFormRegister } from "react-hook-form";

type Props = {
  register: UseFormRegister<{
    examForm: {
      all: string;
      question: string;
      yomigana: string;
      yomikaki: boolean;
    }[];
  }>;
  index: number;
  remove: UseFieldArrayRemove;
};

const QuestionCard: React.FC<Props> = ({ register, index, remove }) => {
  // TODO:「問題の漢字」が問題文に含まれていない場合は弾く
  return (
    <Box
      rounded={"lg"}
      bg={useColorModeValue("whiteAlpha.900", "gray.700")}
      boxShadow={"lg"}
      p={8}
      w={["95%", "100%"]}
      justifySelf={"center"}
    >
      <HStack>
        <Heading color={"#1a274b"}>{index + 1}問目</Heading>
        <Spacer />
        <Box>
          <FormControl id={`examForm-yomikaki-${index}`}>
            <HStack>
              <FormLabel htmlFor={`yomikaki-switch-${index}`} m={0} color={"#1a274b"}>
                読み
              </FormLabel>
              <Switch
                id={`yomikaki-switch-${index}`}
                {...register(`examForm.${index}.yomikaki`)}
                tabIndex={0}
                mx={1}
              />
              <FormLabel htmlFor={`yomikaki-switch-${index}`} m={0} color={"#1a274b"}>
                書き
              </FormLabel>
            </HStack>
          </FormControl>
        </Box>
        {index > 0 && (
          <IconButton
            aria-label="delete"
            icon={<DeleteIcon />}
            bg={"#b9c9c9"}
            color={"#1a274b"}
            type="button"
            onClick={() => remove(index)}
            size="sm"
            tabIndex={0}
          />
        )}
      </HStack>
      <Stack spacing={4}>
        <FormControl id={`examForm-all-${index}`} isRequired>
          <FormLabel color={"#1a274b"}>問題文</FormLabel>
          <Input
            placeholder="漢字テスト"
            {...register(`examForm.${index}.all`, { required: true })}
            tabIndex={index + 1}
          />
        </FormControl>
        <HStack>
          <FormControl id={`examForm-question-${index}`} isRequired>
            <FormLabel color={"#1a274b"}>問題の漢字</FormLabel>
            <Input
              placeholder="漢字"
              {...register(`examForm.${index}.question`, { required: true })}
              tabIndex={index + 1}
            />
          </FormControl>
          <FormControl id={`examForm-yomigana-${index}`}>
            <FormLabel color={"#1a274b"}>よみがな</FormLabel>
            <Input
              placeholder="かんじ"
              {...register(`examForm.${index}.yomigana`, { required: false })}
              tabIndex={index + 1}
            />
          </FormControl>
        </HStack>
      </Stack>
    </Box>
  );
};

export default QuestionCard;
