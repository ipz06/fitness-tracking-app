import { useEffect, useState, useContext } from 'react';
import { Box, Text, Grid, GridItem, Avatar, VStack, Spinner } from '@chakra-ui/react';
import { getUserAllFriends } from '../../services/friends.service';
import { AuthContext } from '../../common/context';
import Friend from '../Friend/Friend';

const FriendsView = () => {
  const [loading, setLoading] = useState(false);
  const [friends, setFriends] = useState([]);
	const { user } = useContext(AuthContext);


  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const friendsData = await getUserAllFriends(user.displayName);
        setFriends(friendsData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, [user.displayName]);

  return (
    <Box p={4}>
      <Text fontSize="xl" fontWeight="bold" mb={4}>
        Friends
      </Text>
      {loading ? (
        <Spinner size="lg" color="teal" />
      ) : (
        <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={4}>
          
          {friends.map((friend, index) => (
            <Box key={index}>
          <Friend handle={friend.user}/>
          </Box>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FriendsView;