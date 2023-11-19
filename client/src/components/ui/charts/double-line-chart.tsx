import ChartContainer from "@/components/ui/charts/chart-container";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { MappedBudgetData } from "@/interfaces/budget";

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

const DoubleLineChart = ({ data, title }: { data: MappedBudgetData[]; title: string }) => {
   return (
      <ChartContainer
         title={title}
         dataExists={data.length > 0}
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
      </ChartContainer>
   );
};

export default DoubleLineChart;
