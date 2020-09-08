export default function (seconds) {
  return seconds?.getHours() + ":" + seconds?.getMinutes();
}

export function convertDate(seconds) {
  const ts_ms = seconds * 1000;
  return new Date(ts_ms).toLocaleDateString();
}

export function convertDateAndTime(seconds) {
  const ts_ms = seconds * 1000;
  const date = new Date(ts_ms);
  return (
    date.toLocaleDateString() +
    " at " +
    date.getHours() +
    ":" +
    date.getMinutes()
  );
}
