import { $api } from "./axios-instance"

export const createGroup = async (args: {userId: number, data: FormData }) => {
  return $api.request({
    url: `groups/${args.userId}`,
    method: "post",
    data: args.data
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