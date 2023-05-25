import {
   Box, 
   Spacer,
   Card,
   VStack,
   Button,
   Text,
   FormControl,
   Select,
   SimpleGrid,
   CardHeader, 
   CardBody,
   Heading
} from '@chakra-ui/react';
import DividerHeader from '../Divider';
import { useState } from 'react';
import StayToned from './StayToned';
import StayActive from './StayActive';
import LooseWeight from './LooseWeight';


const AddGoal = ({open, setOpen}) => {

   const [goal,setGoal] = useState(null)

   const renderInput = (goal,open,setOpen) =>{
      if(goal==='stay-toned') {
         return (
            <StayToned open={open} setOpen={setOpen} />
         )
       } else if (goal === 'stay-active') {
         return (
            <StayActive open={open} setOpen={setOpen}/>
         )
       } else if (goal=== 'loose-weight') {
         return (
            <LooseWeight open={open} setOpen={setOpen} />
         )
       }
      }

      return (
         <>
         <DividerHeader heading = {'add goals'} />
         
            <Card size={'xsm'} w={'30rem'} marginX={'auto'}>
               <CardBody p={'1rem'}>
                  <FormControl  width={'8rem'} marginX={'auto'} marginBottom={'1rem'}>
                        <Select
                           size={'sm'}
                           placeholder='Select Goal'
                           onChange={(e)=>setGoal(e.target.value)}>
                        <option value = 'stay-toned'> Stay Toned </option>
                        <option value = 'stay-active'> Stay Active </option>
                        <option value = 'loose-weight'> Loose Weight</option>
                        </Select>
                  </FormControl>
                  {renderInput(goal,open,setOpen)}
               </CardBody>
            </Card>
         </>
         // <Box>
         //    <DividerHeader heading = {'add goals'} />
         //    <Card h={'200px'} 
         //       direction={'column'}
         //          w={'500px'}
         //          margin={'auto'}
         //          minW="300px" >
               
               
                  // <FormControl marginTop={'5'} width={'8rem'} marginX={'auto'}>
                  //       <Select
                  //          size={'sm'}
                  //          placeholder='Select Goal'
                  //          onChange={(e)=>setGoal(e.target.value)}>
                  //       <option value = 'stay-toned'> Stay Toned </option>
                  //       <option value = 'stay-active'> Stay Active </option>
                  //       <option value = 'loose-weight'> Loose Weight</option>
                  //       </Select>
                  // </FormControl>
               
         //          {renderInput(goal)}
         //       <Spacer/>
         //    </Card>
         // </Box>
)
}

export default AddGoal