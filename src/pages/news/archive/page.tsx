import { MainLayout } from "@widgets/main-layout";
import { data } from "../../../app/test";
import { News } from "@widgets/news";

export const NewsPage = () => {
  return (
    <MainLayout data={data} title={"Новости"}>
      {(item: any) => <News item={item} />}
    </MainLayout>
  )
}

