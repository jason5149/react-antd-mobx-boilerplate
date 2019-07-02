import { AsyncLoader } from 'react-utils-components'

export const baseRoutes = [
  {
    path:     '/',
    exact:    true,
    redirect: '/app/home',
  },
  {
    path:      '/app',
    exact:     false,
    component: AsyncLoader(() => import('@pages/App')),
  },
]

export const businessRoutes = [
  {
    path:      '/app/home',
    exact:     true,
    component: AsyncLoader(() => import('@pages/Home')),
  },
]
