import Sidebar from '../Components/Sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Dash,Ship,Offers,Partners,Setting } from '../Components/SidebarIcon';
import Avatar from '../assets/Avatar.png';
export default function LayoutAdmin() {
  const location = useLocation();

  // لو الباث فيه offers/chat (حتى لو فيه ID بعده)
  const hideSidebar = location.pathname.startsWith('/offers/chat');
  const navLinks = [
    { to: "/dashboardAdmin", label: "Dashboard" ,  icon: Dash  },
    { to: "Partners", label: "Partners",icon:Partners },
    { to: "SettingAdmin", label: "Setting",icon:Setting },

 
  ];
  const userName='Bayu Sasmita';
     
  return (
    <div className="min-h-screen flex">
      {/* Sidebar ثابت إلا في صفحات معينة */}
      {!hideSidebar && <Sidebar    userAvatar={Avatar} userName={userName} navLinks={navLinks} />}

      {/* Main Content */}
   <main className="flex-1 p-4 overflow-y-auto">
  <div className="mt-14">
    <Outlet />
  </div>
</main>

    </div>
  );
}
