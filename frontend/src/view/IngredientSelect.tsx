import axios from "axios";
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../css/Modal.scss";

interface IngredientSelectProps {
  open: boolean;
  close: () => void;
}

interface Ingredient {
  ingredient_id: number;
  ingredient_title: string;
  ingredient_image: string;
  ingredient_price: number;
}

const IngredientSelect: React.FC<IngredientSelectProps> = ({ open, close }) => {
  // 재료 아이템 DB State
  let [IngredientItem, setIngredientItem] = useState([]);
  
  // 사이드 아이템 DB 가져오기
  axios.get("/api/ingredientitem").then((res) => {
    const sideItemData = res.data.result;
    setIngredientItem(sideItemData);
  }).catch((error) => {
    console.log("데이터 가져오기 실패: ", error);
  });
  
  // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);

    // open 값이 true -> false 가 되는 것을 감지 (즉, 모달창을 닫을 때)
    if (visible && !open) {
      return () => {
        setVisible(false);
      };
    }
  }, [visible, open]);

  if (!visible) return null;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      <div className="modalBox modalSelect">
        <div className="SelectTitle">원하는 재료를 선택해주세요</div>
        <ul className="SelectDisplay">
          {IngredientItem.map((Ingredient: Ingredient) => (
            <li className="SelectChangeMenu" key={Ingredient.ingredient_id}>
              <LazyLoadImage src={Ingredient.ingredient_image} alt="" />
              <span>{Ingredient.ingredient_title}</span>
              <span className="red SelectPrice">+{Ingredient.ingredient_price}원</span>
            </li>
          ))}
        </ul>
        <span className="modal-button cancel-button bottom left" onClick={close}>취소</span>
        <span className="modal-button bottom right">추가</span>
      </div>
    </div>
  );
};

export default IngredientSelect;
