import { FormControl,
         FormLabel,
         Select,
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


const StayToned = ({open,setOpen}) => {

const { handle } = useContext(AuthContext)


const [interval, setInterval] = useState('')
const [workouts, setWorkOuts] = useState(1)

const HandleSubmitGoal = (open,setOpen)=>{
   const now = Date.now()
   setOpen(!open)
   addUserGoal(handle,'stay-toned', now, interval, 0, workouts)

}

return (
<>
      <Text fontSize={'md'}
            fontWeight={'light'}
            marginBottom={'2'} >
         Add some workouts to stay healthy
      </Text>
         <FormControl
                     w={'10rem'}
                     marginX={'auto'}>
            <Select
               size={'sm'}
               placeholder='Set interval'
               onChange={(e)=>setInterval(e.target.value)}>
            <option value = '1'> Weekly </option>
            <option value = '2'> Bi weekly </option>
            <option value = '4'> Monthly</option>
            </Select>
         </FormControl>
         <FormLabel textAlign={'center'} fontSize={'sm'} fontWeight={'light'}>Workouts</FormLabel>
         <NumberInput size='xs' maxW={16} defaultValue={2} min={1} onChange={(valueAsString, valueAsNumber)=>setWorkOuts(valueAsNumber)} margin={'auto'}>
            <NumberInputField />
            <NumberInputStepper>
               <NumberIncrementStepper />
               <NumberDecrementStepper />
            </NumberInputStepper>
         </NumberInput>
               
         <IconButton icon={<CgAdd/>} size={'md'} margin={'5'}  onClick = {()=>HandleSubmitGoal(open,setOpen,workouts,interval)}/>   
</>
)
}

export default StayToned