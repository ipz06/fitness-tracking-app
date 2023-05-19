/* eslint-disable react/prop-types */
import {
   HStack, 
   Box, 
   Avatar,
   Flex, 
   Image,
   Spacer
} from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';
import { useState, useContext } from 'react';
import { AuthContext } from '../../common/context.js'
import Logo from '../../assets/Logo.png'
import Img from '../../assets/avatar_ex.png'
import './navbar.css'
import { redColor } from '../../common/constants.js';


 


const Navbar = ({menu}) => {

   const [activeLink, setActiveLink] = useState('')

   return (
         <Flex
            h='80px'
            zIndex={'1'}
            maxWidth={'1200px'}
            margin={'auto'}
            className='nav'
         >
            <Image 
               src ={Logo}
               h='40px'
               margin={'auto'}
               marginLeft={'5'}/>
            <Spacer/>
            <Flex className='nav'>
            {menu.map((el, i)=>{
               return(
                  <HStack key={i}
                        margin ='auto'
                        p={'5'}>
                     
                        <NavLink key={i} to={`/${el.toLowerCase()}`}
                           className={activeLink===el ? 'active':''}
                           onClick={()=>setActiveLink(el.toLowerCase())}>
                              {el}
                        </NavLink>
                     
                     
                  </HStack>
               )
            })}
            <div className={`underline ${activeLink.toLowerCase()}`}></div>
            </Flex>
           
            
            <Spacer/>
            <Box margin={'auto'}>
               <NavLink to = {'/profile'}>
                  <Avatar name = {'handle'}
                        src = {Img} showBorder={true}
                        borderColor={redColor}
                        marginRight={'5'}/>
               </NavLink>
            </Box>
         </Flex>
   )
}

export default Navbar