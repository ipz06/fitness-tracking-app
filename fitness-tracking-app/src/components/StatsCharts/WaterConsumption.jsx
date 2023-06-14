import { useState, useEffect, useContext } from "react";
import {
  BarChart,
  XAxis,
  YAxis,
  Bar,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";
import { getWaterConsumption } from "../../services/log.service";
import { redColor } from "../../common/constants";
import { Card, Flex } from "@chakra-ui/react";

const WaterConsumptionChart = () => {
  const [loading, setLoading] = useState(false);
  const [waterConsumption, setWaterConsumption] = useState([]);
  const { user } = useContext(AuthContext);

  const getWater = async (handle) => {
    try {
      setLoading(true);
      const fetchWaterConsumption = await getWaterConsumption(handle);
      const createData = days.map((day) => ({ day: day, dailyWater: 0 }));

      Object.values(fetchWaterConsumption).forEach((waterList) => {
        const fromTimeStamp = new Date(+waterList.timestamp);
        const dayOfWeek = fromTimeStamp.getDay();
        createData[dayOfWeek].dailyWater += Number(waterList.dailyWater);
      });

      setWaterConsumption(createData);
    } catch (error) {
      console.log("Error fetch water consumption:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWater(user.displayName);
  }, [user.displayName]);

  if (waterConsumption.length !== 0) {
    return (
      <Flex
        justifyContent="center"
        paddingX="16px"
        marginBottom={5}
        marginTop={5}
      >
        <Card
          h={{ base: "200px", md: "300px", lg: "400px" }}
          w={{ base: "400px", md: "2xl", lg: "3xl" }}
          marginX={"auto"}
        >
          <ResponsiveContainer w="100%" h={300}>
            <BarChart
              data={waterConsumption}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
            >
              <XAxis dataKey="day" />
              <YAxis
                label={{ value: "litre", angle: -90, position: "insideLeft" }}
              />
              <Tooltip />
              <Bar dataKey="dailyWater" fill={redColor} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </Flex>
    );
  }
};

export default WaterConsumptionChart;
