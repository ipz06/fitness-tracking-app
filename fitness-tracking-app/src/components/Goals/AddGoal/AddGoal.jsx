import {
   Card,
   FormControl,
   Select,
   CardBody,
} from '@chakra-ui/react';
import DividerHeader from '../Divider';
import { useState } from 'react';
import StayToned from './StayToned';
import StayActive from './StayActive';
import LooseWeight from './LooseWeight';
import TrackCalories from './TrackCalories';


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
       } else if (goal=== 'daily-calories') {
         return (
            <TrackCalories open={open} setOpen={setOpen} />
         )
      }
   }
      return (
         <>
         <DividerHeader heading = {'add goals'} />
         
            <Card size={'xsm'} w={{base:'sm',md:'md'}} marginX={'auto'}>
               <CardBody p={'1rem'}>
                  <FormControl  width={'10rem'} marginX={'auto'} marginBottom={'1rem'}>
                        <Select
                           size={'sm'}
                           placeholder='Select Goal'
                           onChange={(e)=>setGoal(e.target.value)}>
                              <option value = 'stay-toned'> Stay Toned </option>
                              <option value = 'stay-active'> Stay Active </option>
                              <option value = 'loose-weight'> Change Weight</option>
                              <option value = 'daily-calories'> Daily Calories</option>
                        </Select>
                  </FormControl>
                  {renderInput(goal,open,setOpen)}
               </CardBody>
            </Card>
         </>
)
}

export default AddGoal