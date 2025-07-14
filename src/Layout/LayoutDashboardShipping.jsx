import Sidebar from '../Components/Sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Dash,Ship,Offers,Contact,Setting } from '../Components/SidebarIcon';
import Avatar from '../assets/Avatar.png';
export default function LayoutShipping() {
  const location = useLocation();

  // لو الباث فيه offers/chat (حتى لو فيه ID بعده)
  const hideSidebar = location.pathname.startsWith('/offers/chat');
  const navLinks = [
    { to: "/dashboardShipping", label: "Dashboard" ,  icon: Dash  },
    { to: "shipmentsShipping", label: "Shipments",icon:Ship },
    { to: "offersShipping", label: "Offers",icon:Offers },
    { to: "contactShipping", label: "Contact",icon:Contact },
    { to: "settingsShipping", label: "Setting",icon:Setting },
  ];
  const userName='Bayu Sasmita';
      // const userName=(localStorage.getItem("userNameShipping") || "").split(" ").slice(0, 2).join(" ");
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
