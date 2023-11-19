import ChartContainer from "@/components/ui/charts/chart-container";
import {
   BarChart as Chart,
   Bar,
   XAxis,
   YAxis,
   CartesianGrid,
   Tooltip,
   Legend,
   ReferenceLine,
} from "recharts";
import useModal from "@/hooks/store/use-modal";
import useDetails from "@/hooks/store/use-details";
import { useTheme } from "next-themes";
import { X, Check } from "lucide-react";
import { MappedBudgetData } from "@/interfaces/budget";
import { Transaction } from "@/interfaces/transaction";

interface SingleBarChartProps {
   data: MappedBudgetData[] | Transaction[];
   color: {
      dark?: string;
      light?: string;
      default?: string;
   };
   dataKeys: {
      bar: string;
   };
   tooltipText?: string;
   title: string;
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
   title,
}: SingleBarChartProps) => {
   const { toggleModal } = useModal();
   const { setData } = useDetails();
   const { theme } = useTheme();

   let color = defaultColor ?? (theme === "dark" ? dark : light);

   const handleClick = (e: any) => {
      const modalKey = bar === "amount" ? "transaction" : "budget";
      setData(e.payload, modalKey);
      toggleModal("details");
   };

   const dataExists = data.find((item: any) => item[bar] !== 0);

   return (
      <ChartContainer
         title={title}
         dataExists={data.length > 0 && dataExists !== undefined}
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
            <ReferenceLine
               y={0}
               stroke={theme === "dark" ? "#444" : "#aaa"}
               strokeWidth={2}
            />
            <Bar
               dataKey={bar}
               onClick={(e) => handleClick(e)}
               className='cursor-pointer'
               fill={color}
               maxBarSize={60}
            />
         </Chart>
      </ChartContainer>
   );
};

export default SingleBarChart;
