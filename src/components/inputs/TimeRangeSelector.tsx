import React from "react";
import { Input, HStack, Stack, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface TimeRangeSelectorProps {
  nameStart: string;
  nameEnd: string;
  label?: string;
}

export const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
  nameStart,
  nameEnd,
  label,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorMessage =
    (errors[nameStart]?.message || errors[nameEnd]?.message)?.toString();

  return (
    <Stack direction="column" gap={1} marginBottom={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <HStack gap={4}>
        <Input
          {...register(nameStart)}
          type="time"
          borderColor={errors[nameStart] ? "red.500" : "gray.200"}
          _hover={{ borderColor: errors[nameStart] ? "red.500" : "gray.300" }}
          _focus={{ borderColor: errors[nameStart] ? "red.500" : "blue.500", boxShadow: "0 0 0 1px" }}
        />
        <Input
          {...register(nameEnd)}
          type="time"
          borderColor={errors[nameEnd] ? "red.500" : "gray.200"}
          _hover={{ borderColor: errors[nameEnd] ? "red.500" : "gray.300" }}
          _focus={{ borderColor: errors[nameEnd] ? "red.500" : "blue.500", boxShadow: "0 0 0 1px" }}
        />
      </HStack>

      {errorMessage && (
        <Text fontSize="sm" color="red.500">
          {errorMessage}
        </Text>
      )}
    </Stack>
  );
};
