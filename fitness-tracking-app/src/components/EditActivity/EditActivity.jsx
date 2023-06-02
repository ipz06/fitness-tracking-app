import { useState, useContext } from "react";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import { updateActivityInDatabase } from "../../services/activity.service";
import { AuthContext } from "../../common/context";
import { WALK_MET, RUN_MET, BIKING_MET, GYM_MET, YOGA_MET, EXERCISE_MET } from "../../common/constants";
import PropTypes from 'prop-types';

const EditActivity = ({ activityKey, duration, onClose, type, }) => {
  const [updatedDuration, setUpdatedDuration] = useState(duration);
  const [updatedCaloriesBurned, setUpdatedCaloriesBurned] = useState(0);
  const { user, weight } = useContext(AuthContext);
 


  const handleCalculateClick = () => {
    let calculatedCalories = 0;
    if (type === "Biking") {
      calculatedCalories = BIKING_MET * weight * (updatedDuration/60);
    } else if (type === "Running") {
      calculatedCalories = RUN_MET * weight * (updatedDuration/60);
    } else if (type === "Walking") {
      calculatedCalories = WALK_MET * weight * (updatedDuration/60);
    } else if (type === "Gym") {
      calculatedCalories = GYM_MET * weight * (updatedDuration/60);
    }  else if (type === "Exercise") {
      calculatedCalories = EXERCISE_MET * weight * (updatedDuration/60);
    }  else if (type === "Yoga") {
      calculatedCalories = YOGA_MET * weight * (updatedDuration/60);
    }
    setUpdatedCaloriesBurned(calculatedCalories);
  };

  const handleDurationChange = (event) => {
    setUpdatedDuration(event.target.value);
  };

  const handleUpdateActivity = async () => {
    try {
      await updateActivityInDatabase(user.displayName, activityKey,  {
        duration: updatedDuration,
			cal: updatedCaloriesBurned,
      });
      onClose();
    } catch (error) {
      console.log("Error updating activity:", error);
    }
  };

  return (
    <Flex minHeight="70vh" borderRadius="sm" width="full" align="center" justifyContent="center">
      <Box w={"lg"}>
        <Stack spacing={4}>
          <Heading fontSize={"5xl"} paddingLeft={2}>
            Edit Activity
          </Heading>
          <FormControl id="duration">
            <FormLabel>Duration</FormLabel>
            <Input
              size="lg"
              placeholder="Enter duration: min"
              borderRadius={3}
              borderColor="blackAlpha.500"
              _hover={{ borderColor: "black", borderWidth: 2 }}
              _focus={{
                borderColor: "black",
                boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
              }}
              type="number"
              value={updatedDuration}
              onChange={handleDurationChange}
            />
          </FormControl>


          <Box>
            <Button
			variant="outline"
			borderColor="blue"
              bg={"white"}
              color={"blue"}
              _hover={{
                bg: "blue.100",
              }}
              borderRadius={2}
              maxW="150px"
              minW="150px"
              onClick={handleCalculateClick}
            >
              CALCULATE 
            </Button>
          </Box>
            <FormControl id="calories">
              <FormLabel>Calories Burned: Kcal</FormLabel>
              <Input
                size="lg"
                placeholder="Enter calories"
                borderRadius={3}
                borderColor="blackAlpha.500"
                _hover={{ borderColor: "black", borderWidth: 2 }}
                _focus={{
                  borderColor: "black",
                  boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
                }}
                type="number"
                value={updatedCaloriesBurned}
                onChange={(event) => setUpdatedCaloriesBurned(event.target.value)}
              />
            </FormControl>
          <Box>
            <Button
              variant="outline"
              bg={"blue.500"}
              color={"white"}
              _hover={{
                bg: "blue.900",
              }}
              borderRadius={2}
              maxW="150px"
              minW="150px"
              onClick={handleUpdateActivity}
            >
              UPDATE
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default EditActivity;

EditActivity.propTypes = {
  activityKey: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};