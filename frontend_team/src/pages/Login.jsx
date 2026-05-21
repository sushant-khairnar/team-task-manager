import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Login() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        formData
      );

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      toast.success("Login Successful");

      navigate("/dashboard");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Login Failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen
      flex
      items-center
      justify-center
      bg-gradient-to-br
      from-blue-100
      via-white
      to-blue-200
      px-4
    ">

      <div className="
        w-full
        max-w-5xl
        bg-white
        rounded-3xl
        shadow-2xl
        overflow-hidden
        grid
        grid-cols-1
        lg:grid-cols-2
      ">

        {/* LEFT SIDE */}

        <div className="
          hidden
          lg:flex
          flex-col
          justify-center
          bg-blue-700
          text-white
          p-12
          relative
        ">

          <div className="absolute top-0 right-0 w-72 h-72 bg-blue-500 rounded-full opacity-30 blur-3xl"></div>

          <h1 className="
            text-5xl
            font-bold
            leading-tight
            z-10
          ">
            Team Task
            <br />
            Manager
          </h1>

          <p className="
            mt-6
            text-lg
            text-blue-100
            z-10
          ">
            Manage projects, assign tasks,
            and track team productivity
            with a modern workflow.
          </p>

          <div className="
            mt-10
            grid
            grid-cols-2
            gap-5
            z-10
          ">

            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold">24+</h2>
              <p className="text-blue-100 mt-1">Projects</p>
            </div>

            <div className="bg-white/10 p-5 rounded-2xl backdrop-blur-sm">
              <h2 className="text-3xl font-bold">120+</h2>
              <p className="text-blue-100 mt-1">Tasks</p>
            </div>

          </div>

        </div>


        {/* RIGHT SIDE */}

        <div className="p-8 md:p-14">

          <div className="text-center mb-10">

            <h1 className="
              text-4xl
              font-bold
              text-gray-800
            ">
              Welcome Back 👋
            </h1>

            <p className="
              text-gray-500
              mt-3
            ">
              Login to continue managing your team.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div>

              <label className="
                block
                mb-2
                text-gray-700
                font-medium
              ">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>


            <div>

              <label className="
                block
                mb-2
                text-gray-700
                font-medium
              ">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="
                  w-full
                  border
                  border-gray-300
                  rounded-xl
                  p-4
                  focus:outline-none
                  focus:ring-2
                  focus:ring-blue-500
                "
              />

            </div>


            <button
              type="submit"
              className="
                w-full
                bg-blue-700
                hover:bg-blue-800
                text-white
                font-semibold
                py-4
                rounded-xl
                transition
                duration-300
              "
            >
              {
                loading
                ? "Please wait..."
                : "Login"
              }
            </button>

          </form>


          <p className="
            text-center
            text-gray-600
            mt-8
          ">
            Don't have an account?

            <Link
              to="/signup"
              className="
                text-blue-700
                font-semibold
                ml-2
              "
            >
              Signup
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;