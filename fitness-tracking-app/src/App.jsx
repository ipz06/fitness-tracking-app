import { ChakraProvider } from "@chakra-ui/react";
import Navbar from "./components/Navbar/Navbar";
import { MENU_ITEMS } from "./common/constants";
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
import Goals from "./pages/Goals/Goals";
import AuthenticateRoute from "./hoc/AuthenticateRoute";
import LogIn from "./pages/LogIn/LogIn";

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
      {user && <Navbar menu ={MENU_ITEMS}/>}
        <Routes>
          {!user && <Route path="/" element={<Landing />}/>}
          {!user && <Route path="/login" element={<LogIn/>}/>}
          {!user && <Route path="/signup" element={<SignUp />}/>}
          <Route 
            path="dashboard" 
            element={
              <AuthenticateRoute>
                <DashBoard />
              </AuthenticateRoute>
            }                      
           />
          <Route 
            path="goals" 
            element={
              <AuthenticateRoute>
                <Goals />
              </AuthenticateRoute>
            }                      
           />
          <Route 
            path="profile" 
            element={
              <AuthenticateRoute>
                <Profile />
              </AuthenticateRoute>
            }                      
           />                     
        </Routes>
    
     
      </div>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
