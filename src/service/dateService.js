export default function changeDate(timeOld) {
  let date = new Date(timeOld).getTime();
  let dateCurrent = Date.now();
  let s = Math.floor((dateCurrent - date) / 1000);
  let p = Math.floor(s / 60);
  let h = Math.floor(p / 60);
  let d = Math.floor(h / 24);
  let m = Math.floor(d / 30);
  let y = Math.floor(m / 12);

  if (y > 0) return y + " years";
  if (m > 0) return m + " months";
  if (d > 0) return d + " days";
  if (h > 0) return h + " hours";
  if (p > 0) return p + " minutes";
  if (s > 0) return s + " seconds";

  return "Just now";
}
