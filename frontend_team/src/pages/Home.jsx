import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="
      min-h-screen
      bg-gradient-to-r
      from-blue-500
      to-blue-700
      flex
      items-center
      justify-center
    ">

      <div className="
        bg-white
        p-10
        rounded-2xl
        shadow-2xl
        text-center
        w-[400px]
      ">

        <h1 className="
          text-4xl
          font-bold
          text-blue-600
        ">
          Team Task Manager
        </h1>

        <p className="
          mt-4
          text-gray-600
        ">
          Manage projects, tasks and teams efficiently.
        </p>

        <div className="
          flex
          gap-4
          mt-8
          justify-center
        ">

          <Link
            to="/login"
            className="
              bg-blue-600
              text-white
              px-6
              py-2
              rounded-lg
            "
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="
              border
              border-blue-600
              text-blue-600
              px-6
              py-2
              rounded-lg
            "
          >
            Signup
          </Link>

        </div>

      </div>

    </div>
  );
}

export default Home;