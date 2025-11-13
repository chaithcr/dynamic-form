import React from "react";
import { Stack, Input, Button, Text } from "@chakra-ui/react";
import { useFormContext, Controller } from "react-hook-form";

interface MapPickerProps {
  name: string;
  label?: string;
}

const MapPicker: React.FC<MapPickerProps> = ({ name, label }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext<any>(); // Using any to bypass TS type issues

  const error = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} marginBottom={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <Controller
        name={name}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <>
            <Input
              {...field}
              placeholder="Click 'Pick Location' to autofill"
              readOnly
              borderColor={error ? "red.500" : "gray.200"}
            />
            <Button
              mt={2}
              colorScheme="teal"
              size="sm"
              onClick={() => field.onChange("12.9716° N, 77.5946° E")}
            >
              Pick Location
            </Button>
          </>
        )}
      />

      {error && <Text fontSize="sm" color="red.500">{error}</Text>}
    </Stack>
  );
};

export default MapPicker;
