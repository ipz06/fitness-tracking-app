import {
  IconButton,
  Drawer,
  DrawerHeader,
  DrawerContent,
  DrawerBody,
  DrawerCloseButton,
  VStack,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import { AiOutlineMenu } from "react-icons/all";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";

const MobileMenu = ({ menu }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        icon={<AiOutlineMenu />}
        onClick={onOpen}
        display={{ base: "flex", md: "none" }}
        marginRight={"5"}
        marginY={"auto"}
      />

      <Drawer onClose={onClose} isOpen={isOpen} placement="top">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>MENU</DrawerHeader>
          <DrawerBody>
            <VStack margin="auto" p={"5"}>
              {menu.map((el, i) => {
                return (
                  <NavLink
                    key={i}
                    to={`/${el.toLowerCase()}`}
                    onClick={onClose}
                  >
                    {el}
                  </NavLink>
                );
              })}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileMenu;

MobileMenu.propTypes = {
  menu: PropTypes.array.isRequired,
};
