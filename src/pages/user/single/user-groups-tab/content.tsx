import { AppDispatch, RootState } from "app/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGroupsByOwnerThunk, getGroupsByUserThunk } from "./model";
import { GroupCard } from "@features/group-card";
import { Spin } from "antd";
import { Wrapper } from "@widgets/layouts/wrapper";

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
    return <div> <Spin tip="Загрузка данных" /> </div>
  }

  if(error){
    return <div> Ошибка загрузки подписок</div>
  }

  if (isOwner) {
    if (!ownedGroups.length) {
      return <Wrapper>Вы не являетесь владельцем групп</Wrapper>
    }
    return <GroupCard groupData={ownedGroups} />
  } else {
    if (!subscribedGroups.length) {
      return <Wrapper>Вы не подписаны ни на одну группу</Wrapper>
    }
    return <GroupCard groupData={subscribedGroups} />
  }
}