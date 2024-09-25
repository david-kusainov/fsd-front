import { SwapOutlined, RotateLeftOutlined, RotateRightOutlined, ZoomOutOutlined, ZoomInOutlined, DeleteOutlined, UndoOutlined } from "@ant-design/icons";
import { FileUpload } from "@features/upload";
import { Wrapper } from "@widgets/layouts/wrapper";
import { Space, Image, notification, Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { deleteImageUser } from "../model";
import { useNavigate } from "react-router-dom";

export const ImagesGridTab = () => {
  const userId = useSelector((state: RootState) => state.user.user?.id)
  const user = useSelector((state: RootState) => state.getUser.user)
  const userIsLoading = useSelector((state: RootState) => state.getUser.isLoading)
  const userError = useSelector((state: RootState) => state.getUser.error)
  const dispatch: AppDispatch = useDispatch()
  const navigate = useNavigate()

  const handleDeleteImage = async (imageId: string) => {
    try {
      await dispatch(deleteImageUser({ userId: userId, imageId })).unwrap()
      notification.success({ message: 'Изображение удалено' })
      navigate(0)
    } catch (e) {
      notification.error({ message: 'Ошибка при удалении изображения' })
    }
  }

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
    return <div>Ошибка: {errorMessage}</div>
  }

  if (!user) {
    return <div>Пользователь не найден</div>
  }
  
  return (
    <>
      <FileUpload userId={user.id} />
      <Wrapper>
        <div 
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', 
            gap: '20px' 
          }}
        >
          {user.images.length ? (
            <>
              {user.images.map((imageId: any) => {
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
                        }
                      ) => (
                        <Space size={12} className="toolbar-wrapper">
                          <SwapOutlined rotate={90} onClick={onFlipY} />
                          <SwapOutlined onClick={onFlipX} />
                          <RotateLeftOutlined onClick={onRotateLeft} />
                          <RotateRightOutlined onClick={onRotateRight} />
                          <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                          <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                          <DeleteOutlined onClick={() => handleDeleteImage(imageId)} />
                          <UndoOutlined onClick={onReset} />
                        </Space>
                      ),
                    }}
                  />
                )
              })}
            </>
          ) : (
            <div>
              Нет изображений
            </div>
          )}
        </div>
      </Wrapper>
    </>
  )
}
