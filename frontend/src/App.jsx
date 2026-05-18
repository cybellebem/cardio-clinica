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
    element:(
      <RequireAuth>
        <RootLayout/>
      </RequireAuth>
    ),
    children:[
      {index:true,element:<Dashboard/>},
      {path:"dashboard",element:<Dashboard/>},
      {path:"pessoas/:funcao",element:<PessoasWrapper/>},
    ]
  },
  {path:"*",element:<NotFound/>}
])