import image from "./../../public/error.svg";
import { Link } from "react-router-dom";
import style from "./error.module.css";
export default function Error() {
  return (
    <div className={style.wrapper}>
      <img src={image} className={style.img}></img>
      <div className={style.warn}>
        <div className={style.text}>
          <div>發生錯誤</div>
          <Link to="/" reloadDocument>
            <button className={style.button}>回首頁</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
