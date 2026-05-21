import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

function Signup() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Member",
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

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        formData
      );

      toast.success("Signup Successful");

      navigate("/login");

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Signup Failed"
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

        {/* LEFT */}

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

          <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-500 rounded-full opacity-30 blur-3xl"></div>

          <h1 className="
            text-5xl
            font-bold
            leading-tight
            z-10
          ">
            Create Your
            <br />
            Account 🚀
          </h1>

          <p className="
            mt-6
            text-lg
            text-blue-100
            z-10
          ">
            Start collaborating with your team,
            manage projects efficiently,
            and boost productivity.
          </p>

          <div className="
            mt-10
            bg-white/10
            rounded-2xl
            p-6
            backdrop-blur-sm
            z-10
          ">
            <p className="text-blue-100 leading-7">
              ✔ Role-based access control
              <br />
              ✔ Real-time task management
              <br />
              ✔ Admin & member dashboards
            </p>
          </div>

        </div>


        {/* RIGHT */}

        <div className="p-8 md:p-14">

          <div className="text-center mb-8">

            <h1 className="
              text-4xl
              font-bold
              text-gray-800
            ">
              Signup
            </h1>

            <p className="
              text-gray-500
              mt-3
            ">
              Create your account to continue.
            </p>

          </div>


          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
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


            <input
              type="email"
              name="email"
              placeholder="Email Address"
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


            <input
              type="password"
              name="password"
              placeholder="Password"
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


            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
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
            >

              <option value="Member">
                Member
              </option>

              <option value="Admin">
                Admin
              </option>

            </select>


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
                : "Create Account"
              }

            </button>

          </form>


          <p className="
            text-center
            text-gray-600
            mt-8
          ">

            Already have an account?

            <Link
              to="/login"
              className="
                text-blue-700
                font-semibold
                ml-2
              "
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}

export default Signup;