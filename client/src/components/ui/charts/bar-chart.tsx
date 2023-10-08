"use client";

import { useEffect, useState } from "react";
import ChartContainer from "@/components/sections/dashboard/chart-container";
import {
   BarChart as Chart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";

const getAllExpenses = async () => {
   const response = await fetch("http://localhost:5000/api/expenses", {
      credentials: "include",
      cache: "no-store",
   });

   const { data } = await response.json();

   return data;
};

const data = [
   {
      date: "January",
      income: 380,
      expense: 220,
   },
   {
      date: "February",
      income: 300,
      expense: 200,
   },
   {
      date: "March",
      income: 200,
      expense: 400,
   },
   {
      date: "April",
      income: 100,
      expense: 200,
   },
   {
      date: "May",
      income: 330,
      expense: 180,
   },
];

const BarChart = () => {
   // const [data, setData] = useState([]);

   // useEffect(() => {
   //    const fetchData = async () => {
   //       const expenses = await getAllExpenses();
   //       setData(expenses);
   //    };
   //    fetchData();
   // }, []);

   return (
      <ChartContainer>
         <ResponsiveContainer
            width='100%'
            height='100%'
         >
            <Chart
               data={data}
               margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
               }}
            >
               <CartesianGrid stroke='#54585d52' />
               <XAxis
                  dataKey='date'
                  fontSize={12}
               />
               <YAxis />
               <Tooltip
                  cursor={{ opacity: 0 }}
                  contentStyle={{
                     backgroundColor: "#484c55",
                     borderWidth: 0,
                     borderRadius: "6px",
                  }}
                  labelStyle={{ color: "#bdbec0" }}
               />
               <Legend />
               <Bar
                  dataKey='income'
                  fill='#9ba3b3'
                  maxBarSize={60}
               />
               <Bar
                  dataKey='expense'
                  fill='#938348'
                  maxBarSize={60}
               />
            </Chart>
         </ResponsiveContainer>
      </ChartContainer>
   );
};

export default BarChart;
