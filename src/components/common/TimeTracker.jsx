import { ReactComponent as TimeIcon } from "../../assets/icons/timeicon.svg";
import { ReactComponent as PlayIcon } from "../../assets/icons/playicon.svg";
import { ReactComponent as PauseIcon } from "../../assets/icons/pauseicon.svg";
import { ReactComponent as StopIcon } from "../../assets/icons/stopicon.svg";
import { ReactComponent as CloseIcon } from "../../assets/icons/closeicon.svg";
import { useEffect, useRef, useState } from "react";

export default function TimeTracker() {
  const [isOpened, setIsOpened] = useState(false); //open/close the stopwatch
  const [isActive, setIsActive] = useState(false); // Indicates if the timer has been started at all (Play button shown/hidden)
  const [isRunning, setIsRunning] = useState(false); // Indicates if the timer is actively counting
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);

  const startTimeRef = useRef(0);

  const handleOpenStopwatch = () => {
    setIsOpened((prev) => !prev);
  };

  const handleStartStopwatch = () => {
    // При нажатии PLAY:
    if (!isActive) {
      setIsActive(true);
    }
    setIsRunning(true); // Запускаем счетчик
    // Запоминаем время начала, вычитая накопленное время, чтобы продолжить отсчет
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const handlePauseStopwatch = () => {
    if (isRunning) {
      setIsRunning(false);
    } else {
      handleStartStopwatch();
    }
  };

  const handleStopStopwatch = () => {
    // При нажатии STOP (Полный сброс):
    setIsRunning(false); // Останавливаем счетчик
    setIsActive(false); // Деактивируем (показывать снова Play)
    setElapsedTime(0); // Сбрасываем время
  };

  const handleFormatedTime = () => {
    const totalMilliseconds = elapsedTime;

    let hours = Math.floor(totalMilliseconds / 3600000);
    let minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
    let seconds = Math.floor((totalMilliseconds % 60000) / 1000);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    // Формат: HH:MM:SS
    return `${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    } else {
      clearInterval(intervalIdRef.current);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const renderControlButtons = () => {
    if (!isActive) {
      return (
        <PlayIcon
          className="w-10 h-10 cursor-pointer"
          onClick={handleStartStopwatch}
        />
      );
    } else if (isActive && !isRunning) {
      return (
        <>
          <PlayIcon
            className="w-10 h-10 cursor-pointer"
            onClick={handleStartStopwatch}
          />
          <StopIcon
            className="w-10 h-10 cursor-pointer"
            onClick={handleStopStopwatch}
          />
        </>
      );
    } else if (isActive && isRunning) {
      return (
        <>
          <PauseIcon
            className="w-10 h-10 cursor-pointer"
            onClick={handlePauseStopwatch}
          />
          <StopIcon
            className="w-10 h-10 cursor-pointer"
            onClick={handleStopStopwatch}
          />
        </>
      );
    }
    return null;
  };

  return (
    <div className="time_tracker fixed bottom-10 right-10 group flex flex-col gap-2">
      {!isOpened ? (
        <div
          className="time_circle rounded-full p-4 bg-green-100 w-[max-content] border border-green-600 cursor-pointer"
          onClick={handleOpenStopwatch}
        >
          <div className="transition-transform duration-300 group-hover:rotate-180">
            <TimeIcon className="w-5 h-5 md:w-9 md:h-9" />
          </div>
        </div>
      ) : (
        <div className="time_box bg-leaves-bg flex flex-col gap-3 p-6 rounded-[32px] text-white relative w-[300px]">
          <CloseIcon
            className="w-6 h-6 absolute top-4 right-4 cursor-pointer"
            onClick={handleOpenStopwatch}
          />
          <span className="font-semibold text-lg text-left">Time Tracker</span>
          <span className="font-bold text-4xl text-center">
            {handleFormatedTime()}
          </span>
          <div className="btns flex gap-2 items-start justify-center">
            {renderControlButtons()}
          </div>
        </div>
      )}
    </div>
  );
}
