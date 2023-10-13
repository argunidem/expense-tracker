import ChartContainer from "@/app/(routes)/@private/(dashboard)/components/chart-container";
import {
   LineChart,
   Line,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ResponsiveContainer,
} from "recharts";

interface DoubleLineChartProps {
   data: {
      name: string;
      month: string;
      expense: number;
      income: number;
   }[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
   if (active && payload && payload.length) {
      return (
         <div className='bg-[#000000b0] p-4 rounded-md space-y-1 dark:bg-[#0000006a]'>
            <p className='text-[#fefefe]'>{payload[0]?.payload.name || label}</p>
            <p style={{ color: payload[0]?.color }}>
               Total {payload[0]?.name}: ${payload[0]?.value}
            </p>
            <p className='text-rose-500/60 dark:text-rose-400/60'>
               Total {payload[1]?.name}: ${payload[1]?.value}
            </p>
         </div>
      );
   }

   return null;
};

const DoubleLineChart = ({ data }: DoubleLineChartProps) => {
   return (
      <ChartContainer>
         <ResponsiveContainer
            width='100%'
            height='100%'
         >
            <LineChart
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
                  content={<CustomTooltip />}
               />
               <Legend />
               <Line
                  type='monotone'
                  dataKey='income'
                  stroke='#4caf84'
                  activeDot={{ r: 5 }}
               />
               <Line
                  type='monotone'
                  dataKey='expense'
                  stroke='#b55959'
               />
            </LineChart>
         </ResponsiveContainer>
      </ChartContainer>
   );
};

export default DoubleLineChart;
