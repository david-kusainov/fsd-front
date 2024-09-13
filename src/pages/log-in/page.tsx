import styled from "styled-components"
import logo from "@public/Logo.svg"
import { AntdSubmitButton, FormLayout, InputField } from "@shared/components"
import { AppDispatch } from "app/store"
import { useDispatch } from "react-redux"
import { LogInDto } from "@entities/api-gen"
import { logIn } from "./model"
import Cookies from "js-cookie"

export const LogInPage = () => {
  const dispatch: AppDispatch = useDispatch()
  
  const onSubmit = async (data: LogInDto) => {
    const token = await dispatch(logIn(data))
    Cookies.set('token', token.payload)
  }

  return (
      <Box>
        <Content>
          <img src={logo} width={80}/>
          <Title>
            Вход
          </Title>
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
`
const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`
const Title = styled.div`
  font-size: 64px;
`
