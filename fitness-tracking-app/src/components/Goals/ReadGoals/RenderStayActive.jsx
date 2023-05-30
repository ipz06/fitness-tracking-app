import {
   HStack, 
   Spacer,
   Card,
   Stack,
   IconButton,
   Text,
   Input
} from '@chakra-ui/react';
import PieChartWithNeedle from '../PieChartWithNeedle';
import { useEffect, useState } from 'react';
import {AiOutlineDelete, AiOutlineEdit, AiOutlineCheckCircle, AiOutlineShareAlt}  from "react-icons/all";
import { deleteUserGoal } from '../../../services/goal.service';
import { getUserLog } from '../../../services/goal.service';
import { calculateMinutes } from '../../../services/goal.service';
import { calculateTargetDate } from '../../../services/goal.service';
import { toast } from 'react-toastify';
import { addBadge } from '../../../services/goal.service';
import { updateUserGoalTarget } from '../../../services/goal.service';

const RenderStayActive = ({title, minutes, startDate, interval,value, handle, goalID}) => {
   const [logData, setLogData] = useState('a')
   const [loading,setLoading] = useState(false)

   const [edit, setEdit] = useState(false)
   const [target, setTarget] = useState('')

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

   const handleSetTarget = () => {
      setEdit(!edit)
      if(target<=0){
         toast('Please enter valid weight',{
            autoClose:500
           })
         return
      }
      updateUserGoalTarget(handle,goalID,target)
      toast(`Target updated to ${target} minutes`,{
         autoClose:500
        })

   }
   const handleEdit = () =>{
      setEdit(!edit)
   }

   const handleShare = ()=>{
      toast(`Target shared with friends`,{
         autoClose:500
        })
   }
   
   if(loading){
      return (
         <div>
            Loading..
         </div>
      )
   }

   return (
      <Card h={{base:'fit-content',md:'140',lg:'140'}} 
            direction={{ base: 'column', sm: 'row' }}
            w={{base:'sm',md:'3xl',lg:'4xl'}}
            marginTop={'2px'}
            marginBottom={'5px'}
            marginX={'auto'}
         >
         <Stack margin='auto' w={200} align={'center'} marginEnd={{base:'auto',sm:'10'}}>
            <Text fontSize={'lg'}
                  fontWeight={'bold'}
                  fontFamily={'sans-serif'}
                  fontStyle={'normal'}>
               Stay Active
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               Any activity
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               {edit?(
                  <HStack>
                     <Input size={'sm'} type={'number'} w={14} onChange={(e)=>setTarget(e.target.value)}/>
                     <IconButton icon={<AiOutlineCheckCircle/>} size={'sm'} w={8} marginTop={'2'} marginEnd={'2'} onClick={handleSetTarget}/>
                      <> minutes {week}</>
                  </HStack>
               ):(<>
                  {minutes} minutes {week}
                  </>
               )}
            </Text>
         </Stack>
         <Spacer/>
         <Stack margin='auto' w={200} align={'center'} marginEnd={{base:'auto',sm:'14'}}>
               <Text
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
                  {calculateMinutes(logData,startDate,interval,minutes)} 
               </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               minutes left till 
            </Text>
            <Text
            fontFamily={'sans-serif'}
            fontStyle={'normal'}>
            {calculateTargetDate(startDate,interval)}
            </Text>
         </Stack>
         <Spacer/>
         <Stack
               margin={'auto'}
               marginRight={{base:'auto',sm:'50px'}}>
            <PieChartWithNeedle value={((minutes-calculateMinutes(logData,startDate,interval,minutes))/minutes)*100}/>
         </Stack>
         <Stack direction={{ base: 'row', sm: 'column' }} margin={2} marginX={{base:'auto',sm:2}} >
            <IconButton icon={<AiOutlineDelete/>} size={'sm'} w={8}  onClick={handleClick}/>
            <IconButton icon={<AiOutlineEdit/>} size={'sm'} w={8}  onClick={handleEdit}/>
            <IconButton icon={<AiOutlineShareAlt/>} size={'sm'} w={8}  onClick={handleShare}/>
         </Stack>
      </Card>
   )
}

export default RenderStayActive;