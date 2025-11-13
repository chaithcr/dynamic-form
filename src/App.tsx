import { ChakraProvider } from "@chakra-ui/react";
import ChakraTest from "./components/ChakraTest";

function App() {
  return (
    <ChakraProvider>
      <ChakraTest />
    </ChakraProvider>
  );
}

export default App;
