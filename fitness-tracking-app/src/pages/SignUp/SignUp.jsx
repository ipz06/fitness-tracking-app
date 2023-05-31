import {
  Box,
  Button,
  FormControl,
  Flex,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  useColorModeValue,
  FormErrorMessage,
} from "@chakra-ui/react";
import { USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH, MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "../../common/constants";
import { useState, useContext } from "react";
import { AuthContext } from "../../common/context";
import { useNavigate } from "react-router-dom";
import { getUserByHandle } from "../../services/user.service";
import { createUserHandle } from "../../services/user.service";
import { registerUser } from "../../services/auth.services";
import { updateProfile } from "firebase/auth";
import { NavLink } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { phoneRegex } from "../../common/constants";

function SignUp() {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [handleError, setHandleError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate()

  const handleSubmit = async () => {
    let hasError = false;
    if (handle.length < USERNAME_MIN_LENGTH || handle.length > USERNAME_MAX_LENGTH) {
      setHandleError("Username must be between 2 and 20 characters");
      hasError = true;
    } else {
      setHandleError("");
    }

    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
      setPasswordError("Password must be between 6 and 32 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    } else {
      setEmailError("");
    }

    // const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      setPhoneError("Invalid phone number format");
      hasError = true;
    } else {
      setPhoneError("");
    }

    if (hasError) {
      return;
    }
  
    const formValues = {
      email: email,
      password: password,
      handle: handle,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      photoURL: "",
      weight: "",
      gender: "",
      age: "",
    };
  
    try {
      const handleSnapshot = await getUserByHandle(formValues.handle);
      if (handleSnapshot) {
        toast.warning(`Handle @${formValues.handle} has already been taken!`)
        return;
        // throw new Error(`Handle @${formValues.handle} has already been taken!`);
      }
  
      const credential = await registerUser(formValues.email, formValues.password);
      const user = credential.user;
  
      await createUserHandle(
        formValues.handle,
        user.uid,
        user.email,
        formValues.firstName,
        formValues.lastName,
        formValues.phone,
        formValues.photoURL,
        formValues.weight,
        formValues.gender,
        formValues.age
      );
  
      await updateProfile(user, {
        displayName: formValues.handle,
      });
      setUser({
        user: credential.user,
        role: 1,
      });
      
    } catch (e) {
      console.log(e)
    } finally {
      navigate("/profile");
    }
    
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" paddingBottom={40}>
      <Box w={"lg"}>
        <Stack spacing={4}>
          <Heading fontSize="5xl" paddingLeft={7}>
            Welcome To 7Fit{" "}
          </Heading>
          <Text
            paddingLeft={100}
            fontSize="sm"
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Already have an account? <b><u><NavLink to="/login">Log in</NavLink></u></b>
          </Text>

          <FormControl id="firstName" maxW="450px">
            <FormLabel>First Name</FormLabel>
            <Input
              size="lg"
              placeholder="Enter First Name"
              borderRadius={3}
              borderColor="blackAlpha.500"
              _hover={{ borderColor: "black", borderWidth: 2 }}
              _focus={{
                borderColor: "black",
                boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
              }}
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>

          <FormControl id="lastName" maxW="450px">
            <FormLabel>Last Name</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Last Name"
              borderRadius={3}
              borderColor="blackAlpha.500"
              _hover={{ borderColor: "black", borderWidth: 2 }}
              _focus={{
                borderColor: "black",
                boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
              }}
              type="text"
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>

          <FormControl id="handle" maxW="450px" isInvalid={handleError}>
            <FormLabel>Username</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Username"
              borderRadius={3}
              borderColor="blackAlpha.500"
              _hover={{ borderColor: "black", borderWidth: 2 }}
              _focus={{
                borderColor: "black",
                boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
              }}
              type="text"
              onChange={(e) => setHandle(e.target.value)}
            />
            <FormErrorMessage>{handleError}</FormErrorMessage>
          </FormControl>

          <FormControl id="email1" maxW="450px" isInvalid={emailError}>
            <FormLabel>Email</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Email"
              borderRadius={3}
              borderColor="blackAlpha.500"
              _hover={{ borderColor: "black", borderWidth: 2 }}
              _focus={{
                borderColor: "black",
                boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
              }}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormErrorMessage>{emailError}</FormErrorMessage>
          </FormControl>

          <FormControl id="password1" maxW="450px" isInvalid={passwordError}>
            <FormLabel>Password</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Password"
              borderRadius={3}
              borderColor="blackAlpha.500"
              _hover={{ borderColor: "black", borderWidth: 2 }}
              _focus={{
                borderColor: "black",
                boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
              }}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormErrorMessage>{passwordError}</FormErrorMessage>
          </FormControl>

          <FormControl id="phoneNumber" maxW="450px" isInvalid={phoneError}>
            <FormLabel>Phone Number</FormLabel>
            <Input
              size="lg"
              placeholder="Enter Phone Number"
              borderRadius={3}
              borderColor="blackAlpha.500"
              _hover={{ borderColor: "black", borderWidth: 2 }}
              _focus={{
                borderColor: "black",
                boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
              }}
              type="number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <FormErrorMessage>{phoneError}</FormErrorMessage>
          </FormControl>

          <Box paddingLeft="80px">
            <Button
              bg={"#000"}
              color={"white"}
              _hover={{
                bg: "teal.900",
              }}
              borderRadius={2}
              maxW="280px"
              minW="280px"
              onClick={handleSubmit}
            >
              SIGN UP
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default SignUp;