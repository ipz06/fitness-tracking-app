import { useEffect, useState, useContext } from 'react';
import { Box, Text, Grid, GridItem, Avatar, VStack, Spinner, SimpleGrid } from '@chakra-ui/react';
import { getUserAllFriends } from '../../services/friends.service';
import { AuthContext } from '../../common/context';
import Friend from '../Friend/Friend';
import { db } from '../../config/firebase-config';
import { ref,  onValue, off } from "firebase/database";

const FriendsView = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
	const { user } = useContext(AuthContext);


  useEffect(() => {
    const friendsRef = ref(db, `friends/${user.displayName}`);
    const onValueChange = onValue(
      friendsRef,
      (snapshot) => {
        const friendsData = snapshot.val();
        if (friendsData) {
          setFriends(Object.values(friendsData));
        } else {
          setFriends([]);
        }
      },
      (error) => {
        console.error("Error: " + error.code);
      }
    );

    return () => {
      off(friendsRef, onValueChange);
    };
  }, [user.displayName]);

  return (
    <Box p={4} pt="2%" minW="75%" shadow="xl">
      <Text fontSize="xl" fontWeight="bold" mb={4} fontStyle="normal">
        Friends
      </Text>
      {loading ? (
        <Spinner size="lg" color="teal" />
      ) : (
        <SimpleGrid columns={[1, 2, 3]}  gap={4}>
          
          {friends.map((friend, index) => (
            <Box key={index}>
          <Friend
          owner={user.displayName}
           handle={friend.user}/>
          </Box>
          ))}
        </SimpleGrid>
      )}
    </Box>
  );
};

export default FriendsView;