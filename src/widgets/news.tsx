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

`
