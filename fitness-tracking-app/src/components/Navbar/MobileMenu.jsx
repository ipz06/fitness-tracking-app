import {  IconButton,
          Drawer, 
          DrawerHeader, 
          DrawerOverlay, 
          DrawerContent, 
          DrawerBody, 
          DrawerCloseButton,
          Avatar,
         VStack } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react"
import { AiOutlineMenu }  from "react-icons/all";
import { NavLink } from "react-router-dom";
import { redColor } from "../../common/constants";


const MobileMenu = ({menu,handle,photo}) => {

   const {isOpen, onOpen, onClose} = useDisclosure();

   return (
      <>
         <IconButton icon={<AiOutlineMenu/>} 
                     onClick = {onOpen} 
                     display={{ base: "flex", md: "none" }}
                     marginRight={'5'}
                     marginY={'auto'}/>
         {/* <Avatar name = {handle}
                        src = {photo} showBorder={true}
                        borderColor={redColor}
                        marginRight={'5'}
                        marginY={'auto'}
                        onClick={onOpen}
                        display={{ base: "flex", md: "none" }}/> */}

         <Drawer  onClose={onClose} 
                  isOpen={isOpen} 
                  placement="top"
                  >
            <DrawerContent>
               <DrawerCloseButton/>
               <DrawerHeader>
                  MENU
               </DrawerHeader>
               <DrawerBody>
                  <VStack
                        margin ='auto'
                        p={'5'}>
                     {menu.map((el, i)=>{
                                          return(
                                             <NavLink key={i} to={`/${el.toLowerCase()}`}
                                                onClick={onClose}>
                                                   {el}
                                             </NavLink>
                                          )
                                       })}
               </VStack>
               </DrawerBody>
            </DrawerContent>
         </Drawer>
      </>
   )

}

export default MobileMenu