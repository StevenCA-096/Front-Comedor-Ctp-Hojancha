import { api } from "../api/api";
import type { Admin } from "@/types/common/admin/admin";
import type { CreateAdminDto } from "@/types/common/admin/dto/createAdminDto";
import type { UpdateAdminProfileDto } from "@/types/common/admin/dto/update-admin-profile.dto";
import type { UpdateAdminDto } from "@/types/common/admin/dto/updateAdminDto";

export const createAdmin = async (newAdmin: CreateAdminDto) => {
    const result = api.post('admins', newAdmin)
    return result
}

export const updateAdmin = async (updated: UpdateAdminDto, id: Admin['id']) => {
    const result = api.patch(`admins/${id}`, updated)
    return result
} 

export const updateAdminProfile = async (updated: UpdateAdminProfileDto) => {
    const result = (await api.patch(`admins/update-my-profile`, updated)).data
    return result
} 