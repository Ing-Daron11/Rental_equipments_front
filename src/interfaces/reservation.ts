import { Equipment } from "./equipment";

export interface Reservation {
  id: string;
  name: string;
  model: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
}
