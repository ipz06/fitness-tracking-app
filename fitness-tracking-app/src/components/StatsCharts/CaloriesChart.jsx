import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { redColor } from "../../common/constants";
import { Flex, Heading, Box, Text, Card } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { getActivityByDate } from "../../services/log.service";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";

const CaloriesChart = () => {
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState([]);
  const { user } = useContext(AuthContext);

  const getCalories = async (user) => {
    try {
      setLoading(true);
      const fetchCalories = await getActivityByDate(user.displayName);
      const createData = days.map((day) => ({ day: day, caloriesBurned: 0 }));

      Object.values(fetchCalories).forEach((activity) => {
        const fromTimeStamp = new Date(+activity.timestamp);
        const dayOfWeek = fromTimeStamp.getDay();
        createData[dayOfWeek].caloriesBurned += Number(activity.caloriesBurned);
      });

      setCalories(createData);
    } catch (error) {
      return "Error fetching calories:", error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCalories(user);
  }, [user]);

  if (calories.length === 0) {
    return (
      <Box fontStyle="normal">
        <Heading> No Stats, please add activity!</Heading>
      </Box>
    );
  } else {
    return (
      <Flex justifyContent="center" paddingX="16px">
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
                  value: "Cal Burnt",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar dataKey="caloriesBurned" fill={redColor} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Flex>
    );
  }
};

export default CaloriesChart;
