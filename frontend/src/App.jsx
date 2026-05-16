import { createBrowserRouter } from "react-router-dom"
import RequireAuth from "./auth/RequireAuth"
import RequireRole from "./auth/RequireRole"
import RootLayout from "./layouts/RootLayout"

// protegidas
import Dashboard from "./pages/Dashboard/Dashboard"
import Medicos from "./pages/Medicos/Medicos"
import Funcionarios from "./pages/Funcionarios/Funcionarios"
import Pacientes from "./pages/Pacientes/Pacientes"

// públicas
import Login from "./pages/Login/Login"
import NotFound from "./pages/NotFound/NotFound"

export const router=createBrowserRouter([
  {
    path:"/login",
    element:<Login/>
  },
  {
    path:"/",
    element:<RootLayout/>,
    children:[
      {index:true,element:<Dashboard/>},
      {path:"dashboard",element:(<RequireAuth><Dashboard/></RequireAuth>)},
      {path:"medicos",element:(
        <RequireAuth>
          <RequireRole funcao="Medico">
            <Medicos/>
          </RequireRole>
        </RequireAuth>
      )},
      {path:"funcionarios",element:(
        <RequireAuth>
          <RequireRole funcao="Admin">
            <Funcionarios/>
          </RequireRole>
        </RequireAuth>
      )},
      {path:"pacientes",element:(
        <RequireAuth>
          <RequireRole funcao="Atendente">
            <Pacientes/>
          </RequireRole>
        </RequireAuth>
      )},
      {path:"*",element:<NotFound/>}
    ]
  }
])