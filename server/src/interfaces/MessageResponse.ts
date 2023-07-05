import { Task } from "@prisma/client";

export default interface MessageResponse {
  message?: string;
  tasks?: Task[];
}