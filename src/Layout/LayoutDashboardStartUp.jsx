import Sidebar from '../Components/Sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';
import { Dash,Ship,Offers,Contact,Setting } from '../Components/SidebarIcon';
import Avatar2 from '../assets/Avatar2.jpg';
export default function Layout() {
  const location = useLocation();

  // لو الباث فيه offers/chat (حتى لو فيه ID بعده)
  const hideSidebar = location.pathname.startsWith('/offers/chat');
  const navLinks = [
    { to: "/dashboard", label: "Dashboard" ,  icon: Dash  },
    { to: "shipments", label: "Shipments",icon:Ship },
    { to: "offers", label: "Offers",icon:Offers },
    { to: "contact", label: "Contact",icon:Contact },
    { to: "settings", label: "Setting",icon:Setting },
  ];
  const userName=(localStorage.getItem("userNameStartUP") || "").split(" ").slice(0, 2).join(" ");
  return (
    <div className="min-h-screen flex">
      {/* Sidebar ثابت إلا في صفحات معينة */}
      {!hideSidebar && <Sidebar userName={userName} userAvatar={Avatar2} navLinks={navLinks} />}

      {/* Main Content */}
   <main className="flex-1 p-4 overflow-y-auto">
  <div className="mt-14">
    <Outlet />
  </div>
</main>

    </div>
  );
}
