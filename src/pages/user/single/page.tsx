import { MainLayout } from "@widgets/layouts/main-layout";
import { Wrapper } from "@widgets/layouts/wrapper";
import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "./model";
import { Avatar, Spin, Tabs, TabsProps } from "antd";
import { AntdButton } from "@shared/components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { ImagesGridTab } from "@pages/user/single/user-images-tab";
import { UserOutlined } from "@ant-design/icons";

const items: TabsProps['items'] = [
  {
    key: 'user image',
    label: 'Фотографии',
    children: <ImagesGridTab />,
  },
  {
    key: '2',
    label: 'Tab 2',
    children: '',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: '',
  },
]

export const UserSinglePage = () => {
  const dispatch: AppDispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.user.user?.id)
  const user = useSelector((state: RootState) => state.getUser.user)
  const userIsLoading = useSelector((state: RootState) => state.getUser.isLoading)
  const userError = useSelector((state: RootState) => state.getUser.error)
  const navigate = useNavigate()

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId))
    }
  }, [userId, dispatch])

  if (userIsLoading) {
    return (
      <div className="centered">
        <Spin tip="Загрузка данных пользователя..." />
      </div>
    )
  }

  if (userError) {
    let errorMessage: string
    
    if (typeof userError === 'string') {
      errorMessage = userError
    } else {
      errorMessage = userError?.error || "Неизвестная ошибка"
    }
    console.log(errorMessage)
    
    return (
      <div className="centered">
        Ошибка загрузки: {errorMessage}
      </div>
    )
  }

  if (!user) {
    return <div className="centered">Пользователь не найден</div>
  }

  return(
    <MainLayout title={"Профиль"}>
      <Wrapper>
        <UserInfo>
          <Avatar 
            src={`http://localhost:8080/api/images/${user.icon}`}
            icon={user.icon ? undefined : <UserOutlined />}
            size={150}
          />
          <div>
            <UserName>{user.username}</UserName>
            <UserStatus>{user.status}</UserStatus>
          </div>
          <AntdButton 
            style={{ marginLeft: 'auto', width: '200px' }}
            onClick={() => navigate(`/profile/${userId}/edit`)}
          >
            Редактировать профиль
          </AntdButton>
        </UserInfo>
      </Wrapper>
      <Tabs items={items}/>
    </MainLayout>
  )
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2%;
`

const UserName = styled.div`
  font-size: 34px;
`

const UserStatus = styled.div`
`
