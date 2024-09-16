import styled from "styled-components"
import logo from "@public/Logo.svg"
import { AntdSubmitButton, FormLayout, InputField } from "@shared/components"
import { useDispatch } from "react-redux"
import { signUp } from "./model"
import { SignUpDto } from "@entities/api-gen"
import { AppDispatch } from "app/store"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { userSlice } from "@widgets/provider"
import { useNavigate } from "react-router-dom"

export const SignUpPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async (data: SignUpDto) => {
    const userData = {
      ...data,
      role: "ROLE_USER"
    }
    const token = await dispatch(signUp(userData))
    const decoded = jwtDecode(token.payload)
    Cookies.set('token', token.payload)
    dispatch(userSlice.actions.setUser(decoded))
    navigate('/')
  }

  return (
      <Box>
        <Content>
          <img src={logo} width={80}/>
          <span>
            Регистрация
          </span>
        </Content>
        <FormLayout onSubmit={onSubmit}>
          <InputField
            field="username"
            placeholder="Логин"
            isRequired
          />
          <InputField
            field="password"
            placeholder="Пароль"
            isRequired
            password
            lengthMin={8}
          />
          <InputField
            field="email"
            placeholder="Почта"
            isRequired
            type="email"
          />
          <AntdSubmitButton>Отправить</AntdSubmitButton>
        </FormLayout>
      </Box>
  )
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px 20px 50px 20px;
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    font-size: 64px;
  }
`
