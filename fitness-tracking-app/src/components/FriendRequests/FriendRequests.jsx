import { useEffect, useState, useContext } from 'react';
import { Box, Image, Text, VStack, Button, Flex } from '@chakra-ui/react';
import { getUserFriendRequests } from '../../services/friends.service';
import { AuthContext } from '../../common/context';
import { saveFriendToDatabase } from '../../services/friends.service';
import { deleteFriendRequestFromDatabase } from '../../services/friends.service';

const FriendRequests = () => {
  const { user, photo, photoURL, firstName } = useContext(AuthContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const userPhoto = photo;
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const requests = await getUserFriendRequests(user.displayName);
        setFriendRequests(requests);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFriendRequests();
  }, [user]);

console.log(firstName);

  const handleAcceptRequest = async (photo, sender, email, friendRequestKey) => {
	try {
    await saveFriendToDatabase(userPhoto, user.displayName, user.email, photo, sender, email)
	} catch (error) {
		console.log(error);
	}

	try {
		await deleteFriendRequestFromDatabase(user.displayName, friendRequestKey)
	} catch (error) {
		console.log(error);
	}


  };

  const handleDeclineRequest = async (friendRequestKey) => {
    try {
		await deleteFriendRequestFromDatabase(user.displayName, friendRequestKey)
	} catch (error) {
		console.log(error);
	}
  };

  return (
    <Box p={4} maxW="75%" shadow="md">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Friend Requests
      </Text>
      {friendRequests.map((request) => (
        <Box
        maxW="35%"
          key={request.friendRequestKey}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          mb={4}
          p={4}
          borderWidth="2px"
          borderRadius="md"
        >
          <Box display="flex" alignItems="center">
            <Image src={request.photo} alt="Profile" boxSize="22%" borderRadius="full" mr={4} />
            <VStack align="start">
              <Text fontWeight="bold">{request.sender}</Text>
              <Text>{request.email}</Text>
            </VStack>
          </Box>
          <Box display="flex" gap={2} ml="10%">
            <Button borderRadius="sm" color="blackAlpha.900" backgroundColor="teal.200" maxW="30%" onClick={() => handleAcceptRequest(request.photo, request.sender, request.email, request.friendRequestKey)} >
              Accept
            </Button>
            <Button  borderRadius="sm" backgroundColor="red.500" color="blackAlpha.900" maxW="30%" onClick={() => handleDeclineRequest(request.friendRequestKey)} >
              Decline
            </Button>
          </Box>
        </Box>
      ))}
      {friendRequests.length === 0 && (
        <Text>No friend requests</Text>
      )}
    </Box>
  );
};

export default FriendRequests;