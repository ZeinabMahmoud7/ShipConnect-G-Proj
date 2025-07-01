import Sidebar from '../Components/Sidebar/Sidebar';
import { Outlet, useLocation } from 'react-router-dom';

export default function Layout() {
  const location = useLocation();

  // لو الباث فيه offers/chat (حتى لو فيه ID بعده)
  const hideSidebar = location.pathname.startsWith('/offers/chat');

  return (
    <div className="min-h-screen flex">
      {/* Sidebar ثابت إلا في صفحات معينة */}
      {!hideSidebar && <Sidebar />}

      {/* Main Content */}
   <main className="flex-1 p-4 overflow-y-auto">
  <div className="mt-4">
    <Outlet />
  </div>
</main>

    </div>
  );
}
