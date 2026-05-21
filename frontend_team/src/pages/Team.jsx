import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getUsers,
} from "../services/userService";

function Team() {

  const [users, setUsers] =
    useState([]);


  // FETCH USERS
  const fetchUsers = async () => {

    try {

      const data = await getUsers();

      setUsers(data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>

      <div className="
        flex
        justify-between
        items-center
        mb-6
      ">

        <h1 className="
          text-3xl
          font-bold
        ">
          Team Members
        </h1>

      </div>


      {/* MEMBER CARDS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-5
      ">

        {users.map((user) => (

          <div
            key={user._id}
            className="
              bg-white
              p-6
              rounded-2xl
              shadow
            "
          >

            {/* PROFILE ICON */}

            <div className="
              w-16
              h-16
              bg-blue-600
              rounded-full
              flex
              items-center
              justify-center
              text-white
              text-2xl
              font-bold
              mb-4
            ">

              {
                user.name
                ?.charAt(0)
                .toUpperCase()
              }

            </div>


            {/* USER INFO */}

            <h2 className="
              text-2xl
              font-bold
            ">
              {user.name}
            </h2>

            <p className="
              text-gray-500
              mt-1
            ">
              {user.email}
            </p>


            {/* ROLE */}

            <div className="mt-4">

              <span className={`
                px-3
                py-1
                rounded-full
                text-sm

                ${
                  user.role === "Admin"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
                }
              `}>

                {user.role}

              </span>

            </div>


            {/* TASK COUNT */}

            <div className="
              mt-5
              border-t
              pt-4
            ">

              <p className="
                text-gray-600
              ">
                Assigned Tasks
              </p>

              <p className="
                text-3xl
                font-bold
                text-blue-700
                mt-2
              ">
                {user.totalTasks}
              </p>

            </div>

          </div>
        ))}

      </div>

    </Layout>
  );
}

export default Team;