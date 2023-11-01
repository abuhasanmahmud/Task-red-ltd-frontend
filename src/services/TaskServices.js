import requests from "./httpService";

const TaskServices = {
  //   getAllProducts: async ({ page, limit, category, title, price }) => {
  //     const searchCategory = category !== null ? category : '';
  //     const searchTitle = title !== null ? title : '';
  //     const searchPrice = price !== null ? price : '';

  //     return requests.get(
  //       `/products?page=${page}&limit=${limit}&category=${searchCategory}&title=${searchTitle}&price=${searchPrice}`
  //     );
  //   },

  addTask: async (body) => {
    return requests.post("/tasks/add", body);
  },

  getAllTasks: async () => {
    return requests.get("/tasks/");
  },
  deleteTask: async (id) => {
    return requests.delete(`/tasks/${id}`);
  },

  getProductById: async (id) => {
    return requests.post(`/products/${id}`);
  },

  updateTask: async (id, body) => {
    return requests.patch(`/tasks/${id}`, body);
  },
  //   updateManyProducts: async (body) => {
  //     return requests.patch("products/update/many", body);
  //   },
  //   updateStatus: async (id, body) => {
  //     return requests.put(`/products/status/${id}`, body);
  //   },
  //   updateVariant: async (id, body) => {
  //     return requests.put(`/products/variant/${id}`, body);
  //   },
  //   deleteVariant: async (id, body) => {
  //     return requests.patch(`products/variant/${id}`, body);
  //   },

  //   deleteManyProducts: async (body) => {
  //     return requests.patch("/products/delete/many", body);
  //   },

  //   checkChildProduct: async (id, body) => {
  //     return requests.patch(`/products/child/${id}`, body);
  //   },
};

export default TaskServices;
