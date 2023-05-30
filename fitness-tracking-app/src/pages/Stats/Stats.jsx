import { Flex } from "@chakra-ui/react"
import DurationChart from "../../components/StatsCharts/DurationChart"
import { useContext, useEffect, useState } from "react"
import CaloriesChart from "../../components/StatsCharts/CaloriesChart"
import TotalWorkOutChart from "../../components/StatsCharts/totalWorkOutChart"


const Stats = () => {

   

    return (
        <Flex flexDir="column" alignItems="center">
            <DurationChart />
            <CaloriesChart />
            <TotalWorkOutChart />
        </Flex>
    )
}

export default Stats;