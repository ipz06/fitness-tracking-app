import { Flex, Heading, Box, Text } from "@chakra-ui/react"
import DurationChart from "../../components/StatsCharts/DurationChart"
import CaloriesChart from "../../components/StatsCharts/CaloriesChart"
import TotalWorkOutChart from "../../components/StatsCharts/totalWorkOutChart"
import MealNutritionChart from "../../components/StatsCharts/MealNutritionChart"
import DividerHeader from "../../components/Goals/Divider"
import { useContext, useState, useEffect } from "react"
import { AuthContext } from "../../common/context"
import { getActivityByDate } from "../../services/log.service"
import { getNutrition } from "../../services/nutrition.service"
import WaterConsumptionChart from "../../components/StatsCharts/WaterConsumption"
import { modifyDate, toHoursAndMinutes } from "../../common/helpFn"
import MenuForToday from "../../components/StatsCharts/MenuForToday"
import useBmrFormula from "../../hooks/useBmrFormula"

const Stats = () => {
  const [loading, setLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const { user } = useContext(AuthContext);
  const [calories, setCalories] = useState(0);
  const [workOuts, setWorkouts] = useState(0);
  const [calNutrition, setCalNutrition] = useState([]);

  const bmrFormula = useBmrFormula();

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const timeStampSundayOfThisWeek = today.setDate(today.getDate() - today.getDay());
    const sunday = new Date(timeStampSundayOfThisWeek).toISOString();
    const afterSevenDays = (today.setDate(today.getDate() + 6));
    const afterSevenDaysDate = new Date(afterSevenDays).toISOString();

      const getDuration = async (handle) => {
        try {
          setLoading(true);
          const fetchDuration = await getActivityByDate(handle);    
         const durations =  Object.values(fetchDuration)
            .reduce((durations, activity) =>  durations + (+activity.duration), 0);

         const caloriesBurnt = Object.values(fetchDuration)
            .reduce((cal, activity) => cal + (+activity.caloriesBurned) ,0);

        const workOutsCount = Object.values(fetchDuration).length;
    
          setDuration(durations);
          setCalories(caloriesBurnt);
          setWorkouts(workOutsCount);
        } catch (error) {
          return "Error fetching duration:", error;
        } finally {
          setLoading(false);
        }
      };
    
      useEffect(() => {
        getDuration(user.displayName);
      }, [user.displayName]);

      const getCaloriesFromNutrition = async (user) => {
        try {
          setLoading(true);
          const fetchCalFromNutrition = await getNutrition(user.displayName);    
          const kcal = Object.values(fetchCalFromNutrition).filter(meal => {
            const today = new Date().toISOString();
           const dayOfMonth = today.slice(8,10);
           const addedMeal = meal.addOn.slice(0,2);
           if (dayOfMonth === addedMeal) {
            return meal;
           }
          })
    
          setCalNutrition(kcal);
        } catch (error) {
          return "Error fetching calories:", error;
        } finally {
          setLoading(false);
        }
      };

      useEffect(() => {
        getCaloriesFromNutrition(user);
      }, [user]);

    return (
        <Flex 
        flexDir="column" 
        alignItems="center" 
        w="100%"
        justifyContent="center"
        paddingX="16px"
        >
            
            <Heading 
            fontSize={{ base: "sm", sm: "md", md: "2xl" }} 
            fontWeight="bold" 
            fontStyle="normal" 
            paddingBottom={50}
            >
                DETAILED STATS
            </Heading>
            <Flex paddingBottom={10}  >
            <Text
            fontWeight="bold"
            fontStyle="normal">{modifyDate(sunday)} - {modifyDate(afterSevenDaysDate)}
            </Text>
            </Flex>
            <Flex  justifyContent="space-between" gap={{base:"5", md: "20"}} paddingBottom={10} >
                <Flex 
                direction="column"
            >
                    <Heading
                    fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} >
                    {toHoursAndMinutes(duration)}
                    <br/> 
                    </Heading>
                    <Text fontStyle="normal"
                    color="gray.600" 
                    paddingLeft={-1}
                    fontSize={{ base: "10px", sm: "md", md: "lg" }} >
                    
                    Duration
                    </Text>
                </Flex>
                <Flex 
                direction="column"
            >
                    <Heading 
                    fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} >
                    {calories.toFixed(1)}
                    <br/> 
                    </Heading>
                    <Text fontStyle="normal" 
                    color="gray.600"
                    paddingLeft={-1}
                    fontSize={{ base: "10px", sm: "sm", md: "md" }} >
                    Calories (kcal) Burnt
                    </Text>
                </Flex>
                <Flex 
                direction="column"
            >
                    <Heading 
                    fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} >
                    {workOuts}
                    <br/> 
                    </Heading>
                    <Text fontStyle="normal"
                     color="gray.600"
                     paddingLeft={-1}
                     fontSize={{ base: "10px", sm: "sm", md: "md" }} >
                    Workouts
                    </Text>
                </Flex>
                <Flex 
                direction="column"
            >
                    <Heading 
                    fontSize={{ base: "xl", sm: "2xl", md: "4xl" }} >
                    {bmrFormula}
                    <br/> 
                    </Heading>
                    <Text fontStyle="normal"
                    color="gray.600" 
                    paddingLeft={-1}
                    fontSize={{ base: "10px", sm: "sm", md: "md" }} >
                    Your BMR
                    </Text>
                </Flex>
            </Flex>
            
            <Box w="100%" paddingBottom={50}> 
                <DividerHeader heading={'duration (min)'} />
                <DurationChart />
                <DividerHeader heading={'calories burnt'} />
                <CaloriesChart />
                <DividerHeader heading={'total workouts'} />
                <TotalWorkOutChart />
                <DividerHeader heading={'water consumption'} /> 
                <WaterConsumptionChart />
                <DividerHeader heading={'daily calorie balance'} /> 
                <MealNutritionChart />
                <DividerHeader heading={'meals of today /scroll to view/'} /> 
                <MenuForToday />
            </Box>
            
        </Flex>
    )
}

export default Stats;