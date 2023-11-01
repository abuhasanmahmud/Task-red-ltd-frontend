import React from "react";
import Task from "../Task/Task";

const tasks = [
  {
    name: "task1",
    des: "des1",
  },
];

const Home = () => {
  return (
    <div className=" h-screen">
      <Task tasks={tasks} />
    </div>
  );
};

export default Home;
