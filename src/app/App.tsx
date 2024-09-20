import { ConfigProvider as AntdConfigProvider, Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import ruRU from "antd/es/locale/ru_RU"
import { RouterProvider } from "react-router-dom"
import { router } from "./router"
import { customTheme, waveConfig } from "./antd-theme"
import { Provider as ReduxProvider} from 'react-redux'
import { store } from "./store"
import { AccessProvider } from "@widgets/provider"

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
        <Layout style={{ minHeight: '100vh',backgroundColor: '#EDEEF0'}}>
          <AccessProvider>
            <Content>
              <RouterProvider router={router} />
            </Content>
          </AccessProvider>
        </Layout>
      </ReduxProvider>
    </AntdConfigProvider>
  )
}
