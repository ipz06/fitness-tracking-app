import { Box, Flex, Button, Text, VStack, Badge, Stack, Icon, HStack,  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter, 
  Select,
} from "@chakra-ui/react";
import { useState } from "react";
import { GiRunningShoe, GiBurningEmbers} from "react-icons/gi";
import Activity from "../../components/Activity/Activity";
import { IoIosAddCircle } from "react-icons/io";
import { IoScaleSharp } from "react-icons/io5"
import "./DashBoard.css";
import AddActivity from "../../components/AddActivity/AddActivity";

const Dashboard = () => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [startWeight, setStartWeight] = useState(70); // chete ot useState(user.weight)
  const [currentWeight, setCurrentWeight] = useState(65) // chete ot add weight 
  const bikingActivities = [                                                   // chete data ot db/activities/handle
    { id: 1, type: "Biking", duration: 30, caloriesBurned: 300, addedOn: "1.01.22" },
    { id: 2, type: "Running", duration: 45, caloriesBurned: 400, addedOn: "1.01.22" },
    { id: 3, type: "Walking", duration: 60, caloriesBurned: 500, addedOn: "1.01.22" },
	{ id: 4, type: "Gym", duration: 120, caloriesBurned: 1500, addedOn: "1.01.22" },
	{ id: 5, type: "Gym", duration: 30, caloriesBurned: 300, addedOn: "1.01.22" },
	{ id: 6, type: "Yoga", duration: 30, caloriesBurned: 200, addedOn: "1.01.22" },
  { id: 7, type: "Exercise", duration: 50, caloriesBurned: 200, addedOn: "1.01.22" },
  { id: 8, type: "Yoga", duration: 50, caloriesBurned: 500, addedOn: "1.01.22" },
  ];
let burnedCalories = 0;
bikingActivities.map(act => {
	return burnedCalories += act.caloriesBurned 
})
  
  const weightChange = startWeight - currentWeight; 

  const handleOpenModal = () => {
    setIsAddingActivity(true);
  };

  const handleCloseModal = () => {
    setIsAddingActivity(false);
  };


  return (
    <Box p={4}>
      <br></br> 
      <Flex justify="center" align="center" direction="column" mb={4}>
        <Flex align="center">
          <GiRunningShoe size={24} />
          <Stack direction="row" align="center" spacing={2} ml={2}>
            <Text fontWeight="bold" fontSize="2xl">
              Total Activities:
            </Text>
            <Badge colorScheme="teal" fontSize="2xl"
    variant="outline"
    borderColor="black"
    color="blue">
              {bikingActivities.length}
            </Badge>
            <Text fontWeight="bold" fontSize="2xl">&</Text>
            <GiBurningEmbers size={24}/>
            <Text fontWeight="bold" fontSize="2xl">
              Burned Calories:
            </Text>
            <Badge colorScheme="teal" fontSize="2xl"   variant="outline"
    borderColor="black"
    color="blue">
              {burnedCalories}
            </Badge>
          </Stack>
        </Flex>
      </Flex>
      <br></br> <br></br>
      <Flex justify="center" align="center">
      <HStack
      justify="flex-start"
      mt={4}
      overflowX="scroll"
      pb={4}
      maxW="100%"
      px={4}
      maxWidth={1000}
    >
        {bikingActivities.map((activity) => (
        <Box key={activity.id}>
		<Activity 
		duration={activity.duration}
		caloriesBurned={activity.caloriesBurned}
		type={activity.type}
    addedOn={activity.addedOn}
		/>
	</Box>
        ))}
      </HStack>
      </Flex>
      <br></br> <br></br>
	<Flex justify="center" mt={4}>
        <Button
          size="lg"
          color="black"
		maxW="1000px"
		minW="1000px"
          onClick={handleOpenModal}
		leftIcon={<Icon as={IoIosAddCircle} boxSize={6} />}
    backgroundColor="blackAlpha.300"
    variant="outline"
    borderColor="black"
        > 
          ADD ACTIVITY
        </Button>
      </Flex>
      <br></br> <br></br>
	<Stack direction="row" justify="center" mt={4} spacing={8}>
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize="2xl">
            Start Weight
          </Text>
          <Text fontWeight="bold" fontSize="3xl" color="teal.500" >
            {startWeight} kg
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize="2xl">
            Current Weight
          </Text>
          <Text fontWeight="bold" fontSize="3xl" color="teal.500">
            {currentWeight} kg
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize="2xl">
            Weight Change
          </Text>
          <Text fontWeight="bold" fontSize="3xl" color="teal.500">
            {weightChange} kg
          </Text>
        </Box>
      </Stack>
      <br></br> <br></br>
	<Flex justify="center" mt={4}>
        <Button
          size="lg"
          color="black"
		maxW="1000px"
		minW="1000px"
          onClick={() => console.log("Add Weight")}
		leftIcon={<Icon as={IoScaleSharp} boxSize={6} />}
    backgroundColor="blackAlpha.300"
    variant="outline"
    borderColor="black"
        > 
          ADD WEIGHT
        </Button>
      </Flex>
      <Modal isOpen={isAddingActivity} onClose={handleCloseModal} size="4xl">
        <ModalOverlay />
        <ModalContent  bottom="70px">
          <ModalBody>
            <AddActivity onClose={handleCloseModal} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
	
  );
};

export default Dashboard;