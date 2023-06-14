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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import DividerHeader from "../../components/Goals/Divider";
import { getAllCreatedUsers } from "../../services/user.service";
import { getLastMonth } from "../../services/admin.service";
import { MONTH_MS } from "../../common/constants";

const NewUsersStats = () => {
  const [users, setUsers] = useState("");
  const [totalUsers, setTotalUsers] = useState(0);
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const [today, setToday] = useState();
  const [startPeriod, setStartPeriod] = useState();

  useEffect(() => {
    setLoading(true);
    getAllCreatedUsers()
      .then((users) => {
        const now = new Date();
        const start = new Date(now - MONTH_MS);
        setUsers(users);
        setTotalUsers(Object.keys(users).length);
        const lastMonth = getLastMonth();
        const createData = lastMonth.map((date) => ({
          date: date,
          newUsers: 0,
        }));
        Object.keys(users).forEach((user) => {
          const userSignUpDate = new Date(users[user]["createdOn"]);
          createData.map((el) => {
            if (
              el.date === userSignUpDate.getDate() &&
              userSignUpDate.getTime() > now - MONTH_MS
            ) {
              el.newUsers++;
            }
          });
        });
        setData(createData);
        setToday(
          now.toLocaleDateString("en-US", { month: "long", day: "numeric" })
        );
        setStartPeriod(
          start.toLocaleDateString("en-US", { month: "long", day: "numeric" })
        );
      })
      .catch((e) => console.log(e))
      .finally(setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <DividerHeader heading={`New users by days`} />
      <Box marginTop={"10"}>
        <Stat textAlign={"center"}>
          <StatLabel>New Users</StatLabel>
          <StatNumber>{totalUsers}</StatNumber>
          <StatHelpText>
            {startPeriod} - {today}
          </StatHelpText>
        </Stat>
      </Box>
      <Box marginX={"auto"} w={"fit-content"} marginTop={"10"}>
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
                  value: "New users",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip />
              <Bar dataKey="newUsers" fill={redColor} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Box>
    </>
  );
};

export default NewUsersStats;
