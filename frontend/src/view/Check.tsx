import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from 'axios';

import IMG_MENU1 from "../images/menu1.png";

import ModalStaff from "./ModalStaff";

// SCSS 파일
import "../css/Check.scss"
import "../css/Modal.scss"

// 헤더 파일
import Header from "./Component/Header";

const Check: React.FC = () => {
  let [staffModalOpen, setStaffModalOpen] = useState(false);

  const movePage = useNavigate();

  // 주문 화면으로 이동한다.
  function moveOrder() {
    movePage("/order");
  }

  // 결제수단 선택 화면으로 이동한다.
  function movePaySelect() {
    movePage("/payment_select")
  }

  // 모달 직원 호출창
  const openModalStaff = () => {
    setStaffModalOpen(true);
  };

  const closeModalStaff = () => {
    setStaffModalOpen(false);
  }

  // 직원 호출 요청
  const staffCall = () => {
    axios.get('/api/staff').then(response => console.log(response.data));
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
        <li className="check-card">
          <img src={IMG_MENU1} alt="" />
          <div className="check-text">불고기버거세트</div>
          <div className="check-text check-option">치즈 추가</div>
          <div className="check-text check-side">감자튀김(中), 코카콜라(中)</div>
          <div className="check-text check-quantity">2개</div>
          <div className="check-text check-price red">6,500원</div>
        </li>
      </ul>
      {/* 총 주문금액 */}
      <div className="check-menu">
        <div>
          <span className="check-price1">총 주문금액</span>
          <span className="check-price1 check-price2">5,000원</span>
        </div>
        <div className="button-select1">
            <span className="guide-button" onClick={moveOrder}>취소</span>
            <span className="guide-button" onClick={() => {
              openModalStaff()
              staffCall()}}>직원호출</span>
            <span className="guide-button order-button" onClick={movePaySelect}>결제</span>
            <ModalStaff open={staffModalOpen} close={closeModalStaff} />
        </div>
      </div>
    </div>
  )
}

export default Check;