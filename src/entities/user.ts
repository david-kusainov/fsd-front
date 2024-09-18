import { UpdateUserDto} from "./api-gen";
import { $api, $apiImages } from "./axios-instance";

export async function getUserInfoById(userId: string) {
  return $api.request({
    url: `http://localhost:8080/api/users/${userId}`,
    method: "get",
  }).then((response) => response.data)
}

export async function getUserById(userId: string) {
  return $api.request({
    url: `users/${userId}`,
    method: "get",
  }).then((response) => response.data)
}

export async function updateUserById(args: {userId: string, data: UpdateUserDto}) {
  return $api.request({
    url: `users/${args.userId}`,
    method: "put",
    data: args.data,
  }).then((response) => response.data)
}

export async function addImageToUser(args: {userId: string, data: File}) {
  const formData = new FormData()

  formData.append('image', args.data)

  formData.forEach((value, key) => {
    console.log('Form data', key, value);
  })

  console.log('userID', args.userId)
  
  return $apiImages.request({
    url: `users/${args.userId}/images`,
    method: "post",
    data: formData,
  }).then((response) => response.data)
}