import { Box, Text, VStack, Avatar, SimpleGrid, Stat, StatLabel, StatNumber, Flex, HStack } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserByHandle } from '../../services/user.service';

const User = () => {
  const { user: handle } = useParams();
  const [user, setUser] = useState([])
  
  useEffect(() => {
	const fetchUser = async () => {
		const userData = await getUserByHandle(handle)
		if (userData) {
		setUser(userData);
		} else {
			console.error("User data not found");
		}
	}
	fetchUser()
}, [handle, setUser])
console.log(user);
return (
    <Box p={4}>
      <VStack spacing={4} alignItems='center'>
        <Avatar size='2xl' src={user.photoURL} username />
        <Text fontSize='2xl' fontWeight='bold' fontStyle="normal">{`${user.firstName} ${user.lastName}`}</Text>
		<HStack><Text fontSize='2xl' fontStyle="normal">Username:</Text><Text fontStyle="normal" fontSize='2xl' fontWeight='bold'>{user.handle}</Text></HStack>
        <Text fontSize='md' color='gray.500' fontStyle="normal">{user.email}</Text>
        <Text fontSize='lg' fontStyle="normal">{user.country}</Text>
      </VStack>
      <Flex justify="center" align="center" mt={5}>
        <SimpleGrid columns={3} gap={0}>
          <Stat>
            <StatLabel>Height</StatLabel>
            <StatNumber>{user.height}m</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Weight</StatLabel>
            <StatNumber>{user.weight}kg</StatNumber>
          </Stat>
		<Stat>
            <StatLabel>Birth Date</StatLabel>
            <StatNumber>{user.birthDate}</StatNumber>
          </Stat>
        </SimpleGrid>
      </Flex>
    </Box>
);
};

export default User;