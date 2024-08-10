import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from 'axios';

import IMG_PAYMENT from "../images/payment.webp";

import ModalStaff from "./Modal/ModalStaff";

// SCSS 파일
import "../css/PaymentProgress.scss"
import "../css/Modal.scss"

// 헤더 파일
import Header from "./Component/Header";

const PaymentProgress: React.FC = () => {
  let [staffModalOpen, setStaffModalOpen] = useState(false);

  const movePage = useNavigate();
  const location = useLocation();
  
  // 전달된 total_price, total_name 값
  const { total_price } = location.state || { total_price: 0 };
  const { total_name } = location.state || { total_name: "" };

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
  const staffCall = (reason: string) => {
    axios.post('/api/staff', { reason }).then(response => console.log(response.data));
  };

  // 결제 요청
  const requestPayment = () => {
    const { IMP } = window as any;  // window 객체에서 IMP 가져오기
    IMP.init("imp01181305"); // 가맹점 식별코드
  
    // 모바일에서 리디렉션을 위한 URL을 설정
    const m_redirect_url = `${window.location.origin}/payment_mobile?amount=${encodeURIComponent(total_price)}`;
  
    IMP.request_pay({
      pg: 'uplus', // 결제 수단 설정
      pay_method: 'card', // 결제 수단
      merchant_uid: `mid_${new Date().getTime()}`, // 주문 번호
      amount: total_price, // 결제 금액
      name: total_name, // 주문명
      m_redirect_url, // 모바일 리디렉션 URL
    }, async (rsp: any) => {
      if (rsp.success) {
        // 결제 성공 시 서버로 결제 정보 전송
        try {
          const response = await axios.post('/api/payment', {
            imp_uid: rsp.imp_uid,
            merchant_uid: rsp.merchant_uid,
            amount: rsp.paid_amount,
          });
          if (response.data.success) {
            alert('결제 성공');
            movePage("/number");  // 결제 완료 페이지로 이동
          } else {
            alert('결제 실패: ' + response.data.message);
          }
          console.log(response);
        } catch (error) {
          alert('결제 처리 중 오류가 발생했습니다.');
          console.error(error);
        }
      } else {
        // 결제 실패 시 처리
        alert(`결제 실패: ${rsp.error_msg}`);
      }
    });
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
          <span className="check-price1 check-price2">{String(total_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
        </div>
        <div className="button-select1">
            <span className="guide-button" onClick={moveOrder}>결제취소</span>
            <span className="guide-button" onClick={() => {
              openModalStaff()
              staffCall("고객 호출")
            }}>직원호출</span>
            <span className="guide-button order-button" onClick={requestPayment}>결제</span>
            <ModalStaff open={staffModalOpen} close={closeModalStaff} />
        </div>
      </div>
    </div>
  )
}

export default PaymentProgress;
