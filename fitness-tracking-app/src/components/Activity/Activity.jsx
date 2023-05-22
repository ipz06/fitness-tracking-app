import { Box, Flex, Text, VStack, Button, Image, HStack } from "@chakra-ui/react";
import { FaBicycle, FaRunning, FaWalking, FaCheck, FaCalendarAlt} from "react-icons/fa";
import { CgGym } from "react-icons/cg";
import { GiBurningEmbers, GiDuration } from "react-icons/gi";
import RunningImage from "./../../assets/running.png";
import BikingImage from "./../../assets/biking.png";
import WalkingImage from "./../../assets/walking.png";
import GymImage from "./../../assets/gym.webp";
import YogaImage from "./../../assets/yoga.png";
import ExerciseImage from "./../../assets/exercises.png";

function Activity ({type, duration, caloriesBurned, addedOn }) {
  let image;
	let iconSize = "70px";
if (type === 'Running') {
  image = RunningImage;
} else if (type === 'Biking') {
  image = BikingImage;
} else if (type === 'Walking') {
  image = WalkingImage;
} else if (type === 'Gym') {
  image = GymImage;
} else if (type === 'Yoga') {
  image = YogaImage;
} else if (type === 'Exercise') {
  image = ExerciseImage;
}
 

  return (
    <Box p={4} shadow="md" borderWidth="1px" borderRadius="md" minW="250px" maxW="250px">
      <VStack align="center">
      <Flex align="center">
        <Box fontSize="2xl" mr={2} className="container">
        <Image src={image} boxSize={iconSize} className="image" />
        </Box>
        <Text fontWeight="bold" fontSize="lg">
          {type}
        </Text>
        <Box paddingLeft="25px">
        <Button 
         backgroundColor="blackAlpha.300"
         variant="outline"
         borderColor="black">
        <FaCheck/>
        </Button>
        </Box>
      </Flex>
      </VStack>
      <VStack mt={4} spacing={2} align="center" >
        <HStack spacing={2}>
          <GiDuration size={24}/>
        <Text>
          Duration: <strong>{`${duration} min`}</strong>
        </Text>
        </HStack>
        <HStack spacing={2}>
        <GiBurningEmbers size={24} />
    <Text>
      Calories: <strong>{`${caloriesBurned} Kcal`}</strong>
    </Text>
  </HStack>
  <HStack spacing={2}>
          <FaCalendarAlt size={24}/>
        <Text>
          Add On: <strong>{addedOn}</strong>
        </Text>
        </HStack>
      </VStack>
    </Box>
  );
}

export default Activity;