import { Flex, Text } from "@chakra-ui/react";
import {AiFillGitlab, AiFillLinkedin, AiFillInstagram} from "react-icons/all"
import logoWhite from "../../assets/logo-white.png"

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer>
            <Flex justifyContent="space-between">
                <img src={logoWhite} width='60px' />

                <Text
                fontStyle="normal"
                fontSize="xs"
                >
                    {`All rights reserved © ${year}`}
                    contact us
                </Text>
                <Flex>
                    <AiFillInstagram />
                    <AiFillLinkedin />
                    <AiFillGitlab />
                </Flex>
                
            </Flex>
           </footer>;
  };
  
  export default Footer;