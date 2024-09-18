import { UpdateUserDto} from "./api-gen";
import { $api } from "./axios-instance";

export async function getUserInfoById(userId: number) {
  return $api.request({
    url: `http://localhost:8080/api/users/${userId}/info`,
    method: "get",
  }).then((response) => response.data)
}

export async function updateUserById(args: {userId: number, data: UpdateUserDto}) {
  return $api.request({
    url: `http://localhost:8080/api/users/${args.userId}`,
    method: "put",
    data: args.data,
  }).then((response) => response.data)
}