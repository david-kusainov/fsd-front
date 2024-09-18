import { Key, ReactNode } from "react";
import styled from "styled-components";

interface MainLayoutProps {
  children: ((item: any, index: Key) => ReactNode) | ReactNode
  data?: any[]
}

export const Wrapper = (props: MainLayoutProps) => {
  return (
    <>
      {props.data && typeof props.children === "function" ? (
        props.data.map((item, index) => (
          <Box key={index}>
            {props.children && typeof props.children === "function"
              ? props.children(item, index)
              : null}
          </Box>
        ))
      ) : (
        <Box>
          {typeof props.children === "function" 
            ? null
            : props.children}
        </Box>
      )}
    </>
  )
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  padding: 20px;
  background-color: white;
  margin-bottom: 20px;
  border: 2px solid #DEE2E7;
`
