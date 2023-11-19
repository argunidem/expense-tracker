"use client";

import ChartContainer from "@/components/ui/charts/chart-container";
import { useDetails, useModal } from "@/hooks/store";
import { MappedBudgetData } from "@/interfaces/budget";
import { BarChart as Chart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

interface DoubleBarChartProps {
   data: MappedBudgetData[];
   title: string;
}

const CustomTooltip = ({ active, payload, label }: any) => {
   if (active && payload && payload.length) {
      return (
         <div className='bg-[#000000bb] p-4 rounded-md space-y-1'>
            <p className='text-[#fefefe]'>{payload[0]?.payload.name || label}</p>
            <p style={{ color: payload[0]?.color }}>Income: ${payload[0]?.value}</p>
            <p style={{ color: payload[1]?.color }}>Expense: ${payload[1]?.value}</p>
         </div>
      );
   }

   return null;
};

const DoubleBarChart = ({ data, title }: DoubleBarChartProps) => {
   const { toggleModal } = useModal();
   const { setData } = useDetails();

   const handleClick = (e: any) => {
      setData(e.payload, "budget");
      toggleModal("details");
   };

   return (
      <ChartContainer
         title={title}
         dataExists={data.length > 0}
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
               tickFormatter={(_value: string, index) => data[index].date}
               fontSize={12}
            />
            <YAxis />
            <Tooltip
               cursor={{ opacity: 0 }}
               content={<CustomTooltip />}
            />
            <Legend />
            <Bar
               dataKey='income'
               onClick={(e) => handleClick(e)}
               className='cursor-pointer'
               fill='#9ba3b3'
               maxBarSize={60}
            />
            <Bar
               dataKey='expense'
               onClick={(e) => handleClick(e)}
               className='cursor-pointer'
               fill='#938348'
               maxBarSize={60}
            />
         </Chart>
      </ChartContainer>
   );
};

export default DoubleBarChart;
