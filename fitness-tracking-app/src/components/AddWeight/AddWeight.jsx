import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../common/context";
import { saveWeightToDatabase } from "../../services/log.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Box,
  Stack,
  Flex,
  Button,
  Text,
  FormControl,
  FormErrorMessage,
  Center,
  Icon,
  Input,
} from "@chakra-ui/react";
import { IoScaleSharp } from "react-icons/io5";

const AddWeight = () => {
  const { user, weight } = useContext(AuthContext);
  const [startWeight, setStartWeight] = useState(""); // chete ot useState(user.weight)
  const [currentWeight, setCurrentWeight] = useState(""); // chete ot add weight
  const [weightChange, setWeightChange] = useState("");
  const [weightError, setWeightError] = useState("");

  useEffect(() => {
    setStartWeight(weight);
    let result = startWeight - currentWeight;
    if (result > 0) {
      setWeightChange("-" + result);
    } else if (result < 0) {
      setWeightChange("+" + Math.abs(result));
    } else {
      setWeightChange(0);
    }
  }, [weight, startWeight, currentWeight, weightChange]);

  const handleAddWeght = async () => {
    if (!currentWeight || currentWeight <= 0) {
      setWeightError("Current weight must be valid data");
      return;
    }
    try {
      await saveWeightToDatabase(
        user.displayName,
        weightChange,
        currentWeight,
        startWeight
      );
      toast.success("Weight updated successfully to your goals", {
        autoClose: 500,
      });
      setWeightError("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Stack direction="row" justify="center" mt={4} spacing={8} pt="2%">
        <Box textAlign="center">
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", sm: "sm", md: "2xl" }}
            fontStyle="normal"
          >
            Start Weight
          </Text>
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", sm: "sm", md: "3xl" }}
            color="teal.500"
            fontStyle="normal"
          >
            {startWeight} kg
          </Text>
        </Box>
        <Box textAlign="center">
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", sm: "sm", md: "2xl" }}
            fontStyle="normal"
          >
            Current Weight
          </Text>
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", sm: "sm", md: "3xl" }}
            color="teal.500"
            fontStyle="normal"
          >
            {currentWeight} kg
          </Text>
        </Box>
        <Box textAlign="center">
          <Text
            fontWeight="bold"
            fontSize={{ base: "md", sm: "sm", md: "2xl" }}
            fontStyle="normal"
          >
            Weight Change
          </Text>
          {currentWeight && (
            <Text
              fontWeight="bold"
              fontSize={{ base: "md", sm: "sm", md: "3xl" }}
              fontStyle="normal"
              color={currentWeight <= startWeight ? "green.500" : "red.500"}
            >
              {weightChange} kg
            </Text>
          )}
        </Box>
      </Stack>
      <FormControl isInvalid={!!weightError}>
        <Center>
          <FormErrorMessage a>{weightError}</FormErrorMessage>
        </Center>
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
      </FormControl>
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
    </Box>
  );
};

export default AddWeight;
