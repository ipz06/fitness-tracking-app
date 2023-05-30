import { BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { redColor } from "../../common/constants";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { getDurationActivity } from "../../services/log.service";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";

const CaloriesChart = () => {
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState([]);
  const { user } = useContext(AuthContext);

  const getCalories = async (user) => {
    try {
      setLoading(true);
      const fetchCalories = await getDurationActivity(user.displayName);
      console.log("user", user);
      console.log("fetch,", fetchCalories);

      const createData = days.map((day) => ({ day: day, calories: 0 }));

      Object.entries(fetchCalories)
        .map(([timeStamp, value]) => ({ ...value, timeStamp }))
        .forEach((activity) => {
          const fromTimeStamp = new Date(+activity.timeStamp);
          const dayOfWeek = fromTimeStamp.getDay();
          createData[dayOfWeek].calories += Number(activity.caloriesBurned);
        });

      setCalories(createData);
    } catch (error) {
      alert("Error fetching calories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCalories(user);
  }, [user]);

  return (
    <Flex
      position="relative"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
      direction="column"
    >
      <BarChart
        width={730}
        height={350}
        data={calories}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="day" />
        <YAxis
          label={{ value: "calories", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Bar dataKey="calories" fill={redColor} background={{ fill: "#eee" }} />
      </BarChart>
    </Flex>
  );
};

export default CaloriesChart;
