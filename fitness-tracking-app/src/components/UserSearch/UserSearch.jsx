import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../common/context';
import {
  Input,
  Button,
  UnorderedList,
  ListItem,
  Box,
  Avatar,
  HStack,
  Text,
  Flex,
  Center,
  Stack,
  Divider,
} from '@chakra-ui/react';
import FriendRequests from '../FriendRequests/FriendRequests';
import { getAllCreatedUsers } from '../../services/user.service';
import { query } from 'firebase/database';
import { saveFriendRequestToDatabase } from '../../services/friends.service';
import FriendsView from '../Friends/Friends';
import { getUserAllFriends } from '../../services/friends.service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SentRequests from '../SentRequests/SentRequests';
import { getDatabase, ref, onValue, off } from "firebase/database"; 
import { db } from '../../config/firebase-config'; 
import DividerHeader from '../Goals/Divider';
import CustomDivider from '../CustumeDivider/CustumeDivider';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
	const { user, handle, email, photo } = useContext(AuthContext)	
	const [loading, setLoading] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  

  const [onlyReceiver, setOnlyReceiver] = useState([]); 
  const [requests, setRequests] = useState([]); 
  const friendRequestsRef = ref(db, "friend-requests");




  useEffect(() => {                       
    const callback = (snapshot) => {
      const allRequests = snapshot.val();
      const userRequests = [];
      const receiverArr = [];

      Object.keys(allRequests).forEach((receiver) => {
        Object.keys(allRequests[receiver]).forEach((requestKey) => {
          const request = allRequests[receiver][requestKey];

          if (request.sender === user.displayName) {
            userRequests.push({
              receiver: receiver,
              date: request.createdOn,
              friendRequestKey: request.friendRequestKey
            });
            receiverArr.push(receiver);
          }
        });
      });
      setRequests(userRequests);
      setOnlyReceiver(receiverArr);
    };

    onValue(friendRequestsRef, callback, (error) => {
      console.error(error);
    });
    return () => {
      off(friendRequestsRef, callback);
    };
  }, []); 

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const fetchedUsers = await getAllCreatedUsers();
        setAllUsers(fetchedUsers);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
 
  const filterUsers = (query, users) => {
	const lowerCaseQuery = query.toLowerCase();
	const usersArray = Object.values(users);
	const filteredUsers = usersArray.filter((user) => {
	return (
		user.handle.toLowerCase().includes(lowerCaseQuery) ||
		user.firstName.toLowerCase().includes(lowerCaseQuery) ||
		user.lastName.toLowerCase().includes(lowerCaseQuery)
	);
	});
	return filteredUsers;
  };

  const handleSearch = async (event) => {
	setSearchQuery(event.target.value)
  };

  useEffect(() => {
    const filtered = filterUsers(searchQuery, allUsers);
    setFilteredUsers(filtered);
  }, [searchQuery, allUsers]);


  const handleSendFriendRequest = async (receiver) => {
    try {
      await saveFriendRequestToDatabase(receiver, handle, photo, email)
      toast.success('Sended friend request', {
        autoClose:500
       });
    } catch (error) {
      console.log(error);
    }
  };

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

   <Flex direction="column" alignItems="center" w="100%">
     <CustomDivider heading={"friend requests"} />
      <FriendRequests/>
      <CustomDivider heading={"sent requests"} />
      <Box maxW="65%" minW="65%" pt="1%" pb="2%">
      <SentRequests 
      requests={requests}
      />
      </Box>
      <CustomDivider heading={"my friends"} />
      <FriendsView/>
      <CustomDivider heading={"User search"} />
      <Box pt="2%" pb="5%" minW="65%">
      <Input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search users"
        maxW="100%"
        borderRadius={3}
        borderColor="blackAlpha.500"
        _hover={{ borderColor: "black", borderWidth: 2 }}
        _focus={{
          borderColor: "black",
          boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
        }}
      />
  
  <Stack spacing={3}>
  {searchQuery && filteredUsers.map((user) => (
    <Box key={user.uid}>
      <HStack spacing={5}>
        <Avatar src={user.photoURL}/>
        <Text fontStyle="normal">{`${user.handle}, ${user.firstName} ${user.lastName}`}</Text>
        {!onlyReceiver.includes(user.handle) && 
          user.handle !== handle &&
          !friends.some((friend) => friend.user === user.handle) && (
            <Box>
              <Button onClick={() => handleSendFriendRequest(user.handle)}>
                Send Request
              </Button>
            </Box>
          )
        }
      </HStack>
    </Box>
  ))}
</Stack>
      </Box>

      </Flex>
  );
};

export default UserSearch;