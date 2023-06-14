import { Box, VStack, HStack, Text, Image, Button } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SingleFriendRequest = ({
  request,
  handleAcceptRequest,
  handleDeclineRequest,
}) => {
  return (
    <Box
      key={request.friendRequestKey}
      p={4}
      borderWidth="1px"
      borderRadius="sm"
      boxShadow="md"
    >
      <VStack spacing={4} align="stretch">
        <HStack spacing={4}>
          <Image
            src={request.photo}
            alt="Profile"
            boxSize="22%"
            borderRadius="full"
          />
          <VStack align="start">
            <Text
              fontStyle="normal"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
              fontWeight="bold"
            >
              {request.sender}
            </Text>
            <Text
              fontStyle="normal"
              fontSize={{ base: "xs", sm: "sm", md: "md" }}
            >
              {request.email}
            </Text>
          </VStack>
        </HStack>
        <HStack justifyContent="space-between">
          <Button
            fontSize={{ base: "xs", sm: "sm", md: "sm" }}
            borderRadius="sm"
            color="blackAlpha.900"
            backgroundColor="teal.200"
            size="sm"
            w="45%"
            onClick={() =>
              handleAcceptRequest(
                request.photo,
                request.sender,
                request.email,
                request.friendRequestKey
              )
            }
          >
            Accept
          </Button>
          <Button
            fontSize={{ base: "xs", sm: "sm", md: "sm" }}
            borderRadius="sm"
            backgroundColor="red.500"
            color="blackAlpha.900"
            size="sm"
            w="45%"
            _hover={{ bg: "red.300" }}
            onClick={() => handleDeclineRequest(request.friendRequestKey)}
          >
            Decline
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SingleFriendRequest;

SingleFriendRequest.propTypes = {
  request: PropTypes.object.isRequired,
  handleAcceptRequest: PropTypes.func.isRequired,
  handleDeclineRequest: PropTypes.func.isRequired,
};
