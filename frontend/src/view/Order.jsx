import { useNavigate } from "react-router-dom";
import IMG_LOGO2 from "../images/logo2.png";
import IMG_RECO from "../images/recommend.png";
import IMG_HAMBURGER from "../images/hamburger.png";
import IMG_HAMBURSET from "../images/hamburger_set.png";
import IMG_SIDE from "../images/side.png";
import IMG_DRINK from "../images/drink.png";
import IMG_SEARCH from "../images/search.png";

import "../css/Order.css"

export default function Order(props) {
  return (
    <div className="order-layer">
      {/* header 화면 */}
      <div className="header">
        <img src={IMG_LOGO2} alt="" />
      </div>
      {/* 메뉴 주문하기 */}
      <div className="order-menu">
        {/* 메뉴 목록 선택하기 */}
        <div>
          <span className="menu-button1 first select">
            <img src={IMG_RECO} alt="" />
            <div>추천 메뉴</div>
          </span>
          <span className="menu-button1">
            <img src={IMG_HAMBURGER} alt="" />
            <div>햄버거 세트</div>
          </span>
          <span className="menu-button1">
            <img src={IMG_HAMBURSET} alt="" />
            <div>햄버거 단품</div>
          </span>
          <span className="menu-button1">
            <img src={IMG_SIDE} alt="" />
            <div>사이드메뉴</div>
          </span>
          <span className="menu-button1">
            <img src={IMG_DRINK} alt="" />
            <div>음료수</div>
          </span>
          <span className="menu-button1">
            <img src={IMG_SEARCH} alt="" />
            <div>검색</div>
          </span>
        </div>
        {/* 음식 목록 선택하기 */}
        <div>
        </div>
      </div>
      {/* 주문내역 화면 */}
      <div className="order-list">

      </div>
    </div>
  );
}
