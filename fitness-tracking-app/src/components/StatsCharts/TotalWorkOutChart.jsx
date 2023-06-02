import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer } from "recharts";
import { redColor } from "../../common/constants";
import { Flex,Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { getActivityByDate } from "../../services/log.service";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";
import DividerHeader from "../Goals/Divider";

const TotalWorkOutChart = () => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState([]);
  const { user } = useContext(AuthContext);

  const getDuration = async (handle) => {
    try {
      setLoading(true);
      const fetchDuration = await getActivityByDate(handle);
      const createData = days.map((day) => ({ day: day, workouts: 0 }));

      Object.values(fetchDuration)
      .forEach((activity) => {
        const fromTimeStamp = new Date(+activity.timestamp);
        const dayOfWeek = fromTimeStamp.getDay();
        createData[dayOfWeek].workouts ++;
      });
      // Object.entries(fetchDuration)
      //   .map(([timeStamp, value]) => ({ ...value, timeStamp }))
      //   .forEach((activity) => {
      //     const fromTimeStamp = new Date(+activity.timeStamp);
      //     const dayOfWeek = fromTimeStamp.getDay();
      //     createData[dayOfWeek].workouts ++;
      //   });

      setDuration(createData);
    } catch (error) {
      return("Error fetching duration:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDuration(user.displayName);
  }, [user.displayName]);

  if (duration.length !== 0) {
  return (
    <Flex
      position="relative"
      w="100%"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >   
        <Flex flexDir="column" alignItems="center" w="100%" h="100%" margin={450}>
        {/* <Text fontStyle='normal' fontWeight="bold">TOTAL WORKOUTS</Text> */}
        <DividerHeader heading={'total workouts'}></DividerHeader> 

      <ResponsiveContainer width={700} height="50%" >
      <BarChart
        width={700}
        height={350}
        data={duration}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="day" />
        <YAxis
          label={{ value: "Workouts", angle: -90, position: "insideLeft" }}
          allowDecimals={false}
        />
        <Tooltip />
        <Bar dataKey="workouts" fill={redColor} />
      </BarChart>
      </ResponsiveContainer>
    </Flex>
    </Flex>
  );
  }
};

export default TotalWorkOutChart;
