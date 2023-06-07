import { 
   Spacer,
   Card,
   Stack,
   IconButton,
   Text,
   HStack,
   Input
} from '@chakra-ui/react';
import PieChartWithNeedle from '../PieChartWithNeedle';
import { useEffect, useState } from 'react';
import {AiOutlineDelete, AiOutlineEdit, AiOutlineCheckCircle, AiOutlineShareAlt}  from "react-icons/all";
import { deleteUserGoal } from '../../../services/goal.service';
import { getUserNutritionLog } from '../../../services/goal.service';
import { calculateCalories } from '../../../services/goal.service';
import { toast } from 'react-toastify';
import { updateUserGoalTarget } from '../../../services/goal.service';
import { shareUserGoal } from '../../../services/goal.service';



const RenderTrackCalories = ({title, calories, startDate, interval,value, handle, goalID,sharedStatus=false, owner=true}) => {
   const [logData, setLogData] = useState('a')
   const [loading,setLoading] = useState(false)

   const [edit, setEdit] = useState(false)
   const [target, setTarget] = useState('')
   const [shared, setShared] = useState(sharedStatus)

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
   const handleSetTarget = () => {
      setEdit(!edit)
      if(target<=0){
         toast('Please enter valid calories',{
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
      shareUserGoal(handle,goalID,!shared)
      setShared(!shared)
      toast(`Target shared status updated to ${!shared}`,{
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
            w={{base:'xsm',md:'3xl',lg:'4xl'}}
            marginTop={'2px'}
            marginBottom={'5px'}
            marginX={'auto'}
         >
         <Stack margin='auto' w={200} align={'center'} marginEnd={{base:'auto',sm:'10'}}>
            <Text fontSize={'lg'}
                  fontWeight={'bold'}
                  fontFamily={'sans-serif'}
                  fontStyle={'normal'}>
               Track Calories
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               Daily calories intake
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
                      <> calories a day</>
                  </HStack>
               ):(<>
                  {calories} calories a day
                  </>
               )}
            </Text>
         </Stack>
         <Spacer/>
         <Stack  margin='auto' w={200} align={'center'} marginEnd={{base:'auto',sm:'14'}}>
            <Text fontFamily={'sans-serif'}
                  fontStyle={'normal'}>
               {calculateCalories(logData,startDate,interval,calories)} 
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               calories  left for today
            </Text>
         </Stack>
         <Spacer/>
         <Stack
               margin={'auto'}
               marginRight={{base:'auto',sm:'50px'}}>
            <PieChartWithNeedle value={((calories-calculateCalories(logData,startDate,interval,calories))/calories)*100}/>
         </Stack>
         {owner &&
         <Stack direction={{ base: 'row', sm: 'column' }} margin={2} marginX={{base:'auto',sm:2}} >
            <IconButton icon={<AiOutlineDelete/>} size={'sm'} w={8}  onClick={handleClick}/>
            <IconButton icon={<AiOutlineEdit/>} size={'sm'} w={8}  onClick={handleEdit}/>
            {shared ? (
               <IconButton icon={<AiOutlineShareAlt/>} size={'sm'} w={8}  onClick={handleShare} colorScheme='green'/>
            ):(
               <IconButton icon={<AiOutlineShareAlt/>} size={'sm'} w={8}  onClick={handleShare}/>
            )}
            
         </Stack>}
      </Card>
   )
}

export default RenderTrackCalories;