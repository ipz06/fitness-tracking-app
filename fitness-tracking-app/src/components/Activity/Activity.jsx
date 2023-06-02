import { Box, Flex, Text, VStack, Button, Image, HStack,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter, } from "@chakra-ui/react";
import { FaTrash, FaCheck, FaCalendarAlt, FaEdit, FaCheckDouble } from "react-icons/fa";
import { GiBurningEmbers, GiDuration } from "react-icons/gi";
import RunningImage from "./../../assets/running.png";
import BikingImage from "./../../assets/biking.png";
import WalkingImage from "./../../assets/walking.png";
import GymImage from "./../../assets/gym.webp";
import YogaImage from "./../../assets/yoga.png";
import ExerciseImage from "./../../assets/exercises.png";
import { deleteActivityFromDatabase } from "../../services/activity.service";
import EditActivity from "../EditActivity/EditActivity";
import { useState } from "react";
import PropTypes from 'prop-types';

function Activity ({activityKey, type, duration, caloriesBurned, addedOn, onAddToLog, author }) {
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
 
const handleDeleteActivity = async () => {
  try {
    await deleteActivityFromDatabase(author, activityKey);
  } catch (error) {
    console.log("Error deleting activity:", error);
  }
};

const [isEditModalOpen, setIsEditModalOpen] = useState(false);

const handleEditActivity = (activityKey, type) => {
  setIsEditModalOpen(true);
};

const handleCloseEditModal = () => {
  setIsEditModalOpen(false);
};

  return (
    <Box p={4} shadow="lg" borderWidth="1px" borderRadius="sm" minW="250px" maxW="250px">
      <VStack align="center">
      <Flex align="center">
        <Box fontSize="2xl" mr={2} className="container">
        <Image src={image} boxSize={iconSize} className="image" />
        </Box>
        <Text fontWeight="bold" fontSize="lg" fontStyle="normal">
          {type}
        </Text>
        <Box paddingLeft="25px">
        <VStack spacing={1}>
        <Button 
         backgroundColor="blackAlpha.300"
         borderRadius="sm"
         variant="outline"
         borderColor="black"
         size="sm"
         onClick={() => onAddToLog(type, duration, caloriesBurned, addedOn)}
         mt={-2} 
         >
        <FaCheckDouble/>
        </Button>
        <Button 
            backgroundColor="red.500"
            color="blackAlpha.900"
            variant="outline"
            borderColor="blackAlpha.900"
            borderRadius="sm"
            onClick={handleDeleteActivity} 
            size="sm"
          >
            <FaTrash/>
          </Button>
          <Button
      backgroundColor="blackAlpha.500"
      color="blackAlpha.900"
      variant="outline"
      borderColor="blackAlpha.900"
      borderRadius="sm"
      onClick={() => handleEditActivity(activityKey)}
      size="sm"
    >
      <FaEdit />
    </Button>
        </VStack>
        </Box>
      </Flex>
      </VStack>
      <VStack mt={4} spacing={2} align="center" >
        <HStack spacing={2}>
          <GiDuration size={24}/>
          <Text  fontStyle="normal" >
          Duration: <strong>{`${duration} min`}</strong>
        </Text>
        </HStack>
        <HStack spacing={2}>
        <GiBurningEmbers size={24} />
        <Text fontStyle="normal">
      Calories: <strong>{`${caloriesBurned.toFixed(2)} Kcal`}</strong>
    </Text>
  </HStack>
  <HStack spacing={2}>
          <FaCalendarAlt size={24}/>
        <Text fontStyle="normal">
          Add On: <strong>{addedOn}</strong>
        </Text>
        </HStack>
      </VStack>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <ModalOverlay/>
        <ModalContent  borderRadius="sm">
          <ModalCloseButton />
          <ModalBody>
            <EditActivity
              activityKey={activityKey}
              type={type}
              duration={duration}
              onClose={handleCloseEditModal}
            />
          </ModalBody>
        </ModalContent>
      </Modal>


    </Box>
  );
}

export default Activity;


Activity.propTypes = {
  activityKey: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  caloriesBurned: PropTypes.number.isRequired,
  addedOn: PropTypes.string.isRequired,
  onAddToLog: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
};
