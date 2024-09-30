import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getAllGroupsThunk } from "./model";
import { MainLayout } from "@widgets/layouts/main-layout";
import { Wrapper } from "@widgets/layouts/wrapper";
import { Spin } from "antd";
import { GroupDto } from "@entities/dto";

export const ArchiveGroupPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { isLoading, error, groups } = useSelector((state: RootState) => state.archiveGroups)

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

  return (
    <MainLayout title="Группы">
      <Wrapper data={groups}>
        {(item: GroupDto) => <div>
            <img src={`http://localhost:8080/api/images/${item.icon}`}/>
            {item.title}<br />
            {item.description}
          </div>
        }
      </Wrapper>
    </MainLayout>
  )
}
