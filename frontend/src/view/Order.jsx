import { useNavigate } from "react-router-dom";
import IMG_LOGO2 from "../images/logo2.png";
import IMG_RECO from "../images/recommend.png";
import IMG_HAMBURGER from "../images/hamburger.png";
import IMG_HAMBURSET from "../images/hamburger_set.png";
import IMG_SIDE from "../images/side.png";
import IMG_DRINK from "../images/drink.png";
import IMG_SEARCH from "../images/search.png";

import IMG_CLOSE from "../images/close.png";
import IMG_PREV from "../images/left.png";
import IMG_NEXT from "../images/right.png";

import IMG_MENU1 from "../images/menu1.png";

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
        <div className="select-list">
        </div>
      </div>
      {/* 주문 내역 화면 */}
      <div className="order-list">
        <div className="list">
          <span className="list-text">주문 내역</span>
          <span className="list-count">2</span>
        </div>
        <div className="amount">
          <span className="list-text">총 주문금액</span>
          <span className="list-text red">10,000원</span>
        </div>
        <ul>
          <li className="order-card">
            <div className="card-text1">불고기버거세트</div>
            <img src={IMG_MENU1} className="ordered" alt="" />
            <img src={IMG_CLOSE} className="btn-close" alt="" />
            <div className="card-text2 position-up">1개</div>
            <div className="card-text2">5,000원</div>
          </li>
          <li className="order-card">
            <div className="card-text1">불고기버거세트</div>
            <img src={IMG_MENU1} className="ordered" alt="" />
            <img src={IMG_CLOSE} className="btn-close" alt="" />
            <div className="card-text2 position-up">1개</div>
            <div className="card-text2">5,000원</div>
          </li>
          <span className="btn-prev">
            <img src={IMG_PREV} alt="" />
          </span>
          <span className="btn-next">
            <img src={IMG_NEXT} alt="" />
          </span>
        </ul>
        <div>
          <span className="guide-button">주문 취소</span>
          <span className="guide-button">직원 호출</span>
          <span className="guide-button order-button">결제하기</span>
        </div>
      </div>
    </div>
  );
}
