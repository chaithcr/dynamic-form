import React from "react";
import { Stack, HStack, Input, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface CustomDatePickerRangeProps {
  nameStart: string;
  nameEnd: string;
  label?: string;
}

export const CustomDatePickerRange: React.FC<CustomDatePickerRangeProps> = ({
  nameStart,
  nameEnd,
  label,
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[nameStart]?.message || errors[nameEnd]?.message;

  return (
    <Stack direction="column" gap={1} marginBottom={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <HStack gap={2}>
        <Input
          {...register(nameStart)}
          type="date"
          borderColor={errors[nameStart] ? "red.500" : "gray.200"}
        />
        <Input
          {...register(nameEnd)}
          type="date"
          borderColor={errors[nameEnd] ? "red.500" : "gray.200"}
        />
      </HStack>

      {error && <Text fontSize="sm" color="red.500">{error.toString()}</Text>}
    </Stack>
  );
};
