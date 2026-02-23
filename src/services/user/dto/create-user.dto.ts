import type { UserRole } from "../enum/user.roles.enum";

export interface CreateUserDto {
  dni: number;

  email: string;

  password: string;

  roles: UserRole[];

  status: boolean
}
