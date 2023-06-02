import { BarChart, XAxis, YAxis, Bar, Tooltip, ResponsiveContainer, ReferenceLine, CartesianGrid } from "recharts";
import { redColor } from "../../common/constants";
import { Flex, Heading, Box, Text } from "@chakra-ui/react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../common/context";
import { days } from "../../common/daysData";
import DividerHeader from "../Goals/Divider";
import { getNutrition } from "../../services/nutrition.service";
import { getUserByHandle } from "../../services/user.service";
import { getDurationActivity } from "../../services/log.service";



const MealNutritionChart = () => {
  const [loading, setLoading] = useState(false);
  const [calories, setCalories] = useState([]);
  const [bmrMale, setBmrMale] = useState(0);
  const [bmrFemale, setBmrFemale] = useState(0);
  const { user, appState, setAppState} = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      const fetchUser = async () => {
        try {
          const userSnapshot = await getUserByHandle(user.displayName);
            
            if (userSnapshot.gender === 'male') {
              const basalMetaMaleFormula = 66 + (13.7 * userSnapshot.weight) + (5 * userSnapshot.height * 100 ) - (6.8 *(new Date().getFullYear() - Number(userSnapshot.birthDate.slice(0,4))));
              // console.log('bmrMale', basalMetaMaleFormula )
              setBmrMale(basalMetaMaleFormula);
            } else {
              const basalMetaFemaleFormula = 655 +(9.6 * userSnapshot.weight) + (1.8 * userSnapshot.height * 100) - (4.7 * (new Date().getFullYear() - Number(userSnapshot.birthDate.slice(0,4))));
              // console.log('bmrFemale', basalMetaFemaleFormula)
              setBmrFemale(basalMetaFemaleFormula);

            }
          
        } catch (error) {
          console.log(error);
        }
      };

      fetchUser();
    }
  }, [user]);

  const getCaloriesFromNutrition = async (user) => {
    try {
      setLoading(true);
      const fetchCalFromNutrition = await getNutrition(user.displayName);
      // const fetchCalories = await getDurationActivity(user.displayName);
      console.log('fetchCalFromNutrition', fetchCalFromNutrition)
      const createData = days.map((day) => ({ day: day, calories: 0 }));

      Object.values(fetchCalFromNutrition)
        .forEach((meal) => {
            const fromTimeStamp = new Date(+meal.timestamp);
            const dayOfWeek = fromTimeStamp.getDay();
            createData[dayOfWeek].calories += Number(meal.calories);
            console.log("MeAL", meal)

          })

      // Object.entries(fetchCalFromNutrition)
      //   .map(([timeStamp, value]) => ({ ...value, timeStamp }))
      //   .forEach((meal) => {
      //     const fromTimeStamp = new Date(+meal.timeStamp);
      //     const dayOfWeek = fromTimeStamp.getDay();
      //     createData[dayOfWeek].calories += Number(meal.calories);
      //   });

        // Object.entries(fetchCalories)
        // .map(([timeStamp, value]) => ({ ...value, timeStamp }))
        // .forEach((activity) => {
        //   const fromTimeStamp = new Date(+activity.timeStamp);
        //   const dayOfWeek = fromTimeStamp.getDay();
        //   createData[dayOfWeek].calories -= Number(activity.caloriesBurned);
        //   // if (createData[dayOfWeek].calories < 0) {
        //   //  createData[dayOfWeek].calories = 0
        //   // }
        // });

      setCalories(createData);
    } catch (error) {
      return("Error fetching calories:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCaloriesFromNutrition(user);
  }, [user]);

 

  if (calories.length !== 0 ) 
   {
  return (
    <Flex
      position="relative"
      w="100%"
      h="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <Flex flexDir="column" alignItems="center" w="100%" h="100%" margin={450}>
      <DividerHeader heading={'daily calorie balance'}></DividerHeader> 
      <ResponsiveContainer width={700} height="50%">
      <BarChart
        width={700}
        height={350}
        data={calories}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <XAxis dataKey="day" />
         <YAxis
          label={{ value: "Calories", angle: -90, position: "insideLeft" }}
          domain={[0, 'auto']}
        />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Bar dataKey="calories" fill={redColor} />
        
        <ReferenceLine y={bmrMale !== 0 ? bmrMale : bmrFemale} label={{ value: "Basal Metabolic Rate", position: "insideBottomLeft"  }} stroke="red"  />

      </BarChart>
      </ResponsiveContainer>
    </Flex>
    </Flex>
  );
  }
};


export default MealNutritionChart;
