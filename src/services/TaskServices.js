import requests from "./httpService";

const TaskServices = {
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
};

export default TaskServices;
