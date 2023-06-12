import { useEffect, useState, useContext } from 'react';
import { Box, Text, SimpleGrid } from '@chakra-ui/react';
// import { getUserFriendRequests } from '../../services/friends.service';
import { AuthContext } from '../../common/context';
import { saveFriendToDatabase } from '../../services/friends.service';
import { deleteFriendRequestFromDatabase } from '../../services/friends.service';
import { db } from '../../config/firebase-config';
import { ref,  onValue, off} from "firebase/database";
import SingleFriendRequest from '../SingleFriendRequestCard/SingleFriendReques';

const FriendRequests = () => {
  const { user, photo, setFriendAlerts } = useContext(AuthContext);
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
return (
  <Box p={4} maxW="65%" pt="2%" shadow="xl">
    <SimpleGrid columns={[1, 2, 3]} gap={4}>
      {friendRequests.map((request) => (
          <SingleFriendRequest 
          key={request.friendRequestKey} 
          request={request}
          handleAcceptRequest={handleAcceptRequest}
          handleDeclineRequest={handleDeclineRequest}
        />
      ))}
    </SimpleGrid>
    {friendRequests.length === 0 && (
      <Text fontStyle="normal">No friend requests</Text>
    )}
  </Box>
);
};

export default FriendRequests;