import { createBrowserRouter } from "react-router-dom"
import RequireAuth from "./auth/RequireAuth"
import RootLayout from "./layouts/RootLayout"

// protegidas
import Dashboard from "./pages/Dashboard/Dashboard"
import Pessoas from "./pages/Pessoas/Pessoas"

// públicas
import Login from "./pages/Login/Login"
import NotFound from "./pages/NotFound/NotFound"
import PessoasWrapper from "./pages/Pessoas/PessoasWrapper"

export const router=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {index:true,element:(
        <RequireAuth>
          <Dashboard/>
        </RequireAuth>
      )},
      {path:"dashboard",element:(
        <RequireAuth>
          <Dashboard/>
        </RequireAuth>
      )},
      {path:"pessoas/:funcao",element:(
        <RequireAuth>
          <PessoasWrapper/>
        </RequireAuth>
      )},
      {path:"*",element:<NotFound/>}
    ]
  }
])