import React, { useState, ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalCancel from "./ModalCancel";
import ModalStaff from "./ModalStaff";
import ModalQuantity1 from "./ModalQuantity";
import ModalQuantity2 from "./ModalQuantity";
import ModalQuantitySet from "./ModalQuantitySet";
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

import "../css/Order.css";

interface Item {
  id: number;
  name: string;
  img: string;
  price: number;
}

interface CartItem {
  itemId: number;
  quantity: number;
}

const initialState = {
  items: [
    { id: 0, name: '불고기버거', img: IMG_MENU1, price: 5000 },
    { id: 1, name: '통새우버거', img: IMG_MENU2, price: 6000 }
  ],
  cartItems: [
    {
      itemId: 0,
      quantity: 1
    }
  ]
};

const Order: React.FC = () => {
  const [active, setActive] = useState<string>('recommend');
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [staffModalOpen, setStaffModalOpen] = useState<boolean>(false);
  const [quantityModalOpen1, setQuantityModalOpen1] = useState<boolean>(false);
  const [quantityModalOpen2, setQuantityModalOpen2] = useState<boolean>(false);
  const [quantitySetModalOpen, setQuantitySetModalOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [items, setItems] = useState<Item[]>(initialState.items);
  const [cartItems, setCartItems] = useState<CartItem[]>(initialState.cartItems);

  const navigate = useNavigate();

  const openModalCancel = () => {
    setCancelModalOpen(true);
  };

  const closeModalCancel = () => {
    setCancelModalOpen(false);
  };

  const openModalStaff = () => {
    setStaffModalOpen(true);
  };

  const closeModalStaff = () => {
    setStaffModalOpen(false);
  };

  const openModalQuantity1 = () => {
    setQuantityModalOpen1(true);
  };

  const openModalQuantity2 = () => {
    setQuantityModalOpen2(true);
  };

  const closeModalQuantity = () => {
    setQuantityModalOpen1(false);
    setQuantityModalOpen2(false);
  };

  const openModalQuantitySet = () => {
    setQuantitySetModalOpen(true);
  };

  const closeModalQuantitySet = () => {
    setQuantitySetModalOpen(false);
  };

  const staffCall = () => {
    axios.get('/api/staff').then(response => console.log(response.data));
  };

  const scrollTop = () => {
    const element = document.getElementsByClassName("select-list")[0];
    element.scrollTo(0, 0);
  };

  const scrollBottom = () => {
    const element = document.getElementsByClassName("select-list")[0];
    element.scrollTop = element.scrollHeight;
  };

  const getSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const filterName = initialState.items.filter((p) => {
    return p.name.replace(" ", "").toLocaleLowerCase().includes(userInput.toLocaleLowerCase());
  });

  const addToCart = (itemId: number, itemName: string, itemImg: string, itemPrice: number) => {
    const found = cartItems.filter((el) => el.itemId === itemId)[0];

    if (found) {
      setQuantity(itemId, itemName, itemImg, itemPrice, found.quantity + 1);
    } else {
      setCartItems([...cartItems, {
        itemId,
        quantity: 1
      }]);
    }
  };

  const setQuantity = (itemId: number, itemName: string, itemImg: string, itemPrice: number, quantity: number) => {
    const found = cartItems.filter((el) => el.itemId === itemId)[0];
    const idx = cartItems.indexOf(found);

    const cartItem = {
      itemId,
      quantity
    };

    setCartItems([
      ...cartItems.slice(0, idx),
      cartItem,
      ...cartItems.slice(idx + 1)
    ]);
  };

  const handleDelete = (itemId: number) => {
    setCartItems(cartItems.filter((ele) => ele.itemId !== itemId));
  };

  const moveCheck = () => {
    navigate("/check");
  };

  return (
    <div className="order-layer">
      <div className="header">
        <img src={IMG_LOGO2} alt="Logo" />
      </div>
      <div className="order-menu">
        <div>
          <Link to="/order" onClick={() => setActive('recommend')}>
            <span className={"menu-button1 first" + (active === 'recommend' ? ' active' : '')}>
              <img src={IMG_RECO} alt="Recommend" />
              <div>추천 메뉴</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => setActive('set')}>
            <span className={"menu-button1" + (active === 'set' ? ' active' : '')}>
              <img src={IMG_SET} alt="Set" />
              <div>햄버거 세트</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => setActive('single')}>
            <span className={"menu-button1" + (active === 'single' ? ' active' : '')}>
              <img src={IMG_SINGLE} alt="Single" />
              <div>햄버거 단품</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => setActive('side')}>
            <span className={"menu-button1" + (active === 'side' ? ' active' : '')}>
              <img src={IMG_SIDE} alt="Side" />
              <div>사이드메뉴</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => setActive('drink')}>
            <span className={"menu-button1" + (active === 'drink' ? ' active' : '')}>
              <img src={IMG_DRINK} alt="Drink" />
              <div>음료수</div>
            </span>
          </Link>
          <Link to="/order" onClick={() => setActive('search')}>
            <span className={"menu-button1" + (active === 'search' ? ' active' : '')}>
              <img src={IMG_SEARCH} alt="Search" />
              <div>검색</div>
            </span>
          </Link>
          <div className={(active === 'search' ? '' : 'search-hidden')}>
            <input onChange={getSearchData} type="text" name="search" className="menu-search" placeholder="원하는 메뉴를 검색하세요" />
          </div>
        </div>
        <div className="select-list">
          <ul>
            <li onClick={() => addToCart(initialState.items[0].id, initialState.items[0].name, initialState.items[0].img, initialState.items[0].price)} className={(active === 'set' ? 'menu-card' : 'card-hidden')}>
              <MenuCard name={initialState.items[0].name + "세트"} img={initialState.items[0].img} price={initialState.items[0].price + 1000} />
            </li>
            <li onClick={openModalQuantitySet} className={(active === 'set' ? 'menu-card' : 'card-hidden')}>
              <MenuCard name={initialState.items[1].name + "세트"} img={initialState.items[1].img} price={initialState.items[1].price + 1000} />
            </li>
            <li onClick={openModalQuantity1} className={(active === 'single' ? 'menu-card' : 'card-hidden')}>
              <MenuCard name={initialState.items[0].name} img={initialState.items[0].img} price={initialState.items[0].price} />
            </li>
            <li onClick={openModalQuantity2} className={(active === 'single' ? 'menu-card' : 'card-hidden')}>
              <MenuCard name={initialState.items[1].name} img={initialState.items[1].img} price={initialState.items[1].price} />
            </li>
            {filterName.map(items =>
              <li key={items.id} className={(active === 'search' ? 'menu-card' : 'card-hidden')}>
                <MenuCard name={items.name} img={items.img} price={items.price} />
              </li>
            )}
            <span className="btn-up">
              <img onClick={scrollTop} src={IMG_UP} alt="Scroll Up" />
            </span>
            <span className="btn-down">
              <img onClick={scrollBottom} src={IMG_DOWN} alt="Scroll Down" />
            </span>
          </ul>
        </div>
      </div>
      <div className="order-list">
        <div className="list">
          <span className="list-text">주문 내역</span>
          <span className="list-count">2</span>
        </div>
        <div className="amount">
          <span className="list-text">총 주문금액</span>
          <span className="list-text red">{10000}원</span>
        </div>
        <div className="card-list">
          <ul>
            <li className="order-card">
              <div className="card-text1">불고기버거</div>
              <img src={IMG_MENU1} className="ordered" alt="Ordered Item" />
              <img src={IMG_CLOSE} className="btn-close" onClick={() => handleDelete(0)} alt="Close" />
              <div className="card-text2 position-up">1개</div>
              <div className="card-text2 red">{5000}원</div>
            </li>
            <li className="order-card">
              <div className="card-text1">불고기버거</div>
              <img src={IMG_MENU1} className="ordered" alt="Ordered Item" />
              <img src={IMG_CLOSE} className="btn-close" onClick={() => handleDelete(1)} alt="Close" />
              <div className="card-text2 position-up">1개</div>
              <div className="card-text2 red">{5000}원</div>
            </li>
          </ul>
        </div>
        <div className="button-select1">
          <span className="guide-button" onClick={openModalCancel}>주문 취소</span>
          <span className="guide-button" onClick={() => {
            openModalStaff();
            staffCall();
          }}>직원 호출</span>
          <span className="guide-button order-button" onClick={moveCheck}>결제하기</span>
          <ModalCancel open={cancelModalOpen} close={closeModalCancel} />
          <ModalStaff open={staffModalOpen} close={closeModalStaff} />
          <ModalQuantity1 open={quantityModalOpen1} close={closeModalQuantity} menu={initialState.items[0]} />
          <ModalQuantity2 open={quantityModalOpen2} close={closeModalQuantity} menu={initialState.items[1]} />
          <ModalQuantitySet open={quantitySetModalOpen} close={closeModalQuantitySet} menu={initialState.items[1]} />
        </div>
      </div>
    </div>
  );
};

interface MenuCardProps {
  name: string;
  img: string;
  price: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, img, price }) => {
  return (
    <>
      <img src={img} alt="" />
      <div className="menu-text">{name}</div>
      <div className="menu-text position-down red">{price}원~</div>
    </>
  );
};

export default Order;
