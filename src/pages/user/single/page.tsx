import { MainLayout } from "@widgets/layouts/main-layout";
import { Wrapper } from "@widgets/layouts/wrapper";
import { AppDispatch, RootState } from "app/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteImageUser, getUser } from "./model";
import { Image, Space, Spin } from "antd";
import { AntdButton } from "@shared/components";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { FileUpload } from "@features/upload";
import { DeleteOutlined, LeftOutlined, RightOutlined, RotateLeftOutlined, RotateRightOutlined, SwapOutlined, UndoOutlined, ZoomInOutlined, ZoomOutOutlined } from "@ant-design/icons";

export const UserSinglePage = () => {
  const dispatch: AppDispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.user.user?.id)
  const user = useSelector((state: RootState) => state.getUser.user)
  const userIsLoading = useSelector((state: RootState) => state.getUser.isLoading)
  const userError = useSelector((state: RootState) => state.getUser.error)
  const navigate = useNavigate()
  // const imageIds = (user?.images as { id: number }[]).map((image) => image?.id) || []
  // const [currentImageIndex, setCurrentImageIndex] = useState(0)

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
  
    return <div>Ошибка: {errorMessage}</div>
  }

  if (!user) {
    return <div>Пользователь не найден</div>
  }

  // const handleNextImage = () => {
  //   setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imageIds.length)
  // }
  
  // const handlePrevImage = () => {
  //   setCurrentImageIndex((prevIndex) => 
  //     prevIndex === 0 ? imageIds.length - 1 : prevIndex - 1
  //   )
  // }

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
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: '20px' 
          }}
        >
          {user.images.length > 4 ? (
            <>
              {user.images.slice(0, 4).map((imageId: any) => {
                return (
                  <Image
                    src={`http://localhost:8080/api/images/${imageId}`}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                    alt="User Images"
                    preview={{
                      toolbarRender: (
                        _,
                        {
                          transform: { scale },
                          actions: {
                            onFlipY,
                            onFlipX,
                            onRotateLeft,
                            onRotateRight,
                            onZoomOut,
                            onZoomIn,
                            onReset,
                          },
                        },
                      ) => (
                        <Space size={12} className="toolbar-wrapper">
                          {/* <LeftOutlined  onClick={() => handlePrevImage()}  />
                          <RightOutlined  onClick={() => handleNextImage()}  /> */}
                          <SwapOutlined rotate={90} onClick={onFlipY} />
                          <SwapOutlined onClick={onFlipX} />
                          <RotateLeftOutlined onClick={onRotateLeft} />
                          <RotateRightOutlined onClick={onRotateRight} />
                          <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                          <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                          <DeleteOutlined onClick={() => dispatch(deleteImageUser ({userId, imageId}))}/>
                          <UndoOutlined onClick={onReset} />
                        </Space>
                      ),
                    }}
                  />
                )
              })}
            </>
          ) : user.images.length > 0 ? (
            user.images.map((imageId: any) => {
              return (
                <Image
                  src={`http://localhost:8080/api/images/${imageId}`}
                  style={{
                    width: '100%',
                    height: '150px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                  }}
                  alt="User Images"
                  preview={{
                    toolbarRender: (
                      _,
                      {
                        transform: { scale },
                        actions: {
                          onFlipY,
                          onFlipX,
                          onRotateLeft,
                          onRotateRight,
                          onZoomOut,
                          onZoomIn,
                          onReset,
                        },
                      },
                    ) => (
                      <Space size={12} className="toolbar-wrapper">
                        {/* <LeftOutlined  onClick={() => handlePrevImage()}  />
                        <RightOutlined  onClick={() => handleNextImage()}  /> */}
                        <SwapOutlined rotate={90} onClick={onFlipY} />
                        <SwapOutlined onClick={onFlipX} />
                        <RotateLeftOutlined onClick={onRotateLeft} />
                        <RotateRightOutlined onClick={onRotateRight} />
                        <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                        <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                        <DeleteOutlined onClick={() => dispatch(deleteImageUser ({userId, imageId}))}/>
                        <UndoOutlined onClick={onReset} />
                      </Space>
                    ),
                  }}
                />
              )
            })
          ) : (
            <div>
              Нет изображений
            </div>
          )}
          <AntdButton>
            Смотреть все
          </AntdButton>
          <FileUpload userId={user.id} />
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
`
