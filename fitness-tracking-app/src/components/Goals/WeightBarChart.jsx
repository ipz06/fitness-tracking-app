import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ReferenceLine } from "recharts";
import { redColor } from "../../common/constants";

const WeightBarChart = ({value})=>{

   const data = [{
      'name':'Weight',
      'weightToChange':value
   }]

   return (
      <BarChart width={85} height={90} data={data}>
         <YAxis fontSize={'8'} type="number" domain={[-5,+5]} tickSize={'5'} tickCount={3} />
         <Bar dataKey='weightToChange' fill={redColor} />
         <ReferenceLine y={0} stroke="#82ca9d" strokeWidth={'3'} />
      </BarChart>  
   )

}

export default WeightBarChart