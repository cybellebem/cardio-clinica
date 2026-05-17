import { useState } from "react"

import "./NotFound.css"
import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <div>
            {/* CONTEÚDO */}
            <h1>404</h1>
            <h2>Página não encontrada</h2>
            <h3>Verifique a URL ou volte para a <Link to="/dashboard" className="botao" >Dashboard</Link></h3>
        </div>
    )
}