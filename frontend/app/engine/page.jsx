import DrawingMap from "../../components/map3D";
import { createClient } from "../../utils/supabase/server";
import { redirect } from "next/navigation";
export default async function Home() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  console.log('user',user)
  if (!user) {
    redirect('/sign-in');
  }

  return (
    <div className="top-24 relative mx-auto flex justify-center items-center ">
      <DrawingMap user={user} />
    </div>
  );
}
