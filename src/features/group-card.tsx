import { Wrapper } from "@widgets/layouts/wrapper"
import { Avatar, Flex } from "antd"
import { Link } from "react-router-dom"
import styled from "styled-components"

interface EntityCardProps {
  entityData?: any[]
  to: string
}

export const GroupCard = (props: EntityCardProps) => {
  return (
    <Wrapper data={props.entityData}>
      {(item: any) => 
        <div>
          <Flex gap={20}>
            <Link to={props.to}>
              <Avatar
                src={`http://localhost:8080/api/images/${item.icon}`}
                size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
              />
            </Link>
            <Link to={props.to} style={{ color: '#C571F8' }}>
              <Title style={{ marginTop: '35px' }}>
                {item.title}
              </Title>
            </Link>
          </Flex>
          <div style={{color: '#C571F8', marginTop: '20px' }}>
            Описание:
          </div>
          {item.description}
        </div>
      }
    </Wrapper>
  )
}

const Title = styled.div`
  font-size: 24px;
`

