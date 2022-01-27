import react from 'react'
import CenteredCard from '../General/CenteredCard'
import Typography from '@material-ui/core/Typography'

export default function Error(props) {
    const {error, counter} = props
    return (
        <CenteredCard>
            {counter ? counter : ''}
            <Typography>{error}</Typography>
        </CenteredCard>
    )
}

