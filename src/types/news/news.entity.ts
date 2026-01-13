import type { Tag } from "./tag.entity";

export interface News {
  id: number;

  createdAt: Date;

  title: string;

  description: string;

  tags: Tag[];

  isActive: boolean;
}