import { NotFoundPage } from "@pages/error/not-found";
import { LogInPage } from "@pages/log-in";
import { SignUpPage } from "@pages/sign-up";
import { WelcomePage } from "@pages/welcome";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <WelcomePage />
  },
  {
    path: '*',
    element: <NotFoundPage />
  },
  {
    path: '/log-in',
    element: <LogInPage />
  },
  {
    path: '/sign-up',
    element: <SignUpPage />
  }
])