import { getDatabase, ref, onValue, off } from "firebase/database";
import { db } from "../../config/firebase-config";
import SingleSentRequest from "../SingleSentRequest/SingleSentRequest";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../common/context";
import { Box, HStack, SimpleGrid, Text, Center } from "@chakra-ui/react";
import PropTypes, { string } from 'prop-types';

const SentRequests = ({ requests }) => {
  const { user } = useContext(AuthContext);
  console.log(requests);
  return (
    <Box>
    <Text align="center" fontSize="xl" fontStyle="normal" fontWeight="bold" mb={4}>
    Sent Friend Requests            
  </Text>
    <Center>
      <SimpleGrid columns={[1, 2, 3]} spacing={4}>
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
	
  }



// {
// 	"rules": {
// 	  ".read": "now < 1687035600000",  // 2023-6-18
// 	  ".write": "now < 1687035600000",  // 2023-6-18
// 	  "users": {
// 		".indexOn": "uid"
// 	  },
// 		"activities": {
// 		  "$uid": {
// 		  ".indexOn": ["duration"],
// 		  }
// 		},
// 	  "log-activity":{
// 		"$uid":{
// 		  ".indexOn":[".value", "duration"],
// 		}
// 	  },
// 	   "log-nutrition":{
// 		"$uid":{
// 		  ".indexOn": "calories",
// 		}
// 	  }
// 	}
//   }
