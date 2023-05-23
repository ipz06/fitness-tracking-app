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
    Text,
    GridItem,
    Heading,
    Button
} from '@chakra-ui/react';
import { useState, useContext } from 'react';
import avatar from '../../assets/avatar_ex.png'
import { logoutUser } from '../../services/auth.services';
import { AuthContext } from '../../common/context';
import { useNavigate } from 'react-router-dom';
const Profile = () => {

    const [image, setImage] = useState('');
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    
        const handleLogOut = () => {
        logoutUser()
          .then(() => {
            setUser({
              user: null,
              userData: null,
            });
          })
          .finally(() => navigate("/"));
      };

    return (
    <Flex 
    alignItems="center" 
    minHeight="100vh" 
    flexDirection="column"
    marginLeft='400px'
    marginRight='400px'>
      <Heading size={'md'} fontWeight='bold' paddingBottom={20} paddingTop={10}>
        Profile Information
      </Heading>
       <Grid templateColumns="repeat(2, 1fr)" templateRows={'repeat(2, 1fr)'} gap={4} >
            {/* <HStack alignItems='start' > */}
            <GridItem rowSpan={2} colSpan={1}> 
                <Avatar 
                boxSize="150px" 
                marginLeft={-100}
                src={avatar}
                />
                <Input
              type="file"
              height="100%"
              width="100%"
              position="absolute"
              top="0"
              left="0"
              opacity="0"
              aria-hidden="true"
              accept="image/*"
              onChange={(event) =>{
                const file = event.target.files[0];
                if (file) {
                    setImage(file)
                } else {
                    setImage(null)
                }

              } 
            }
            //   onDragEnter={startAnimation}
            //   onDragLeave={stopAnimation}
            />
            </GridItem>
            <VStack alignItems={'start'} paddingLeft={-10}>
            <Text fontWeight={'bold'}>Member since</Text> 
            <Text fontWeight={'bold'}>Friends</Text>  
            <Text fontWeight={'bold'}>All Time Duration</Text>  
            </VStack>
            {/* </HStack> */}
          </Grid>
      <FormControl 
      isRequired 
      paddingBottom={10}>
        <FormLabel fontWeight={'bold'} > First Name</FormLabel>
        <Input 
        placeholder='Enter First Name' 
        border={'1px'} 
        borderColor={'gray.500'}
        borderRadius={'4px'}
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
        <FormLabel fontWeight={'bold'} >Last Name</FormLabel>
        <Input placeholder='Enter Last Name' 
        border={'1px'} 
        borderColor={'gray.500'}
        borderRadius={'4px'}
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
        <FormLabel fontWeight={'bold'} >Birth Date</FormLabel>
        <Input placeholder='Select Date and Time'
        type={'date'} 
        border={'1px'} 
        borderColor={'gray.500'}
        borderRadius={'4px'}
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
      <Grid templateColumns='repeat(2, 1fr)' paddingBottom={10}>
        <HStack alignItems={'start'}>
        <FormControl 
        w={270}
        marginLeft={10}
        >
        <FormLabel fontWeight={'bold'}>Weight (kg)</FormLabel>
        <NumberInput 
        max={500.0} 
        min={10.0} 
        step={0.1}
        h={55}
        border={'1px'} 
        borderColor={'gray.500'}
        borderRadius={'4px'}
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
            border={'0px'} 
            borderColor={'gray.500'}
            borderRadius={'4px'}
            _hover={{borderColor: 'gray.900'}}
            _focus={{
                borderColor: 'gray.900', 
                boxShadow: '2xl', 
                border: '2px'}}
            />
            <NumberInputStepper border={'none'}>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
        </FormControl>
        <FormControl
        w={270}
        >
        <FormLabel fontWeight={'bold'}>Height (m)</FormLabel>
        <NumberInput 
        max={4.00} 
        min={1.00} 
        step={0.01}
        h={55}
        border={'1px'} 
        borderColor={'gray.500'}
        borderRadius={'4px'}
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
             border={'0px'} 
             borderColor={'gray.500'}
             borderRadius={'4px'}
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
            border={'1px'} 
            borderColor={'gray.500'}
            borderRadius={'4px'}
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
            <option>Undefined</option>
            </Select>
        </FormControl>
      <FormControl paddingBottom={10}>
        <FormLabel fontWeight={'bold'}>Country</FormLabel>
            <Select 
            placeholder='Select country'
            border={'1px'} 
            borderColor={'gray.500'}
            borderRadius={'4px'}
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
        <HStack paddingBottom={10} marginLeft={-200}>
            <Button 
            size={'md'} 
            w={'200px'}
            border={'1px'} 
            borderColor={'gray.500'}
            borderRadius={'4px'}
            color={'white'}
            bgColor={'black'}
            _hover={{
                borderColor: 'gray.900', 
                border:'2px'}}
            _focus={{
                borderColor: 'gray.900', 
                boxShadow: '2xl', 
                border: '2px'}} 
            >
                Save
            </Button>
            <Button 
            size={'md'} 
            w={'100px'}
            border={'1px'} 
            borderColor={'gray.500'}
            borderRadius={'4px'}
            color={'white'}
            bgColor={'black'}
            _hover={{
                borderColor: 'gray.900', 
                border:'2px'}}
            _focus={{
                borderColor: 'gray.900', 
                boxShadow: '2xl', 
                border: '2px'}}
            onClick={handleLogOut}
            >
                Log out
            </Button>
        </HStack>
        
    </Flex>
    )
}

export default Profile;