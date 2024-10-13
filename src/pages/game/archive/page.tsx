import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "app/store";
import { getAllGamesThunk } from "./model";
import { MainLayout } from "@widgets/layouts/main-layout";
import { AntdButton } from "@shared/components";
import { GroupCard } from "@features/group-card";

export const ArchiveGamePage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { loading, error, games } = useSelector((state: RootState) => state.archiveGames)

  useEffect(() => {
    dispatch(getAllGamesThunk()).unwrap()
  }, [dispatch])

  return (
    <MainLayout 
      title="Игры"
      error={error ? error : undefined}
      loading={loading}
    >
      <AntdButton 
        route={`/game/create`} 
        style={{ marginBottom: '20px' }}
      >
        Создать группу
      </AntdButton>
      <GroupCard entityData={games} to={`/game/${games.map((item: any) => item.id)}`}/>
    </MainLayout>
  )
}
