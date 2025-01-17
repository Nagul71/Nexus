import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard'
import { createBrowserRouter, RouterProvider,Navigate} from 'react-router-dom';
import './index.css'
import Root from './Layout/Rootlayout/root'
import Chat from './pages/Chat/Chat'
import Dashlay from './Layout/Dashboardlayout/Dashlay'
import Signup from './pages/Signup/Signup';
import Signin from './pages/Signin/Signin';

const router = createBrowserRouter([
  {
    
    element:<Root/>,
    children :[
      {path:'*',element:<Navigate to ='/'/>},
      {path:'/',element:<Home/>},
      {path:'/sign-up/*',element:<Signup/>},
      {path:'/sign-in/*',element:<Signin/>},
      {
        element: <Dashlay />,
        children: [
          { path: '/dashboard', element: <Dashboard /> }, // Matches '/dashboard'
          { path: '/dashboard/chats/:id', element: <Chat /> }, // Matches '/dashboard/chat/:id'
        ],
      }

    ]
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
   <RouterProvider router={router} />
  </StrictMode>,
)

