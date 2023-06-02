import { Box, Text, Flex, HStack, VStack, Button } from "@chakra-ui/react";
import { SignInMethod } from "firebase/auth";
import PropTypes from 'prop-types';
import { deleteFriendRequestFromDatabase } from "../../services/friends.service";


const SingleSentRequest = ({ receiver, date, friendRequestKey }) => {

const removeRequest = async () => {
try {
	await deleteFriendRequestFromDatabase(receiver, friendRequestKey);
} catch (error) {
	console.log(error);
}
}


return (
<Box shadow="md">
<HStack>
	<VStack>
<Text fontStyle="normal" fontWeight="bold">Sent request to:</Text>
<Text fontStyle="normal">{receiver}</Text>
</VStack>
<VStack>
<Text fontStyle="normal" fontWeight="bold">On:</Text>
<Text fontStyle="normal">{date}</Text>
</VStack>
<Button maxW="20%" size="sm" borderRadius="sm" borderColor="black" backgroundColor="teal.200" onClick={removeRequest}>Remove</Button>
</HStack>


</Box>
)

}

export default SingleSentRequest;


SingleSentRequest.propTypes = {
	receiver: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	friendRequestKey: PropTypes.string.isRequired,
  }