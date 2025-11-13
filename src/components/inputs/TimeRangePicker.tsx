import React from "react";
import { Input, HStack, Stack, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

interface TimeRangePickerProps {
  name: string;
  label?: string;
}

const TimeRangePicker: React.FC<TimeRangePickerProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const errorMessage = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} marginBottom={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <Controller
        name={name}
        control={control}
        defaultValue={{ start: "", end: "" }}
        render={({ field }) => (
          <HStack gap={4}>
            <Input
              type="time"
              value={field.value.start}
              onChange={(e) =>
                field.onChange({ ...field.value, start: e.target.value })
              }
              borderColor={errorMessage ? "red.500" : "gray.200"}
              _hover={{ borderColor: errorMessage ? "red.500" : "gray.300" }}
              _focus={{ borderColor: errorMessage ? "red.500" : "blue.500", boxShadow: "0 0 0 1px" }}
            />
            <Input
              type="time"
              value={field.value.end}
              onChange={(e) =>
                field.onChange({ ...field.value, end: e.target.value })
              }
              borderColor={errorMessage ? "red.500" : "gray.200"}
              _hover={{ borderColor: errorMessage ? "red.500" : "gray.300" }}
              _focus={{ borderColor: errorMessage ? "red.500" : "blue.500", boxShadow: "0 0 0 1px" }}
            />
          </HStack>
        )}
      />

      {errorMessage && (
        <Text fontSize="sm" color="red.500">
          {errorMessage}
        </Text>
      )}
    </Stack>
  );
};

export default TimeRangePicker;
