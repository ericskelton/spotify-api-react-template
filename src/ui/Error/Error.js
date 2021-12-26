import react from 'react'
import CenteredCard from '../General/CenteredCard'

export default function Error(props) {
    const {error} = props
    return (
        <CenteredCard>
            {error}
        </CenteredCard>
    )
}

