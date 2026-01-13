import type { News } from "./news.entity";

export interface Tag {
  id: number;

  name: string;

  color: string;

  isActive: boolean;

  news?: News[];
}