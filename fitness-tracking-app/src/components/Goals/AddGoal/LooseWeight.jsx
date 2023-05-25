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
import { useState } from "react"
import { useContext } from "react";
import { AuthContext } from "../../../common/context";
import { addUserGoal } from "../../../services/goal.service";


const LooseWeight = ({open,setOpen}) => {

const { handle } = useContext(AuthContext)


const [date, setTargetDate] = useState('')
const [weight, setWeight] = useState(1)

const HandleSubmitGoal = (open,setOpen)=>{
   const now = Date.now()
   const targetDate = new Date(date).getTime()
   setOpen(!open)
   addUserGoal(handle,'loose-weight', now, 0, targetDate, weight)
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
   <NumberInput size='xs' maxW={16} defaultValue={45} min={40} onChange={(valueAsString, valueAsNumber)=>setWeight(valueAsNumber)} margin={'auto'}>
      <NumberInputField />
      <NumberInputStepper>
         <NumberIncrementStepper />
         <NumberDecrementStepper />
      </NumberInputStepper>
   </NumberInput>
         
   <IconButton icon={<CgAdd/>} size={'md'} margin={'5'}  onClick = {()=>HandleSubmitGoal(open,setOpen,weight,date)}/>   
</>
)
}

export default LooseWeight