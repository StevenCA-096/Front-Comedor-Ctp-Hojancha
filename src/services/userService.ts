import { api } from "../api/api";
import type { User } from "@/types/common/user/user";
import type { UpdateUserDto } from "./user/dto/update-user.dto";
import type { CreateUserDto } from "./user/dto/create-user.dto";

export const createUser = async (newUser: CreateUserDto) => {
    const result = (await api.post('users', newUser)).data
    return result
}

export const checkEmailAndDniAvailability = async (dni: number, email: string) => {
    const result = (await api.get(`users/checkCredentialsAvailability/dni=${dni}/email=${email}`)).data
    return result
}

export const checkEmailAvailability = async (email: string) => {
    const result = (await api.get(`users/check-email-availability/email=${email}`)).data
    return result
}

export const GetUserStudent = async (dni: bigint) => {
    const result = (await api.get(`users/get-user-student/dni=${dni}`)).data
    return result
}

export const GetUserByDni = async (dni: User['dni']) : Promise<User> => {
    const result = (await api.get(`users/get-user-by-dni/${dni}`)).data
    return result
}

export const getAdminByDni = async (dni: bigint) => {
    const result = (await api.get(`users/get-admin-user/${dni}`)).data
    return result
}

export const getUsers = async () => {
    const result = (await api.get(`users`)).data
    return result
}
export const getAdmins = async () => {
    const result = (await api.get(`users/get-admin-users`)).data
    return result
}

export const getStudents = async () => {
    const result = (await api.get(`users/get-student-users`)).data
    return result
}

export const getStudentUsersComplete = async () => {
    const result = (await api.get(`users/get-complete-student-users`)).data
    return result
}


export const updateUser = async (id: User['id'], updatedUser: UpdateUserDto) => {
    const result = (await api.patch(`users/${id}`, updatedUser)).data;
    return result;
};