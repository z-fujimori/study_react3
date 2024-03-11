import React from 'react'
import { useEffect, useState } from "react";
import './Time25_5.css';
import { GoPencil } from "react-icons/go";
import sound_pi from '../../audio/ポン.mp3';
import sound_piro from '../../audio/ピロリン.mp3';
import RangeSlider from '../RangeSlider';

const Time25_5 = () => {
    const [displayTime, setDisplayTime] = useState("25:00");
    const [running, setRunning] = useState(false);
    //const [startTime, setStartTime] = useState(0);
    //const [calcTime, setCalcTime] = useState(0);
    const [isStudy, setIsStudy] = useState(true);
    const [studyTime, setStudyTime] = useState(2 * 60);
    const [restTime, setRestTime] = useState(1 * 60);
    const [chengeStudy, setChengeStudy] = useState(25);
    const [chengeRest, setChengeRest] = useState(5);
    const [countDown, setCountDown] = useState(studyTime);
    const [btnDisabled, setDisabled] = useState({start: false, stop: true, reset: true})
    const audio1 = new Audio(sound_pi);
    const audio2 = new Audio(sound_piro);
    audio1.volume = 0.3;
    audio2.volume = 0.3;
    const [loopCont, setLoopCount] = useState([1]);

    // スタートボタンクリック（イベント）
    const onClickStart = () => {
        setRunning(true);
        setDisabled({start: true, stop: false, reset: false})
    };
    // ストップボタンクリック（イベント）
    const onClickStop = () => {
        setRunning(false);
        setDisabled({start: false, stop: true, reset: false})
    };
    // リセットボタンクリック（イベント）
    const onClickReset = () => {
        setRunning(false);
        setIsStudy(true);
        setDisplayTime(`${renameMin(studyTime)}:00`);
        console.log(displayTime);
        setDisabled({start: false, stop: true, reset: true})
        setLoopCount([1]);
    };
    // スキップボタン
    const onClickSkip = () => {
        setCountDown(-0.5);
    }
    // 時間設定button
    const chengeTime = () => {
        setStudyTime(chengeStudy * 60);
        setRestTime(chengeRest * 60);
        setCountDown(studyTime);
        console.log(studyTime);
    }

    // total秒を二桁の分（秒）に修正
    const renameMin = (time) => {
        time = time / 60;
        time = ('0' + Math.trunc(time)).slice(-2);
        return time;
    }
    const renameSec = (time) => {
        time = time % 60;
        time = ('0' + time).slice(-2);
        return time;
    }

    //study時間が終わった時の挙動
    const interval = async() => {
        if (isStudy) {
            setIsStudy(false);
            setCountDown(restTime);
        } else {
            setIsStudy(true);
            setCountDown(studyTime);
            setLoopCount([...Array(loopCont.length + 1)].map(() => 1));
        }
        console.log("interval",loopCont)
    }

    //ボタンクリック時の処理
    useEffect(() => {
        let timerInterval = undefined;
        if (running) {
            timerInterval = window.setInterval(() => {
                setCountDown(countDown => countDown - 1);
            }, 1000);  // ミリ秒表示の場合10、秒表示の場合1000
        }
        return () => {
            window.clearInterval(timerInterval);
        };
    },[running,isStudy,studyTime,restTime]);
    // time変更
    useEffect(() => {

        const m = renameMin(countDown);
        const s = renameSec(countDown);

        if (isStudy && countDown == -1) {
            audio2.play();
            interval();
        } else if (!isStudy && countDown <= -1) {
            audio2.play();
            interval();
        }
        console.log(countDown);

        if (2>=countDown && countDown>=0) {
            audio1.play();
        }

        setDisplayTime(`${m}:${s}`);
    }, [countDown]);

    //レンジスライドの値
    const handleStudyChange = e => {
        setChengeStudy(e.target.value);
    }
    const handleRestChange = e => {
        setChengeRest(e.target.value);
    }

  return (
    <>
    <div className="timerApp">
        <div className='timerTitle'>ポモドーロタイマー</div>
        <div className="loopCount">
            {loopCont.map((loopCont,index)=>{
                return <GoPencil key={index} size={25} color='333333' />
            })}
        </div>
        <time className='timer'>{displayTime}</time>
        <div className="buttons">
            <button onClick={onClickStart} disabled={btnDisabled.start}>
            スタート
            </button>
            <button onClick={onClickStop} disabled={btnDisabled.stop}>
            ストップ
            </button>
            <button onClick={onClickReset} disabled={btnDisabled.reset}>
            リセット
            </button>
            <button onClick={onClickSkip} disabled={isStudy}>
                スキップ
            </button>
        </div>
        <div>
            <RangeSlider title={"勉強時間"} min={5} max={90} onChange={handleStudyChange} value={chengeStudy} />
            <RangeSlider title={"休憩時間"} min={5} max={30} onChange={handleRestChange} value={chengeRest} />
        </div>
        <div className="buttons">
            <button onClick={chengeTime} disabled={running}>時間再設定</button>
        </div>
    </div>
    </>

  )
}

export default Time25_5