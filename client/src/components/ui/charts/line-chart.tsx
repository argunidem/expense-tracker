"use client";

import ChartContainer from "@/components/sections/dashboard/chart-container";
import {
   LineChart as Chart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";

const data = [
   {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
   },
   {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
   },
   {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
   },
   {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
   },
   {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
   },
   {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
   },
   {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
   },
];

const LineChart = () => {
   return (
      <ChartContainer>
         <ResponsiveContainer
            width='100%'
            height='100%'
         >
            <Chart
               width={500}
               height={300}
               data={data}
               margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
               }}
            >
               <CartesianGrid stroke='#54585d53' />
               <XAxis
                  dataKey='name'
                  fontSize={12}
               />
               <YAxis />
               <Tooltip
                  cursor={{ stroke: "#545e6963" }}
                  contentStyle={{ backgroundColor: "#484c55", borderWidth: 0, borderRadius: "6px" }}
                  labelStyle={{ color: "#bdbec0" }}
               />
               <Legend />
               <Line
                  type='monotone'
                  dataKey='pv'
                  stroke='#4caf84'
                  activeDot={{ r: 5 }}
               />
               <Line
                  type='monotone'
                  dataKey='uv'
                  stroke='#b55959'
               />
            </Chart>
         </ResponsiveContainer>
      </ChartContainer>
   );
};

export default LineChart;
