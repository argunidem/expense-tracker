import HomeHeader from "@/components/ui/header";
import HomeDashboard from "@/components/sections/private/home/home-dashboard";
import { Separator } from "@/components/ui/separator";

const HomePage = () => {
   return (
      <>
         <HomeHeader title={"Home"} />
         <Separator className='my-4' />
         <HomeDashboard />
      </>
   );
};

export default HomePage;
