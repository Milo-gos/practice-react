import { useRef, useState } from 'react';
import './index.scss'

function TimerPage() {
    const refId = useRef(null);
    const [time,setTime] = useState(new Date(5*60*1000))
    const minute = time.getMinutes()+'';
    const second= time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
    if (minute==='0' && second==='00') {
        clearInterval(refId.current)
    }
    const handleClickButtonStart = ()=> {
        clearInterval(refId.current);
        refId.current = setInterval(()=> {
            setTime(prev => new Date(prev.getTime()- 1000));
        },1000)
    }
    const handleClickButtonReset = () => {
        clearInterval(refId.current);
        setTime(new Date(5*60*1000));
    }
    const handleClickButtonStop = () => {
        clearInterval(refId.current);
    }
    return (
        <div className="container-timer">
            <span>{`${minute}:${second}`}</span>
            <div className='buttons'>
                <div className='button' onClick={handleClickButtonStart}>
                    <span>Start</span>
                </div>
                <div className='button' onClick={handleClickButtonStop}>
                    <span>Stop</span>
                </div>
                <div className='button' onClick={handleClickButtonReset}>
                    <span>Reset</span>
                </div>
            </div>
        </div>
    );
}

export default TimerPage;