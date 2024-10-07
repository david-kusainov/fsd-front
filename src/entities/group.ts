import { $api } from "./axios-instance"
import { CreateGroupDto, UpdateGroupDto } from "./dto";

export const createGroup = async (args: {userId: number, data: CreateGroupDto }) => {
  const formData = new FormData()
  formData.append("title", args.data.title)
  formData.append("description", args.data.description)

  if (args.data.icon) {
    formData.append("icon", args.data.icon)
  }

  return $api.request({
    url: `groups/${args.userId}`,
    method: "post",
    data: formData
  }).then((response) => response.data)
}

// export const getAllGroups = async (params: ParamsGroupDto) => {
//   return $api.request({
//     url: `groups`,
//     method: "get",
//     params: params
//   }).then((response) => response.data)
// }
export const getAllGroups = async () => {
  return $api.request({
    url: `groups`,
    method: "get",
  }).then((response) => response.data)
}

export const getGroupById = async (groupId: string) => {
  return $api.request({
    url: `groups/${groupId}`,
    method: "get",
  }).then((response) => response.data)
}

export async function updateUserById(args: {userId: string, data: UpdateGroupDto}) {
  return $api.request({
    url: `users/${args.userId}`,
    method: "put",
    data: args.data,
  }).then((response) => response.data)
}

export const deleteGroup = async (groupId: string) => {
  return $api.request({
    url: `groups/${groupId}`,
    method: "delete",
  }).then((response) => response.data)
}