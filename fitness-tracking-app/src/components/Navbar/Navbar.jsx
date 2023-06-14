import {
  HStack,
  Box,
  Avatar,
  Flex,
  Image,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../../common/context.js";
import Logo from "../../assets/Logo.png";
import "./navbar.css";
import { redColor } from "../../common/constants.js";
import { useLocation } from "react-router-dom";
import MobileMenu from "./MobileMenu.jsx";
import { MOBILE_MENU_ITEMS } from "../../common/constants";
import { USER_TYPE } from "../../common/constants.js";
import FriendAlert from "./FriendAlert.jsx";
import PropTypes from "prop-types";

const Navbar = ({ menu }) => {
  let address = useLocation();
  const [activeLink, setActiveLink] = useState(address.pathname.slice(1));
  const { photo, handle, role, friendAlerts } = useContext(AuthContext);

  return (
    <Flex
      h="80px"
      zIndex={"1"}
      maxWidth={"1200px"}
      margin={"auto"}
      className="nav"
    >
      <Image src={Logo} h="40px" margin={"auto"} marginLeft={"5"} />
      <Spacer />
      <Flex className="nav" display={{ base: "none", md: "flex" }}>
        {menu.map((el, i) => {
          return (
            <HStack key={i} margin="auto" p={"5"}>
              <NavLink
                key={i}
                to={`/${el.toLowerCase()}`}
                className={activeLink === el ? "active" : ""}
                onClick={() => setActiveLink(el.toLowerCase())}
              >
                {el}
              </NavLink>
            </HStack>
          );
        })}
        <div className={`underline ${activeLink.toLowerCase()}`}></div>
      </Flex>
      <div style={{ position: "relative", width: "40px" }}>
        {friendAlerts && <FriendAlert setActiveLink={setActiveLink} />}
      </div>
      <Spacer />
      {role === USER_TYPE.ADMIN && (
        <HStack
          marginY="auto"
          marginEnd={"10"}
          display={{ base: "none", md: "flex" }}
        >
          <NavLink to={"/admin"} onClick={() => setActiveLink("admin")}>
            <Button variant={"solid"} color={redColor}>
              Admin
            </Button>
          </NavLink>
        </HStack>
      )}
      {role === USER_TYPE.SUPER_ADMIN && (
        <HStack
          marginY="auto"
          marginEnd={"10"}
          display={{ base: "none", md: "flex" }}
        >
          <NavLink to={"/admin"} onClick={() => setActiveLink("admin")}>
            <Button variant={"solid"} color={redColor}>
              Owner
            </Button>
          </NavLink>
        </HStack>
      )}
      <Box margin={"auto"} display={{ base: "none", md: "flex" }}>
        <NavLink to={"/profile"} onClick={() => setActiveLink("profile")}>
          <Avatar
            name={handle}
            src={photo}
            showBorder={true}
            borderColor={redColor}
            marginRight={"5"}
          />
        </NavLink>
      </Box>
      <MobileMenu menu={MOBILE_MENU_ITEMS} handle={handle} photo={photo} />
    </Flex>
  );
};

export default Navbar;

Navbar.propTypes = {
  menu: PropTypes.array.isRequired,
};
