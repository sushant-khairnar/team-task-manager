import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="flex">

      <Sidebar />

      <div className="
        flex-1
        bg-gray-100
        min-h-screen
      ">

        <Navbar />

        <div className="p-6">
          {children}
        </div>

      </div>

    </div>
  );
}

export default Layout;