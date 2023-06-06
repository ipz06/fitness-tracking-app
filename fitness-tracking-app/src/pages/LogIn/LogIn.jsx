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
import { MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH } from "../../common/constants";
import { useState, useContext, useEffect } from "react";
import { loginUser } from "../../services/auth.services";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../common/context";
import { NavLink } from "react-router-dom";

function LogIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const { user, appState, setAppState } = useContext(AuthContext);



  
  const handleSubmit = (e) => {
    e.preventDefault();
    let hasError = false;

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format");
      hasError = true;
    } else {
      setEmailError("");
    }

    if (password.length < MIN_PASSWORD_LENGTH || password.length > MAX_PASSWORD_LENGTH) {
      setPasswordError("Password must be between 6 and 32 characters");
      hasError = true;
    } else {
      setPasswordError("");
    }

    if (hasError) {
      return;
    }

    loginUser(email, password)
    .then((credential) => {
      setAppState({...appState,
        user: credential.user
      });
      navigate("/dashboard");
    })
    .catch((e) => {
      setLoginError('Wrong password or email');
      console.log(e);
    })


  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" paddingBottom={350}>
      <Box w={"md"}>
        <Stack spacing={4} padding={4}>
          <Heading fontSize={"5xl"} marginX={'auto'}>
            Log In{" "}
          </Heading>
          <Text
            marginX={'auto'}
            fontSize={"sm"}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Don't have an account? <b><u><NavLink to="/signup">Sign Up</NavLink></u></b>
          </Text>

          <FormControl id="email" maxW="100%" isInvalid={!!emailError || !!loginError} >
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
            <FormErrorMessage>{emailError || loginError}</FormErrorMessage>
          </FormControl>

          <FormControl id="password" maxW="100%" isInvalid={!!passwordError || !!loginError}>
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
            <FormErrorMessage>{passwordError || loginError}</FormErrorMessage>
          </FormControl>

          <Box marginX={'auto'}>
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
              Log In
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default LogIn;