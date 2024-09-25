import styled from "styled-components"
import logo from "@public/Logo.svg"
import { FormLayout, InputField } from "@shared/components"
import { useDispatch } from "react-redux"
import { signUp } from "./model"
import { SignUpDto } from "@entities/api-gen"
import { AppDispatch } from "app/store"
import Cookies from "js-cookie"
import { jwtDecode } from "jwt-decode"
import { userSlice } from "@widgets/provider"
import { useNavigate } from "react-router-dom"
import { notification } from "antd"

export const SignUpPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  
  const onSubmit = async (data: SignUpDto) => {
    try {
      const token = await dispatch(signUp(data)).unwrap()
      const decoded = jwtDecode(token.payload)
      Cookies.set('token', token.payload)
      dispatch(userSlice.actions.setUser(decoded))
      navigate('/')
    } catch (e) {
      console.error(e)
      notification.error({message: 'Произошла ошибка во время регистрации'})
    }
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
