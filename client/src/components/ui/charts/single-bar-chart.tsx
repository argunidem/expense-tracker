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
import useModal from "@/hooks/store/use-modal";
import useDetails from "@/hooks/store/use-details";
import { useTheme } from "next-themes";
import { X, Check } from "lucide-react";
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
   tooltipText?: string;
}

const CustomTooltip = ({ active, payload, label, tooltipText }: any) => {
   if (active && payload && payload.length) {
      const formattedName = payload[0]?.name.charAt(0).toUpperCase() + payload[0]?.name.slice(1);
      const regularExists = payload[0]?.payload.regular !== undefined;

      return (
         <div className='bg-[#000000bb] p-4 rounded-md space-y-1'>
            <p className='text-[#fefefe]'>{payload[0]?.payload.name || label}</p>
            <p style={{ color: payload[0]?.color }}>
               {tooltipText || formattedName}: ${payload[0]?.value}
            </p>
            {regularExists && (
               <p className='flex items-center space-x-2'>
                  <span style={{ color: payload[0]?.color }}>Regular: </span>
                  {payload[0]?.payload.regular ? (
                     <Check
                        size={18}
                        className='text-emerald-400 mt-0.5'
                     />
                  ) : (
                     <X
                        size={18}
                        className='text-red-400 mt-0.5'
                     />
                  )}
               </p>
            )}
         </div>
      );
   }

   return null;
};

const SingleBarChart = ({
   data,
   color: { dark, light, default: defaultColor },
   dataKeys: { bar },
   tooltipText,
}: SingleBarChartProps) => {
   const { toggleModal } = useModal();
   const { setData } = useDetails();
   const { theme } = useTheme();

   let color = defaultColor ?? (theme === "dark" ? dark : light);

   const handleClick = (e: any) => {
      const modalKey = tooltipText?.startsWith("Total") ? "budget" : "transaction";
      setData(e.payload, modalKey);
      toggleModal("details");
   };

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
                  tickFormatter={(_value: string, index) => data[index].date}
                  fontSize={12}
               />
               <YAxis />
               <Tooltip
                  cursor={{ opacity: 0 }}
                  content={<CustomTooltip tooltipText={tooltipText} />}
               />
               <Legend layout='vertical' />
               <Bar
                  dataKey={bar}
                  onClick={(e) => handleClick(e)}
                  className='cursor-pointer'
                  fill={color}
                  maxBarSize={60}
               />
            </Chart>
         </ResponsiveContainer>
      </ChartContainer>
   );
};

export default SingleBarChart;
