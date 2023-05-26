import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ReferenceLine } from "recharts";
import { redColor } from "../../common/constants";

const WeightBarChart = ({value})=>{

   const data = [{
      'name':'Weight',
      'weightToChange':value
   }]

   return (
      <BarChart width={80} height={85} data={data}>
         {/* <CartesianGrid strokeDasharray="3 3" /> */}
         {/* <XAxis dataKey="name" fontSize={'5'} /> */}
         <YAxis fontSize={'5'} type="number" domain={[-10,+10]} tickSize={'2'}  />
         <Bar dataKey='weightToChange' fill={redColor} />
         <ReferenceLine y={0} stroke="#000" />
      </BarChart>  
   )

}

export default WeightBarChart