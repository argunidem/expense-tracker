"use client";

import ChartContainer from "@/components/ui/charts/chart-container";
import { PieChart as Chart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const COLORS = ["#3f576d", "#3d8174", "#aa8b49", "#a54545", "#5845a5", "#a54568", "#4ab675"];

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

interface PieChartProps {
   data: {
      name: string;
      amount: number;
   }[];
}

const PieChart = ({ data }: PieChartProps) => {
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
                  dataKey='amount'
               >
                  {data &&
                     data.map((entry, index) => (
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
                  formatter={(value: number) => `$${value}`}
               />
            </Chart>
         </ResponsiveContainer>
      </ChartContainer>
   );
};

export default PieChart;
