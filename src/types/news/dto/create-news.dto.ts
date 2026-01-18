
export interface CreateNewsDto {
  title: string;

  description: string;

  tagIds?: number[];

  isActive?: boolean;
}