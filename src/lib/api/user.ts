import axios from "axios";
import { User } from "@/interfaces/user";

export const userAPI = {
  async findAllTechnicians(): Promise<User[]> {
    const response = await axios.get("/users?role=technician");
    return response.data;
  },
};
