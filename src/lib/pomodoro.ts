export const minToSecs = (minutes: number) => minutes * 60;

export const secToStr = (secs: number) => {
  const hour = Math.floor(secs / 3600);
  const min = Math.floor(secs / 60);
  const sec = secs % 60;
  return `${hour.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
};

export const calcElapsedSec = (timestamp: number) =>
  (Date.now() - timestamp) / 1000;
