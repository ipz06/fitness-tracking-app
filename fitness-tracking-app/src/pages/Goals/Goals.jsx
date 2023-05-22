import {
   VStack, 
   Box, 
   Avatar,
   Flex, 
   Image,
   Spacer,
   Divider,
   IconButton
} from '@chakra-ui/react';
import {CgAdd}  from "react-icons/all";
import DividerHeader from '../../components/Goals/Divider';
import Goal from '../../components/Goals/Goal';
import CurrentGoal from '../../components/Goals/CurrentGoal';


const Goals = ()=>{
   const date = new Date().toLocaleDateString("en-GB")
   
   return (
      <Box 
            
            textAlign={'center'}
            margin={'auto'}>
         <h2>GOALS</h2>
         <IconButton icon={<CgAdd/>} size={'md'} marginTop={'5'} marginBottom={'5'}/>
         <DividerHeader heading={'active goals'}/> 
         <CurrentGoal title={'Stay toned'} description={'120 minutes a week'} endDate={'30/05/2023'} value={90}/>
         <DividerHeader heading={'suggested goals'}/> 
         <Goal title={'Four hours a week workout'} description={'Any activity'} startDate={date}/>
         <Goal title={'Any activity four times a week'} description={'Any activity'} startDate={date}/>
         <Goal title={'Loose 2kg in a month'} description={'Loose some weight'} startDate={date}/>

      </Box>
   )
}
export default Goals;