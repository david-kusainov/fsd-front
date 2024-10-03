import { UpdateUserDto} from "./dto";
import { $api, $apiImages } from "./axios-instance";

export async function getUserInfoById(userId: string) {
  return $api.request({
    url: `users/${userId}/info`,
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

  return $apiImages.request({
    url: `users/${args.userId}/images`,
    method: "post",
    data: formData,
  }).then((response) => response.data)
}

export async function setAvatarToUser(args: {userId: string, imageId: string}) {
  return $apiImages.request({
    url: `users/${args.userId}/images/icon/${args.imageId}`,
    method: "put",
  }).then((response) => response.data)
}

export async function getImagesByUser(userId: string) {
  return $api.request({
    url: `users/${userId}/images`,
    method: "get",
  }).then((response) => response.data)
}

export async function deleteImagesByUser(args: {userId: string, imageId: string}) {
  return $api.request({
    url: `users/${args.userId}/images/${args.imageId}`,
    method: "delete",
  }).then((response) => response.data)
}

export async function subscribeToGroup(args: {userId: number, groupId: string}) {
  return $api.request({
    url: `users/${args.userId}/subscribe-to-group/${args.groupId}`,
    method: "post",
  }).then((response) => response.data)
}

export async function unSubscribeToGroup(args: {userId: number, groupId: string}) {
  return $api.request({
    url: `users/${args.userId}/unsubscribe-from-group/${args.groupId}`,
    method: "post",
  }).then((response) => response.data)
}

export async function checkSubscription(args: {userId: number, groupId: string}) {
  return $api.request({
    url: `users/${args.userId}/check/subscribe/${args.groupId}`,
    method: "get",
  }).then((response) => response.data)
}