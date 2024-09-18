export interface LogInDto {
  name: string
  password: string
  email: string
}

export interface SignUpDto {
  username: string
  password: string
  email: string
}

export interface UserInfoDto {
  id: string
  username: string
  password: string
  name: string
  surname: string
  email: string
}

export interface UpdateUserDto {
  name?: string
  surname?: string
  email?: string
}