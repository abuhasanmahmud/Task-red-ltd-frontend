import React, { useEffect } from "react";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Bars } from "react-loader-spinner";
import TaskServices from "../../services/TaskServices";

const TaskDrawer = ({ isTaskDrawerOpen, setIsTaskDrawerOpen, taskDetails, setIsAddOrUpdateTask }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("issue", taskDetails?.issue);
    setValue("des", taskDetails?.des);
    setValue("section", taskDetails?.section);
    // setValue("img", taskDetails?.img);
  }, [taskDetails]);

  const [submitting, setSubmitting] = useState(false);

  //handel add a new task
  const handelTaskAdd = async (data) => {
    setSubmitting(true);
    const taskData = {
      issue: data.issue,
      section: data.section,
      des: data.des,
    };
    const res = await TaskServices.addTask(taskData);
    if (!res?.error) {
      setSubmitting(false);
      toast.success("Task add successfully");
      setIsTaskDrawerOpen(false);
      setIsAddOrUpdateTask(true);
    }
  };

  // handel task update
  const handelTaskUpdate = async (data) => {
    setSubmitting(true);
    const updateTaskData = {
      issue: data.issue,
      section: data.section,
      des: data.des,
    };
    const res = await TaskServices.updateTask(taskDetails?._id, updateTaskData);
    if (!res?.error) {
      setSubmitting(false);
      toast.success("Task update successfully");
      setIsTaskDrawerOpen(false);
      setIsAddOrUpdateTask(true);
    }
  };
  // const [open, setOpen] = useState(true);

  return (
    <Transition.Root show={isTaskDrawerOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={setIsTaskDrawerOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-lg">
                  <form
                    onSubmit={handleSubmit(!taskDetails?._id ? handelTaskAdd : handelTaskUpdate)}
                    className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl"
                  >
                    <div className="flex-1">
                      {/* Header */}
                      <div className="bg-gray-50 px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between space-x-3">
                          <div className="space-y-1">
                            <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                              {taskDetails?.name ? `Update task (${taskDetails?._id})` : "Add Task"}
                            </Dialog.Title>
                          </div>
                          <div className="flex h-7 items-center">
                            <button
                              type="button"
                              className="relative text-gray-400 hover:text-gray-500"
                              onClick={() => setIsTaskDrawerOpen(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Product Name */}
                      <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                            Task Issue
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            // setValue={}
                            // defaultValue={taskDetails ? taskDetails?.name : ""}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            {...register("issue", { required: true })}
                          />
                          {errors.issue?.type === "required" && (
                            <p className="text-red-400 font-bold mt-1">Task issue is required</p>
                          )}
                        </div>
                      </div>

                      {/* Task section*/}
                      <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                            Task Section
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <input
                            type="text"
                            // setValue={}
                            // defaultValue={taskDetails ? taskDetails?.name : ""}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-2"
                            {...register("section", { required: true })}
                          />
                          {errors.section?.type === "required" && (
                            <p className="text-red-400 font-bold mt-1">Task section is required</p>
                          )}
                        </div>
                      </div>

                      {/* Project description */}
                      <div className="space-y-2 px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
                        <div>
                          <label className="block text-sm font-medium leading-6 text-gray-900 sm:mt-1.5">
                            Description
                          </label>
                        </div>
                        <div className="sm:col-span-2">
                          <textarea
                            // defaultValue={taskDetails?.des}
                            rows={3}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 px-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            {...register("des", { required: true })}
                          />
                          {errors.des?.type === "required" && (
                            <p className="text-red-400 font-bold mt-1">Task description is required</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex-shrink-0  px-4 py-5 sm:px-6">
                      {submitting && (
                        <>
                          <Bars
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="bars-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                          />
                        </>
                      )}
                      <div className="flex justify-end space-x-3">
                        <button
                          type="button"
                          className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                          onClick={() => setIsTaskDrawerOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          disabled={submitting}
                          type="submit"
                          className="inline-flex justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          {taskDetails?._id ? <span>Update</span> : <span>Create</span>}
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
export default TaskDrawer;
