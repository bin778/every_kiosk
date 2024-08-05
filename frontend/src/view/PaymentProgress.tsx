import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

import IMG_PAYMENT from "../images/payment.webp";

import ModalStaff from "./ModalStaff";

// SCSS 파일
import "../css/PaymentProgress.scss"
import "../css/Modal.scss"

// 헤더 파일
import Header from "./Component/Header";

const PaymentProgress: React.FC = () => {
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
      <Header />
      {/* 진행 화면 */}
      <div className="check-process">
        <span>
          <div>STEP 01</div>
          <div>주문확인</div>
        </span>
        <span>
          <div>STEP 02</div>
          <div>결제수단</div>
        </span>
        <span className="process-red">
          <div>STEP 03</div>
          <div>결제요청</div>
        </span>
        <span>
          <div>STEP 04</div>
          <div>주문완료</div>
        </span>
      </div>
      {/* 결제 진행 화면 */}
      <div className="payment-center">
        <div className="pay-up pay-text text-red">신용 카드를</div>
        <div className="pay-text">투입구에 꽂아주세요</div>
        <div className="pay-text2">결제 오류시 마그네틱을 아래로 향하게 긁어주세요</div>
        <img className="pay-card" src={IMG_PAYMENT} alt="" />
      </div>
      {/* 총 주문금액 */}
      <div className="paymentprogress-menu">
        <div>
          <span className="check-price1">총 주문금액</span>
          <span className="check-price1 check-price2">5,000원</span>
        </div>
        <div className="button-select1">
            <span className="guide-button guide-button2" onClick={moveOrder}>결제취소</span>
            <span className="guide-button guide-button2" onClick={() => {
              openModalStaff()
              staffCall()
            }}>직원호출</span>
            <ModalStaff open={staffModalOpen} close={closeModalStaff} />
        </div>
      </div>
    </div>
  )
}

export default PaymentProgress;