import { FormControl,
         FormLabel,
         Input,
         Text,
         NumberInput,
         NumberInputField,
         NumberDecrementStepper,
         NumberIncrementStepper,
         NumberInputStepper, 
         IconButton } from "@chakra-ui/react"
import {CgAdd}  from "react-icons/all";
import { useState, useContext, useEffect } from "react"
import { AuthContext } from "../../../common/context";
import { addUserGoal } from "../../../services/goal.service";
import { getLastWeight } from "../../../services/goal.service";
import { useNavigate } from "react-router-dom";
import { addUserWeightGoal } from "../../../services/goal.service";
import { toast } from 'react-toastify';


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
   setOpen(!open)
   addUserWeightGoal(handle,'loose-weight', now, 0, targetDate,targetWeight,currentWeight)
}

return (
<>
<Text fontSize={'md'}
      fontWeight={'light'}
      marginBottom={'4'} >
   Set your weight goal and be realistic
</Text>
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
   <FormLabel textAlign={'center'} fontSize={'sm'} fontWeight={'light'} p={'2'}>Target Weight</FormLabel>
   <NumberInput size='xs' maxW={16} defaultValue={45} min={40} onChange={(valueAsString, valueAsNumber)=>setTargetWeight(valueAsNumber)} margin={'auto'}>
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