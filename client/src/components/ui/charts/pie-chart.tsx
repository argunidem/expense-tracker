"use client";

import ChartContainer from "@/components/ui/charts/chart-container";
import { PieChart as Chart, Pie, Sector, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
   { name: "Group A", value: 400 },
   { name: "Group B", value: 300 },
   { name: "Group C", value: 300 },
   { name: "Group D", value: 200 },
];

// const COLORS = ["#4a657c", "#488f82", "#b99852", "#b34a4a"];
// const COLORS = ["#3b5b76dc", "#3d8073df", "#b99852df", "#b34a4ad9"];
const COLORS = ["#3f576d", "#3d8174", "#aa8b49", "#a54545"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
   cx,
   cy,
   midAngle,
   innerRadius,
   outerRadius,
   percent,
   index,
}: any) => {
   const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
   const x = cx + radius * Math.cos(-midAngle * RADIAN);
   const y = cy + radius * Math.sin(-midAngle * RADIAN);

   return (
      <text
         x={x}
         y={y}
         fill='white'
         textAnchor={x > cx ? "start" : "end"}
         dominantBaseline='central'
      >
         {`${(percent * 100).toFixed(0)}%`}
      </text>
   );
};

const PieChart = () => {
   return (
      <ChartContainer>
         <ResponsiveContainer
            width='100%'
            height='100%'
         >
            <Chart>
               <Pie
                  data={data}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  label={renderCustomizedLabel}
                  outerRadius={140}
                  style={{ outline: "none" }}
                  fill='#8884d8'
                  dataKey='value'
               >
                  {data.map((entry, index) => (
                     <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                        stroke='#3b3b3b'
                        style={{ outline: "none" }}
                     />
                  ))}
               </Pie>
               <Tooltip
                  contentStyle={{
                     backgroundColor: "#00000094",
                     padding: "1.2rem",
                     borderWidth: 0,
                     borderRadius: "6px",
                  }}
                  itemStyle={{ color: "#fefefe" }}
               />
            </Chart>
         </ResponsiveContainer>
      </ChartContainer>
   );
};

export default PieChart;
