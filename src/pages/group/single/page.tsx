import { MainLayout } from "@widgets/layouts/main-layout"
import { AppDispatch, RootState } from "app/store"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { checkSubscriptionThunk, deleteGroupThunk, getGroupByIdThunk, subscribeToGroupThunk, unSubscribeToGroupThunk } from "./model"
import { Wrapper } from "@widgets/layouts/wrapper"
import { useNavigate, useParams } from "react-router-dom"
import styled from "styled-components"
import { Avatar, Dropdown, MenuProps, notification } from "antd"
import { DeleteOutlined, EditOutlined, MinusOutlined, PlusOutlined, UserOutlined } from "@ant-design/icons"

export const SingleGroupPage = () => {
  const dispatch: AppDispatch = useDispatch()
  const { loading, error, group } = useSelector((state: RootState) => state.singleGroup)
  const userId = useSelector((state: RootState) => state.user.user!.id)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getGroupByIdThunk(id)).unwrap()

    dispatch(checkSubscriptionThunk({userId: userId, groupId: id!}))
    .unwrap()
    .then((res) => setIsSubscribed(res))
  }, [dispatch, id])

  const handleSubscribe = async () => {
    try {
      if(isSubscribed === false) {
        await dispatch(subscribeToGroupThunk({userId: userId, groupId: id!})).unwrap()
        setIsSubscribed(true)
        notification.success({message: 'Вы подписались на группу'})
      } else {
        await dispatch(unSubscribeToGroupThunk({userId: userId, groupId: id!})).unwrap()
        setIsSubscribed(false)
        notification.success({message: 'Вы отписались от группы'})
      }
    } catch (e) {
      console.error(e)
      notification.error({message: 'Произошла ошибка при подписке/отписке'})
    }
  }

  const handleDeleteGroup = async () => {
    try {
      await dispatch(deleteGroupThunk(id!)).unwrap()
      notification.success({message: 'Группа удалена'})
      navigate('/groups')
    } catch (e) {
      console.error(e)
      notification.error({message: 'Произошла ошибка при удалении группы'})
    }
  }

  const items: MenuProps['items'] = [
    {
      label: isSubscribed ? 'Отписаться' : 'Подписаться',
      key: '1',
      icon: isSubscribed ? <MinusOutlined /> : <PlusOutlined />,
      onClick: handleSubscribe,
      danger: isSubscribed ? true : false,
    },
    {
      label: 'Редактировать',
      key: '2',
      icon: <EditOutlined />,
      onClick: () => {navigate(`/group/${id}/edit/`)},
      disabled: group?.owner === userId ? false : true,
    },
    {
      label: 'Удалить',
      key: '3',
      icon: <DeleteOutlined />,
      onClick: handleDeleteGroup,
      disabled: group?.owner === userId ? false : true,
    },
  ]
  
  const menuProps = {
    items,
  }

  return (
    <MainLayout
      title={group?.title || "Группа"}
      loading={loading}
      error={error ? error : undefined}
      back
    >
      <Wrapper>
        <UserInfo>
          <div>
            <Avatar
              src={`http://localhost:8080/api/images/${group?.icon}`}
              icon={group?.icon ? undefined : <UserOutlined />}
              size={150}
            />
          </div>
          <div>
            <GroupName>{group?.title}</GroupName>
            <div style={{ marginBottom: '20px'}}>{group?.description}</div>
            <div>Подписчики: {group?.subscribersCount}</div>
          </div>
          <div style={{ marginLeft: 'auto'}}>
            <Dropdown.Button menu={menuProps}>
              Еще
            </Dropdown.Button>
          </div>
        </UserInfo>
      </Wrapper>
    </MainLayout>
  )
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 2%;
`
const GroupName = styled.div`
  font-size: 34px;
  color: #C571F8;
`
