import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getAllGroupsThunk } from "./model";
import { MainLayout } from "@widgets/layouts/main-layout";
import { AntdButton } from "@shared/components";
import { GroupCard } from "@features/group-card";

export const ArchiveGroupPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { loading, error, groups } = useSelector((state: RootState) => state.archiveGroups)

  useEffect(() => {
    dispatch(getAllGroupsThunk()).unwrap()
  }, [dispatch])

  return (
    <MainLayout 
      title="Группы"
      error={error ? error : undefined}
      loading={loading}
    >
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
