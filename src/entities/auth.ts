import axios from 'axios'
import { LogInDto, SignUpDto } from './dto'

export async function createLogIn(data: LogInDto) {
  return axios.request({
    url: 'http://localhost:8080/api/auth/login',
    method: "post",
    data: data,
  }).then((response) => response.data)
}

export async function createSignUp(data: SignUpDto) {
  return axios.request({
    url: 'http://localhost:8080/api/auth/register',
    method: "post",
    data: data,
  }).then((response) => response.data)
}