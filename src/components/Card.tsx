import styles from './Card.module.css'
import PokeBall from '../images/pokeball.png'

interface CardProps {
    readonly name: string
    readonly url: string
    readonly onCardClick: Function
    readonly dataTestId: string
}

const Card = (props: CardProps) => {
    const { name, url, onCardClick, dataTestId } = props

    return (
        <article
            data-testid={dataTestId}
            role="button"
            className={styles.card}
            onClick={() => onCardClick(url)}
        >
            <img src={PokeBall} alt="pokeball" height={100} />
            {name}
        </article>
    )
}

export default Card
export type { CardProps }
