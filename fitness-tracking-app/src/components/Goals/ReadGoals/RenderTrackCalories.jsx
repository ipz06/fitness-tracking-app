import { 
   Spacer,
   Card,
   Stack,
   IconButton,
   Text,
} from '@chakra-ui/react';
import PieChartWithNeedle from '../PieChartWithNeedle';
import { useEffect, useState } from 'react';
import {AiOutlineDelete}  from "react-icons/all";
import { deleteUserGoal } from '../../../services/goal.service';
import { getUserNutritionLog } from '../../../services/goal.service';
import { calculateCalories } from '../../../services/goal.service';


const RenderTrackCalories = ({title, calories, startDate, interval,value, handle, goalID}) => {
   const [logData, setLogData] = useState('a')
   const [loading,setLoading] = useState(false)

   useEffect(()=>{
      setLoading(true)
      getUserNutritionLog(handle)
         .then((snapshot)=>{
               if(snapshot.exists()) {
                  setLogData(snapshot.val())
               }
         })
         .catch((e)=>console.log(e))
         .finally(()=>setLoading(false))
   },[])

   const handleClick = () =>{
      deleteUserGoal(handle, goalID)
   }
   
   if(loading){
      return (
         <div>
            Loading..
         </div>
      )
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
               Track Calories
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               Track your daily calories intake
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               {calories} calories a day
            </Text>
         </Stack>
         <Spacer/>
         <Stack marginLeft={'15px'} marginY='auto'>
            <Text>
               {calculateCalories(logData,startDate,interval,calories)} 
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               calories  left for today
            </Text>
         </Stack>
         <Spacer/>
         <Stack
               marginY={'auto'}
               marginRight={'50px'}>
            <PieChartWithNeedle value={((calories-calculateCalories(logData,startDate,interval,calories))/calories)*100}/>
         </Stack>
         <IconButton icon={<AiOutlineDelete/>} size={'sm'} marginTop={'2'} marginEnd={'2'} onClick={handleClick}/>
      </Card>
   )
}

export default RenderTrackCalories;