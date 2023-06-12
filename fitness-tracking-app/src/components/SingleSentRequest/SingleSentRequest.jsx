import { Text, Flex, HStack, VStack, Button } from "@chakra-ui/react";
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
    <Flex
      p={4}
      borderWidth="1px"
      borderRadius="sm"
      boxShadow="md"
      flexDirection={{ base: "column", sm: "row" }}
      justifyContent="space-between"
      alignItems="center"
    >
		<HStack>
      <VStack alignItems="center">
        <Text fontStyle="normal" fontWeight="bold" fontSize={{ base: "xs", sm: "sm", md: "md" }}>
          Sent to:
        </Text>
        <Text fontStyle="normal" fontSize={{ base: "xs", sm: "sm", md: "md" }}>
          {receiver}
        </Text>
      </VStack>
      <VStack alignItems="center">
        <Text fontStyle="normal" fontWeight="bold" fontSize={{ base: "xs", sm: "sm", md: "md" }}>
          On:
        </Text>
        <Text fontStyle="normal" fontSize={{ base: "xs", sm: "sm", md: "md" }}>
          {date}
        </Text>
      </VStack>
	  </HStack>
      <Button
        size="sm"
        borderRadius="sm"
        borderColor="black"
        backgroundColor="teal.200"
        onClick={removeRequest}
        fontSize={{ base: "xs", sm: "sm", md: "sm" }}
      >
        Remove
      </Button>
    </Flex>
  );

}

export default SingleSentRequest;


SingleSentRequest.propTypes = {
	receiver: PropTypes.string.isRequired,
	date: PropTypes.string.isRequired,
	friendRequestKey: PropTypes.string.isRequired,
  }