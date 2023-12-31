import { useState, useEffect, Fragment } from "react";
import { FiSearch } from "react-icons/fi";
import { GrClose } from "react-icons/gr";
import TaskTable from "./TaskTable";
import TaskServices from "../../services/TaskServices";
import { toast } from "react-toastify";
import TaskDrawer from "./TaskDrawer";
import DeleteModal from "../Modal/DeleteModal";
import { useSelector } from "react-redux";

const Task = () => {
  const [allTask, setAllTask] = useState([]);
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [taskDetails, setTaskDetails] = useState({});
  const [taskId, setTaskId] = useState("");

  const [isAddOrUpdateTask, setIsAddOrUpdateTask] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleteTask, setIsDeleteTask] = useState(false);
  const [searchText, setSearchText] = useState("");

  //get all task
  useEffect(() => {
    (async () => {
      try {
        const res = await TaskServices.getAllTasks();
        console.log("res..", res);
        if (res) {
          setAllTask(res?.tasks);
          setIsAddOrUpdateTask(false);
          setIsDeleteTask(false);
          // setIsDeleteModalOpen(false);
        }
      } catch (err) {
        toast.error(err ? err?.response?.data?.message : err.message || "erros");
      }
    })();
  }, [isAddOrUpdateTask, isDeleteTask, searchText.length === 0]);

  //Handel product searching
  const handleSearch = (event) => {
    if (event.key === "Enter") {
      const newFilteredTasks = allTask?.filter((task) =>
        task.issue.toLowerCase().includes(searchText.toLowerCase())
      );
      setAllTask(newFilteredTasks);
    }
  };

  //handle shorting
  const [shotvalue, setShotValue] = useState("");
  const sv = shotvalue?.toString().replaceAll(" ", "").toLowerCase();
  if (shotvalue) {
    if (sv === "popularity") {
    } else if (sv === "a_zorder") {
      allTask?.sort((a, b) => (a.issue > b.issue ? 1 : -1));
    } else if (sv === "z_aorder") {
      allTask?.sort((a, b) => (b.issue > a.issue ? 1 : -1));
    }
  }

  const { userInfo } = useSelector((state) => state.user);

  //handle task add btn click
  const handelAddAndTaskDetails = () => {
    if (!userInfo?.email) {
      return toast.error("Login or singup first then you can access task functionality");
    }
    setIsTaskDrawerOpen(true);
    setTaskDetails({});
  };

  //handel task  update click
  const handelTaskBtnClick = (item) => {
    if (!userInfo?.email) {
      return toast.error("Login or singup first then you can access task functionality");
    }
    setTaskDetails(item);
    setIsTaskDrawerOpen(true);
  };
  return (
    <>
      <TaskDrawer
        isTaskDrawerOpen={isTaskDrawerOpen}
        setIsTaskDrawerOpen={setIsTaskDrawerOpen}
        taskDetails={taskDetails}
        setIsAddOrUpdateTask={setIsAddOrUpdateTask}
      />

      <DeleteModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        taskId={taskId}
        setIsDeleteTask={setIsDeleteTask}
      />

      <section className="mx-auto w-full max-w-7xl px-4 py-4 ">
        <div className="flex flex-col space-y-4  md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="basis-1/2">
            <h2 className="text-lg font-semibold">Task Management</h2>
          </div>

          <div>
            <button
              onClick={(e) => handelAddAndTaskDetails()}
              type="button"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add new Task
            </button>
          </div>
        </div>
        <div className="flex gap-4 items-center mt-2 flex-col sm:flex-row py-3">
          <div className="basis-1/2">
            <div className=" relative ">
              <input
                type="text"
                placeholder="Search task and press Enter"
                value={searchText}
                onKeyPress={handleSearch}
                onChange={(e) => setSearchText(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-7"
              />
              <p className="absolute top-2 left-1">
                <FiSearch size={20} />
              </p>
              {searchText.length !== 0 && (
                <p onClick={(e) => setSearchText("")} className="absolute top-3 right-2 cursor-pointer">
                  <GrClose size={15} />
                </p>
              )}
            </div>
          </div>

          <div className="basis-1/2">
            <div>
              <select
                id="location"
                name="location"
                className=" block w-full rounded-md border-0 py-2  text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6 "
                onChange={(e) => setShotValue(e.target.value)}
              >
                <option>Shorting</option>
                <option>A _ Z Order</option>
                <option>Z _ A Order</option>
              </select>
            </div>
          </div>
        </div>
        <TaskTable
          tasks={allTask}
          setTaskId={setTaskId}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          handelTaskBtnClick={handelTaskBtnClick}
        />
      </section>
    </>
  );
};

export default Task;
