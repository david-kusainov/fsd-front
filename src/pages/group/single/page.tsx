import { MainLayout } from "@widgets/layouts/main-layout"
import { AppDispatch, RootState } from "app/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getGroupByIdThunk } from "./model"
import { Wrapper } from "@widgets/layouts/wrapper"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Avatar } from "antd"
import { UserOutlined } from "@ant-design/icons"

export const SingleGroupPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { loading, error, group } = useSelector((state: RootState) => state.singleGroup)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getGroupByIdThunk(id)).unwrap()
  }, [dispatch, id])

  return (
    <MainLayout
      title={group?.title || "Группа"}
      loading={loading}
      error={error ? error : undefined}
    >
      <Wrapper>
        <UserInfo>
          <Avatar 
            src={`http://localhost:8080/api/images/${group?.icon}`}
            icon={group?.icon ? undefined : <UserOutlined />}
            size={150}
          />
          <div>
            <GroupName>{group?.title}</GroupName>
            <div>{group?.description}</div>
          </div>
        </UserInfo>
      </Wrapper>
    </MainLayout>
  )
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2%;
`
const GroupName = styled.div`
  font-size: 34px;
`
