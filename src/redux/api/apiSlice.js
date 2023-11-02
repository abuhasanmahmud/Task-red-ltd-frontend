import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseQuery = fetchBaseQuery({ baseUrl: "http://localhost:4000/api" });
// const baseQuery = fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL });
const baseQuery = fetchBaseQuery({ baseUrl: "https://redgreen-ltb-task-backend.vercel.app/api" });
export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["User"],
  endpoints: (builder) => ({}),
});
