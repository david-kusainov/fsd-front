import { AntdButton, FormLayout, InputField } from "@shared/components";
import { MainLayout } from "@widgets/layouts/main-layout";
import { Wrapper } from "@widgets/layouts/wrapper";
import { AppDispatch, RootState } from "app/store";
import { useDispatch, useSelector } from "react-redux";
import ImgCrop from "antd-img-crop";
import { Avatar, notification, Upload } from "antd";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { updateGroupByIdThunk } from "./model";
import { getGroupByIdThunk } from "../single/model";
import { useParams } from "react-router-dom";

export const EditGroupPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { loading, error } = useSelector((state: RootState) => state.updateGroup)
  const group = useSelector((state: RootState) => state.singleGroup.group)
  const [file, setFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined)
  const { id } = useParams()

  useEffect(() => {
    dispatch(getGroupByIdThunk(id)).unwrap()
    console.log(group)
  }, [dispatch, id])

  const onSubmit = async(data: any) => {
    try {
      await dispatch(updateGroupByIdThunk({ groupId: String(group?.id), data: { ...data, icon: file } })).unwrap()
      notification.success({ message: 'Успешное обновление группы' })
    } catch (e) {
      console.error(e)
      notification.error({ message: 'Произошла ошибка при обновлении группы' })
    }
  }

  const handleFileChange = (file: File) => {
    setFile(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImageUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  if(!group) {
    return <div className="centered">Группа не найдена</div>
  }

  return (
    <MainLayout 
      title={"Редактирование группы"}
      error={error ? error : undefined}
      loading={loading}
      back
    >
      <Wrapper>
        <FormLayout
          onSubmit={onSubmit}
          textButton="Обновить"
        >
          <InputField
            field="title"
            placeholder="Название группы"
            defaultValue={group?.title}
            onChange={(e) => console.log(e.target.value)}
          />
          <InputField
            field="description"
            placeholder="Описание группы"
            maxLength={200}
            defaultValue={group?.description}
          />
          <Avatar 
            src={`http://localhost:8080/api/images/${group?.icon}`}
            size={100} 
            style={{ marginBottom: '20px' }}
            shape="square"
            icon={imageUrl ? undefined : <UserOutlined />}
          />
          <Avatar 
            src={imageUrl} 
            size={100} 
            style={{ marginBottom: '20px' }}
            shape="square"
            icon={imageUrl ? undefined : <UserOutlined />}
          />
          <br />
          <ImgCrop rotationSlider showReset>
            <Upload
              beforeUpload={(file) => {
                handleFileChange(file as File)
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
