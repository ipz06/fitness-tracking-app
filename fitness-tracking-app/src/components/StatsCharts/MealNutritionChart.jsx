import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  CartesianGrid,
} from "recharts";
import { redColor } from "../../common/constants";
import { Flex, Card } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";
import { getNutrition } from "../../services/nutrition.service";
import useBmrFormula from "../../hooks/useBmrFormula";

const MealNutritionChart = () => {
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState([]);
  const { user } = useContext(AuthContext);

  const bmrFormula = useBmrFormula();

  const getCaloriesFromNutrition = async (user) => {
    try {
      setLoading(true);
      const fetchCalFromNutrition = await getNutrition(user.displayName);
      const createData = days.map((day) => ({ day: day, calories: 0 }));

      Object.values(fetchCalFromNutrition).forEach((meal) => {
        const fromTimeStamp = new Date(+meal.timestamp);
        const dayOfWeek = fromTimeStamp.getDay();
        createData[dayOfWeek].calories += Number(meal.calories);
      });

      setCalories(createData);
    } catch (error) {
      console.log("Error fetch nutrition:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCaloriesFromNutrition(user);
  }, [user]);

  if (calories.length !== 0) {
    return ( 
      <Flex justifyContent="center" paddingX="16px" marginTop={5} marginBottom={5}>
        <Card
          h={{ base: "200px", md: "300px", lg: "400px" }}
          w={{ base: "400px", md: "2xl", lg: "3xl" }}
          marginX={"auto"}
        >
          <ResponsiveContainer w="100%" h={300}>
            <BarChart
              data={calories}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis dataKey="day" />
              <YAxis
                label={{
                  value: "Calories",
                  angle: -90,
                  position: "insideLeft",
                }}
                domain={[0, "auto"]}
              />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="calories" fill={redColor} />

              <ReferenceLine
                y={bmrFormula}
                label={{
                  value: "Basal Metabolic Rate",
                  position: "insideBottomLeft",
                }}
                stroke="red"
              />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Flex>
    );
  }
};

export default MealNutritionChart;
