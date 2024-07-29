import style from "./headerMain.module.css";
import { useLocation, Link } from "react-router-dom";
import logo from "./img/mainLogo.svg";
import user from "./img/userIcon.svg";
function Header() {
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = (paths) =>
    paths.some((path) => currentPath.startsWith(path));
  return (
    <div id={style.headerFixed}>
      <div id={style.headerWrapper}>
        <Link to="/">
          <img src={logo} alt="로고" id={style.logo} />
        </Link>
        <div id={style.menu}>
          <ul id={style.nav}>
            <li>
              <Link
                to="/shop"
                className={currentPath === "/shop" ? style.active : ""}
              >
                상품
              </Link>
            </li>
            <li>
              <Link
                to="/mbti"
                className={isActive(["/mbti"]) ? style.active : ""}
              >
                멍BTI
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className={isActive(["/community"]) ? style.active : ""}
              >
                멍뮤니티
              </Link>
            </li>
          </ul>
          <div id={style.mypage}>
            <div
              className={`${style.userIcon} ${
                isActive(["/mypage"]) ? style.active : ""
              }`}
            >
              <Link to="/mypage">
                <img src={user} alt="유저아이콘" />
              </Link>
            </div>
            <div className={style.hover}>
              <ul>
                <li>
                  <Link to="/mypage">마이페이지</Link>
                </li>
                {/* 로그인인지 판단해서 로그아웃하는거 추가하기 */}
                <li>
                  <Link to="/login">로그인</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
