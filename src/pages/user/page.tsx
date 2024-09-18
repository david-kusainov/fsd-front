import { FormLayout, InputField } from "@shared/components";
import { MainLayout } from "@widgets/layouts/main-layout";
import { Wrapper } from "@widgets/layouts/wrapper";
import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, updateUser } from "./model";
import { notification, Spin } from "antd";
import { UpdateUserDto } from "@entities/api-gen";
import { FileUpload } from "@features/upload";

export const UserSinglePage = () => {
  const dispatch: AppDispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.user.user?.id)
  const user = useSelector((state: RootState) => state.getUser.user)
  const userIsLoading = useSelector((state: RootState) => state.getUser.isLoading)
  const userError = useSelector((state: RootState) => state.getUser.error)
  const updateUserError = useSelector((state: RootState) => state.updateUser.error)

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId))
    }
  }, [userId, dispatch])

  const onSubmit = (data: UpdateUserDto) => {
    try {
      dispatch(updateUser({ userId, data }))
      notification.success({ message: 'Данные пользователя обновлены' })
    } catch (e) {
      notification.error({
        message: `Произошла ошибка при обновлении данных пользователя: ${updateUserError}`,
      })
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
    return <div>Ошибка: {userError}</div>
  }

  if (!user) {
    return <div>Пользователь не найден</div>
  }

  return (
    <MainLayout title={user?.username}>
      <Wrapper>
        <FormLayout onSubmit={onSubmit}>
          <FileUpload userId={user.id} />
          <InputField 
            field="name"
            placeholder="Имя"
            defaultValue={user.name}
          />
          <InputField 
            field="surname"
            placeholder="Фамилия"
            defaultValue={user.surname}
          />
          <InputField 
            field="email"
            placeholder="Почта"
            type="email"
            defaultValue={user.email}
          />
        </FormLayout>
      </Wrapper>
    </MainLayout>
  )
}
