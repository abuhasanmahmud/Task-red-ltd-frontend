import { RiDeleteBin5Fill } from "react-icons/ri";
import TaskServices from "../../services/TaskServices";
import { toast } from "react-toastify";

const TaskTable = ({ tasks, setTaskId, setIsDeleteModalOpen, handelTaskBtnClick }) => {
  const handelDeleteBtnClick = (task) => {
    setTaskId(task._id.toString());
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pl-4 pr-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500 sm:pl-0"
                    >
                      Task Id
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Issue
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      section
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3 text-left text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Details
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3 text-center text-xs font-medium uppercase tracking-wide text-gray-500"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {tasks?.map((task) => (
                    <tr key={task?._id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                        {task?._id.toString().slice(5, 12)}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task?.issue}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {task?.section}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{task?.des}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">details icon</td>

                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4  flex justify-center  items-center gap-2 text-sm font-medium sm:pr-0 mt-2">
                        <button
                          onClick={() => handelTaskBtnClick(task)}
                          className="text-indigo-600 hover:text-indigo-900 cursor-pointer "
                        >
                          Edit<span className="sr-only"></span>
                        </button>

                        <button
                          onClick={() => handelDeleteBtnClick(task)}
                          className="text-indigo-600 hover:text-indigo-900 ml-1"
                        >
                          <RiDeleteBin5Fill className=" cursor-pointer " />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskTable;
