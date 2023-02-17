import './Card.css'
import PokeBall from '../images/pokeball.png'

interface CardProps {
    readonly name: string
    readonly url: string
    readonly onCardClick: Function
}

const Card = (props: CardProps) => {
    const { name, url, onCardClick } = props

    return (
        <article
            role="button"
            className="card"
            onClick={() => onCardClick(url)}
        >
            <img src={PokeBall} alt="pokeball" height={100} />
            {name}
        </article>
    )
}

export default Card
export type { CardProps }
