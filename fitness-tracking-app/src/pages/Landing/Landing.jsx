import { Button, Flex, Text } from "@chakra-ui/react";
import video from "../../assets/video.mp4";
import logoWhite from "../../assets/logo-white.png";
import { redColor } from "../../common/constants";
import { WHITE_COLOR } from "../../common/constants";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAllCreatedUsers } from "../../services/user.service";
import { getAllCreatedGoals } from "../../services/goal.service";
import { getAllCreatedMeals } from "../../services/nutrition.service";

const Landing = () => {
  const [loading, setLoading] = useState(false);
  const [usersCount, setUserCount] = useState([]);
  const [goalCount, setGoalCount] = useState(0);
  const [mealCount, setMealCount] = useState(0);

  const usersCounting = async () => {
    try {
      setLoading(true);
      const fetchUserCount = await getAllCreatedUsers();
      setUserCount(fetchUserCount);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    usersCounting();
  }, []);

  const goalCounting = async () => {
    try {
      setLoading(true);
      const fetchGoalCount = await getAllCreatedGoals();
      const goalCountOfUsers = Object.values(fetchGoalCount).reduce(
        (acc, obj) => acc + Object.keys(obj).length,
        0
      );

      setGoalCount(goalCountOfUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    goalCounting();
  }, []);

  const mealCounting = async () => {
    try {
      setLoading(true);
      const fetchMealCount = await getAllCreatedMeals();
      const mealCountOfUsers = Object.values(fetchMealCount).reduce(
        (acc, obj) => acc + Object.keys(obj).length,
        0
      );

      setMealCount(mealCountOfUsers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    mealCounting();
  }, []);

  return (
    <Flex
      position="relative"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex flexDir="column" alignItems="center" zIndex={2}>
        <Flex marginBottom="100px">
          <img src={logoWhite} width="300px" />
        </Flex>
        {/* <Text 
                fontStyle="normal"
                fontWeight="bold"
                marginBottom='100px' color={WHITE_COLOR}>
                    Welcome
                </Text> */}
        <NavLink to="signup">
          <Button marginBottom="50px" w={"250px"} h={"50px"} color={redColor}>
            GET FIT
          </Button>
        </NavLink>
        <NavLink to="login">
          <Text
            fontStyle="normal"
            marginBottom="50px"
            color={WHITE_COLOR}
            _hover={{
              color: "#e0041c",
            }}
          >
            Already have an account? Login
          </Text>
        </NavLink>
        <Text
          fontStyle="normal"
          marginBottom="50px"
          color={WHITE_COLOR}
          fontSize="2xs"
        >
          Active Users: {Object.keys(usersCount).length} Created Goals:{" "}
          {goalCount} Created Meals: {mealCount}
        </Text>
      </Flex>
      <Flex
        as="video"
        src={video}
        autoPlay
        muted
        loop
        position="fixed"
        top="0"
        left="0"
        w="100%"
        h="100%"
        objectFit="cover"
        filter="grayscale(100%)"
      />
    </Flex>
  );
};

export default Landing;
