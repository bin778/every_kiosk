import { Link } from "react-router-dom";
import { useState } from "react";

import IMG_LOGO2 from "../images/logo2.png";

import "../css/OptionSelect.css"

export default function OptionSelect(props) {
  return (
    <div className="select-layer">
      {/* header 화면 */}
      <div className="header">
        <img src={IMG_LOGO2} alt="" />
      </div>
      <div className="option-check">선택한 옵션을 확인하세요</div>
      <div>
      </div>
      <div className="option-menu">
        <div className="button-select1">
          <span className="guide-button">주문 취소</span>
          <span className="guide-button">직원호출</span>
          <span className="guide-button order-button">담기</span>
        </div>
      </div>
    </div>
  );
}
