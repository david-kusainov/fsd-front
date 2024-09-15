import { Head } from "@features/header";
import { Key, ReactNode } from "react";
import styled from "styled-components";

interface MainLayoutProps {
  children: ((item: any, index: Key) => ReactNode) | ReactNode
  title: string
  data?: any[]
}

export const MainLayout = (props: MainLayoutProps) => {
  return (
    <>
      <Head title={props.title} />
      <Content>
        {props.data && typeof props.children === "function" ? (
          props.data.map((item, index) => (
            <div key={index}>
              {props.children && typeof props.children === "function"
                ? props.children(item, index)
                : null}
            </div>
          ))
        ) : (
          <div>
            {typeof props.children === "function" 
              ? null
              : props.children}
          </div>
        )}
      </Content>
    </>
  )
}

const Content = styled.div`
  padding: 20px;
`
