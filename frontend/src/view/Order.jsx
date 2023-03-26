import { Link } from "react-router-dom";
import { useState } from "react";
import ModalCancel from "./ModalCancel.jsx";
import ModalStaff from "./ModalStaff.jsx";

import IMG_LOGO2 from "../images/logo2.png";
import IMG_RECO from "../images/recommend.png";
import IMG_SINGLE from "../images/hamburger.png";
import IMG_SET from "../images/hamburger_set.png";
import IMG_SIDE from "../images/side.png";
import IMG_DRINK from "../images/drink.png";
import IMG_SEARCH from "../images/search.png";

import IMG_CLOSE from "../images/close.png";
import IMG_PREV from "../images/left.png";
import IMG_NEXT from "../images/right.png";
import IMG_UP from "../images/up.png";
import IMG_DOWN from "../images/down.png";

import IMG_MENU1 from "../images/menu1.png";
import IMG_MENU2 from "../images/menu2.png";
import IMG_POTATO from "../images/potato.png";
import IMG_COLA from "../images/cola.png";

import "../css/Order.css"

export default function Order(props) {
  let [active, setActive] = useState('recommend');
  let [cancelModalOpen, setCancelModalOpen] = useState(false);
  let [staffModalOpen, setStaffModalOpen] = useState(false);

  // 모달 취소창
  const openModalCancel = () => {
    setCancelModalOpen(true);
  };

  const closeModalCancel = () => {
    setCancelModalOpen(false);
  }

  // 모달 직원 호출창
  const openModalStaff = () => {
    setStaffModalOpen(true);
  };

  const closeModalStaff = () => {
    setStaffModalOpen(false);
  }

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
          <Link to="/order" onClick={() => {
            setActive('recommend');
          }}>
            <span className={"menu-button1 first" + (active === 'recommend' ? ' active' : '')}>
              <img src={IMG_RECO} alt="" />
              <div>추천 메뉴</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => {
            setActive('set');
          }}>
            <span className={"menu-button1" + (active === 'set' ? ' active' : '')}>
              <img src={IMG_SET} alt="" />
              <div>햄버거 세트</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => {
            setActive('single');
          }}>
            <span className={"menu-button1" + (active === 'single' ? ' active' : '')}>
              <img src={IMG_SINGLE} alt="" />
              <div>햄버거 단품</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => {
            setActive('side');
          }}>
            <span className={"menu-button1" + (active === 'side' ? ' active' : '')}>
              <img src={IMG_SIDE} alt="" />
              <div>사이드메뉴</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => {
            setActive('drink');
          }}>
            <span className={"menu-button1" + (active === 'drink' ? ' active' : '')}>
              <img src={IMG_DRINK} alt="" />
              <div>음료수</div>
            </span>
          </Link>        
          <Link to="/order" onClick={() => {
            setActive('search');
          }}>
            <span className={"menu-button1" + (active === 'search' ? ' active' : '')}>
              <img src={IMG_SEARCH} alt="" />
              <div>검색</div>
            </span>
          </Link>
        </div>
        {/* 음식 목록 선택하기 */}
        <div className="select-list">
          <span className="btn-up">
            <img src={IMG_UP} alt="" />
          </span>
          <ul>
            {/* 추천 메뉴 */}
            <li className={(active === 'recommend' ? 'menu-card' : 'card-hidden')}>
              <img src={IMG_MENU1} alt="" />
              <div className="menu-text">불고기버거세트</div>
              <div className="menu-text position-down red">6000원~</div>
            </li>
            <li className={(active === 'recommend' ? 'menu-card' : 'card-hidden')}>
              <img src={IMG_MENU1} alt="" />
              <div className="menu-text">더블불고기버거세트</div>
              <div className="menu-text position-down red">8000원~</div>
            </li>
            {/* 세트 메뉴 */}
            <li className={(active === 'set' ? 'menu-card' : 'card-hidden')}>
              <img src={IMG_MENU1} alt="" />
              <div className="menu-text">더블불고기버거세트</div>
              <div className="menu-text position-down red">8000원~</div>
            </li>
            {/* 단품 메뉴 */}
            <li className={(active === 'single' ? 'menu-card' : 'card-hidden')}>
              <img src={IMG_MENU2} alt="" />
              <div className="menu-text">모짜렐라베이컨슈퍼버거</div>
              <div className="menu-text position-down red">8000원~</div>
            </li>
            {/* 사이드 메뉴 */}
            <li className={(active === 'side' ? 'menu-card' : 'card-hidden')}>
              <img src={IMG_POTATO} alt="" />
              <div className="menu-text">감자튀김</div>
              <div className="menu-text position-down red">1500원~</div>
            </li>
            {/* 음료 */}
            <li className={(active === 'drink' ? 'menu-card' : 'card-hidden')}>
              <img src={IMG_COLA} alt="" />
              <div className="menu-text">코카콜라</div>
              <div className="menu-text position-down red">1500원~</div>
            </li>
          </ul>
          <span className="btn-down">
            <img src={IMG_DOWN} alt="" />
          </span>
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
            <div className="card-text2 red">5,000원</div>
          </li>
          <li className="order-card">
            <div className="card-text1">불고기버거세트</div>
            <img src={IMG_MENU1} className="ordered" alt="" />
            <img src={IMG_CLOSE} className="btn-close" alt="" />
            <div className="card-text2 position-up">1개</div>
            <div className="card-text2 red">5,000원</div>
          </li>
          <span className="btn-prev">
            <img src={IMG_PREV} alt="" />
          </span>
          <span className="btn-next">
            <img src={IMG_NEXT} alt="" />
          </span>
        </ul>
        <div>
          <span className="guide-button" onClick={openModalCancel}>주문 취소</span>
          <span className="guide-button" onClick={openModalStaff}>직원 호출</span>
          <span className="guide-button order-button">결제하기</span>
          {/* 모달 창 */}
          <ModalCancel open={cancelModalOpen} close={closeModalCancel}></ModalCancel>
          <ModalStaff open={staffModalOpen} close={closeModalStaff}></ModalStaff>
        </div>
      </div>
    </div>
  );
}
