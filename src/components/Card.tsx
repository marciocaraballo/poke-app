import styles from './Card.module.css'
import PokeBall from '../images/pokeball.png'
import { Url } from 'url'

interface CardProps {
    readonly name: string
    readonly url: string
    readonly onCardClick: (url: string) => void
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
