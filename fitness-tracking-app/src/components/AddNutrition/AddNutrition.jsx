import { useState, useEffect } from "react";
import { Box, Input, Button, VStack, Text, Heading, Divider, Badge, SimpleGrid, Container, HStack, Center, Icon } from "@chakra-ui/react";
import { analyzeNutrition } from "../../services/api.service";
import { saveNutritionToDatabase } from "../../services/nutrition.service";
import { useContext } from "react";
import { AuthContext } from "../../common/context";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IoIosAddCircle } from "react-icons/io";
import { RiSave3Fill } from 'react-icons/ri';

const AddNutrition = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [nutritionData, setNutritionData] = useState(null);
  const { user } = useContext(AuthContext);
  const [apiError, setApiError] = useState(null);


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
    } catch (error) {
      setApiError(error);
    }
  };

  const handleSaveNutrition = async () => {
    try {
    await saveNutritionToDatabase(user.displayName, recipeTitle, ingredients, nutritionData.calories, nutritionData.totalWeight)
    toast.success('Your meal is saved');
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <Center>
    <Container maxW="container.xl" >
    <VStack spacing={2}>
      <Input
      maxW="80%"
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
        <Input
        maxW="80%"
          key={index}
          value={ingredient}
          onChange={(e) => handleIngredientChange(index, e)}
          placeholder="Ingredient"
          borderColor="blackAlpha.500"
          _hover={{ borderColor: "black", borderWidth: 2 }}
          _focus={{
            borderColor: "black",
            // boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
          }}
        borderRadius="sm"
        />
      ))}
      <HStack maxW="80%">
      <Button onClick={addIngredientField} color="black" backgroundColor="blackAlpha.300" borderRadius="sm"  variant="outline" borderColor="black" leftIcon={<Icon as={IoIosAddCircle} boxSize={6} />}>Ingredient</Button>
      <Button onClick={analyzeRecipe} color="black" backgroundColor="blackAlpha.300" borderRadius="sm"  variant="outline" borderColor="black">Analyze meal</Button>
      <Button onClick={handleSaveNutrition} color="black" backgroundColor="blackAlpha.300" borderRadius="sm"  variant="outline" borderColor="black" leftIcon={<Icon as={RiSave3Fill} boxSize={6} />}>Meal</Button>
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
       <Heading as="h2" size="lg" mb={4}>
         Nutrition Analysis Results:
       </Heading>
       <Box mb={4}>
            <Heading as="h4" size="md" mb={2}>
              Total Calories:
            </Heading>
            <Text fontSize="xl">{nutritionData.calories}</Text>
            <Heading as="h4" size="md" mb={2}>
              Total Weight:
            </Heading>
            <Text fontSize="xl">{nutritionData.totalWeight}</Text>
          </Box>
          <Divider />
          <Box my={4}>
            <Heading as="h4" size="md" mb={2}>
              Diet Labels:
            </Heading>
            <Box>
              {nutritionData.dietLabels && nutritionData.dietLabels.map((label, index) => (
                <Badge key={index} colorScheme="green" mr={2}>
                  {label}
                </Badge>
              ))}
            </Box>
          </Box>

          <Divider />

          <Box my={4}>
            <Heading as="h4" size="md" mb={2}>
              Health Labels:
            </Heading>
            <Box>
              {nutritionData.healthLabels && nutritionData.healthLabels.map((label, index) => (
                <Badge key={index} colorScheme="blue" mr={2}>
                  {label}
                </Badge>
              ))}
            </Box>
          </Box>

          <Divider />

          <Box my={4}>
            <Heading as="h4" size="md" mb={2}>
              Nutrients:
            </Heading>
            <SimpleGrid columns={2} spacing={2}>
              {nutritionData.totalNutrients && Object.entries(nutritionData.totalNutrients).map(([key, nutrient]) => (
                <Box key={key}>
                  <Text>
                    <strong>{nutrient.label}</strong>: {nutrient.quantity.toFixed(2)} {nutrient.unit}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>
          <Button onClick={() => setNutritionData(null)} color="black" backgroundColor="red.500" borderRadius="sm"  minW="20%" variant="outline" borderColor="black">Close</Button>
       </Box>
      )}
    </VStack>
    </Container>
    </Center>
  );
};

export default AddNutrition;
