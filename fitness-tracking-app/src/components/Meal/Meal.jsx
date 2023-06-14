import {
  Box,
  Text,
  VStack,
  Button,
  Badge,
  UnorderedList,
  IconButton,
  ListItem,
  Flex,
  HStack,
  Tooltip,
  Image,
  Card,
} from "@chakra-ui/react";
import { useContext } from "react";
import { FaTrash, FaShareAlt } from "react-icons/fa";
import { AuthContext } from "../../common/context";
import { saveMealLog } from "../../services/log.service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { deleteNutrituionFromDatabase } from "../../services/nutrition.service";
import CustomToasEatMeal from "../CustumeToast/CustumeToastEatMeal";
import { GiMeal } from "react-icons/gi";
import { useState } from "react";
import { shareUserMeal } from "../../services/nutrition.service";
import PropTypes from "prop-types";
import { USER_TYPE } from "../../common/constants";
import { BsSaveFill } from "react-icons/bs";
import { saveNutritionToDatabase } from "../../services/nutrition.service";
import upload from "../../assets/upload.png";
import { ICON_SIZE } from "../../common/constants";
import useMealImages from "../../hooks/useMealImages";

const MealView = ({
  author,
  nutritionKey,
  addOn,
  title,
  weight,
  calories,
  sharedStatus = false,
  ingredients,
  typeMeal,
}) => {
  const { user, role } = useContext(AuthContext);
  const [shared, setShared] = useState(sharedStatus);
  const imageMeal = useMealImages(typeMeal);

  const handleLogMeal = async () => {
    try {
      await saveMealLog(user.displayName, calories, weight, title, typeMeal);
      toast(<CustomToasEatMeal title={title} />, {
        autoClose: 1000,
      });
    } catch (error) {
      console.error("An error occurred while logging the meal:", error);
    }
  };

  const handleDeleteMeal = async () => {
    try {
      await deleteNutrituionFromDatabase(author, nutritionKey);
    } catch (error) {
      console.log("Error deleting meal:", error);
    }
  };

  const handleShare = () => {
    shareUserMeal(author, nutritionKey, !shared);
    setShared(!shared);
    toast(`Target shared status updated to ${!shared}`, {
      autoClose: 500,
    });
  };

  const handleSaveMeal = async () => {
    try {
      await saveNutritionToDatabase(
        user.displayName,
        title,
        ingredients,
        calories,
        weight,
        sharedStatus,
        typeMeal
      );
      toast(`Meal ${title} was saved`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box align="center" p="1%">
      <Flex maxW="50%" minW="60%" justify="center" align="center">
        <Card
          align="center"
          maxW="160%"
          minW="160%"
          h={{ base: "350px", lg: "400px" }}
          w={{ base: "150px", lg: "200px" }}
          marginX={"auto"}
          marginY="10px"
          padding="4px"
        >
          <Text
            fontSize={{ base: "sm", lg: "md" }}
            color="black"
            fontStyle="normal"
          >
            Added on: {addOn}
          </Text>
          <Box>
            <Text
              fontSize={{ base: "md", lg: "lg" }}
              fontWeight="bold"
              fontStyle="normal"
            >
              {title}
            </Text>
            <Box>
              <Image
                borderRadius="full"
                src={imageMeal ? imageMeal : upload}
                boxSize={ICON_SIZE}
                className="image"
              />
            </Box>

            <Badge p={1} mr={2}>
              Weight: {weight} g
            </Badge>
            <Badge p={1}>Calories: {calories}</Badge>
            <Text
              align="start"
              fontSize={{ base: "sm", lg: "md" }}
              fontWeight="bold"
              mt={3}
              fontStyle="normal"
            >
              Ingredients:
            </Text>
            <HStack>
              <UnorderedList>
                {ingredients &&
                  ingredients.map((ingredient, index) => (
                    <ListItem key={index}>{ingredient}</ListItem>
                  ))}
              </UnorderedList>
              <VStack paddingLeft="10%">
                <Tooltip label="Eat meal" fontSize={{ base: "sm", lg: "md" }}>
                  <Button
                    onClick={handleLogMeal}
                    backgroundColor="blackAlpha.300"
                    borderRadius="sm"
                    color="blackAlpha.900"
                    variant="outline"
                  >
                    <GiMeal size={20} />
                  </Button>
                </Tooltip>
                {(role === USER_TYPE.ADMIN ||
                  role === USER_TYPE.SUPER_ADMIN) && (
                  <Tooltip
                    label="Delete meal"
                    fontSize={{ base: "sm", lg: "md" }}
                  >
                    <Button
                      onClick={handleDeleteMeal}
                      backgroundColor="red.500"
                      borderRadius="sm"
                      color="blackAlpha.900"
                      variant="outline"
                      _hover={{ bg: "red.300" }}
                    >
                      <FaTrash size={20} />
                    </Button>
                  </Tooltip>
                )}
                {author === user.displayName &&
                  role !== USER_TYPE.ADMIN &&
                  role !== USER_TYPE.SUPER_ADMIN && (
                    <Tooltip
                      label="Delete meal"
                      fontSize={{ base: "sm", lg: "md" }}
                    >
                      <Button
                        onClick={handleDeleteMeal}
                        backgroundColor="red.500"
                        _hover={{ bg: "red.300" }}
                        borderRadius="sm"
                        color="blackAlpha.900"
                        variant="outline"
                      >
                        <FaTrash size={20} />
                      </Button>
                    </Tooltip>
                  )}
                {author === user.displayName &&
                  (shared ? (
                    <Tooltip
                      label="Unshare meal"
                      fontSize={{ base: "sm", lg: "md" }}
                    >
                      <IconButton
                        icon={<FaShareAlt />}
                        size={"sm"}
                        w={8}
                        onClick={handleShare}
                        colorScheme="green"
                      />
                    </Tooltip>
                  ) : (
                    <Tooltip label="Share meal" fontSize="md">
                      <IconButton
                        icon={<FaShareAlt />}
                        size={"sm"}
                        w={8}
                        onClick={handleShare}
                      />
                    </Tooltip>
                  ))}

                {author !== user.displayName && (
                  <Tooltip label="Save meal" fontSize="md">
                    <Button
                      onClick={handleSaveMeal}
                      backgroundColor="blackAlpha.300"
                      borderRadius="sm"
                      color="blackAlpha.900"
                      variant="outline"
                      size="md"
                    >
                      <BsSaveFill />
                    </Button>
                  </Tooltip>
                )}
              </VStack>
            </HStack>
          </Box>
        </Card>
      </Flex>
    </Box>
  );
};

export default MealView;

MealView.propTypes = {
  author: PropTypes.string.isRequired,
  nutritionKey: PropTypes.string.isRequired,
  addOn: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  weight: PropTypes.number.isRequired,
  calories: PropTypes.number.isRequired,
  sharedStatus: PropTypes.bool,
  typeMeal: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
};
