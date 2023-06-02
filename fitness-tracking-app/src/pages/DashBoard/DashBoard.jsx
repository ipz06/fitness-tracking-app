import { Box, Flex, Button, Text, VStack, Heading, Input, Badge, Stack, Image, Icon, HStack,  Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { GiRunningShoe, GiBurningEmbers} from "react-icons/gi";
import Activity from "../../components/Activity/Activity";
import { IoIosAddCircle } from "react-icons/io";
import { IoScaleSharp } from "react-icons/io5"
import "./DashBoard.css";
import AddActivity from "../../components/AddActivity/AddActivity";
import { getUserActivities } from "../../services/activity.service";
import { AuthContext } from "../../common/context";
import { useContext } from "react";
import { saveLogToDatabase, getUserActivityLogs } from "../../services/log.service";
import { saveWeightToDatabase } from "../../services/log.service";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase-config";
import OneLitreBottle from "./../../assets/1litreBottle.png";
import TwoLitreBottle from "./../../assets/2litreBottle.png"
import ThreeLitreBottle from "./../../assets/3litreBottle.png"
import FourLitreBottle from "./../../assets/4litreBottle.png"
import FiveLitreBottle from "./../../assets/5litreBottle.png"
import { saveWaterToDatabase } from "../../services/log.service";
import CustomToastGoodAmountWater from "../../components/CustumeToast/CustumeToastGoodAmountWater";
import CustomToastBadAmountWater from "../../components/CustumeToast/CustumeToastBadAmountWater";
import CustomToastToMuchWater from "../../components/CustumeToast/CustumeToastToMuchWater";
import CustumeToastActivityFinished from "../../components/CustumeToast/CustumeToastActivityFinished";
import DividerHeader from "../../components/Goals/Divider";

const Dashboard = () => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [startWeight, setStartWeight] = useState(''); // chete ot useState(user.weight)
  const [currentWeight, setCurrentWeight] = useState('') // chete ot add weight 
  const [activities, setActivities] = useState([]);
  const { user, weight } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weightChange, setWeightChange] = useState('');
  const [activityLogs, setActivityLogs] = useState([]);
  const [waterConsumption, setWaterConsumption] = useState('');

  useEffect(() => {
    if (user) {
      const handle = user.displayName;
  
      const userActivitiesRef = ref(db, `activities/${handle}`);
      const userActivityLogsRef = ref(db, `log-activity/${handle}`);
      const onActivitiesChange = (snapshot) => {
        if (snapshot.exists()) {
          const activities = Object.values(snapshot.val());
          setActivities(activities);
        } else {
          setActivities([]);
        }
      };
  
      const onActivityLogsChange = (snapshot) => {
        if (snapshot.exists()) {
          const activityLogs = Object.values(snapshot.val());
          setActivityLogs(activityLogs);
        } else {
          setActivityLogs([]);
        }
      };
  
      const unsubscribeActivities = onValue(userActivitiesRef, onActivitiesChange, {
        onlyOnce: false, 
      });
  
      const unsubscribeActivityLogs = onValue(userActivityLogsRef, onActivityLogsChange, {
        onlyOnce: false, 
      });
  
      return () => {
        unsubscribeActivities();
        unsubscribeActivityLogs();
      };
    }

  }, [user, db, weight]);

  useEffect(() => {
    setStartWeight(weight);
    let result = startWeight - currentWeight;
    if (result > 0) {
      setWeightChange('-' + result);
    } else if (result < 0) {
      setWeightChange('+' + Math.abs(result));
    } else {
      setWeightChange(0);
    }

  }, [weight, startWeight, currentWeight, weightChange])

