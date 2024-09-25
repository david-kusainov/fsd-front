import { ArrowLeftOutlined } from "@ant-design/icons";
import { Head } from "@features/header";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface MainLayoutProps {
  children: ReactNode
  title: string
  back?: boolean
}

export const MainLayout = ({children, title, back}: MainLayoutProps) => {
  const navigate = useNavigate()
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
