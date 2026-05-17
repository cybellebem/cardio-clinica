import { useState } from "react"

import "./Forbidden.css"
import "../../global.css"

export default function Forbidden() {
    return (
        <div className="forbidden-container">
            <h1>Acesso Negado</h1>
            <h2>Você não possui permissão para acessar este recurso</h2>
            <img className="forbidden-img" src="/src/assets/forbidden.jpg" />
        </div>
    )
}