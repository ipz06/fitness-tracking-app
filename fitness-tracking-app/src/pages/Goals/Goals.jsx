import {
   HStack, 
   Box, 
   Avatar,
   Flex, 
   Image,
   Spacer,
   Divider,
   IconButton
} from '@chakra-ui/react';
import {CgAdd, CgRemove}  from "react-icons/all";
import DividerHeader from '../../components/Goals/Divider';
import Goal from '../../components/Goals/Goal';
import { useState,  useContext } from 'react';
import AddGoal from '../../components/Goals/AddGoal/AddGoal';
import AllGoals from '../../components/Goals/ReadGoals/AllGoals';
import Badges from '../../components/Goals/Badges/Badges';
import { AuthContext } from '../../common/context';


const Goals = ()=>{
   const date = new Date().toLocaleDateString("en-GB")
   const [open, setOpen] = useState(false)
   const {handle} = useContext(AuthContext)
   return (
      <Box 
            
            textAlign={'center'}
            margin={'auto'}>
         <Badges handle={handle} />
         <h2>GOALS</h2>
         {!open ? (
            <IconButton icon={<CgAdd/>} size={'md'} marginTop={'5'} marginBottom={'5'} onClick={()=>setOpen(!open)}/>
         ):
         (
            <IconButton icon={<CgRemove/>} size={'md'} marginTop={'5'} marginBottom={'5'} onClick={()=>setOpen(!open)}/>
         )}
         {open&& <AddGoal open={open} setOpen={setOpen}/>}
         <DividerHeader heading={'active goals'}/> 
         {/* <Flex justify="center" align="center">
            <HStack
               justify="flex-start"
               mt={4}
               overflowX="scroll"
               pt={4}
               pb={4}
               paddingLeft={'2'}
               maxWidth={'55rem'}
            > */}
               <AllGoals/>
            {/* </HStack>
         </Flex> */}
        
         <DividerHeader heading={'suggested goals'}/> 
         <Goal title={'Four hours a week workout'} description={'Any activity'} startDate={date}/>
         <Goal title={'Any activity four times a week'} description={'Any activity'} startDate={date}/>
         <Goal title={'Loose 2kg in a month'} description={'Loose some weight'} startDate={date}/>

      </Box>
   )
}
export default Goals;