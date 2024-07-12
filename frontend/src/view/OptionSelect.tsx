import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import IMG_MENU1 from "../images/menu1.png";
import IMG_SIDE from "../images/potato.png";
import IMG_DRINK from "../images/cola.png";

import ModalStaff from "./ModalStaff";
import IngredientSelect from "./IngredientSelect";
import SideSelect from "./SideSelect";
import DrinkSelect from "./DrinkSelect";

// SCSS 파일
import "../css/OptionSelect.scss";
import "../css/Modal.scss";

// 헤더 파일
import Header from "./Component/Header";

const OptionSelect: React.FC = () => {
  let [staffModalOpen, setStaffModalOpen] = useState<boolean>(false);
  let [ingredientSelectOpen, setIngredientSelectOpen] = useState<boolean>(false);
  let [sideSelectOpen, setSideSelectOpen] = useState<boolean>(false);
  let [drinkSelectOpen, setDrinkSelectOpen] = useState<boolean>(false);

  const movePage = useNavigate();

  const location = useLocation();
  const price = location.state.price;
  const price2 = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // 홈 화면으로 이동한다
  const moveOrder: React.MouseEventHandler<HTMLSpanElement> = () => {
    movePage("/order");
  }

  // 모달 직원 호출창
  const openModalStaff = () => {
    setStaffModalOpen(true);
  };

  const closeModalStaff = () => {
    setStaffModalOpen(false);
  };

  // 모달 선택창
  const openIngredientSelect = () => {
    setIngredientSelectOpen(true);
  };

  const closeIngredientSelect = () => {
    setIngredientSelectOpen(false);
  };

  const openSideSelect = () => {
    setSideSelectOpen(true);
  };

  const closeSideSelect = () => {
    setSideSelectOpen(false);
  };

  const openDrinkSelect = () => {
    setDrinkSelectOpen(true);
  };

  const closeDrinkSelect = () => {
    setDrinkSelectOpen(false);
  };

  // 직원 호출 요청
  const staffCall = () => {
    axios.get("/api/staff").then((response) => console.log(response.data));
  };

  return (
    <div className="select-layer">
      {/* header 화면 */}
      <Header />
      {/* main 화면 */}
      <div className="option-title">선택한 옵션을 확인하세요</div>
      <ul className="option-board">
        <li className="option-box">
          <div>
            <span className="option-number">1</span>
            <span className="option-select1">재료 변경</span>
          </div>
          <img src={IMG_MENU1} alt="" />
          <span className="option-name">새우 버거</span>
          <span className="option-engname">Shrimp Burger</span>
          <span className="option-select2" onClick={openIngredientSelect}>재료 변경</span>
        </li>
        <li className="option-box">
          <div>
            <span className="option-number">2</span>
            <span className="option-select1">사이드메뉴 변경</span>
          </div>
          <img src={IMG_SIDE} alt="" />
          <span className="option-name">감자튀김(中)</span>
          <span className="option-engname">French Fries(Middle)</span>
          <span className="option-select2" onClick={openSideSelect}>사이드메뉴 변경</span>
        </li>
        <li className="option-box">
          <div>
            <span className="option-number">3</span>
            <span className="option-select1">음료 변경</span>
          </div>
          <img src={IMG_DRINK} alt="" />
          <span className="option-name">코카콜라(中)</span>
          <span className="option-engname">Coca-Cola(Middle)</span>
          <span className="option-select2" onClick={openDrinkSelect}>
            음료 변경
          </span>
        </li>
      </ul>
      {/* footer 화면 */}
      <div className="option-menu">
        <div className="button-select1">
          <span className="large-button">라지로 변경</span>
          <span className="option-price1">금액</span>
          <span className="option-price1 option-price2"> {price2}원</span>
        </div>
        <div className="button-select1">
          <span className="guide-button" onClick={moveOrder}>주문 취소</span>
          <span
            className="guide-button"
            onClick={() => {openModalStaff(); staffCall();}}>직원호출</span>
          <span className="guide-button order-button">담기</span>
          <ModalStaff open={staffModalOpen} close={closeModalStaff} />
          {/* 메뉴 모달 창 */}
          <IngredientSelect open={ingredientSelectOpen} close={closeIngredientSelect} />
          <SideSelect open={sideSelectOpen} close={closeSideSelect} />
          <DrinkSelect open={drinkSelectOpen} close={closeDrinkSelect} />
        </div>
      </div>
    </div>
  );
};

export default OptionSelect;