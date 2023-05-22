import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { menuItems } from "./common/constants";
import Profile from "./pages/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";


function App() {

  return (
    <ChakraProvider>
      <div>
        <Navbar menu ={menuItems}/>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="profile" element={<Profile />}></Route>
        </Routes>   
      </div>
    </ChakraProvider>
  )
}

export default App
