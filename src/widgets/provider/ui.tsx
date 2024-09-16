import { ReactNode, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { userSlice } from './model';

interface CtxProviderProps {
  children: ReactNode
}

export const AccessProvider = ({ children }: CtxProviderProps) => {
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')

    if (token) {
      try {
        const decoded = jwtDecode(token)
        dispatch(userSlice.actions.setUser(decoded))
      } catch (e) {
        console.log('Ошибка токена', e)
        dispatch(userSlice.actions.clearUser())

        if (window.location.pathname !== '/welcome') {
          window.location.replace('/welcome')
        }
      }
    } else {
      dispatch(userSlice.actions.clearUser())
      
      if (window.location.pathname !== '/welcome') {
        window.location.replace('/welcome')
      }
    }

    setIsLoading(false)
  }, [dispatch])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  return <>{children}</>
}
