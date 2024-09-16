import styled from "styled-components"
import logo from "@public/Logo.svg"
import { AntdSubmitButton, FormLayout, InputField } from "@shared/components"
import { AppDispatch } from "app/store"
import { useDispatch } from "react-redux"
import { LogInDto } from "@entities/api-gen"
import { logIn } from "./model"
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom"
import { userSlice } from "@widgets/provider";
import { jwtDecode } from "jwt-decode"

export const LogInPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()
  const onSubmit = async (data: LogInDto) => {
    const token = await dispatch(logIn(data))
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
            Вход
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
  margin-bottom: 12%;
  span {
    font-size: 64px;
  }
`