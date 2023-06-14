import SingleSentRequest from "../SingleSentRequest/SingleSentRequest";
import { useContext } from "react";
import { AuthContext } from "../../common/context";
import { Box, SimpleGrid, Text, Center } from "@chakra-ui/react";
import PropTypes from "prop-types";

const SentRequests = ({ requests }) => {
  const { user } = useContext(AuthContext);
  return (
    <Box pt="2%" boxShadow="md">
      <Center>
        <SimpleGrid columns={{ base: 1, sm: 1, md: 2 }} gap={4}>
          {requests.map((request, index) => (
            <SingleSentRequest
              key={index}
              receiver={request.receiver}
              date={request.date}
              friendRequestKey={request.friendRequestKey}
            />
          ))}
        </SimpleGrid>
        {requests.length === 0 && (
          <Text fontStyle="normal">No sent friend requests</Text>
        )}
      </Center>
    </Box>
  );
};

export default SentRequests;

SentRequests.propTypes = {
  requests: PropTypes.array.isRequired,
};
