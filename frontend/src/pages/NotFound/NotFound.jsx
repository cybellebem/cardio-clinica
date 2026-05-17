import { useState } from "react"
import Sidebar from "../../components/Sidebar"
import Header from "../../components/Header"

import "./NotFound.css"

export default function NotFound(){
    const [collapsed,setCollapsed]=useState(false)

    function toggleSidebar(){
        setCollapsed(!collapsed)
    }

    return(
        <div
            className={
                collapsed ? "notfound-container collapsed" : "notfound-container"
            }
        >
            {/* SIDEBAR */}
            <Sidebar/>

            {/* ÁREA DIREITA */}
            <div className="content-area">
                {/* HEADER */}
                <Header toggleSidebar={toggleSidebar} collapsed={collapsed}/>
                {/* CONTEÚDO */}
                <main className="main-content error">
                    <h1>Erro</h1>
                    <h2>Página não encontrada</h2>
                    <h3>Verifique a URL ou volte para a Home</h3>
                </main>
            </div>
        </div>
    )
}