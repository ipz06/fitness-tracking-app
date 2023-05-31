import {
   Box, 
   Spacer,
   Card,
   Stack,
   IconButton,
   Text,
   Input,
   HStack
} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import {AiOutlineDelete, AiOutlineEdit, AiOutlineCheckCircle, AiOutlineShareAlt }  from "react-icons/all";
import { deleteUserGoal } from '../../../services/goal.service';
import { AuthContext } from '../../../common/context';
import { getLastWeight } from '../../../services/goal.service';
import { toast } from 'react-toastify';
import { updateUserGoalTarget } from '../../../services/goal.service';
import WeightPieChart from '../WeightPieChart';
import { shareUserGoal } from '../../../services/goal.service';


const RenderLooseWeight = ({title,targetWeight,targetDate,value, handle, goalID, startWeight, sharedStatus=false, owner=true}) => {
   
   const { weight } = useContext(AuthContext)
   const [currentWeight, setCurrentWeight] = useState('')
   const [date, setDate] = useState('')
   const [shared, setShared] = useState(sharedStatus)

   useEffect(()=>{
      let dateISO = new Date(targetDate)
      setDate(dateISO.toLocaleDateString())
   },[])

   const [edit, setEdit] = useState(false)
   const [target, setTarget] = useState('')

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

   const handleSetTarget = () => {
      setEdit(!edit)
      if(target<=0){
         toast('Please enter valid weight',{
            autoClose:500
           })
         return
      }
      updateUserGoalTarget(handle,goalID,target)
      toast(`Target weight updated to ${target}`,{
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
               Change Weight
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               Start weight {startWeight} kg 
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               
               Be {edit?(<HStack>
                           <Input size={'sm'} type={'number'} w={12} onChange={(e)=>setTarget(e.target.value)}/>
                           <IconButton icon={<AiOutlineCheckCircle/>} size={'sm'} w={8} marginTop={'2'} marginEnd={'2'} onClick={handleSetTarget}/>
                         </HStack>):(targetWeight)} kg by {date}
                         
            </Text>
         </Stack>
         <Spacer/>
         <Stack margin='auto' w={200} align={'center'} marginEnd={{base:'auto',sm:'14'}}>
            <Text 
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               {currentWeight} kg
            </Text>
            <Text 
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               Current weight 
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}
               fontFamily={'sans-serif'}
               fontStyle={'normal'}>
               {Math.abs(currentWeight - targetWeight)} kg to {currentWeight-targetWeight>0?'loose':'gain'}
            </Text>
         </Stack>
         <Spacer/>
         <Box
         margin={'auto'}
         marginRight={{base:'auto',sm:'50px'}}>
            <WeightPieChart value={50+(currentWeight - targetWeight)/15*100}/>
         </Box>
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

export default RenderLooseWeight;