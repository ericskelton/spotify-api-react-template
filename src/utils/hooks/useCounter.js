import react, {useState} from 'react'

export default function useCounter(initialValue = 0){
    const [value, setValue] = useState(initialValue)

    const countUp = (endValue, interval) => {
        if(value < endValue){
            setTimeout(() => {
                setValue(value + 1)
                countUp(endValue, interval)
            }, interval)
        }
    }

    const countDown = (endValue, interval) => {
        if(value > endValue){
            setTimeout(() => {
                setValue(value - 1)
                countDown(endValue, interval)
            }, interval)
        }
    }

    const start = (direction, startValue, endValue, interval = 1000) =>{
        setValue(startValue)
        switch(direction){
            case 'up':
                countUp(endValue, interval);
                break;
            case 'down':
                countDown(endValue, interval);
                break;
            default:
                countDown(endValue, interval)
                break;
        }
    }

    return [value, start]
}