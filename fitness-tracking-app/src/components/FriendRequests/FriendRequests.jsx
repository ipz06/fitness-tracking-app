import { useEffect, useState, useContext } from 'react';
import { Box, Image, Text, VStack, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { getUserFriendRequests } from '../../services/friends.service';
import { AuthContext } from '../../common/context';
import { saveFriendToDatabase } from '../../services/friends.service';
import { deleteFriendRequestFromDatabase } from '../../services/friends.service';
import { db } from '../../config/firebase-config';
import { ref,  onValue, off, child, update, get, query, remove } from "firebase/database";

const FriendRequests = () => {
  const { user, photo, photoURL, firstName } = useContext(AuthContext);
  const [friendRequests, setFriendRequests] = useState([]);
  const userPhoto = photo;

  useEffect(() => {
    const friendRequestsRef = ref(db, `friend-requests/${user.displayName}`);
    const onValueChange = onValue(
      friendRequestsRef,
      (snapshot) => {
        const requests = snapshot.val();
        if (requests) {
          setFriendRequests(Object.values(requests));
        } else {
          setFriendRequests([]);
        }
      },
      (error) => {
        console.error("Error: " + error.code);
      }
    );

    return () => {
      off(friendRequestsRef, onValueChange);
    };
  }, [user]);



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
//key={request.friendRequestKey}
  return (
    <Box p={4} maxW="65%" pt="2%">
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Friend Requests            
      </Text>
      <SimpleGrid  columns={[1, 2, 3 ]}  gap={4}>
      {friendRequests.map((request) => (
         
              <Box
              key={request.friendRequestKey}
              p={4}
              borderWidth="1px"
              borderRadius="sm"
              boxShadow="md"
              display="flex"
              alignItems="center"
              minW={{ base: "85%", sm: "60%", md: "40%" }} // Responsive minimum width
      maxW="85%"
            >
          <Box display="flex" alignItems="center" flexWrap="wrap">
            <Image src={request.photo} alt="Profile" boxSize="22%" borderRadius="full" mr={4} />
            <VStack align="start">
              <Text fontWeight="bold">{request.sender}</Text>
              <Text fontSize={{ base: "xs", sm: "sm", md: "md" }}>{request.email}</Text>
            </VStack>
          </Box>
          <Box display="flex" gap={2} ml={{ base: "2%", md: "10%" }} flexWrap="wrap">
            <Button fontSize="xs" borderRadius="sm" color="blackAlpha.900" backgroundColor="teal.200" minW="35%" onClick={() => handleAcceptRequest(request.photo, request.sender, request.email, request.friendRequestKey)} >
              Accept
            </Button>
            <Button fontSize="xs" borderRadius="sm" backgroundColor="red.500" color="blackAlpha.900" minW="35%" onClick={() => handleDeclineRequest(request.friendRequestKey)} >
              Decline
            </Button>
          </Box>
        </Box>
       
      ))}
       </SimpleGrid>
      {friendRequests.length === 0 && (
        <Text>No friend requests</Text>
      )}
    </Box>
  );
};

export default FriendRequests;