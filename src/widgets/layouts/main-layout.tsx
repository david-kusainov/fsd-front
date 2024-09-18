import { Head } from "@features/header";
import { ReactNode } from "react";
import styled from "styled-components";

interface MainLayoutProps {
  children: ReactNode
  title: string
}

export const MainLayout = ({children, title}: MainLayoutProps) => {
  return (
    <>
      <Head title={title} />
      <Content>
        {children}
      </Content>
    </>
  )
}

const Content = styled.div`
  padding: 20px;
`
