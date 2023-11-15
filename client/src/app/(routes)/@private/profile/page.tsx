import ProfileHeader from "@/components/ui/header";
import ProfileForm from "@/components/sections/private/profile/profile-form";
import { Separator } from "@/components/ui/separator";

const ProfilePage = () => {
   return (
      <>
         <ProfileHeader
            title={"Profile"}
            subtitle={"Details"}
         />
         <Separator className='my-4' />
         <ProfileForm />
      </>
   );
};

export default ProfilePage;
