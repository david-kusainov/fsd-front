import styled from "styled-components"

interface NewsProps {
  item: {
    name: string
    news: string
  }
}

export const News = ({ item }: NewsProps) => {
  return (
    <Box>
      {item.name} - {item.news}
    </Box>
  )
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
  border: 2px solid #DEE2E7;
`
