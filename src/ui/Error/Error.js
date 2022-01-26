import react from 'react'
import CenteredCard from '../General/CenteredCard'

export default function Error(props) {
    const {error, counter} = props
    return (
        <CenteredCard>
            {counter ? counter : ''}
            {error}
        </CenteredCard>
    )
}

