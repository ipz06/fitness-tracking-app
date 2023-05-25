import {
   Box, 
   Spacer,
   Card,
   Stack,
   IconButton,
   Text,
} from '@chakra-ui/react';
import PieChartWithNeedle from '../PieChartWithNeedle';
import { useState, useEffect } from 'react';
import {AiOutlineDelete}  from "react-icons/all";
import { deleteUserGoal } from '../../../services/goal.service';
import { calculateWorkouts, calculateTargetDate } from '../../../services/goal.service';
import { getUserLog } from '../../../services/goal.service';


const RenderStayToned = ({title,workouts,interval,value, handle, goalID, startDate}) => {
   const [logData, setLogData] = useState('a')
   const [loading,setLoading] = useState(false)

   useEffect(()=>{
      setLoading(true)
      getUserLog(handle)
         .then((snapshot)=>{
               if(snapshot.exists()) {
                  setLogData(snapshot.val())
               }
         })
         .catch((e)=>console.log(e))
         .finally(()=>setLoading(false))
   },[])


   const [week, setWeek] = useState(interval)
   if (week == 604800000){
      setWeek('a week')
   } else if (week== 1209600000) {
      setWeek('every two weeks')
   } else if (week=== 2419200000) {
      setWeek('a month')
   }

   const handleClick = () =>{
      deleteUserGoal(handle, goalID)
      console.log(goalID)
   }

   if(loading){
      return (
         <div>
            Loading..
         </div>
      )
   }

   return (
      <Card h={'130px'} 
           direction={{ base: 'column', sm: 'row' }}
           w={'430px'}
           marginTop={'2px'}
           minW="400px" >
         <Stack
               marginLeft={'30px'}
               textAlign={'left'}>
            <Text fontSize={'lg'}
                  fontWeight={'bold'}>
               Stay Toned
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               Any activity
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               {workouts} workouts {week}
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               {calculateWorkouts(logData,startDate,interval,workouts)} workout left till {calculateTargetDate(startDate,interval)}
            </Text>
         </Stack>
         <Spacer/>
         <Box
         margin={'auto'}
         marginRight={'50px'}>
            <PieChartWithNeedle value={((workouts-calculateWorkouts(logData,startDate,interval,workouts))/workouts)*100}/>
         </Box>
         <IconButton icon={<AiOutlineDelete/>} size={'sm'} marginTop={'2'} marginEnd={'2'} onClick={handleClick}/>
      </Card>
   )
}

export default RenderStayToned;