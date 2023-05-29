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
  Text
} from '@chakra-ui/react';
import FriendRequests from '../FriendRequests/FriendRequests';
import { getAllCreatedUsers } from '../../services/user.service';
import { query } from 'firebase/database';
import { saveFriendRequestToDatabase } from '../../services/friends.service';
import FriendsView from '../FriendsView/FriendsView';
import { getUserAllFriends } from '../../services/friends.service';

const UserSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
	const { user, handle, email, photo } = useContext(AuthContext)	
	const [loading, setLoading] = useState(false);
	const [filteredUsers, setFilteredUsers] = useState([]);
	const [allUsers, setAllUsers] = useState([]);
  const [friends, setFriends] = useState([]);

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
  useEffect(() => {
  console.log(friends);
  }, [friends]);

  return (
    <Box pl="20%">
      <FriendRequests/>
      <FriendsView/>
      <Input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search users"
		maxW="30%"
      />
      <Button onClick={handleSearch}>Search</Button>
      <UnorderedList>
        {searchQuery && filteredUsers.map((user) => (
          <ListItem key={user.uid}>
       <HStack><Avatar src={user.photoURL}/><Text>{`${user.handle}, ${user.firstName} ${user.lastName}`}</Text></HStack> 
       {!friends.some((friend) => friend.user === user.handle) && (
         <Box>
    <Button onClick={() => handleSendFriendRequest(user.handle)}>
      Send Request
    </Button>
  </Box>
)}
			
          </ListItem>
        ))}
      </UnorderedList>

  
		</Box>
  );
};

export default UserSearch;