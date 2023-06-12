import { Flex, Text } from "@chakra-ui/react";
import {AiFillGitlab, AiFillLinkedin, AiFillInstagram} from "react-icons/all"
import logoWhite from "../../assets/logo-white.png"
import "./Footer.css"
import { NavLink } from "react-router-dom";

const Footer = () => {
    const year = new Date().getFullYear();
  
    return <footer className="footer">
            <Flex justifyContent="space-between">
                <img src={logoWhite} width='50px' />
                <Text
                fontStyle="normal"
                fontSize="xs"
                >
                    {`All rights reserved © ${year}`}
                </Text>
                <NavLink to="/about">
                    <Text
                        fontStyle="normal" 
                        fontSize="xs"
                        _hover={{
                            color: '#e0041c'
                        }}>
                        About us
                    </Text>
                </NavLink>
                <Flex>
                    <NavLink to="https://navre.me/">
                        <AiFillInstagram />
                    </NavLink>
                    <NavLink to="https://navre.me/">
                        <AiFillLinkedin />
                    </NavLink>
                    <NavLink to='https://gitlab.com/ipz06/fitness-tracking-app' >
                        <AiFillGitlab />
                    </NavLink>
                </Flex>
                
            </Flex>
           </footer>;
  };
  
  export default Footer;