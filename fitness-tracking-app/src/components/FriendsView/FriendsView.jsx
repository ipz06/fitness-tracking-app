import { useEffect, useState, useContext } from 'react';
import { Box, Text, Grid, GridItem, Avatar, VStack, Spinner } from '@chakra-ui/react';
import { getUserAllFriends } from '../../services/friends.service';
import { AuthContext } from '../../common/context';

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
            <GridItem key={index}>
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="md"
                boxShadow="md"
                display="flex"
                alignItems="center"
              >
                <Avatar size="md" src={friend.photo} alt={friend.displayName} mr={4} />
                <VStack align="start">
                  <Text fontWeight="bold">{friend.user}</Text>
                  <Text>{friend.email}</Text>
                </VStack>
              </Box>
            </GridItem>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FriendsView;