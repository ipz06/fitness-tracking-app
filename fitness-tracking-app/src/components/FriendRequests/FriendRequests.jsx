import { useEffect, useState, useContext } from 'react';
import { Box, Image, Text, VStack, Button, Flex, SimpleGrid } from '@chakra-ui/react';
import { getUserFriendRequests } from '../../services/friends.service';
import { AuthContext } from '../../common/context';
import { saveFriendToDatabase } from '../../services/friends.service';
import { deleteFriendRequestFromDatabase } from '../../services/friends.service';
import { db } from '../../config/firebase-config';
import { ref,  onValue, off, child, update, get, query, remove } from "firebase/database";

const FriendRequests = () => {
  const { user, photo, photoURL, firstName, setFriendAlerts } = useContext(AuthContext);
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
          setFriendAlerts(true)
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
    setFriendAlerts(false)
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
    setFriendAlerts(false)
	} catch (error) {
		console.log(error);
	}
  };
//key={request.friendRequestKey}
  return (
    <Box p={4} maxW="65%" pt="2%">
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
              minW={{ base: "85%", sm: "60%", md: "40%" }} 
      maxW="100%"
            >
          <Box display="flex" alignItems="center" flexWrap="wrap"  flexDirection={{ base: "column", sm: "row" }}>
            <Image src={request.photo} alt="Profile" boxSize="22%" borderRadius="full" mr={4} />
            <VStack align="start">
              <Text fontStyle="normal" fontWeight="bold">{request.sender}</Text>
              <Text fontStyle="normal" fontSize={{ base: "xs", sm: "sm", md: "md" }}>{request.email}</Text>
            </VStack>
          </Box>
          <Box display="flex" gap={2} ml={{ base: "2%", md: "10%" }} flexWrap="wrap">
            <Button fontSize={{ base: "xs", sm: "sm", md: "sm" }} borderRadius="sm" color="blackAlpha.900" backgroundColor="teal.200" maxW={{ base: "80%", sm: "40%", md: "100%" }} size="sm"  onClick={() => handleAcceptRequest(request.photo, request.sender, request.email, request.friendRequestKey)} >
              Accept
            </Button>
            <Button fontSize={{ base: "xs", sm: "sm", md: "sm" }} borderRadius="sm" backgroundColor="red.500" color="blackAlpha.900" maxW={{ base: "80%", sm: "40%", md: "100%" }} size="sm"  _hover={{ bg: "red.300" }} onClick={() => handleDeclineRequest(request.friendRequestKey)} >
              Decline
            </Button>
          </Box>
        </Box>
       
      ))}
       </SimpleGrid>
      {friendRequests.length === 0 && (
        <Text fontStyle="normal">No friend requests</Text>
      )}
    </Box>
  );
};

export default FriendRequests;