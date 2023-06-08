import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { redColor } from "../../common/constants";
import { Button, Card, Flex, Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";
import { getActivityByDate } from "../../services/log.service";

const DurationChart = () => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState([]);
  const { user } = useContext(AuthContext);

  const getDuration = async (handle) => {
    try {
      setLoading(true);
      const fetchDuration = await getActivityByDate(handle);
      const createData = days.map((day) => ({ day: day, minutes: 0 }));

      Object.values(fetchDuration)
        .forEach((activity) => {
          const fromTimeStamp = new Date(+activity.timestamp);
          const dayOfWeek = fromTimeStamp.getDay();
          createData[dayOfWeek].minutes += Number(activity.duration);
      });

      setDuration(createData);
    } catch (error) {
      return "Error fetching duration:", error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDuration(user.displayName);
  }, [user.displayName]);

  if (duration.length !== 0) {
    return (
      <Flex justifyContent="center" paddingX="16px">
        <Card
          h={{ base: "200px", md: "300px", lg: "400px" }}
          w={{ base: "400px", md: "2xl", lg: "3xl" }}
          marginX={"auto"}
        >
          <ResponsiveContainer w="100%" h={300}>
            <BarChart
              data={duration}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis dataKey="day" />
              <YAxis
                label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Bar dataKey="minutes" fill={redColor} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Flex>
    );
  }
};

export default DurationChart;
