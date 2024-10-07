import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserGroupsByUserThunk } from "./model";
import { GroupCard } from "@features/group-card";
import { Spin } from "antd";

export const UserGroupsTap = () => {
  const dispatch: AppDispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.user.user?.id)
  const { loading, error, group } = useSelector((state: RootState) => state.getGroupsByUser)

  useEffect(() => {
    if(userId){
      dispatch(getUserGroupsByUserThunk(userId))
    }
  }, [dispatch, userId])

  if(loading){
    return <div className="centered"> <Spin tip="Загрузка данных" /> </div>
  }

  if(error){
    return <div className="centered"> Ошибка загрузки подписок</div>
  }

  return (
    <GroupCard groupData={group}/>
  )
}