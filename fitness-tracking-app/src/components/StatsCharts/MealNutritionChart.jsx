import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { redColor } from "../../common/constants";
import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";
import DividerHeader from "../Goals/Divider";
import { getNutrition } from "../../services/nutrition.service";

const MealNutritionChart = () => {
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState([]);
  const { user } = useContext(AuthContext);

  const getCaloriesFromNutrition = async (user) => {
    try {
      setLoading(true);
      const fetchCalories = await getNutrition(user.displayName);
      const createData = days.map((day) => ({ day: day, calories: 0 }));

      Object.entries(fetchCalories)
        .map(([timeStamp, value]) => ({ ...value, timeStamp }))
        .forEach((activity) => {
          const fromTimeStamp = new Date(+activity.timeStamp);
          const dayOfWeek = fromTimeStamp.getDay();
          createData[dayOfWeek].calories += Number(activity.calories);
        });

      setCalories(createData);
    } catch (error) {
      return("Error fetching calories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCaloriesFromNutrition(user);
  }, [user]);

  if (calories.length !== 0) 
   {
  return (
    <Flex
      position="relative"
      w="100%"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex flexDir="column" alignItems="center" w="100%" h="100%" margin={450}>
      {/* <Text fontStyle='normal' fontWeight="bold">CALORIES</Text> */}
      <DividerHeader heading={'nutrition'}></DividerHeader> 

      <ResponsiveContainer width={700} height="50%">
      <BarChart
        width={700}
        height={350}
        data={calories}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="day" />
        <YAxis
          label={{ value: "Calories", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Bar dataKey="calories" fill={redColor} />
      </BarChart>
      </ResponsiveContainer>
    </Flex>
    </Flex>
  );
  }
};


export default MealNutritionChart;
