import {
  useEffect,
  useState,
} from "react";

import Layout from "../components/Layout";

import {
  getDashboardStats,
} from "../services/dashboardService";

function Dashboard() {

  const [stats, setStats] =
    useState({
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      overdueTasks: 0,
      recentTasks: [],
    });


  // FETCH DASHBOARD DATA
  const fetchDashboard =
  async () => {

    try {

      const data =
        await getDashboardStats();

      setStats(data);

    } catch (error) {

      console.log(error);
    }
  };


  useEffect(() => {
    fetchDashboard();
  }, []);


  const cards = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
    },

    {
      title: "Completed",
      value: stats.completedTasks,
    },

    {
      title: "Pending",
      value: stats.pendingTasks,
    },

    {
      title: "Overdue",
      value: stats.overdueTasks,
    },
  ];

  return (
    <Layout>

      <h1 className="
        text-3xl
        font-bold
        mb-6
      ">
        Dashboard
      </h1>


      {/* CARDS */}

      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-4
        gap-5
      ">

        {cards.map((card, index) => (

          <div
            key={index}
            className="
              bg-white
              p-6
              rounded-2xl
              shadow
            "
          >

            <h2 className="
              text-gray-500
            ">
              {card.title}
            </h2>

            <p className="
              text-4xl
              font-bold
              mt-3
              text-green-600
            text-red-600
            text-yellow-600
            ">
              {card.value}
            </p>

          </div>
        ))}

      </div>


      {/* RECENT TASKS */}

      <div className="
        bg-white
        mt-10
        p-6
        rounded-2xl
        shadow
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-5
        ">
          Recent Tasks
        </h2>

        <table className="w-full">

          <thead>

            <tr className="
              border-b
            ">

              <th className="
                p-3
                text-left
              ">
                Task
              </th>

              <th className="
                p-3
                text-left
              ">
                Project
              </th>

              <th className="
                p-3
                text-left
              ">
                Assigned
              </th>

              <th className="
                p-3
                text-left
              ">
                Status
              </th>

            </tr>

          </thead>

          <tbody>

            {stats.recentTasks.map(
              (task) => (

              <tr
                key={task._id}
                className="
                  border-b
                "
              >

                <td className="p-3">
                  {task.title}
                </td>

                <td className="p-3">
                  {task.project?.title}
                </td>

                <td className="p-3">
                  {task.assignedTo?.name}
                </td>

                <td className="p-3">

                  <span className="
                    bg-blue-100
                    text-blue-700
                    px-3
                    py-1
                    rounded-full
                    text-sm
                  ">

                    {task.status}

                  </span>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </Layout>
  );
}

export default Dashboard;