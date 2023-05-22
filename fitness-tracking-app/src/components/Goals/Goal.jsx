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

const Goal = ({title,description,startDate}) => {
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
            Starts on {startDate}
         </Text>
      </Stack>
      <Spacer/>
      <Box
      margin={'auto'}
      marginRight={'50px'}>
         <Button>
            Set Goal
         </Button>
      </Box>
   </Card>
)
}

export default Goal;