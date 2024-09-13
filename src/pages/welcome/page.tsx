import logo from "@public/Logo.svg"
import { AntdButton } from "@shared/components"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"

export const WelcomePage = () => {

  const navigate = useNavigate()

  return (
    <Box>
      <Content>
        <img src={logo} width={80}/>
        <Title>
          Салам <br />
          <span style={{color: '#C571F8'}}>Чат</span>
        </Title>
        The last chat app you'll ever need.
      </Content>
      
      <ButtonContainer>
        <AntdButton onClick={() => navigate('/log-in')}>Войти</AntdButton>
        <AntdButton type="default" onClick={() => navigate('/sign-up')}>Зарегистрироваться</AntdButton>
      </ButtonContainer>
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
const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 5%;
`
const Title = styled.div`
  font-size: 64px;
`
