import { useState, useContext } from "react";
import {
  Flex,
  Box,
  Stack,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Input,
  Button,
} from "@chakra-ui/react";
import { WALK_MET, RUN_MET, BIKING_MET, GYM_MET, YOGA_MET, EXERCISE_MET } from "../../common/constants";
import { saveActivityToDatabase } from "../../services/activity.service";
import { AuthContext } from "../../common/context";

const AddActivity = ({ onClose, setIsModalOpen }) => {
  const [activity, setActivity] = useState("");
  const [duration, setDuration] = useState("");
  const [calories, setCalories] = useState(0);
  const [caloriesError, setCaloriesError] = useState("");
const { user, weight } = useContext(AuthContext);

  const handleActivityChange = (event) => {
    setActivity(event.target.value);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
  };

  const handleCalculateClick = () => {
    let calculatedCalories = 0;
    if (activity === "Biking") {
      calculatedCalories = BIKING_MET * weight * (duration/60);
    } else if (activity === "Running") {
      calculatedCalories = RUN_MET * weight * (duration/60);
    } else if (activity === "Walking") {
      calculatedCalories = WALK_MET * weight * (duration/60);
    } else if (activity === "Gym") {
      calculatedCalories = GYM_MET * weight * (duration/60);
    }  else if (activity === "Exercise") {
      calculatedCalories = EXERCISE_MET * weight * (duration/60);
    }  else if (activity === "Yoga") {
      calculatedCalories = YOGA_MET * weight * (duration/60);
    }
    setCalories(calculatedCalories);
  };

  const handleAddActivity = async () => {
    let hasError = false;
    if (calories <= 0) {
      setCaloriesError('Please enter valid calories');
      hasError = true;
    } else {
      setCaloriesError('');
    }
    if (hasError) {
      return;
    }

	try {
      await saveActivityToDatabase(
        user.displayName,
        user.uid,
        activity,
        duration,
        calories,
      )
      onClose();
      setIsModalOpen(false);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Flex minHeight="100vh" width="full" align="center" justifyContent="center">
      <Box w={"lg"}>
        <Stack spacing={4}>
          <Heading fontSize={"5xl"} paddingLeft={2}>
            Choose your activity!
          </Heading>
          <Text
            paddingLeft={110}
            fontSize={"sm"}
            color={"blue"}
          >
            Here you can calculete the burned calories
          </Text>

          <FormControl id="activity">
            <FormLabel>Select Activity</FormLabel>
            <Select
              size="lg"
              placeholder="Select an activity"
              borderRadius={3}
              borderColor="blackAlpha.500"
              _hover={{ borderColor: "black", borderWidth: 2 }}
              _focus={{
                borderColor: "black",
                boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
              }}
              value={activity}
              onChange={handleActivityChange}
            >
              <option value="Biking">Biking</option>
              <option value="Running">Running</option>
              <option value="Walking">Walking</option>
              <option value="Gym">Gym</option>
              <option value="Exercise">Exercise</option>
              <option value="Yoga">Yoga</option>
            </Select>
          </FormControl>

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
              value={duration}
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
            <FormControl id="calories" isInvalid={!!caloriesError}>
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
                value={calories}
                onChange={(event) => setCalories(event.target.value)}
              />
              <FormErrorMessage>{caloriesError}</FormErrorMessage>
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
              onClick={handleAddActivity}
            >
              ADD ACTIVITY
            </Button>
          </Box>
       
        </Stack>
      </Box>
    </Flex>
  );
};

export default AddActivity;