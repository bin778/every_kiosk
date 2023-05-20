import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

import IMG_LOGO2 from "../images/logo2.png";

import ModalStaff from "./ModalStaff.jsx";

import "../css/Check.css"
import "../css/Modal.css"

export default function Check(props) {
  let [staffModalOpen, setStaffModalOpen] = useState(false);

  const movePage = useNavigate();

  // 주문 화면으로 이동한다.
  function moveOrder() {
    movePage("/order");
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
      <div className="header">
        <img src={IMG_LOGO2} alt="" />
      </div>
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
      <div className="check-main">
      </div>
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
            <span className="guide-button order-button">결제</span>
            <ModalStaff open={staffModalOpen} close={closeModalStaff} />
        </div>
      </div>
    </div>
  )
}
