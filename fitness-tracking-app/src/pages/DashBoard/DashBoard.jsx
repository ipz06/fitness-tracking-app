import { Box, Flex, Button, Text, VStack, Input, Badge, Stack, Image, Icon, HStack,  Modal, ModalOverlay, ModalContent, ModalBody} from "@chakra-ui/react";
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
      console.log(waterConsumption);
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
    toast.success('Weight updated successfully');
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddWater = async () => {
    try {
    await saveWaterToDatabase(user.displayName, waterConsumption)
    toast.success('Water consumption updated successfully');
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
    };
  
    saveLogToDatabase(user.displayName, newLogEntry)
      .then(() => {
        toast.success('You added activity to your goals')
      })
      .catch((error) => {
        console.log("Error saving log data:", error);
      });
  };

  return (
    <Box p={4}>
      <Flex justify="center" align="center" direction="column" mb={4}>
        <Flex align="center">
          <GiRunningShoe size={24} />
          <Stack direction="row" align="center" spacing={2} ml={2}>
            <Text fontWeight="bold" fontSize="xl">
              Total Activities Finished:
            </Text>
            <Badge colorScheme="teal" fontSize="xl"
    variant="outline"
    borderColor="black"
    color="blue">
              {activityLogs.length}
            </Badge>
            <Text fontWeight="bold" fontSize="xl">&</Text>
            <GiBurningEmbers size={24}/>
            <Text fontWeight="bold" fontSize="xl">
              Burned Calories:
            </Text>
            <Badge colorScheme="teal" fontSize="xl"   variant="outline"
    borderColor="black"
    color="blue">
              {burnedCalories}
            </Badge>
          </Stack>
        </Flex>
        <br></br>
        <div className="content">
  <h2>Don't forget to drink water, check daily consumption</h2>
  <h2>Don't forget to drink water, check daily consumption</h2>
</div>
<br></br><br></br>
<div style={{display: 'flex', justifyContent: 'space-between', gap: '15px'}}>
  <div> 
  <button onClick={() => setWaterConsumption(1)}><Image src={OneLitreBottle} boxSize="70px" className="image"/></button>
    <p>1 litre</p>
  </div>
  <div>
  <button onClick={() => setWaterConsumption(2)}><Image src={TwoLitreBottle} boxSize="70px" className="image"/></button>  
    <p>2 litre</p>
  </div>
  <div>
  <button onClick={() => setWaterConsumption(3)}><Image src={ThreeLitreBottle} boxSize="70px" className="image"/></button>  
    <p>3 litre</p>
  </div>
  <div>
  <button onClick={() => setWaterConsumption(4)}> <Image src={FourLitreBottle} boxSize="70px" className="image"/></button>  
    <p>4 litre</p>
  </div>
  <div>
  <button onClick={() => setWaterConsumption(5)}><Image src={FiveLitreBottle} boxSize="70px" className="image"/></button>  
    <p>5 litre</p>
  </div>
  <Badge paddingLeft="7px"  colorScheme="teal" fontSize="2xl"  maxH="10" minW="30px" variant="outline" borderColor="black" color="blue">{waterConsumption}</Badge>
  <Button color="black" onClick={handleAddWater} leftIcon={<Icon as={IoIosAddCircle} boxSize={6} />} backgroundColor="blackAlpha.300" variant="outline"
    borderColor="black">Add daily water </Button>
  </div>
      </Flex>
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
      <br></br>
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
	<Flex justify="center" mt={4}>
        <Button
          size="lg"
          color="black"
		maxW="1000px"
		minW="1000px"
          onClick={handleAddWeght}
		leftIcon={<Icon as={IoScaleSharp} boxSize={6} />}
    backgroundColor="blackAlpha.300"
    variant="outline"
    borderColor="black"
        > 
          ADD WEIGHT CHANGE TO GOALS AND CHARTS
        </Button>
      </Flex>
      <Modal isOpen={isAddingActivity} onClose={handleCloseModal} size="4xl">
        <ModalOverlay />
        <ModalContent  bottom="70px">
          <ModalBody>
            <AddActivity onClose={handleCloseModal} setIsModalOpen={setIsModalOpen} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
	
  );
};

export default Dashboard;