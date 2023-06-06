import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  Badge,
  Stack,
  Icon,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Activity from "../../components/Activity/Activity";
import { IoIosAddCircle } from "react-icons/io";
import "./DashBoard.css";
import AddActivity from "../../components/AddActivity/AddActivity";
import { AuthContext } from "../../common/context";
import { useContext } from "react";
import {
  saveLogToDatabase,
  getUserActivityLogs,
} from "../../services/log.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ref, onValue } from "firebase/database";
import { db } from "../../config/firebase-config";
import CustumeToastActivityFinished from "../../components/CustumeToast/CustumeToastActivityFinished";
import DividerHeader from "../../components/Goals/Divider";
import AddWater from "../../components/AddWater/AddWater";
import AddWeight from "../../components/AddWeight/AddWeight";

const Dashboard = () => {
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [activities, setActivities] = useState([]);
  const { user, weight } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activityLogs, setActivityLogs] = useState([]);

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

      const unsubscribeActivities = onValue(
        userActivitiesRef,
        onActivitiesChange,
        {
          onlyOnce: false,
        }
      );

      const unsubscribeActivityLogs = onValue(
        userActivityLogsRef,
        onActivityLogsChange,
        {
          onlyOnce: false,
        }
      );

      return () => {
        unsubscribeActivities();
        unsubscribeActivityLogs();
      };
    }
  }, [user, db, weight]);

  let burnedCalories = 0;
  activityLogs.map((act) => {
    return (burnedCalories += act.caloriesBurned);
  });

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
        toast(
          <CustumeToastActivityFinished type={type} duration={duration} />,
          {
            autoClose: 1500,
          }
        );
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
            <Text
              fontWeight="bold"
              fontSize={{ base: "xs", sm: "sm", md: "2xl" }}
              fontStyle="normal"
              fontFamily="Montserrat"
            >
              Total Activities Finished:
            </Text>
            <Badge
              colorScheme="teal"
              fontSize={{ base: "xs", sm: "sm", md: "xl" }}
              variant="outline"
              borderColor="black"
              color="blue"
            >
              {activityLogs.length}
            </Badge>
            <Text fontStyle="normal" fontWeight="bold" fontSize="xl">
              &
            </Text>
            <Text
              fontWeight="bold"
              fontSize={{ base: "xs", sm: "sm", md: "2xl" }}
              fontFamily="Montserrat"
              fontStyle="normal"
            >
              Burned Calories:
            </Text>
            <Badge
              colorScheme="teal"
              fontSize={{ base: "xs", sm: "sm", md: "xl" }}
              variant="outline"
              borderColor="black"
              color="blue"
            >
              {burnedCalories.toFixed(2)}
            </Badge>
          </Stack>
        </Flex>
      </Flex>
      <Box pt="1%">
        <DividerHeader heading={"Activity"}></DividerHeader>
      </Box>
      <Box>
        <Heading
          align="center"
          pt="2%"
          fontSize={{ base: "md", sm: "sm", md: "2xl" }}
          fontFamily="Montserrat"
        >
          You have {activities.length} activities to choose from
        </Heading>
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
              <Box key={index}>
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
        <DividerHeader heading={"Weight"}></DividerHeader>
      </Box>
      <AddWeight />
      <Modal isOpen={isAddingActivity} onClose={handleCloseModal} size="4xl">
        <ModalOverlay />
        <ModalContent bottom="7%">
          <ModalBody>
            <AddActivity
              onClose={handleCloseModal}
              setIsModalOpen={setIsModalOpen}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
      <Box pt="2%">
        <DividerHeader heading={"Water"}></DividerHeader>
      </Box>
      <AddWater />
    </Box>
  );
};

export default Dashboard;
