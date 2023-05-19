import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { menuItems } from "./common/constants";


function App() {

  return (
    <ChakraProvider>
      <div>
        <Navbar menu ={menuItems}/>
      </div>
    </ChakraProvider>
  )
}

export default App
