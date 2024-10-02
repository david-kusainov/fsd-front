import { FormLayout, InputField } from "@shared/components";
import { MainLayout } from "@widgets/layouts/main-layout";
import { Wrapper } from "@widgets/layouts/wrapper";
import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "./model";
import { notification } from "antd";
import { UpdateUserDto } from "@entities/dto";
import { getUser } from "../single/model";

export const EditUserPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.user.user?.id)
  const { user, loading, error } = useSelector((state: RootState) => state.getUser)

  useEffect(() => {
    if (userId) {
      dispatch(getUser(userId))
    }
  }, [userId, dispatch])

  const onSubmit = async(data: UpdateUserDto) => {
    try {
      await dispatch(updateUser({ userId, data })).unwrap()
      notification.success({ message: 'Данные пользователя обновлены' })
    } catch (e: any) {
      console.error(e)
      notification.error({
        message: `Произошла ошибка при обновлении данных пользователя`,
      })
    }
  }

  if (!user) {
    return <div>Пользователь не найден</div>
  }

  return (
    <MainLayout 
      title={user.username || "Профиль"}
      error={error ? error : undefined}
      loading={loading}
      back
    >
      <Wrapper>
        <FormLayout onSubmit={onSubmit} textButton="Обновить">
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
          <InputField 
            field="status"
            placeholder="Статус"
            defaultValue={user.status}
          />
        </FormLayout>
      </Wrapper>
    </MainLayout>
  )
}
