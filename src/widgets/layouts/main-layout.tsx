import { ArrowLeftOutlined } from "@ant-design/icons";
import { Head } from "@features/header";
import { Spin } from "antd";
import { RootState } from "app/store";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MainLayoutProps {
  children: ReactNode
  title: string
  back?: boolean
  error?: string
  loading?: boolean
}

export const MainLayout = ({children, title, back, error, loading}: MainLayoutProps) => {
  const navigate = useNavigate()
  const userId = useSelector((state: RootState) => state.user.user?.id)
  
  if(loading) {
    return (
      <div className="centered">
        <Spin tip="Загрузка данных" />
      </div>
    )
  }
  
  if(error) {
    console.error('Ошибка', error)
    return (
      <div className="centered">
        Ошибка загрузки
      </div>
    )
  }

  if(!userId) {
    return <div className="centered">Пользователь не найден</div>
  }

  return (
    <>
      <Head title={title} />
      {back && (
        <div
          style={{ cursor: "pointer", padding: "20px 0 0 20px" }}
          onClick={() => navigate(-1)}
        >
          <ArrowLeftOutlined /> Вернуться назад
        </div>
      )}
      <Content>
        {children}
      </Content>
    </>
  )
}

const Content = styled.div`
  padding: 20px;
`
