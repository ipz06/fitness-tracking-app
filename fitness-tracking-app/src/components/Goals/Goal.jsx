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
         w={{base:'sm',md:'3xl',lg:'4xl'}}
         marginTop={'2px'}
         marginBottom={'5px'}
         marginX={'auto'}
      >
      <Stack
            marginLeft={'30px'}
            textAlign={{base:'center',md:'left'}}
            marginY={'auto'}>
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