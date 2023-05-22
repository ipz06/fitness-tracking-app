import {
   HStack, 
   Box, 
   Avatar,
   Flex, 
   Image,
   Spacer,
   Card,
   CardBody,
   Stack,
   CardFooter,
   Button,
   Text,
   Heading
} from '@chakra-ui/react';
import PieChartWithNeedle from "./PieChartWithNeedle";

const CurrentGoal = ({title,description,endDate,value}) => {
   return (
      <Card h={'100px'} 
           direction={{ base: 'column', sm: 'row' }}
            margin={'auto'}
            w={'4xl'}
            marginTop={'20px'}>
         <Stack
               marginLeft={'30px'}
               textAlign={'left'}>
            <Text fontSize={'lg'}
                  fontWeight={'bold'}>
               {title}
            </Text>
            <Text
               fontSize={'sm'}
               fontWeight={'light'}>
               {description}
            </Text>
            <Text
               fontSize={'xs'}
               fontWeight={'light'}>
               Ends on {endDate}
            </Text>
         </Stack>
         <Spacer/>
         <Box
         margin={'auto'}
         marginRight={'50px'}>
            <PieChartWithNeedle value={value}/>
         </Box>
      </Card>
   )
}

export default CurrentGoal;