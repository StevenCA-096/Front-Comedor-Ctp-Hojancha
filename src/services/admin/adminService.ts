import { api } from "@/api/api";
import type { UpdateAdminProfileDto } from "@/types/common/admin/dto/update-admin-profile.dto";

export const updateAdminProfile = async (updated: UpdateAdminProfileDto) => {
    const result = (await api.patch(`admins/update-my-profile`, updated)).data
    return result
} 