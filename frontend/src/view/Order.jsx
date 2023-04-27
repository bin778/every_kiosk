import { Link } from "react-router-dom";
import { useState } from "react";
import ModalCancel from "./ModalCancel.jsx";
import ModalStaff from "./ModalStaff.jsx";
import ModalQuantity from "./ModalQuantity.jsx";
import ModalQuantitySet from "./ModalQuantitySet.jsx";
import axios from 'axios';

import IMG_LOGO2 from "../images/logo2.png";
import IMG_RECO from "../images/recommend.png";
import IMG_SINGLE from "../images/hamburger.png";
import IMG_SET from "../images/hamburger_set.png";
import IMG_SIDE from "../images/side.png";
import IMG_DRINK from "../images/drink.png";
import IMG_SEARCH from "../images/search.png";

import IMG_CLOSE from "../images/close.png";
import IMG_UP from "../images/up.png";
import IMG_DOWN from "../images/down.png";

import IMG_MENU1 from "../images/menu1.png";
import IMG_MENU2 from "../images/menu2.png";
// import IMG_POTATO from "../images/potato.png";
// import IMG_COLA from "../images/cola.png";

import "../css/Order.css"

export default function Order(props) {
  let [active, setActive] = useState('recommend');
  let [cancelModalOpen, setCancelModalOpen] = useState(false);
  let [staffModalOpen, setStaffModalOpen] = useState(false);
  let [quantityModalOpen, setQuantityModalOpen] = useState(false);
  let [quantitySetModalOpen, setQuantitySetModalOpen] = useState(false);

  // 메뉴(세트는 +1000원)
  const menu = [
    { id: 0, name: '불고기버거', img: IMG_MENU1, price: 5000 },
    { id: 1, name: '통새우버거', img: IMG_MENU2, price: 6000 }
  ];

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

  // 모달 수량 선택
  const openModalQuantity = () => {
    setQuantityModalOpen(true);
  };

  const closeModalQuantity = () => {
    setQuantityModalOpen(false);
  }

  // 모달 수량 선택(세트)
  const openModalQuantitySet = () => {
    setQuantitySetModalOpen(true);
  };

  const closeModalQuantitySet = () => {
    setQuantitySetModalOpen(false);
  }

  // 직원 호출 요청
  const staffCall = () => {
    axios.get('/api/staff').then(response => console.log(response.data));
  };

  // 스크롤 이동
  const scrollTop = () => {
    const element = document.getElementsByClassName("select-list")[0];
    element.scrollTo(0,0);
  }

  const scrollBottom = () => {
    const element = document.getElementsByClassName("select-list")[0];
    element.scrollTop = element.scrollHeight;
  }

  // 검색 기능
  const [userInput, setUserInput] = useState('');

  const getSearchData = (e) => {
    setUserInput(e.target.value.toLowerCase());
  }
  
  const filterName = menu.filter((p) => {
    return p.name.replace(" ","").toLocaleLowerCase().includes(userInput.toLocaleLowerCase());
  })

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
          {/* 검색 하는 곳 */}
          <div className={(active === 'search' ? '' : 'search-hidden')}>
            <input onChange={getSearchData} type="text" name="search" className="menu-search" placeholder="원하는 메뉴를 검색하세요" />    
          </div>
        </div>
        {/* 음식 목록 선택하기 */}
        <div className="select-list">
          <ul>
            {/* 추천 메뉴 : OpenCV 메뉴 추천 */}
            {/* 세트 메뉴 */}
            <li onClick={openModalQuantitySet} className={(active === 'set' ? 'menu-card' : 'card-hidden')}>
              <MenuCard name={menu[0].name + "세트"} img={menu[0].img} price={menu[0].price + 1000} />
            </li>
            <li onClick={openModalQuantitySet} className={(active === 'set' ? 'menu-card' : 'card-hidden')}>
              <MenuCard name={menu[1].name + "세트"} img={menu[1].img} price={menu[1].price + 1000} />
            </li>
            {/* 단품 메뉴 */}
            <li onClick={openModalQuantity} className={(active === 'single' ? 'menu-card' : 'card-hidden')}>
              <MenuCard name={menu[0].name} img={menu[0].img} price={menu[0].price} />
            </li>
            {/* 사이드 메뉴 */}
            {/* 음료 */}
            {/* 검색 */}
            {filterName.map(menu =>
                <li className={(active === 'search' ? 'menu-card' : 'card-hidden')}>
                  <MenuCard name={menu.name} img={menu.img} price={menu.price} />
                </li>
            )}
            {/* 메뉴 화살표 */}
            <span className="btn-up">
              <img onClick={scrollTop} src={IMG_UP} alt="" />
            </span>
            <span className="btn-down">
              <img onClick={scrollBottom} src={IMG_DOWN} alt="" />
            </span>
          </ul>
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
        <div className="card-list">
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
            <li className="order-card">
              <div className="card-text1">불고기버거세트</div>
              <img src={IMG_MENU1} className="ordered" alt="" />
              <img src={IMG_CLOSE} className="btn-close" alt="" />
              <div className="card-text2 position-up">1개</div>
              <div className="card-text2 red">5,000원</div>
            </li>
          </ul>
        </div>
        <div className="button-select1">
          <span className="guide-button" onClick={openModalCancel}>주문 취소</span>
          <span className="guide-button" onClick={() => {
            openModalStaff()
            staffCall()
          }}>직원 호출</span>
          <span className="guide-button order-button">결제하기</span>
          {/* 모달 창 */}
          <ModalCancel open={cancelModalOpen} close={closeModalCancel} />
          <ModalStaff open={staffModalOpen} close={closeModalStaff} />
          <ModalQuantity open={quantityModalOpen} close={closeModalQuantity} menu={menu[0]}/>
          <ModalQuantitySet open={quantitySetModalOpen} close={closeModalQuantitySet} menu={menu[1]}/>
        </div>
      </div>
    </div>
  );
}

function MenuCard({ name, img, price }) {
  return (
    <>
      <img src={img} alt="" />
      <div className="menu-text">{name}</div>
      <div className="menu-text position-down red">{price}원~</div>
    </>
  );
}