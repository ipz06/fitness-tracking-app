import {
   Box, 
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
import { getUserLog } from '../../../services/goal.service';
import { calculateMinutes } from '../../../services/goal.service';
import { calculateTargetDate } from '../../../services/goal.service';
import { toast } from 'react-toastify';
import { addBadge } from '../../../services/goal.service';

const RenderStayActive = ({title, minutes, startDate, interval,value, handle, goalID}) => {
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

   useEffect(()=>{
      if(calculateMinutes(logData,startDate,interval,minutes) <= 0) {
         addBadge(handle, goalID,'StayActive')
      }
      
   },[logData])

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
               Stay Active
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               Any activity
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               {minutes} minutes {week}
            </Text>
         </Stack>
         <Spacer/>
         <Stack marginLeft={'15px'} marginY='auto'>
            <Text>
               {calculateMinutes(logData,startDate,interval,minutes)} 
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               minutes left till 
            </Text>
            <Text>
            {calculateTargetDate(startDate,interval)}
            </Text>
         </Stack>
         <Spacer/>
         <Stack
               marginY={'auto'}
               marginRight={'50px'}>
            <PieChartWithNeedle value={((minutes-calculateMinutes(logData,startDate,interval,minutes))/minutes)*100}/>
         </Stack>
         <IconButton icon={<AiOutlineDelete/>} size={'sm'} marginTop={'2'} marginEnd={'2'} onClick={handleClick}/>
      </Card>
   )
}

export default RenderStayActive;