import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { menuItems } from "./common/constants";
import Profile from "./pages/Profile/Profile";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing/Landing";
import SignUp from "./pages/SignUp/SignUp";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./config/firebase-config";
import { useEffect, useState } from "react";
import { getUserData } from "./services/user.service";
import { AuthContext } from "./common/context";
import DashBoard from "./pages/DashBoard/DashBoard";

function App() {
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({ user });

  if (appState.user !== user) {
    setAppState({ user });
  }

  useEffect(() => {
    if (user === null) return;
  
    getUserData(user.uid)
      .then((snapshot) => {
        if (!snapshot.exists()) {
          throw new Error("Something went wrong!");
        }
  
        const userData = snapshot.val();
        const firstKey = Object.keys(userData)[0];
        const { role, handle, photoURL, email, phone, age, gender, weight } = userData[firstKey];
        console.log(role, handle, photoURL, email, phone);
        setAppState({
          ...appState,
          role: role,
          handle: handle,
          photo: photoURL,
          email: email,
          phone:phone,
          age: age,
          gender: gender,
          weight: weight,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [user]);


  return (
    <ChakraProvider>
      <AuthContext.Provider value={{...appState}}>
      <div>
   
    
     
      </div>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
