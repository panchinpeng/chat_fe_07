import style from "./footer.module.css";
import BottomNav from "./../bottomNav/bottomNav";
function Footer() {
  return (
    <>
      <div className={style.wrap}>
        Copyright © 2024 ParryPan All rights reserved
      </div>
      <BottomNav></BottomNav>
    </>
  );
}
export default Footer;
