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


const Goal = ({title,description,startDate,handleClick}) => {
return (
   <Card h={{base:'fit-content',md:'140',lg:'140'}} 
         direction={{ base: 'column', sm: 'row' }}
         w={{base:'xsm',md:'3xl',lg:'4xl'}}
         marginTop={'2px'}
         marginBottom={'5px'}
         marginX={'auto'}
         p={'3'}
      >
      <Stack margin='auto' w={200} align={'center'} marginEnd={{base:'auto',sm:'14'}}>
         <Text fontSize={'lg'}
               fontStyle={'normal'}
               fontWeight={'bold'}
               >
            {title}
         </Text>
         <Text
            fontStyle={'normal'}
            fontSize={'sm'}
            fontWeight={'light'}>
            {description}
         </Text>
         <Text
            fontStyle={'normal'}
            fontSize={'xs'}
            fontWeight={'light'}
            marginBottom={3}>
            Starts on {startDate}
         </Text>
      </Stack>
      <Spacer/>
      <Box
         marginY={'auto'}
         marginEnd={{base:'unset',sm:'5'}}
         >
         <Button size={'sm'} p={'3'} onClick={handleClick}>
            Set Goal
         </Button>
      </Box>
   </Card>
)
}

export default Goal;