import styled, { createGlobalStyle } from "styled-components";
import logo from "@public/Logo.svg";
import { Link } from "react-router-dom";
import { Dropdown, Menu, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "app/store";

interface HeadProps {
  title: string
}


export const Head = ({ title }: HeadProps) => {
  const userId = useSelector((state: RootState) => state.user.user?.id)

  const menuItems = [
    {
      key: '1',
      label: 'Профиль',
      link: `/profile/${userId}`
    },
    {
      key: '2',
      label: 'Новости',
      link: '/'
    },
    {
      key: '3',
      label: 'Группы',
      link: '/groups'
    },
    {
      key: '4',
      label: 'Мои запросы',
      link: '/private-office/query'
    },
    {
      key: '5',
      label: 'Список пользователей',
      link: '/private-office/users'
    }
  ]
  
  const menu = (
    <Menu>
      {menuItems.map(item => (
        <Menu.Item key={item.key}>
          <Link to={item.link}>{item.label}</Link>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <Box>
      <Title>
        <Link to={"/"}>
          <img src={logo} alt="Logo" />
        </Link>
        {title}
      </Title>
      <UserDropdown overlay={menu} trigger={['click']} placement="bottomRight">
        <TriggerLink onClick={(e) => e.preventDefault()}>
          <Space>
            <img src={logo} alt="Logo" />
            <DownOutlined />
          </Space>
        </TriggerLink>
      </UserDropdown>
      <GlobalStyle />
    </Box>
  )
}

const GlobalStyle = createGlobalStyle`
  .ant-dropdown-menu {
    background-color: #f0f0f0 !important;
    border-radius: 8px !important;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1) !important;
  }

  .ant-dropdown-menu-item {
    padding: 12px 16px !important;
    
    &:hover {
      background-color: #C571F8 !important;
      color: white !important;     
    }
  }
`
const Box = styled.div`
  position: relative;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-bottom: 2px solid #DEE2E7;
`
const Title = styled.div`
  color: #C571F8;
  font-size: 32px;
  display: flex;
  flex-direction: row;
  align-items: center;
  
  img {
    margin-top: 10px;
    margin-right: 10px;
    width: 50px;
  }
`
const UserDropdown = styled(Dropdown)`
  img {
    width: 40px;
  }
`
const TriggerLink = styled.a`
  color: #C571F8;
  text-decoration: none;
  
  &:hover, &:focus {
    color: #C571F8;
  }

  &:visited {
    color: #C571F8;
  }
`
