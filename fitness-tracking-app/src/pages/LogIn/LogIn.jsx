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
import { useState } from "react";

function LogIn() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = () => {
    let hasError = false;

    // Email validation
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

    console.log(email, password);
  };

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center" paddingBottom={350}>
      <Box w={"lg"}>
        <Stack spacing={4}>
          <Heading fontSize={"5xl"} paddingLeft={140}>
            Log In{" "}
          </Heading>
          <Text
            paddingLeft={110}
            fontSize={"sm"}
            color={useColorModeValue("gray.600", "gray.400")}
          >
            Don't have an account? Sign Up
          </Text>

          <FormControl id="email" maxW="450px" isInvalid={!!emailError}>
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

          <FormControl id="password" maxW="450px" isInvalid={!!passwordError}>
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
              Log In
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
}

export default LogIn;