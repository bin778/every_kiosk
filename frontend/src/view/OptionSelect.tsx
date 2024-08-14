import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import OptionBox from "./Component/OptionBox";
import ModalStaff from "./Modal/ModalStaff";
import ModalItemSelect from "./Modal/ModalItemSelect";

import "../css/OptionSelect.scss";
import "../css/Modal.scss";

import Header from "./Component/Header";

interface Item {
  item_id: number;
  item_title: string;
  item_image: string;
  item_price: number;
}

interface Ingredient {
  ingredient_id: number;
  ingredient_title: string;
  ingredient_price: number;
}

const OptionSelect: React.FC = () => {
  let [staffModalOpen, setStaffModalOpen] = useState<boolean>(false);
  let [itemSelectOpen, setItemSelectOpen] = useState<boolean>(false);
  let [currentItemType, setCurrentItemType] = useState<'ingredient' | 'side' | 'drink' | null>(null);

  let [selectedIngredient, setSelectedIngredient] = useState<Ingredient>({ingredient_id: 1, ingredient_title: "추가 없음", ingredient_price: 0});
  let [selectedSide, setSelectedSide] = useState<Item>({item_id: 5, item_title: "감자튀김(중)", item_image: `${process.env.PUBLIC_URL}/Item/potato.webp`, item_price: 1000});
  let [selectedDrink, setSelectedDrink] = useState<Item>({item_id: 8, item_title: "코카콜라(중)", item_image: `${process.env.PUBLIC_URL}/Item/cola.webp`, item_price: 1000});

  const movePage = useNavigate();
  const location = useLocation();
  const price = Number(location.state.price);
  const quantity = Number(location.state.quantity);
  const title = location.state.title;
  const image = location.state.img;

  const moveOrder = () => {
    movePage("/order");
  };

  const openModalStaff = () => {
    setStaffModalOpen(true);
  };

  const closeModalStaff = () => {
    setStaffModalOpen(false);
  };

  const openItemSelect = (itemType: 'ingredient' | 'side' | 'drink') => {
    setCurrentItemType(itemType);
    setItemSelectOpen(true);
  };

  const closeItemSelect = () => {
    setItemSelectOpen(false);
    setCurrentItemType(null);
  };

  const staffCall = (reason: string) => {
    axios.post('/api/staff', { reason }).then(response => console.log(response.data));
  };

  const handleItemSelect = (item: Item | Ingredient) => {
    if (currentItemType === 'ingredient') {
      setSelectedIngredient(item as Ingredient);
    } else if (currentItemType === 'side') {
      setSelectedSide(item as Item);
    } else if (currentItemType === 'drink') {
      setSelectedDrink(item as Item);
    }
    closeItemSelect();
  };

  const totalAmount = (price * quantity) + (selectedIngredient.ingredient_price * quantity) + (selectedSide.item_price * quantity) + (selectedDrink.item_price * quantity);
  const formattedAmount = totalAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const onClickSetAddCart = (title: string, image: string, quantity: number, price: number, ingredient: string, side: string, drink: string) => {
    const data = { title, image, quantity, price, ingredient, side, drink };
    axios.post("/api/addsetcart", data).then((res) => {
      // 장바구니 추가 성공 시 처리
    }).catch((error) => {
      console.error('데이터를 추가하는 중 오류 발생: ', error);
    });
  };

  return (
    <div className="select-layer">
      <Header />
      <div className="option-title">선택한 옵션을 확인하세요</div>
      <ul className="option-board">
        <OptionBox optionNumber={1} optionTitle="재료 추가" imageSrc={image} itemName={title} ingredientName={selectedIngredient.ingredient_title === "추가 없음" ? "" : selectedIngredient.ingredient_title} onSelect={() => openItemSelect('ingredient')}/>
        <OptionBox optionNumber={2} optionTitle="곁들임 변경" imageSrc={selectedSide.item_image} itemName={selectedSide.item_title} onSelect={() => openItemSelect('side')} />
        <OptionBox optionNumber={3} optionTitle="음료 변경" imageSrc={selectedDrink.item_image} itemName={selectedDrink.item_title} onSelect={() => openItemSelect('drink')} />
      </ul>
      <div className="option-menu">
        <div className="button-select1">
          <span className="option-price1">금액</span>
          <span className="option-price1 option-price2"> {formattedAmount}원</span>
        </div>
        <div className="button-select1 botton-button">
          <span className="guide-button" onClick={moveOrder}>주문 취소</span>
          <span className="guide-button" onClick={() => {openModalStaff(); staffCall("고객 호출");}}>직원 호출</span>
          <span className="guide-button order-button" onClick={() => {
            onClickSetAddCart(title + "세트", image, quantity, totalAmount / quantity, selectedIngredient.ingredient_title, selectedSide.item_title, selectedDrink.item_title);
            moveOrder();
          }}>담기</span>
          <ModalStaff open={staffModalOpen} close={closeModalStaff} />
          <ModalItemSelect open={itemSelectOpen} close={closeItemSelect} onSelect={handleItemSelect} itemType={currentItemType!} />
        </div>
      </div>
    </div>
  );
};

export default OptionSelect;
