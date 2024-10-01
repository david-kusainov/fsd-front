import { AntdButton, FormLayout, InputField } from "@shared/components";
import { MainLayout } from "@widgets/layouts/main-layout";
import { Wrapper } from "@widgets/layouts/wrapper";
import { AppDispatch, RootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import { createGroups } from "./model";
import ImgCrop from "antd-img-crop";
import { notification, Upload } from "antd";
import { useState } from "react";

export const CreateGroupPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.user.user?.id)
  const { loading, error } = useSelector((state: RootState) => state.createGroup);
  const [file, setFile] = useState<File | null>(null)

  const onSubmit = (data: any) => {
    try {
      if (userId) {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("description", data.description)
        if (file) {
          formData.append("icon", file)
        }
        dispatch(createGroups({ userId, data: formData }))
        notification.success({ message: 'Успешное создание группы' })
      }
    } catch (e) {
      console.error(e)
      notification.error({ message: 'Произошла ошибка при создании группы' })
    }
  }

  if(error) {
    <div className="centered">
      Ошибка загрузки: {error}
    </div>
  }

  if (!userId) {
    return <div>Пользователь не найден</div>
  }

  return (
    <MainLayout 
      title={"Создание группы"}
    >
      <Wrapper>
        <FormLayout
          onSubmit={onSubmit}
          textButton="Создать"
          route={`/group`}
        >
          <InputField
            field="title"
            placeholder="Название группы"
          />
          <InputField
            field="description"
            placeholder="Описание группы"
          />
          <ImgCrop rotationSlider showReset>
            <Upload
              beforeUpload={(file) => {
                setFile(file as File)
                return false
              }}
              disabled={loading}
              showUploadList={false}
            >
              <AntdButton style={{marginBottom: '20px'}}>
                {loading ? 'Загрузка...' : 'Загрузить'}
              </AntdButton>
            </Upload>
          </ImgCrop>
        </FormLayout>
      </Wrapper>
    </MainLayout>
  )
}
