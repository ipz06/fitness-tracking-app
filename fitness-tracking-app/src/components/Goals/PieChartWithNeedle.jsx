import { PieChart, Pie, Cell } from 'recharts';
import { redColor } from '../../common/constants';
import PropTypes from "prop-types";

const PieChartWithNeedle = ({value}) => {
   const RADIAN = Math.PI / 180;
   const data = [
   { name: 'A', value:70, color: '#edf2f7' },
   { name: 'B', value: 30, color: redColor },
   
   ];
   const cx = 50;
   const cy = 50;
   const iR = 30;
   const oR = 40;
   
   const needle = (value, data, cx, cy, iR, oR, color) => {
      let total = 0;
      data.forEach((v) => {
        total += v.value;
      });
      const ang = 180.0 * (1 - value / total);
      const length = (iR + 2 * oR) / 3;
      const sin = Math.sin(-RADIAN * ang);
      const cos = Math.cos(-RADIAN * ang);
      const r = 5;
      const x0 = cx + 5;
      const y0 = cy + 5;
      const xba = x0 + r * sin;
      const yba = y0 - r * cos;
      const xbb = x0 - r * sin;
      const ybb = y0 + r * cos;
      const xp = x0 + length * cos;
      const yp = y0 + length * sin;
    
      return [
        <circle cx={x0} cy={y0} r={r} fill={color} stroke="none" key={1} />,
        <path d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} key={2}/>,
      ];
    };

    return (
      <PieChart width={100} height={100}>
        <Pie
          dataKey="value"
          startAngle={180}
          endAngle={0}
          data={data}
          cx={cx}
          cy={cy}
          innerRadius={iR}
          outerRadius={oR}
          fill="#8884d8"
          stroke="none"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        {needle(value, data, cx, cy, iR, oR, 'grey')}
      </PieChart>
    )
}

export default PieChartWithNeedle

PieChartWithNeedle.propTypes = {
  value: PropTypes.number.isRequired,
  
};