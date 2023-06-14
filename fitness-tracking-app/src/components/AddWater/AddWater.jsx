import {
  Flex,
  Text,
  Box,
  Heading,
  Image,
  Badge,
  Button,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import { saveWaterToDatabase } from "../../services/log.service";
import OneLitreBottle from "./../../assets/1litreBottle.png";
import TwoLitreBottle from "./../../assets/2litreBottle.png";
import ThreeLitreBottle from "./../../assets/3litreBottle.png";
import FourLitreBottle from "./../../assets/4litreBottle.png";
import FiveLitreBottle from "./../../assets/5litreBottle.png";
import CustomToastGoodAmountWater from "../../components/CustumeToast/CustumeToastGoodAmountWater";
import CustomToastBadAmountWater from "../../components/CustumeToast/CustumeToastBadAmountWater";
import CustomToastToMuchWater from "../../components/CustumeToast/CustumeToastToMuchWater";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../../common/context";
import { IoIosAddCircle } from "react-icons/io";
import { db } from "../../config/firebase-config";
import { get, ref } from "firebase/database";

const AddWater = () => {
  const [waterConsumption, setWaterConsumption] = useState("");
  const { user } = useContext(AuthContext);

  const handleAddWater = async (event) => {
    event.preventDefault();
    const waterLogsRef = ref(db, `log-water/${user.displayName}`);
    const waterLogsSnapshot = await get(waterLogsRef);
    const waterLogs = waterLogsSnapshot.val();
    if (waterLogs) {
      console.log(waterLogs);
      const lastLogKey = Object.keys(waterLogs).reduce((a, b) =>
        waterLogs[a].timestamp > waterLogs[b].timestamp ? a : b
      );
      const lastWaterLog = new Date(waterLogs[lastLogKey].timestamp);
      const now = new Date();
      const timeDiffHours =
        (now.getTime() - lastWaterLog.getTime()) / (1000 * 60 * 60);
      if (timeDiffHours < 24) {
        toast("You've already logged your water intake in the last 24 hours!", {
          autoClose: 1000,
        });
        return;
      }
    }
    try {
      await saveWaterToDatabase(user.displayName, waterConsumption);
      if (waterConsumption <= 2) {
        toast(<CustomToastBadAmountWater />, {
          autoClose: 1000,
        });
      } else if (waterConsumption > 2 && waterConsumption <= 4) {
        toast(<CustomToastGoodAmountWater />, {
          autoClose: 1000,
        });
      } else {
        toast(<CustomToastToMuchWater />, {
          autoClose: 1000,
        });
      }
    } catch (error) {
      console.log(error);
    }
    // }
  };

  return (
    <Flex
      className="Bottles"
      pt="3%"
      justify="center"
      align="center"
      direction="column"
      mb={4}
    >
      <Heading
        color="blackAlpha.900"
        fontFamily="Montserrat"
        fontSize={{ base: "md", sm: "sm", md: "3xl" }}
      >
        {" "}
        Share your daily water consumption
      </Heading>
      <Box
        paddingTop="1%"
        shadow="md"
        style={{ display: "flex", justifyContent: "space-between", gap: "2%" }}
      >
        <Box>
          <button
            className="waterButton"
            onClick={() => setWaterConsumption(1)}
          >
            <Image src={OneLitreBottle} boxSize="70px" className="image" />
          </button>
          <Text>1 litre</Text>
        </Box>
        <Box>
          <button
            className="waterButton"
            onClick={() => setWaterConsumption(2)}
          >
            <Image src={TwoLitreBottle} boxSize="70px" className="image" />
          </button>
          <Text>2 litre</Text>
        </Box>
        <Box>
          <button
            className="waterButton"
            onClick={() => setWaterConsumption(3)}
          >
            <Image src={ThreeLitreBottle} boxSize="70px" className="image" />
          </button>
          <Text>3 litre</Text>
        </Box>
        <Box>
          <button
            className="waterButton"
            onClick={() => setWaterConsumption(4)}
          >
            {" "}
            <Image src={FourLitreBottle} boxSize="70px" className="image" />
          </button>
          <Text>4 litre</Text>
        </Box>
        <Box>
          <button
            className="waterButton"
            onClick={() => setWaterConsumption(5)}
          >
            <Image src={FiveLitreBottle} boxSize="70px" className="image" />
          </button>
          <Text>5 litre</Text>
        </Box>
        <Badge
          paddingLeft="7px"
          colorScheme="teal"
          fontSize="2xl"
          maxH="10"
          minW="30px"
          variant="outline"
          borderColor="black"
          color="blue"
        >
          {waterConsumption}
        </Badge>
        <Button
          color="black"
          onClick={handleAddWater}
          borderRadius="sm"
          leftIcon={<Icon as={IoIosAddCircle} boxSize={6} />}
          backgroundColor="blackAlpha.300"
          variant="outline"
          borderColor="black"
        >
          Add
        </Button>
      </Box>
    </Flex>
  );
};

export default AddWater;
