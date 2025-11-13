import React from "react";
import { Stack, VStack, Input, Image, Text } from "@chakra-ui/react";
import { useFormContext, Controller, useWatch } from "react-hook-form";

interface FileUploaderProps {
  name: string;
  label?: string;
  accept?: string;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  name,
  label,
  accept,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [preview, setPreview] = React.useState<string | null>(null);

  const error = errors[name]?.message?.toString();

  const fieldValue = useWatch({ control, name });
  React.useEffect(() => {
    if (!fieldValue || fieldValue.length === 0) {
      setPreview(null);
    }
  }, [fieldValue]);

  return (
    <Stack direction="column" gap={1} marginBottom={4}>
      {label && <Text fontWeight="medium">{label}</Text>}

      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <VStack align="start" gap={2}>
            <Input
              type="file"
              accept={accept}
              borderColor={error ? "red.500" : "gray.200"}
              onChange={(e) => {
                const file = e.target.files?.[0];
                field.onChange(e.target.files);
                if (file) {
                  const url = URL.createObjectURL(file);
                  setPreview(url);
                } else {
                  setPreview(null);
                }
              }}
            />
            {preview && (
              <Image
                src={preview}
                alt="preview"
                maxH="160px"
                borderRadius="md"
              />
            )}
          </VStack>
        )}
      />

      {error && (
        <Text fontSize="sm" color="red.500">
          {error}
        </Text>
      )}
    </Stack>
  );
};
