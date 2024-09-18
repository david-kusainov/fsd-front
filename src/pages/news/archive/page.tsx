import { MainLayout } from "@widgets/layouts/main-layout";
import { data } from "../../../app/test";
import { News } from "@widgets/news";
import { Wrapper } from "@widgets/layouts/wrapper";

export const NewsPage = () => {
  return (
    <MainLayout title={"Новости"}>
      <Wrapper data={data}>
        {(item: any) => <News item={item} />}
      </Wrapper>
      <Wrapper>
        dawdadw
      </Wrapper>
    </MainLayout>
  )
}
