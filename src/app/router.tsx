import { NotFoundPage } from "@pages/error/not-found";
import { ArchiveGroupPage } from "@pages/group/archive";
import { CreateGroupPage } from "@pages/group/create";
import { LogInPage } from "@pages/log-in";
import { NewsPage } from "@pages/news/archive";
import { SignUpPage } from "@pages/sign-up";
import { EditUserPage } from "@pages/user/edit";
import { UserSinglePage } from "@pages/user/single";
import { WelcomePage } from "@pages/welcome";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: '/welcome',
    element: <WelcomePage />,
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
  },
  {
    path: '/',
    element: <NewsPage />
  },
  {
    path: '/profile/:id',
    element: <UserSinglePage />
  },
  {
    path: '/profile/:id/edit',
    element: <EditUserPage />
  },
  {
    path: '/groups',
    element: <ArchiveGroupPage />,
  },
  {
    path: '/group/create',
    element: <CreateGroupPage />
  }
])