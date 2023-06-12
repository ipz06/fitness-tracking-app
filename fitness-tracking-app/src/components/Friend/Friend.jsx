import { Box, Button, Text, VStack, Avatar, HStack, Flex } from "@chakra-ui/react";
import { getUserByHandle } from "../../services/user.service";
import { useEffect, useState } from "react";
import { deleteFriendsFromDatabase } from "../../services/friends.service";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

const Friend = ({owner, handle}) => {
const [user, setUser] = useState([]);

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
}, [handle])


const handleDeleteFriends = async () => {
  try {
  await deleteFriendsFromDatabase(owner, handle)
} catch (error) {
  console.log(error);
}
};


	return (
    <Flex
    p={4}
    borderWidth="1px"
    borderRadius="sm"
    boxShadow="md"
    minW="100%"
    maxW="85%"
    position="relative"
  >
    <Link to={`/user/${handle}`}>
      <Avatar size="md" src={user.photoURL} alt="" mr={4} />
    </Link>
    <VStack align="start">
    <Link to={`/user/${handle}`}><Text fontWeight="bold" fontStyle="normal" fontSize={{ base: "sm", sm: "sm", md: "md" }}>{user.handle}</Text> </Link>
      <HStack>
        <Text fontStyle="normal" fontSize={{ base: "sm", sm: "sm", md: "md" }}>{user.firstName}</Text>
        <Text fontStyle="normal" fontSize={{ base: "sm", sm: "sm", md: "md" }}>{user.lastName}</Text>
      </HStack>
      <Text fontStyle="normal" fontSize={{ base: "sm", sm: "sm", md: "md" }}>{user.email}</Text>
    </VStack>
    <Box position="absolute" top={2} right={2}>
      <Button  fontSize={{ base: "xs", sm: "sm", md: "md" }}  color="black" backgroundColor="red.500" borderRadius="sm" size="sm"  _hover={{ bg: "red.300" }}  onClick={handleDeleteFriends}>Unfriend</Button>
    </Box>
  </Flex>
            
	)
}

export default Friend;


Friend.propTypes = {
  owner: PropTypes.string.isRequired,
  handle: PropTypes.string.isRequired,

};