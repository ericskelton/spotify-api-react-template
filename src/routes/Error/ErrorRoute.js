import react from 'react'
import Error from '../../ui/Error/Error'
import useCounter from '../../utils/hooks/useCounter'
import {Navigate} from 'react-router-dom'


export default function ErrorRoute(props) {
    const {fallBack, handleType, handleTime, error, redirectLocation} = props;
    const [counter, startCounter] = useCounter(handleTime ?? 0);

    return handleType === "fallback" && counter === 0 ? (
        { fallBack }
      ) : handleType === "redirect" && counter === 0 ? (
        <Navigate to={redirectLocation} />
      ) : (
        <Error
          error={error}
          counter={
            handleType === "fallback" || handleType === "redirect"
              ? counter
              : undefined
          }
        />
      );
    
}
