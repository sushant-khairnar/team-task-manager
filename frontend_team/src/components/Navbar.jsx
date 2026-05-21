import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {

    // CLEAR STORAGE
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    // REDIRECT
    navigate("/login");

    // FORCE REFRESH
    window.location.reload();
  };

  return (
    <div className="
      bg-white
      shadow
      p-4
      flex
      justify-between
      items-center
    ">

      <h1 className="
        text-2xl
        font-bold
        text-blue-700
      ">
        Dashboard
      </h1>

      <div className="
        flex
        items-center
        gap-4
      ">

        <div>

          <p className="
            font-semibold
          ">
            {user?.name}
          </p>

          <p className="
            text-sm
            text-gray-500
          ">
            {user?.role}
          </p>

        </div>

        <button
          type="button"
          onClick={handleLogout}
          className="
            bg-red-500
            hover:bg-red-600
            text-white
            px-4
            py-2
            rounded-lg
          "
        >
          Logout
        </button>

      </div>

    </div>
  );
}

export default Navbar;