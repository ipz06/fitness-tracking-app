import {
   Box, 
   Spacer,
   Card,
   Stack,
   IconButton,
   Text,
} from '@chakra-ui/react';
import PieChartWithNeedle from '../PieChartWithNeedle';
import WeightBarChart from '../WeightBarChart';
import { useState, useEffect, useContext } from 'react';
import {AiOutlineDelete}  from "react-icons/all";
import { deleteUserGoal } from '../../../services/goal.service';
import { AuthContext } from '../../../common/context';
import { getLastWeight } from '../../../services/goal.service';

const RenderLooseWeight = ({title,targetWeight,targetDate,value, handle, goalID, startWeight}) => {
   
   const { weight } = useContext(AuthContext)
   const [currentWeight, setCurrentWeight] = useState('')
   const [date, setDate] = useState('')
   useEffect(()=>{
      let dateISO = new Date(targetDate)
      setDate(dateISO.toLocaleDateString())
   },[])

   useEffect(()=>{
      getLastWeight(handle)
         .then((snapshot)=>{
            if(snapshot.exists()){
               const data = snapshot.val()
               const key = Object.keys(snapshot.val())
               setCurrentWeight(data[key]['currentWeight'])
            } else if (weight !== '') {
               setCurrentWeight(weight)
            } else {
               setCurrentWeight(0)
            }
         })
   },[])
     
   const handleClick = () =>{
      deleteUserGoal(handle, goalID)
      console.log(goalID)
   }

   return (
      <Card h={{base:'300',md:'140',lg:'140'}} 
            direction={{ base: 'column', sm: 'row' }}
            w={{base:'sm',md:'3xl',lg:'4xl'}}
            marginTop={'2px'}
            marginBottom={'5px'}
            marginX={'auto'}
         >
         <Stack
               marginLeft={'30px'}
               textAlign={'left'}
               marginY={'auto'}>
            <Text fontSize={'lg'}
                  fontWeight={'bold'}>
               Change Weight
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               Start weight {startWeight} kg 
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               Be {targetWeight} kg by {date}
            </Text>
         </Stack>
         <Spacer/>
         <Stack marginLeft={'15px'} marginY='auto'>
            <Text>
             {currentWeight} kg
            </Text>
            <Text 
            fontSize={'sm'}
            fontWeight={'light'}>
              Current weight 
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               {Math.abs(currentWeight - targetWeight)} kg to {currentWeight-targetWeight>0?'loose':'gain'}
            </Text>
         </Stack>
         <Spacer/>
         <Box
         margin={'auto'}
         marginRight={'50px'}>
            {/* <PieChartWithNeedle value={50}/> */}
            <WeightBarChart value={currentWeight - targetWeight}/>
         </Box>
         <IconButton icon={<AiOutlineDelete/>} size={'sm'} marginTop={'2'} marginEnd={'2'} onClick={handleClick}/>
      </Card>
   )
}

export default RenderLooseWeight;