import { FormControl,
         FormLabel,
         Input,
         Text,
         NumberInput,
         NumberInputField,
         NumberDecrementStepper,
         NumberIncrementStepper,
         NumberInputStepper, 
         IconButton, Stat, StatLabel, StatNumber, StatHelpText  } from "@chakra-ui/react"
import {CgAdd}  from "react-icons/all";
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../../common/context";
import { addUserGoal } from "../../../services/goal.service";
import { getLastWeight } from "../../../services/goal.service";
import { useNavigate } from "react-router-dom";
import { addUserWeightGoal } from "../../../services/goal.service";
import { toast } from 'react-toastify';
import { MONTH_MS } from "../../../common/constants";


const LooseWeight = ({open,setOpen}) => {

const navigate = useNavigate()
const { handle, weight } = useContext(AuthContext)
const [currentWeight, setCurrentWeight] = useState('')


const [date, setTargetDate] = useState('')
const [targetWeight, setTargetWeight] = useState(1)

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
            navigate('/profile')
            toast(('Set weight'),{autoClose:1000})
         }
      })
},[])
 

const HandleSubmitGoal = (open,setOpen)=>{
   
   const now = Date.now()
   const targetDate = new Date(date).getTime()
   if(Math.abs(targetWeight-currentWeight)/((targetDate-now)/MONTH_MS) > 6  ) {
      toast(('Loose/gain less than 6 kg in a month!'),{autoClose:1000})
      return
   } else if (targetWeight <= 39) {
      toast(('Minimum weight 40'),{autoClose:1000})
      return
   } else if ( targetDate < now ) {
      toast(('Please enter valid date'),{autoClose:1000})
      return
   } else if(!targetDate) {
      toast(('Please enter valid date'),{autoClose:1000})
      return
   }
   setOpen(!open)
   addUserWeightGoal(handle,'loose-weight', now, 0, targetDate,targetWeight,currentWeight)
}
 
return (
<>
         <Stat textAlign={'center'}>
               <StatLabel>Current weight</StatLabel>
               <StatNumber>{currentWeight} kg</StatNumber>
               <StatHelpText>Please set target date</StatHelpText>
         </Stat>
   <FormControl
               w={'10rem'}
               marginX={'auto'}>
      <Input
          placeholder="Enter target date"
          borderRadius={3}
          borderColor="blackAlpha.500"
          type={'date'}
          onChange={(e) => setTargetDate((e.target.value))}
        />
   </FormControl>
   <FormLabel textAlign={'center'} fontSize={'sm'} fontWeight={'light'} p={'2'}>Set target Weight</FormLabel>
   <NumberInput size='xs' maxW={16} defaultValue={''} min={39} onChange={(valueAsString, valueAsNumber)=>setTargetWeight(valueAsNumber)} margin={'auto'}>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
         
   <IconButton icon={<CgAdd/>} size={'md'} margin={'5'}  onClick = {()=>HandleSubmitGoal(open,setOpen,targetWeight,date)}/>   
</>
)
}

export default LooseWeight