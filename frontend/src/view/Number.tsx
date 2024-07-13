import IMG_NUMBER from "../images/number.png";

// SCSS 파일
import "../css/Number.scss"
import "../css/Modal.scss"

// 헤더 파일
import Header from "./Component/Header";

const Number: React.FC = () => {
  return (
    <div className="check-layer">
      {/* header 화면 */}
      <div className="header">
        <Header />
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
      <div className="payment-center">
        <div className="pay-up pay-text">주문이 완료됐습니다!</div>
        <div className="pay-text2">주문번호</div>
        <div className="number">269</div>
        <img className="pay-number" src={IMG_NUMBER} alt="" />
      </div>
    </div>
  )
}

export default Number;