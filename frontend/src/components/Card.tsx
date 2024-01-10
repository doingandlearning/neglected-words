interface CardProps {
	id: number,
	onClick: (id: number) => void,
	selected: boolean
	children: React.ReactNode,
	completed?: boolean
}

import "./Card.css"

export default function Card({ id, children, selected, completed, onClick }: CardProps) {

	function handleClick() {
		if (!completed) {
			onClick(id)
		}
	}

	return (
		<div className={`card ${selected ? 'selected' : ''} ${completed ? 'completed' : ''}`} onClick={handleClick}>
			<p>{children}</p>
		</div>
	)
}