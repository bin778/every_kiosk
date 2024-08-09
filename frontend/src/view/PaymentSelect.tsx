import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

import IMG_CARD from "../images/card.webp";
import IMG_MONEY from "../images/money.webp";

import ModalStaff from "./Modal/ModalStaff";

// SCSS 파일
import "../css/PaymentSelect.scss"
import "../css/Modal.scss"

// 헤더 파일
import Header from "./Component/Header";

const PaymentSelect: React.FC = () => {
  let [staffModalOpen, setStaffModalOpen] = useState(false);

  const movePage = useNavigate();
  const location = useLocation();
  
  // 전달된 total_price 값
  const { total_price } = location.state || { total_price: 0 };

  // 주문 화면으로 이동한다.
  function moveOrder() {
    movePage("/order");
  }

  // 결제수단 선택 화면으로 이동한다.
  function movePayProgress() {
    movePage("/payment_progress", { state: { total_price: total_price } })
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
        <span>
          <div>STEP 01</div>
          <div>주문확인</div>
        </span>
        <span className="process-red">
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
      {/* 결제수단 안내 */}
      <div className="payment-center">
        <div className="pay-up pay-text">결제 수단을</div>
        <div className="pay-text">선택해주세요</div>
        <span className="pay-menu" onClick={movePayProgress}>
          <img src={IMG_CARD} alt="" />
          <div>신용카드</div>
        </span>
        <span className="pay-menu" onClick={movePayProgress}>
          <img src={IMG_MONEY} alt="" />
          <div>현금</div>
        </span>
      </div>
      {/* 총 주문금액 */}
      <div className="paymentselect-menu">
        <div>
          <span className="check-price1">총 주문금액</span>
          <span className="check-price1 check-price2">{String(total_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
        </div>
        <div className="button-select1">
            <span className="guide-button paymentselect-button" onClick={moveOrder}>결제취소</span>
            <span className="guide-button paymentselect-button" onClick={() => {
              openModalStaff()
              staffCall("고객 호출")
            }}>직원 호출</span>
            <ModalStaff open={staffModalOpen} close={closeModalStaff} />
        </div>
      </div>
    </div>
  )
}

export default PaymentSelect;