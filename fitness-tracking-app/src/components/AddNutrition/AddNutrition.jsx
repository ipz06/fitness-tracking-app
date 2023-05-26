import { useState, useEffect } from "react";
import { Box, Input, Button, VStack, Text, Heading, Divider, Badge, SimpleGrid, Container, HStack, Center } from "@chakra-ui/react";
import { analyzeNutrition } from "../../services/api.service";
import { saveNutritionToDatabase } from "../../services/nutrition.service";
import { useContext } from "react";
import { AuthContext } from "../../common/context";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNutrition = () => {
  const [recipeTitle, setRecipeTitle] = useState("");
  const [ingredients, setIngredients] = useState([""]);
  const [nutritionData, setNutritionData] = useState(null);
  const { user } = useContext(AuthContext);

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = event.target.value;
    setIngredients(newIngredients);
  };

  const addIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  const analyzeRecipe = async () => {
    const data = await analyzeNutrition(recipeTitle, ingredients);
    setNutritionData(data);
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
          key={index}
          value={ingredient}
          onChange={(e) => handleIngredientChange(index, e)}
          placeholder="Ingredient"
          borderColor="blackAlpha.500"
          _hover={{ borderColor: "black", borderWidth: 2 }}
          _focus={{
            borderColor: "black",
            boxShadow: "0 0 0 3px rgba(0,0,0,0.1)",
          }}
        borderRadius="sm"
        />
      ))}
      <HStack>
      <Button onClick={addIngredientField} backgroundColor="blackAlpha.300" borderRadius="sm"  variant="outline" borderColor="black">Add another ingredient</Button>

      <Button onClick={analyzeRecipe} backgroundColor="blackAlpha.300" borderRadius="sm"  variant="outline" borderColor="black">Analyze recipe</Button>

      <Button onClick={handleSaveNutrition} backgroundColor="blackAlpha.300" borderRadius="sm"  variant="outline" borderColor="black">Save your nutrition</Button>
      </HStack>
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
       </Box>
      )}
    </VStack>
    </Container>
    </Center>
  );
};

export default AddNutrition;
