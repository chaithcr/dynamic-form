import React from "react";
import { Stack, Input, Button, Text } from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";

interface PasswordInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  rules?: Record<string, any>;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ name, label, placeholder }) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const [show, setShow] = React.useState(false);
  const errorMessage = errors[name]?.message?.toString();

  return (
    <Stack direction="column" gap={1} mb={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <Stack direction="row" gap={2}>
        <Input
          {...register(name)}
          type={show ? "text" : "password"}
          placeholder={placeholder ?? label}
          borderColor={errorMessage ? "red.500" : "gray.200"}
          _focus={{ borderColor: errorMessage ? "red.500" : "blue.500" }}
        />
        <Button size="sm" onClick={() => setShow(!show)}>
          {show ? "Hide" : "Show"}
        </Button>
      </Stack>

      {errorMessage && (
        <Text fontSize="sm" color="red.500">
          {errorMessage}
        </Text>
      )}
    </Stack>
  );
};

export default PasswordInput;
