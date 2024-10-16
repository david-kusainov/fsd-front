import { NotFoundPage } from "@pages/error/not-found";
import { ArchiveGamePage } from "@pages/game/archive";
import { CreateGamePage } from "@pages/game/create";
import { ArchiveGroupPage } from "@pages/group/archive";
import { CreateGroupPage } from "@pages/group/create";
import { EditGroupPage } from "@pages/group/edit";
import { SingleGroupPage } from "@pages/group/single";
import { LogInPage } from "@pages/log-in";
import { NewsPage } from "@pages/news/archive";
import { SignUpPage } from "@pages/sign-up";
import { ArchiveUserPage } from "@pages/user/archive";
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
    path: 'users',
    element: <ArchiveUserPage />
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
  },
  {
    path: '/group/:id',
    element: <SingleGroupPage />
  },
  {
    path: '/group/:id/edit',
    element: <EditGroupPage />
  },
  {
    path: '/games',
    element: <ArchiveGamePage />
  },
  {
    path: '/game/create',
    element: <CreateGamePage />
  }
])