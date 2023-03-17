import styles from './Card.module.css'
import PokeBall from '../images/pokeball.png'

interface CardProps {
    readonly name: string
    readonly url: string
    readonly onCardClick: (url: string) => void
    readonly dataTestId: string
}

const Card = (props: CardProps) => {
    const { name, url, onCardClick, dataTestId } = props

    return (
        <div
            className={styles.card}
            data-testid={dataTestId}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    onCardClick(url)
                }
            }}
            onClick={() => onCardClick(url)}
        >
            <img
                className={styles.image}
                src={PokeBall}
                alt={`PokeCard associated to ${name}`}
                height={100}
                width={100}
            />
            <span className={styles.name}>{name}</span>
        </div>
    )
}

export default Card
export type { CardProps }
