import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getAllGroupsThunk } from "./model";
import { MainLayout } from "@widgets/layouts/main-layout";
import { Spin } from "antd";
import { AntdButton } from "@shared/components";
import { GroupCard } from "@features/group-card";

export const ArchiveGroupPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, error, groups } = useSelector((state: RootState) => state.archiveGroups)
  const userId = useSelector((state: RootState) => state.user.user?.id)

  useEffect(() => {
    dispatch(getAllGroupsThunk()).unwrap()
  }, [dispatch])

  if(isLoading) {
    return (
      <div className="centered">
        <Spin tip="Загрузка данных пользователя..." />
      </div>
    )
  }

  if(error) {
    return (
      <div className="centered">
        Ошибка загрузки: {error}
      </div>
    )
  }

  if(!userId) {
    return <div className="centered">Пользователь не найден</div>
  }

  return (
    <MainLayout title="Группы">
      <AntdButton 
        route={`/group/create`} 
        style={{ marginBottom: '20px' }}
      >
        Создать группу
      </AntdButton>
      <GroupCard groupData={groups}/>
    </MainLayout>
  )
}
