import IMG_LOGO2 from "../images/logo2.png";
import IMG_NUMBER from "../images/number.png";
import "../css/Number.css"
import "../css/Modal.css"

export default function PaymentProgress(props) {
  return (
    <div className="check-layer">
      {/* header 화면 */}
      <div className="header">
        <img src={IMG_LOGO2} alt="" />
      </div>
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
        <span>
          <div>STEP 03</div>
          <div>결제요청</div>
        </span>
        <span className="process-red">
          <div>STEP 04</div>
          <div>주문완료</div>
        </span>
      </div>
      {/* 주문표 확인 */}
      <div className="center">
        <div className="pay-up pay-text">주문이 완료되었습니다!</div>
        <div className="pay-text2">주문번호</div>
        <div className="number">269</div>
        <img className="pay-number" src={IMG_NUMBER} alt="" />
      </div>
    </div>
  )
}
