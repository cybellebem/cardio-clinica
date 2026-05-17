import { useState } from "react"

export default function Consultas() {
	const [collapsed, setCollapsed] = useState(false)

	function toggleSidebar() {
		setCollapsed(!collapsed)
	}

	return (
		<div></div>
	)
}