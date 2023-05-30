import { Box, GridItem, Text, VStack, Avatar, HStack } from "@chakra-ui/react";
import { getUserByHandle } from "../../services/user.service";
import { useEffect, useState } from "react";

const Friend = ({handle}) => {
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

console.log(user);


	return (

	
              <Box
                p={4}
                borderWidth="1px"
                borderRadius="sm"
                boxShadow="md"
                display="flex"
                alignItems="center"
				maxW="20%"
              >
                <Avatar size="md" src={user.photoURL} alt=""  mr={4} />
                <VStack align="start">
                  <Text fontWeight="bold">{user.handle}</Text>
			<HStack><Text>{user.firstName}</Text><Text>{user.lastName}</Text></HStack>
                  <Text>{user.email}</Text>
                </VStack>
              </Box>
            
	)
}


export default Friend;