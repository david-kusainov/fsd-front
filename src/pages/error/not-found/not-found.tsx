import { AntdButton } from "@shared/components";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export const NotFoundPage = () => {

  const navigate = useNavigate()

  const handleGo = () => {
    if (window.history.length > 1) {
      window.history.back()
    } else {
      navigate('/')
    }
  }

  return (
    <Box>
      <Title>
        <span style={{ color: '#C571F8' }}>Ууууупс...</span> Видимо данной страницы не существует
      </Title>
      <AntdButton onClick={handleGo}>{window.history.length > 1 ? 'Может назад?' : 'На главную?'}</AntdButton>
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  height: 100%;
`
const Title = styled.div`
  font-size: 24px;
`
