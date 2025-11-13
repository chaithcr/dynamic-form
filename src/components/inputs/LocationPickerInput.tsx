import React, { useEffect, useState } from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { useFormContext } from "react-hook-form";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export const LocationPickerInput: React.FC<any> = ({ name, label }) => {
  const { setValue, watch, formState: { errors } } = useFormContext();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null);
  const currentValue = watch(name);

  const defaultCenter: [number, number] = [12.9716, 77.5946]; // Bangalore

  // 🗺️ Handle map clicks
  function LocationMarker() {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setSelectedLocation([lat, lng]);
      },
    });
    return selectedLocation ? (
      <Marker position={selectedLocation}></Marker>
    ) : null;
  }

  // ⚡ Fix map resize issue when modal opens
  function ResizeMapOnOpen() {
    const map = useMapEvents({});
    useEffect(() => {
      setTimeout(() => {
        map.invalidateSize();
      }, 300);
    }, [isOpen]);
    return null;
  }

  const handleSave = () => {
    if (selectedLocation) {
      const coords = `${selectedLocation[0].toFixed(4)}, ${selectedLocation[1].toFixed(4)}`;
      setValue(name, coords, { shouldValidate: true });
      onClose();
    }
  };

  return (
    <>
      <Box
        p={3}
        border="2px dashed gray"
        borderRadius="md"
        cursor="pointer"
        textAlign="center"
        onClick={onOpen}
      >
        <Text fontWeight="medium">{label ?? "Pick Location"}</Text>
        <Text fontSize="sm" color="gray.500">
          {currentValue ? `Selected: ${currentValue}` : "No location selected"}
        </Text>
        {errors[name] && (
          <Text fontSize="sm" color="red.500">
            {errors[name].message?.toString()}
          </Text>
        )}
      </Box>

      {/* Modal with Map */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select a Location</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box height="350px" width="100%">
              <MapContainer
                center={defaultCenter}
                zoom={13}
                style={{ height: "100%", width: "100%", borderRadius: "8px" }}
              >
                <TileLayer
                  attribution='&copy; OpenStreetMap contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <ResizeMapOnOpen />
              </MapContainer>
            </Box>

            {selectedLocation && (
              <Text mt={3} fontWeight="medium" color="teal.600">
                Selected: {selectedLocation[0].toFixed(4)}, {selectedLocation[1].toFixed(4)}
              </Text>
            )}
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              mr={3}
              onClick={handleSave}
              isDisabled={!selectedLocation}
            >
              Save Location
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
