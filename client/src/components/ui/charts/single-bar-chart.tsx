import ChartContainer from "@/app/(routes)/@private/(dashboard)/components/chart-container";
import { MappedExpense } from "@/interfaces/expense";
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

interface SingleBarChartProps {
   data: MappedExpense[];
   color: string;
   dataKeys: {
      bar: string;
   };
   customName?: string;
}

const CustomTooltip = ({ active, payload, label, customName }: any) => {
   const formattedName = payload[0]?.name.charAt(0).toUpperCase() + payload[0]?.name.slice(1);

   if (active && payload && payload.length) {
      return (
         <div className='bg-[#000000bb] p-4 rounded-md space-y-1'>
            <p className='text-[#fefefe]'>{payload[0]?.payload.name || label}</p>
            <p style={{ color: payload[0]?.color }}>
               {customName || formattedName}: ${payload[0]?.value}
            </p>
         </div>
      );
   }

   return null;
};

const SingleBarChart = ({ data, color, dataKeys: { bar }, customName }: SingleBarChartProps) => {
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
                  tickFormatter={(value: string, index) => data[index].date}
                  fontSize={12}
               />
               <YAxis />
               <Tooltip
                  cursor={{ opacity: 0 }}
                  content={<CustomTooltip customName={customName} />}
               />
               <Legend layout='vertical' />
               <Bar
                  dataKey={bar}
                  fill={color}
                  maxBarSize={60}
               />
            </Chart>
         </ResponsiveContainer>
      </ChartContainer>
   );
};

export default SingleBarChart;
