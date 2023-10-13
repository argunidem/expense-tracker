"use client";

import ChartContainer from "@/app/(routes)/@private/(dashboard)/components/chart-container";
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
      pv: 2400,
      amt: 2400,
   },
   {
      name: "Page B",
      pv: 1398,
      amt: 2210,
   },
   {
      name: "Page C",
      pv: 9800,
      amt: 2290,
   },
   {
      name: "Page D",
      pv: 3908,
      amt: 2000,
   },
   {
      name: "Page E",
      pv: 4800,
      amt: 2181,
   },
   {
      name: "Page F",
      pv: 3800,
      amt: 2500,
   },
   {
      name: "Page G",
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
                  contentStyle={{
                     backgroundColor: "#000000bb",
                     borderWidth: 0,
                     borderRadius: "6px",
                  }}
                  labelStyle={{ color: "#fefefe" }}
               />
               <Legend />
               <Line
                  type='monotone'
                  dataKey='pv'
                  stroke='#4caf84'
                  activeDot={{ r: 5 }}
               />
            </Chart>
         </ResponsiveContainer>
      </ChartContainer>
   );
};

export default LineChart;
