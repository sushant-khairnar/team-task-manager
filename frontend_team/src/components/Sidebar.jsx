import {
  Link,
  useLocation,
} from "react-router-dom";

function Sidebar() {

  const location = useLocation();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
    },

    {
      name: "Tasks",
      path: "/tasks",
    },
  ];


  // ONLY ADMIN
  if (user?.role === "Admin") {

    menus.push(
      {
        name: "Projects",
        path: "/projects",
      },

      {
        name: "Team",
        path: "/team",
      }
    );
  }

  return (
    <div className="
      w-64
      bg-blue-700
      text-white
      min-h-screen
      p-5
    ">

      <h1 className="
        text-2xl
        font-bold
        mb-10
      ">
        Task Manager
      </h1>

      <div className="
        flex
        flex-col
        gap-3
      ">

        {menus.map((menu, index) => (

          <Link
            key={index}
            to={menu.path}
            className={`
              p-3
              rounded-lg

              ${
                location.pathname === menu.path
                ? "bg-white text-blue-700"
                : "hover:bg-blue-600"
              }
            `}
          >
            {menu.name}
          </Link>
        ))}

      </div>

    </div>
  );
}

export default Sidebar;