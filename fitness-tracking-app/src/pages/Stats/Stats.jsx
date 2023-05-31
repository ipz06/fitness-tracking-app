import { Flex, Heading } from "@chakra-ui/react"
import DurationChart from "../../components/StatsCharts/DurationChart"
import CaloriesChart from "../../components/StatsCharts/CaloriesChart"
import TotalWorkOutChart from "../../components/StatsCharts/totalWorkOutChart"
import MealNutritionChart from "../../components/StatsCharts/MealNutritionChart"
const Stats = () => {

   

    return (
        <Flex flexDir="column" alignItems="center" w="100%">
            <Heading size="md" fontWeight="bold" fontStyle="normal" paddingBottom={50}>DETAILED STATS</Heading>
            <DurationChart />
            <CaloriesChart />
            <TotalWorkOutChart />
            <MealNutritionChart />
        </Flex>
    )
}

export default Stats;