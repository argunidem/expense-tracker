import ChartContainer from "@/components/ui/charts/chart-container";
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
import { useTheme } from "next-themes";
import { MappedExpenseData } from "@/interfaces/expense";
import { MappedIncomeData } from "@/interfaces/income";
import { MappedBudgetData } from "@/interfaces/budget";

interface SingleBarChartProps {
   data: MappedBudgetData[] | MappedExpenseData[] | MappedIncomeData[];
   color: {
      dark?: string;
      light?: string;
      default?: string;
   };
   dataKeys: {
      bar: string;
   };
   customName?: string;
}

const CustomTooltip = ({ active, payload, label, customName }: any) => {
   if (active && payload && payload.length) {
      const formattedName = payload[0]?.name.charAt(0).toUpperCase() + payload[0]?.name.slice(1);
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

const SingleBarChart = ({
   data,
   color: { dark, light, default: defaultColor },
   dataKeys: { bar },
   customName,
}: SingleBarChartProps) => {
   const { theme } = useTheme();

   let color = defaultColor ?? (theme === "dark" ? dark : light);

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
