import style from "./footer.module.css";
import BottomNav from "./../bottomNav/bottomNav";
import { useLocation } from "react-router-dom";
function Footer() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <>
      {location.pathname === "/" && (
        <div className={style.wrap}>
          Copyright © 2024 ParryPan All rights reserved
        </div>
      )}
      <BottomNav></BottomNav>
    </>
  );
}
export default Footer;
