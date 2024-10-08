import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsByOwnerThunk, getGroupsByUserThunk } from "./model";
import { GroupCard } from "@features/group-card";
import { Spin } from "antd";

export const UserGroupsTap = ({ isOwner }: { isOwner: boolean }) => {
  const dispatch: AppDispatch = useDispatch()
  const userId = useSelector((state: RootState) => state.user.user?.id)
  const { loading, error, ownedGroups, subscribedGroups } = useSelector((state: RootState) => state.getGroupsByUser)

  useEffect(() => {
    if(userId){
      dispatch(getGroupsByOwnerThunk(userId))
      dispatch(getGroupsByUserThunk(userId))
    }
  }, [dispatch, userId])

  if(loading){
    return <div className="centered"> <Spin tip="Загрузка данных" /> </div>
  }

  if(error){
    return <div className="centered"> Ошибка загрузки подписок</div>
  }

  return (
    <>
      {isOwner ? (
        <GroupCard groupData={ownedGroups}/>
      ) : (
        <GroupCard groupData={subscribedGroups}/>
      )}
    </>
  )
}