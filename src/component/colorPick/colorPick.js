import style from "./colorPick.module.css";
const colors = [
  "#007aff",
  "#d32f2f",
  "#fff",
  "#000",
  "#503c3c",
  "#45d76b",
  "#d78145",
  "#d745d6",
  "#45d7d1",
  "#350d21",
  "#838082",
];
export default function ColorPick({ setColor }) {
  return (
    <div className={style.wrap}>
      {colors.map((item) => (
        <div
          key={item}
          className={style.color}
          style={{ backgroundColor: item }}
          onClick={() => setColor(item)}
        ></div>
      ))}
    </div>
  );
}
