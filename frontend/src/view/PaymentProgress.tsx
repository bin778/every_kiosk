import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import IMG_PAYMENT from "../images/payment.webp";
import ModalStaff from "./Modal/ModalStaff";
import "../css/PaymentProgress.scss";
import "../css/Modal.scss";
import Header from "./Component/Header";

const PaymentProgress: React.FC = () => {
  let [staffModalOpen, setStaffModalOpen] = useState(false);
  const movePage = useNavigate();
  const location = useLocation();

  const { total_price } = location.state || { total_price: 0 };
  const { total_name } = location.state || { total_name: "" };

  function moveOrder() {
    movePage("/order");
  }

  const openModalStaff = () => {
    setStaffModalOpen(true);
  };

  const closeModalStaff = () => {
    setStaffModalOpen(false);
  };

  const staffCall = (reason: string) => {
    axios
      .post("/api/staff", { reason })
      .then((response) => console.log(response.data));
  };

  // 사용자 결제 프로세스
  const requestPayment = () => {
    const { IMP } = window as any;
    IMP.init("imp01181305");
  
    const m_redirect_url = `${
      window.location.origin
    }/payment_mobile?amount=${encodeURIComponent(total_price)}`;
  
    IMP.request_pay(
      {
        pg: "uplus",
        pay_method: "card",
        merchant_uid: `mid_${new Date().getTime()}`,
        amount: total_price,
        name: total_name,
        m_redirect_url,
      },
      async (rsp: any) => {
        if (rsp.success) {
          try {
            const response = await axios.post("/api/payment", {
              imp_uid: rsp.imp_uid,
              merchant_uid: rsp.merchant_uid,
              amount: rsp.paid_amount,
            });
            if (response.data.success) {
              alert("결제 성공");
              movePage("/number");
            } else {
              alert("결제 실패: " + response.data.message);
              movePage("/order");
            }
          } catch (error) {
            alert("결제 처리 중 오류가 발생했습니다.");
            console.error(error);
            movePage("/order");
          }
        } else {
          alert(`결제 실패: ${rsp.error_msg}`);
          movePage("/order");
        }
      }
    );
  };  

  return (
    <div className="check-layer">
      <Header />
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
      <div className="payment-center">
        <div className="pay-up pay-text text-red">신용 카드를</div>
        <div className="pay-text">투입구에 꽂아주세요</div>
        <div className="pay-text2">
          결제 오류시 마그네틱을 아래로 향하게 긁어주세요
        </div>
        <img className="pay-card" src={IMG_PAYMENT} alt="" />
      </div>
      <div className="paymentprogress-menu">
        <div>
          <span className="check-price1">총 주문금액</span>
          <span className="check-price1 check-price2">
            {String(total_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원
          </span>
        </div>
        <div className="button-select1">
          <span className="guide-button" onClick={moveOrder}>
            결제취소
          </span>
          <span
            className="guide-button"
            onClick={() => {
              openModalStaff();
              staffCall("고객 호출");
            }}
          >
            직원호출
          </span>
          <span className="guide-button order-button" onClick={requestPayment}>
            결제
          </span>
          <ModalStaff open={staffModalOpen} close={closeModalStaff} />
        </div>
      </div>
    </div>
  );
};

export default PaymentProgress;
