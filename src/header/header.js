import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import style from "./header.module.css";
import logo from "./img/logo.svg";
import user from "./img/userIcon.svg";
import { useAuth } from "./AuthContext";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const isWhiteHeader =
    currentPath === "/shop" || currentPath.startsWith("/community");
  const { state, dispatch } = useAuth();

  const isActive = (paths) =>
    paths.some((path) => currentPath.startsWith(path));

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };
  return (
    <div id={isWhiteHeader ? style.whiteHeader : style.originHeader}>
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
                {state.isAuthenticated ? (
                  <li>
                    <button onClick={handleLogout}>로그아웃</button>
                  </li>
                ) : (
                  <li>
                    <Link to="/login">로그인</Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
