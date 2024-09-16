import { FormLayout, InputField } from "@shared/components"
import { MainLayout } from "@widgets/main-layout"

export const UserSinglePage = () => {
  const onSubmit = () => {

  }
  return (
    <MainLayout title={"фцв"}>
      <FormLayout onSubmit={onSubmit}>
        <InputField 
          field={"firstName"}
          placeholder="Имя"
        />
        <InputField 
          field={"SurName"}
          placeholder="Фамилия"
        />
      </FormLayout>
    </MainLayout>
  )
}