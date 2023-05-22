import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    NumberInput,
    NumberInputField,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputStepper,
    Select,
    Avatar,
    HStack,
    Grid,
    VStack,
    Text
} from '@chakra-ui/react'

const Profile = () => {

    return (
    <Flex 
    alignItems="center" 
    minHeight="100vh" 
    flexDirection="column"
    marginLeft='400px'
    marginRight='400px'>
      <Box fontWeight='bold' paddingBottom={10}>
        Profile Information
      </Box>
      {/* <Flex
      display="grid" 
      gridGap={5} 
      gridAutoFlow="column"
      alignItems={'center'}
      paddingBottom={10}
      >
        <Avatar boxSize="100px"/>

      </Flex> */}
       <Grid templateColumns="repeat(2, 1fr)" paddingBottom={10}>
            <HStack alignItems='start' >
              <Box >
                <Avatar boxSize="120px"/>
              </Box>
              <VStack alignItems='start' paddingLeft={50}>
                <Text fontWeight='bold'><h2>Member since</h2></Text> 
                <Box ><h2>Friends</h2></Box>  
                <Box ><h2>All Time Distance</h2></Box>  
              </VStack>
            </HStack>
          </Grid>
      <FormControl 
      isRequired 
      paddingBottom={10}>
        <FormLabel fontWeight='bold' > First Name</FormLabel>
        <Input placeholder='Enter First Name' 
        border='1px' 
        borderColor='gray.500'
        borderRadius='4px'
        w={550}
        h={55}
        _hover={{
            borderColor: 'gray.900', 
            border:'2px'}}
        _focus={{
            borderColor: 'gray.900', 
            boxShadow: '2xl', 
            border: '2px'}}
        />
      </FormControl>
      <FormControl 
      isRequired 
      paddingBottom={10}>
        <FormLabel fontWeight='bold' >Last Name</FormLabel>
        <Input placeholder='Enter Last Name' 
        border='1px' 
        borderColor='gray.500'
        borderRadius='4px'
        w={550}
        h={55}
        _hover={{
            borderColor: 'gray.900', 
            border:'2px'}}
        _focus={{
            borderColor: 'gray.900', 
            boxShadow: '2xl', 
            border: '2px'}}
        />
      </FormControl>
      <FormControl 
      isRequired
      paddingBottom={10} 
        >
        <FormLabel fontWeight='bold' >Birth Date</FormLabel>
        <Input placeholder="Select Date and Time"
        type="date" 
        border='1px' 
        borderColor='gray.500'
        borderRadius='4px'
        w={550}
        h={55}
        _hover={{
            borderColor: 'gray.900', 
            border:'2px'}}
        _focus={{
            borderColor: 'gray.900', 
            boxShadow: '2xl', 
            border: '2px'}}
        />
      </FormControl>
      <Grid templateColumns="repeat(2, 1fr)" paddingBottom={10}>
        <HStack alignItems={'start'}>
        <FormControl 
        w={250}
        >
        <FormLabel fontWeight={'bold'}>Weight (kg)</FormLabel>
        <NumberInput 
        max={500.0} 
        min={10.0} 
        step={0.1}
        h={55}
        border='1px' 
        borderColor='gray.500'
        borderRadius='4px'
        _hover={{
            borderColor: 'gray.900', 
            border:'2px'}}
        _focus={{
            borderColor: 'gray.900', 
            boxShadow: '2xl', 
            border: '2px'}}
        
        >
            <NumberInputField
            h={55}
            border='0px' 
            borderColor='gray.500'
            borderRadius='4px'
            _hover={{borderColor: 'gray.900'}}
            _focus={{
                borderColor: 'gray.900', 
                boxShadow: '2xl', 
                border: '2px'}}
            />
            <NumberInputStepper border={'none'}>
            <NumberIncrementStepper 
            // color={'gray.900'} 
            // border={'none'} 
            // bgColor={'gray.200'} 
            // _hover={{bgColor: 'gray.400'}}
            // _active={{
            //     bgColor: 'gray.700',
            //     color: 'white'
            // }}
            />
            <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        </FormControl>
        <FormControl
        w={250}
        >
        <FormLabel fontWeight={'bold'}>Height (m)</FormLabel>
        <NumberInput 
        max={4.00} 
        min={1.00} 
        step={0.01}
        h={55}
        border='1px' 
        borderColor='gray.500'
        borderRadius='4px'
        _hover={{
            borderColor: 'gray.900', 
            border:'2px'}}
        _focus={{
            borderColor: 'gray.900', 
            boxShadow: '2xl', 
            border: '1px'
        }}>
            <NumberInputField 
             h={55}
             border='0px' 
             borderColor='gray.500'
             borderRadius='4px'
             _hover={{ borderColor: 'gray.900' }}
             _focus={{
                borderColor: 'gray.900', 
                boxShadow: '2xl', 
                border: '2px'}}/>
            <NumberInputStepper border={'none'}>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        </FormControl>
      </HStack>
      </Grid>
      <FormControl isRequired paddingBottom={10}>
        <FormLabel fontWeight={'bold'}>Gender</FormLabel>
            <Select 
            placeholder='Select gender'
            border='1px' 
            borderColor='gray.500'
            borderRadius='4px'
            w={550}
            h={55}
            _hover={{
                borderColor: 'gray.900', 
                border:'2px'}}
            _focus={{
                borderColor: 'gray.900', 
                boxShadow: '2xl', 
                border: '2px'}}
            >
            <option>Female</option>
            <option>Male</option>
            </Select>
        </FormControl>
      <FormControl isRequired paddingBottom={10}>
        <FormLabel fontWeight={'bold'}>Country</FormLabel>
            <Select 
            placeholder='Select country'
            border='1px' 
            borderColor='gray.500'
            borderRadius='4px'
            w={550}
            h={55}
            _hover={{
                borderColor: 'gray.900', 
                border:'2px'}}
            _focus={{
                borderColor: 'gray.900', 
                boxShadow: '2xl', 
                border: '2px'}}
            >
            <option>Bulgaria</option>
            <option>Greece</option>
            <option>Turkey</option>
            <option>Rumania</option>
            <option>Macedonia</option>
            <option>Serbia</option>
            <option>Germany</option>
            <option>Italy</option>
            <option>France</option>
            <option>Spain</option>
            <option>Portugal</option>
            <option>Denmark</option>
            <option>Malta</option>
            <option>Belgium</option>
            <option>Switzerland</option>
            <option>Netherlands</option>
            <option>Luxembourg</option>
            <option>Austria</option>
            <option>Slovakia</option>
            <option>Hungary</option>
            <option>Croatia</option>
            <option>Slovenia</option>
            </Select>
        </FormControl>
    </Flex>
    )
}

export default Profile;