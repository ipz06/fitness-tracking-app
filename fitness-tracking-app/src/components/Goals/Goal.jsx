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
   <Card h={{base:'300',md:'140',lg:'140'}} 
         direction={{ base: 'column', sm: 'row' }}
         w={{base:'sm',md:'3xl',lg:'4xl'}}
         marginTop={'2px'}
         marginBottom={'5px'}
         marginX={'auto'}
      >
      <Stack
            marginLeft={'30px'}
            textAlign={{base:'center',md:'left'}}>
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