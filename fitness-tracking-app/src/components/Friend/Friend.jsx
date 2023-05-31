import { Box, Button, GridItem, Text, VStack, Avatar, HStack } from "@chakra-ui/react";
import { getUserByHandle } from "../../services/user.service";
import { useEffect, useState } from "react";
import { deleteFriendsFromDatabase } from "../../services/friends.service";
import { Link } from "react-router-dom";

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
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="sm"
                boxShadow="md"
                display="flex"
                alignItems="center"
                minW="100%"
				maxW="85%"
              >
              <Link to={`/user/${handle}`}><Avatar size="md" src={user.photoURL} alt=""  mr={4}/></Link>  
                <VStack align="start">
                 <HStack><Text fontWeight="bold" fontStyle="normal">{user.handle}</Text> <Button color="black" backgroundColor="red.500" borderRadius="sm" size="sm" onClick={handleDeleteFriends}>Unfriend</Button></HStack> 
			<HStack><Text fontStyle="normal">{user.firstName}</Text><Text fontStyle="normal">{user.lastName}</Text></HStack>
                  <Text fontStyle="normal">{user.email}</Text>
                </VStack>
              </Box>
            
	)
}


export default Friend;