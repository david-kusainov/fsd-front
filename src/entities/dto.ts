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
  status: string
  images: { id: number }[]
  icon: number
}

export interface UpdateUserDto {
  name?: string
  surname?: string
  email?: string
  status?: string
}

export interface CreateGroupDto {
  title: string
  description: string
  icon: File
}

export interface GroupDto {
  id: number
  title: string
  description: string
  icon: number
}

export interface UpdateGroupDto {
  title: string
  description: string
  icon: File
}

export interface ParamsGroupDto {
  query?: string
  page: number
  size: number
}
