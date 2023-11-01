import { apiSlice } from "./apiSlice";

const TASK_URL = "/api/tasks";

export const taskApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    allTasks: builder.query({
      query: (data) => ({
        url: `${TASK_URL}/`,
      }),
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `${TASK_URL}/${id}`,
        method: "DELETE",
      }),
    }),
    //     createPayment: builder.mutation({
    //       query: (data) => ({
    //         url: `${TASK_URL}/create-checkout-session`,
    //         method: "POST",
    //         body: data,
    //       }),
    //     }),
  }),
});

export const { useAllTasksQuery, useDeleteTaskMutation } = taskApiSlice;
