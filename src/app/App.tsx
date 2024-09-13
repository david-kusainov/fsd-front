import { ConfigProvider as AntdConfigProvider, Layout } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import ruRU from "antd/es/locale/ru_RU"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { customTheme, waveConfig } from "./antd-theme"
import { Provider as ReduxProvider} from 'react-redux'
import { store } from "./store"

export const App = () => {
  return (
    <AntdConfigProvider
      locale={ruRU}
      componentSize={"large"}
      wave={waveConfig}
      getPopupContainer={(trigger: any) => trigger?.parentElement}
      theme={customTheme}
    >
      <ReduxProvider store={store}>
        <Layout style={{ height: '100vh'}}>
          {/* <Header>header</Header> */}
          <Content style={{ padding: '20px 20px 50px 20px' }}>
            <RouterProvider router={router} />
          </Content>
        </Layout>
      </ReduxProvider>
    </AntdConfigProvider>
  )
}
