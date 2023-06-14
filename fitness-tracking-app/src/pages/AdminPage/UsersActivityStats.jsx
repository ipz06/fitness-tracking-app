import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { redColor } from "../../common/constants";
import {
  Box,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  Flex,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DividerHeader from "../../components/Goals/Divider";
import { getLastMonth } from "../../services/admin.service";
import { MONTH_MS } from "../../common/constants";
import { getAllUsersActivitiesLogs } from "../../services/user.service";
import { updateGraphData } from "../../services/admin.service";
import { calculateTotalActivities } from "../../services/admin.service";

const UserActivityStats = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [totalActivities, setTotalActivities] = useState();
  const [today, setToday] = useState();
  const [startPeriod, setStartPeriod] = useState();

  useEffect(() => {
    setLoading(true);
    getAllUsersActivitiesLogs()
      .then((logs) => {
        const now = new Date();
        const start = new Date(now - MONTH_MS);
        const lastMonth = getLastMonth();
        let createData = lastMonth.map((date) => ({
          date: date,
          loggedActivities: 0,
        }));
        setData(updateGraphData(logs, createData));
        setToday(
          now.toLocaleDateString("en-US", { month: "long", day: "numeric" })
        );
        setStartPeriod(
          start.toLocaleDateString("en-US", { month: "long", day: "numeric" })
        );
      })
      .finally(setLoading(false));
  }, []);

  useEffect(() => {
    if (data) {
      setTotalActivities(calculateTotalActivities(data));
    }
  }, [data]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DividerHeader heading={`Logged exercises by days`} />
      <Box marginTop={"10"}>
        <Stat textAlign={"center"}>
          <StatLabel>Total Activities</StatLabel>
          <StatNumber>{totalActivities}</StatNumber>
          <StatHelpText>
            {startPeriod} - {today}
          </StatHelpText>
        </Stat>
      </Box>

      <Flex justifyContent="center" paddingX="16px">
        <Card
          h={{ base: "200px", md: "300px", lg: "400px" }}
          w={{ base: "400px", md: "2xl", lg: "3xl" }}
          marginX={"auto"}
        >
          <ResponsiveContainer w="100%" h={300}>
            <BarChart
              width={700}
              height={300}
              data={data}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis dataKey="date" />
              <YAxis
                label={{
                  value: "Logged exercises",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar dataKey="loggedActivities" fill={redColor} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Flex>
    </>
  );
};

export default UserActivityStats;
