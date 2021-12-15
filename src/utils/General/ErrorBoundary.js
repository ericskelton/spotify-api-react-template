import react, { useState, useEffect } from "react";
import useCounter from "../hooks/useCounter";
export default function ErrorBoundary(props) {
    const { children, displayError, handleType, handleTime, fallBack } = props;
    const [counter, startCounter] = useCounter(handleTime ?? 0);
    const [error, setError] = useState({});

    useEffect(() => {
        if (handleType === "fallback" || handleType === "redirect") {
            const time = handleTime ?? 0;
            startCounter("down", time, 0);
        }
        return () => {
            setError({});
        };
    }, [error]);
    try {
        return <>{children}</>;
    } catch (e) {
        setError(e);
        if (!displayError) {
            e = {};
        } else if (process.env.REACT_APP_ENV !== "dev") {
            // if not dev, don't  show the error
            e = {};
        }

        return handleType === "fallback" && counter === 0 ? (
            { fallback }
        ) : handleType === "redirect" && counter === 0 ? (
            <Navigate to="/" />
        ) : (
            <Error
                error={e}
                counter={
                    handleType === "fallback" || handleType === "redirect"
                        ? counter
                        : undefined
                }
            />
        );
    }
}
