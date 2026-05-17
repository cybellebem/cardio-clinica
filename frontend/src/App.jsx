import { createBrowserRouter } from "react-router-dom"
import RequireAuth from "./auth/RequireAuth"
import RootLayout from "./layouts/RootLayout"

// protegidas
import Dashboard from "./pages/Dashboard/Dashboard"
import Pessoas from "./pages/Pessoas/Pessoas"
import PessoasWrapper from "./pages/Pessoas/PessoasWrapper"

// públicas
import Login from "./pages/Login/Login"
import NotFound from "./pages/NotFound/NotFound"
import Forbidden from "./pages/Forbidden/Forbidden"

export const router=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/forbidden",
    element:<Forbidden/>
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