import { Flex, Image, Text } from "@chakra-ui/react";
import errorGif from "../../assets/error.gif"

const ErrorPage = () => {
  return (
    <Flex
    justifyContent="center"
    paddingX="16px"
    paddingTop="50px"
    >
        <Flex direction="column" align="end">
            <Text fontStyle="normal" fontSize="20px" fontWeight="bold">
                error 404... try again
            </Text>
            <Image src={errorGif} />
        </Flex>  
    </Flex>
  );
};

export default ErrorPage;