let burnedCalories = 0;
activityLogs.map(act => {
	return burnedCalories += act.caloriesBurned 
})

  const handleAddWeght = async () => {
    try {
    await saveWeightToDatabase(user.displayName, weightChange, currentWeight, startWeight)
    toast.success('Weight updated successfully to your goals', {
      duration: 500,
    });
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddWater = async (event) => {
    event.preventDefault();
    try {
    await saveWaterToDatabase(user.displayName, waterConsumption)
    if (waterConsumption <= 2) {
      toast(<CustomToastBadAmountWater/>);
    } else if (waterConsumption > 2 && waterConsumption <= 4) {
      toast(<CustomToastGoodAmountWater/>);
    } else {
      toast(<CustomToastToMuchWater/>);
    }
    } catch (error) {
      console.log(error);
    }
  }


  const handleOpenModal = () => {
    setIsAddingActivity(true);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsAddingActivity(false);
    setIsModalOpen(false);
  };

  const handleAddToLog = (type, duration, caloriesBurned, addedOn) => {
    const newLogEntry = {
      type,
      duration,
      caloriesBurned,
      addedOn: new Date().toLocaleDateString(),
      timestamp: Date.now(),
    };
  
    saveLogToDatabase(user.displayName, newLogEntry)
      .then(() => {
        toast(<CustumeToastActivityFinished type={type} duration={duration}/>)
      })
      .catch((error) => {
        console.log("Error saving log data:", error);
      });
  };

  return (
    <Box p={4} pt="2%">
      <Flex justify="center" align="center" direction="column" mb={4}>
        <Flex shadow="lg" align="center">
          <Stack direction="row" align="center" spacing={2} ml={2}>
            <Text fontWeight="bold" fontSize={{ base: "xs", sm: "sm", md: "2xl" }} fontStyle="normal" fontFamily="Montserrat" >
              Total Activities Finished:
            </Text>
            <Badge colorScheme="teal" fontSize={{ base: "xs", sm: "sm", md: "xl" }}
    variant="outline"
    borderColor="black"
    color="blue">
              {activityLogs.length}
            </Badge>
            <Text fontStyle="normal" fontWeight="bold" fontSize="xl">&</Text>
            <Text fontWeight="bold" fontSize={{ base: "xs", sm: "sm", md: "2xl" }} fontFamily="Montserrat" fontStyle="normal">
              Burned Calories:
            </Text>
            <Badge colorScheme="teal" fontSize={{ base: "xs", sm: "sm", md: "xl" }}   variant="outline"
    borderColor="black"
    color="blue">
              {burnedCalories}
            </Badge>
          </Stack>
        </Flex>
      </Flex>
      <Box pt="1%">
  <DividerHeader heading={'Activity'}></DividerHeader>
  </Box> 
      <Box> 
      <Heading align="center" pt="2%" fontSize={{ base: "md", sm: "sm", md: "2xl" }} fontFamily="Montserrat">You have {activities.length} activities to choose from</Heading>
      <Flex justify="center" align="center" >
      <HStack
      justify="flex-start"
      mt={4}
      overflowX="scroll"
      pb={4}
      maxW="100%"
      px={4}
      maxWidth={1000}
    >
        {activities.map((activity, index) => (
        <Box key= {index}>
		<Activity  
    activityKey={activity.activityKey}
		duration={activity.duration}
		caloriesBurned={activity.cal}
		type={activity.type}
    addedOn={activity.createdOn}
    onAddToLog={handleAddToLog}
    author={activity.author}
		/>
	</Box>
        ))}
      </HStack>
      </Flex>
      </Box>
	<Flex justify="center" mt={4} pt="2%">
        <Button
          size="lg"
          color="black"
          maxW="65%"
          minW="65%"
          onClick={handleOpenModal}
		leftIcon={<Icon as={IoIosAddCircle} boxSize={6} />}
    backgroundColor="blackAlpha.300"
    variant="outline"
    borderColor="black"
    borderRadius="sm"
        > 
          SET ACTIVITY
        </Button>
      </Flex>
      <Box pt="2%">
  <DividerHeader heading={'Weight'}></DividerHeader>
  </Box>    
	<Stack direction="row" justify="center" mt={4} spacing={8} pt="2%">
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize={{ base: "md", sm: "sm", md: "2xl" }} fontStyle="normal">
            Start Weight
          </Text>
          <Text fontWeight="bold" fontSize={{ base: "md", sm: "sm", md: "3xl" }} color="teal.500" fontStyle="normal">
            {startWeight} kg
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize={{ base: "md", sm: "sm", md: "2xl" }} fontStyle="normal">
            Current Weight
          </Text>
          <Text fontWeight="bold" fontSize={{ base: "md", sm: "sm", md: "3xl" }} color="teal.500" fontStyle="normal">
            {currentWeight} kg
          </Text>
        </Box>
        <Box textAlign="center">
          <Text fontWeight="bold" fontSize={{ base: "md", sm: "sm", md: "2xl" }} fontStyle="normal">
            Weight Change
          </Text>
      { currentWeight &&  <Text fontWeight="bold" fontSize={{ base: "md", sm: "sm", md: "3xl" }} fontStyle="normal" color={currentWeight <= startWeight ? "green.500" : "red.500"}>
            {weightChange} kg
          </Text> } 
        </Box>
      </Stack>
      <Flex justify="center" mt={4}>
        <Input
          type="number"
          placeholder="    Current Weight"
          value={currentWeight}
          onChange={(e) => setCurrentWeight(e.target.value)}
          maxW="180px"
          borderRadius={3}
          borderColor="blackAlpha.500"
          _hover={{ borderColor: "black", borderWidth: 2 }}
          _focus={{
            borderColor: "black",
            boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
          }}
        />
      </Flex>
   <Box>
	<Flex pt="2%" justify="center" mt={4}>
        <Button
          size="lg"
          color="black"
		maxW="65%"
		minW="65%"
          onClick={handleAddWeght}
		leftIcon={<Icon as={IoScaleSharp} boxSize={6} />}
    backgroundColor="blackAlpha.300"
    variant="outline"
    borderColor="black"
    borderRadius="sm"
        > 
          ADD WEIGHT CHANGE
        </Button>
      </Flex>
      </Box>
      <Modal isOpen={isAddingActivity} onClose={handleCloseModal} size="4xl">
        <ModalOverlay />
        <ModalContent  bottom="7%">
          <ModalBody>
            <AddActivity onClose={handleCloseModal} setIsModalOpen={setIsModalOpen} />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box pt="2%">
  <DividerHeader heading={'Water'}></DividerHeader>
  </Box> 
      <Flex className="Bottles" pt="3%" justify="center" align="center" direction="column" mb={4}>
        <Heading color="blackAlpha.900" fontFamily="Montserrat" fontSize={{ base: "md", sm: "sm", md: "3xl" }}> Share your daily water consumption</Heading>
      <Box paddingTop="1%" shadow="md" style={{display: 'flex', justifyContent: 'space-between', gap: '2%'}}> 
  <Box> 
  <button onClick={() => setWaterConsumption(1)}><Image src={OneLitreBottle} boxSize="70px" className="image"/></button>
    <Text>1 litre</Text>
  </Box>
  <Box>
  <button onClick={() => setWaterConsumption(2)}><Image src={TwoLitreBottle} boxSize="70px" className="image"/></button>  
    <Text>2 litre</Text>
  </Box>
  <Box>
  <button onClick={() => setWaterConsumption(3)}><Image src={ThreeLitreBottle} boxSize="70px" className="image"/></button>  
    <Text>3 litre</Text>
  </Box>
  <Box>
  <button onClick={() => setWaterConsumption(4)}> <Image src={FourLitreBottle} boxSize="70px" className="image"/></button>  
    <Text>4 litre</Text>
  </Box>
  <Box>
  <button onClick={() => setWaterConsumption(5)}><Image src={FiveLitreBottle} boxSize="70px" className="image"/></button>  
    <Text>5 litre</Text>
  </Box>
  <Badge paddingLeft="7px"  colorScheme="teal" fontSize="2xl"  maxH="10" minW="30px" variant="outline" borderColor="black" color="blue">{waterConsumption}</Badge>
  <Button color="black" onClick={handleAddWater} borderRadius="sm" leftIcon={<Icon as={IoIosAddCircle} boxSize={6} />} backgroundColor="blackAlpha.300" variant="outline"
    borderColor="black">Add</Button>
  </Box>
 
  </Flex>
    </Box>
	
  );
};

export default Dashboard;