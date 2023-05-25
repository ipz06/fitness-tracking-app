import {
   Box, 
   Spacer,
   Card,
   Stack,
   IconButton,
   Text,
} from '@chakra-ui/react';
import PieChartWithNeedle from '../PieChartWithNeedle';
import { useState, useEffect } from 'react';
import {AiOutlineDelete}  from "react-icons/all";
import { deleteUserGoal } from '../../../services/goal.service';

const RenderLooseWeight = ({title,targetWeight,targetDate,value, handle, goalID}) => {

   const [date, setDate] = useState('')
   useEffect(()=>{
      let dateISO = new Date(targetDate)
      setDate(dateISO.toLocaleDateString())
   },[])
     
   const handleClick = () =>{
      deleteUserGoal(handle, goalID)
      console.log(goalID)
   }

   return (
      <Card h={'130px'} 
           direction={{ base: 'column', sm: 'row' }}
           w={'430px'}
           marginTop={'2px'}
           minW="400px" >
         <Stack
               marginLeft={'30px'}
               textAlign={'left'}>
            <Text fontSize={'lg'}
                  fontWeight={'bold'}>
               Loose Weight
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               Be {targetWeight} kg on
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               {date}
            </Text>
         </Stack>
         <Spacer/>
         <Box
         margin={'auto'}
         marginRight={'50px'}>
            <PieChartWithNeedle value={value}/>
         </Box>
         <IconButton icon={<AiOutlineDelete/>} size={'sm'} marginTop={'2'} marginEnd={'2'} onClick={handleClick}/>
      </Card>
   )
}

export default RenderLooseWeight;