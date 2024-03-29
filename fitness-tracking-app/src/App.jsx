import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Nutrition from "./pages/Nutrition/Nutrition";
import "react-toastify/dist/ReactToastify.css";
import Stats from "./pages/Stats/Stats";
import FriendsPage from "./pages/FriendsPage/FriendsPage";
import User from "./pages/User/User";
import AdminPage from "./pages/AdminPage/AdminPage";
import UserMeals from "./pages/AdminPage/UserMeals";
import Footer from "./components/Footer/Footer";
import "./App.css";
import About from "./pages/About/About";
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function App() {
  const [user] = useAuthState(auth);
  const [appState, setAppState] = useState({ user });
  const [friendAlerts, setFriendAlerts] = useState(false);

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
        const { role, handle, photoURL, email, phone, age, gender, weight } =
          userData[firstKey];

        setAppState({
          ...appState,
          role: role,
          handle: handle,
          photo: photoURL,
          email: email,
          phone: phone,
          age: age,
          gender: gender,
          weight: weight,
          friendAlerts: false,
        });
      })
      .catch((error) => {
        alert(error.message);
      });
  }, [user]);

  return (
    <ChakraProvider>
      <AuthContext.Provider
        value={{
          ...appState,
          appState,
          setAppState,
          friendAlerts,
          setFriendAlerts,
        }}
      >
        <div className="App">
          {user && <Navbar menu={MENU_ITEMS} />}
          <Routes>
            {!user && <Route path="/" element={<Landing />} />}
            {!user && <Route path="/login" element={<LogIn />} />}
            {!user && <Route path="/signup" element={<SignUp />} />}
            {user && <Route path="/" element={<DashBoard />} />}
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
              path="stats"
              element={
                <AuthenticateRoute>
                  <Stats />
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
            <Route
              path="meals"
              element={
                <AuthenticateRoute>
                  <Nutrition />
                </AuthenticateRoute>
              }
            />

            <Route
              path="friends"
              element={
                <AuthenticateRoute>
                  <FriendsPage />
                </AuthenticateRoute>
              }
            />

            <Route
              path="/user/:user"
              element={
                <AuthenticateRoute>
                  <User />
                </AuthenticateRoute>
              }
            />

            <Route
              path="/admin"
              element={
                <AuthenticateRoute>
                  <AdminPage />
                </AuthenticateRoute>
              }
            />

            <Route
              path="/admin/:handle"
              element={
                <AuthenticateRoute>
                  <UserMeals />
                </AuthenticateRoute>
              }
            />

            <Route
              path="about"
              element={
                <AuthenticateRoute>
                  <About />
                </AuthenticateRoute>
              }
            />

            <Route path="*" element={<ErrorPage />} />
          </Routes>

          <ToastContainer position="top-center" />
          {user && <Footer />}
        </div>
      </AuthContext.Provider>
    </ChakraProvider>
  );
}

export default App;
