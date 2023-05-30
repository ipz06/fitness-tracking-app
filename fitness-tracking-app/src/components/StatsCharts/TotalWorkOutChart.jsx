import { BarChart, XAxis, YAxis, Bar, Tooltip } from "recharts";
import { redColor } from "../../common/constants";
import { Flex } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { getDurationActivity } from "../../services/log.service";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";

const TotalWorkOutChart = () => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState([]);
  const { user } = useContext(AuthContext);

  const getDuration = async (handle) => {
    try {
      setLoading(true);
      const fetchDuration = await getDurationActivity(handle);

      const createData = days.map((day) => ({ day: day, workouts: 0 }));

      Object.entries(fetchDuration)
        .map(([timeStamp, value]) => ({ ...value, timeStamp }))
        .forEach((activity) => {
          const fromTimeStamp = new Date(+activity.timeStamp);
          const dayOfWeek = fromTimeStamp.getDay();
          createData[dayOfWeek].workouts ++;
        });

      setDuration(createData);
    } catch (error) {
      alert("Error fetching duration:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDuration(user.displayName);
  }, [user.displayName]);

  return (
    <Flex
      position="relative"
      w="100vw"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <BarChart
        width={750}
        height={350}
        data={duration}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="day" />
        <YAxis
          label={{ value: "Workouts", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Bar dataKey="workouts" fill={redColor} />
      </BarChart>
    </Flex>
  );
};

export default TotalWorkOutChart;
