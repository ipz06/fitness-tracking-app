import { useState } from "react";
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  Heading,
  Divider,
  Badge,
  SimpleGrid,
  Container,
  HStack,
  Center,
  FormControl,
  Select,
  Flex,
} from "@chakra-ui/react";
import { analyzeNutrition } from "../../services/api.service";
import { saveNutritionToDatabase } from "../../services/nutrition.service";
import { useContext } from "react";
import { AuthContext } from "../../common/context";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddNutrition = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [nutritionData, setNutritionData] = useState(null);
  const { user } = useContext(AuthContext);
  const [apiError, setApiError] = useState(null);
  const [error, setError] = useState(null);
  const [typeMeal, setTypeMeal] = useState("");
  const sharedStatus = false;

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const analyzeRecipe = async () => {
    try {
      setApiError(null);
      const data = await analyzeNutrition(recipeTitle, ingredients);
      setNutritionData(data);
      setError(null);
    } catch (error) {
      setApiError(error);
    }
  };

  const removeIngredientField = (index) => {
    const newIngredients = [...ingredients];
    newIngredients.splice(index, 1);
    setIngredients(newIngredients);
    setError(null);
  };

  const handleSaveNutrition = async () => {
    try {
      if (ingredients.some((i) => i === "") || recipeTitle === "") {
        setError("All fields must be filled in before saving.");
        toast.error(error);
        return;
      }
      await saveNutritionToDatabase(
        user.displayName,
        recipeTitle,
        ingredients,
        nutritionData.calories,
        nutritionData.totalWeight,
        sharedStatus,
        typeMeal
      );
      toast.success("Your meal is saved", {
        autoClose: 500,
      });
      setError("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChooseMealImage = async (e) => {
    setTypeMeal(e.target.value);
  };
  return (
    <Center>
      <Container maxW="container.xl">
        <VStack spacing={2}>
          <Input
            maxW="100%"
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
            placeholder="Recipe Title"
            borderColor="blackAlpha.500"
            _hover={{ borderColor: "black", borderWidth: 2 }}
            _focus={{
              borderColor: "black",
              boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
            }}
            borderRadius="sm"
          />

          {ingredients.map((ingredient, index) => (
            <HStack key={index}>
              <Input
                maxW="80%"
                value={ingredient}
                onChange={(e) => handleIngredientChange(index, e)}
                placeholder="Ingredient"
                borderColor="blackAlpha.500"
                _hover={{ borderColor: "black", borderWidth: 2 }}
                _focus={{
                  borderColor: "black",
                }}
                borderRadius="sm"
              />
              <Button
                onClick={() => removeIngredientField(index)}
                color="black"
                backgroundColor="blackAlpha.300"
                borderRadius="sm"
                variant="outline"
                borderColor="black"
              >
                Remove
              </Button>
            </HStack>
          ))}
          {error && (
            <Box mt={2}>
              <Text fontSize="lg" color="red">
                {error}
              </Text>
            </Box>
          )}
          <HStack maxW="80%">
            <Button
              onClick={addIngredientField}
              color="black"
              backgroundColor="blackAlpha.300"
              borderRadius="sm"
              variant="outline"
              borderColor="black"
              px={7}
            >
              Add Ingredient
            </Button>
            <Button
              onClick={analyzeRecipe}
              color="black"
              backgroundColor="blackAlpha.300"
              borderRadius="sm"
              variant="outline"
              borderColor="black"
            >
              Analyze
            </Button>
          </HStack>
          {apiError && (
            <Box mt={4}>
              <Text fontSize="lg" color="red">
                Please Enter Valid Data!
              </Text>
            </Box>
          )}
          {nutritionData && (
            <Box p={4} mt={4} shadow="md" borderWidth="1px" borderRadius="md">
              <Flex justifyContent="center">
                <Heading
                  size="lg"
                  mb={4}
                  fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                >
                  Nutrition Analysis Results:
                </Heading>
              </Flex>

              <Flex justifyContent="center">
                <Heading
                  size="md"
                  mb={2}
                  fontSize={{ base: "sm", sm: "lg", md: "xl" }}
                >
                  Total Calories:
                </Heading>
                <Badge
                  fontSize={{ base: "xs", sm: "md", md: "lg" }}
                  colorScheme="teal"
                  color="blackAlpha.900"
                  mr={3}
                >
                  {nutritionData.calories}{" "}
                </Badge>
                <Heading
                  size="md"
                  mb={2}
                  fontSize={{ base: "sm", sm: "lg", md: "xl" }}
                >
                  Total Weight:
                </Heading>
                <Badge
                  fontSize={{ base: "xs", sm: "md", md: "lg" }}
                  colorScheme="teal"
                  color="blackAlpha.900"
                >
                  {nutritionData.totalWeight}
                </Badge>
              </Flex>
              <Divider />
              <Box my={4}>
                <Heading
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  size="md"
                  mb={2}
                >
                  Diet Labels:
                </Heading>
                <Box>
                  {nutritionData.dietLabels &&
                    nutritionData.dietLabels.map((label, index) => (
                      <Badge
                        fontSize={{ base: "xs", sm: "xs", md: "sm" }}
                        key={index}
                        colorScheme="green"
                        mr={2}
                      >
                        {label}
                      </Badge>
                    ))}
                </Box>
              </Box>

              <Divider />

              <Box my={4}>
                <Heading
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  size="md"
                  mb={2}
                >
                  Health Labels:
                </Heading>
                <Box>
                  {nutritionData.healthLabels &&
                    nutritionData.healthLabels.map((label, index) => (
                      <Badge
                        fontSize={{ base: "xs", sm: "xs", md: "sm" }}
                        key={index}
                        colorScheme="blue"
                        mr={2}
                      >
                        {label}
                      </Badge>
                    ))}
                </Box>
              </Box>

              <Divider />

              <Box my={4}>
                <Heading
                  fontSize={{ base: "md", sm: "lg", md: "xl" }}
                  size="md"
                  mb={2}
                >
                  Nutrients:
                </Heading>
                <SimpleGrid columns={2} spacing={2}>
                  {nutritionData.totalNutrients &&
                    Object.entries(nutritionData.totalNutrients).map(
                      ([key, nutrient]) => (
                        <Box key={key}>
                          <Text
                            fontStyle="normal"
                            fontSize={{ base: "xs", sm: "sm", md: "md" }}
                          >
                            <strong>{nutrient.label}</strong>:{" "}
                            {nutrient.quantity.toFixed(2)} {nutrient.unit}
                          </Text>
                        </Box>
                      )
                    )}
                </SimpleGrid>
              </Box>
              <HStack spacing={5}>
                <FormControl>
                  <Select
                    size="md"
                    w="50%"
                    minW="20%"
                    placeholder="Select type of meal"
                    borderRadius="sm"
                    borderColor="blackAlpha.500"
                    _hover={{ borderColor: "black", borderWidth: 2 }}
                    _focus={{
                      borderColor: "black",
                      boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
                    }}
                    value={typeMeal}
                    onChange={handleChooseMealImage}
                  >
                    <option value="Healthy Breakfast">Healthy Breakfast</option>
                    <option value="Breakfast for Gentlemen">
                      Breakfast for Gentlemen
                    </option>
                    <option value="Energetic Start of the Day">
                      Energetic Start of the Day
                    </option>
                    <option value="On-the-go Snack">On-the-go Snack</option>
                    <option value="Snack">Snack</option>
                    <option value="Lunch for the Ladies">
                      Lunch for the Ladies
                    </option>
                    <option value="Lunch for Muscles">Lunch for Muscles</option>
                    <option value="Healthy Dinner">Healthy Dinner</option>
                    <option value="Dinner">Dinner</option>
                    <option value="Salad">Salad</option>
                  </Select>
                </FormControl>

                <Button
                  onClick={handleSaveNutrition}
                  color="black"
                  backgroundColor="blackAlpha.300"
                  borderRadius="sm"
                  minW="10%"
                  variant="outline"
                  borderColor="black"
                >
                  Save
                </Button>
                <Button
                  onClick={() => setNutritionData(null)}
                  color="black"
                  backgroundColor="red.500"
                  borderRadius="sm"
                  minW="10%"
                  variant="outline"
                  borderColor="black"
                >
                  Close
                </Button>
              </HStack>
            </Box>
          )}
        </VStack>
      </Container>
    </Center>
  );
};

export default AddNutrition;
