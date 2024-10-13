import { $api } from "./axios-instance"
import { CreateGameDto } from "./dto"

export const createGame = async (data: CreateGameDto) => {
  const formData = new FormData()
  formData.append("title", data.title)
  formData.append("description", data.description)

  if (data.icon) {
    formData.append("icon", data.icon)
  }

  return $api.request({
    url: `games`,
    method: "post",
    data: formData,
  }).then((response) => response.data)
}

export const getAllGames = async () => {
  return $api.request({
    url: `games`,
    method: "get",
  }).then((response) => response.data)
}

export const getGameById = async (gameId: string) => {
  return $api.request({
    url: `games/${gameId}`,
    method: "get",
  }).then((response) => response.data)
}
