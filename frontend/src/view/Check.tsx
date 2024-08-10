import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';

import ModalStaff from "./Modal/ModalStaff";

// SCSS 파일
import "../css/Check.scss"
import "../css/Modal.scss"

// 헤더 파일
import Header from "./Component/Header";
import { useEffect } from "react";

interface Cart {
  orders_id: number;
  orders_title: string;
  orders_image: string;
  orders_quantity: number;
  orders_price: number;
  sets_ingredient: string;
  sets_side: string;
  sets_drink: string;
}

interface TotalPrice {
  total_price: number;
}

interface TotalName {
  total_name: string;
}

const Check: React.FC = () => {
  let [staffModalOpen, setStaffModalOpen] = useState(false);
  let [Cart, setCart] = useState([]);
  let [CartPrice, setCartPrice] = useState<TotalPrice>({ total_price: 0 });
  let [CartName, setCartName] = useState<TotalName>({ total_name: "" });

  useEffect(() => {
    fetchCart();
  }, [])

  // 장바구니 목록을 불러온다.
  const fetchCart = () => {
    axios.get("/api/cart").then((res) => {
      const cartData = res.data.result;
      setCart(cartData);

      // 장바구니 총 개수 및 총 가격을 여기서 계산
      const totalQuantity = cartData.length;
      const totalPrice = cartData.reduce((acc: number, item: Cart) => acc + (item.orders_price * item.orders_quantity), 0);
      setCartPrice({ total_price: totalPrice });
      const totalName = (totalQuantity === 1 ? cartData[0].orders_title : cartData[0].orders_title + " 외 " + (totalQuantity - 1) + "개");
      setCartName({ total_name: totalName })
    }).catch((error) => {
      console.log('데이터 가져오기 실패: ', error);
    });
  };

  const movePage = useNavigate();

  // 주문 화면으로 이동한다.
  function moveOrder() {
    movePage("/order");
  }

  // 결제수단 선택 화면으로 이동한다.
  function movePaySelect() {
    movePage("/payment_select", { state: { total_price: CartPrice.total_price, total_name: CartName.total_name } });
  }

  // 모달 직원 호출창
  const openModalStaff = () => {
    setStaffModalOpen(true);
  };

  const closeModalStaff = () => {
    setStaffModalOpen(false);
  }

  // 직원 호출 요청
  const staffCall = (reason: string) => {
    axios.post('/api/staff', { reason }).then(response => console.log(response.data));
  };

  return (
    <div className="check-layer">
      {/* header 화면 */}
      <Header />
      {/* 진행 화면 */}
      <div className="check-process">
        <span className="process-red ">
          <div>STEP 01</div>
          <div>주문확인</div>
        </span>
        <span>
          <div>STEP 02</div>
          <div>결제수단</div>
        </span>
        <span>
          <div>STEP 03</div>
          <div>결제요청</div>
        </span>
        <span>
          <div>STEP 04</div>
          <div>주문완료</div>
        </span>
      </div>
      {/* 주문확인 목록 */}
      <ul className="check-main">
        {Cart.map((Cart: Cart) => (
          <li key={Cart.orders_id} className="check-card">
            <img src={Cart.orders_image} alt="" />
            <div className="check-text">{Cart.orders_title}</div>
            <div className="check-text check-option">{Cart.sets_ingredient === "추가 없음" || Cart.sets_ingredient === null ? "" : Cart.sets_ingredient + " 추가"}</div>
            <div className="check-text check-side">{Cart.sets_side} {Cart.sets_side ? ", " : ""} {Cart.sets_drink}</div>
            <div className="check-text check-quantity">{Cart.orders_quantity}개</div>
            <div className="check-text check-price red">{String(Cart.orders_price * Cart.orders_quantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
          </li>
        ))};
      </ul>
      {/* 총 주문금액 */}
      <div className="check-menu">
        <div>
          <span className="check-price1">총 주문금액</span>
          <span className="check-price1 check-price2">{String(CartPrice.total_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
        </div>
        <div className="button-select1">
            <span className="guide-button" onClick={moveOrder}>취소</span>
            <span className="guide-button" onClick={() => {
              openModalStaff()
              staffCall("고객 호출")}}>직원 호출</span>
            <span className="guide-button order-button" onClick={movePaySelect}>결제</span>
            <ModalStaff open={staffModalOpen} close={closeModalStaff} />
        </div>
      </div>
    </div>
  )
}

export default Check;