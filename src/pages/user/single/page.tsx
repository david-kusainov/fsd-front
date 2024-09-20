import { MainLayout } from "@widgets/layouts/main-layout";
import { Wrapper } from "@widgets/layouts/wrapper";
import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getImageUser, getUser } from "./model";
import { Image, Spin } from "antd";
import { AntdButton } from "@shared/components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
      dispatch(getImageUser(userId))
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
    return <div>Ошибка: {userError}</div>
  }

  if (!user) {
    return <div>Пользователь не найден</div>
  }

  return(
    <MainLayout title={"Профиль"}>
      <Wrapper>
        <UserInfo>
          <img 
            src={`http://localhost:8080/api/images/7`}
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
            }}
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
      <Wrapper>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
          gap: '10px' 
        }}>
          {/* <Wrapper data={user.images}> */}
          {user.images.length ? user.images.map((imageId: any) => {
            return (
              <Image 
                src={`http://localhost:8080/api/images/${imageId}`} 
                style={{ 
                  width: '100%', 
                  height: '150px', 
                  objectFit: 'cover',
                  borderRadius: '10px' 
                }} 
                alt="User Image" 
              />
            )
          }) : (
            <div>Нет изображений</div>
          )}
            {/* // {(imageId: any) => (
            //   <Image 
            //     src={`http://localhost:8080/api/images/${imageId}`} 
            //     style={{ 
            //       width: '100%', 
            //       height: '150px', 
            //       objectFit: 'cover',
            //       borderRadius: '10px' 
            //     }} 
            //     alt="User Image" 
            //   />
            // )}
          </Wrapper> */}
        </div>
      </Wrapper>
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
  /* Добавь стили по необходимости */
`
