import axios from "axios";
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../../css/Modal.scss";

interface ModalItemSelectProps {
  open: boolean;
  close: () => void;
  onSelect: (item: Item) => void;
  itemType: "ingredient" | "side" | "drink"; // 아이템 타입 구분
}

interface Item {
  // 사이드, 음료 아이템
  item_id: number;
  item_title: string;
  item_image: string;
  item_price: number;
  // 햄버거 재료 아이템
  ingredient_id: number;
  ingredient_title: string;
  ingredient_image: string;
  ingredient_price: number;
}

const ModalItemSelect: React.FC<ModalItemSelectProps> = ({ open, close, onSelect, itemType }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    let apiUrl = "";
    switch (itemType) {
      case "ingredient":
        apiUrl = "/api/ingredientitem";
        break;
      case "side":
        apiUrl = "/api/sideitem";
        break;
      case "drink":
        apiUrl = "/api/drinkitem";
        break;
    }

    if (apiUrl) {
      axios.get(apiUrl).then((res) => {
        setItems(res.data.result);
      }).catch((error) => {
        console.error("데이터 가져오기 실패: ", error);
        setItems([]); // 빈 배열 또는 기본값 설정
      });
    }

    setVisible(open);

    if (visible && !open) {
      return () => {
        setVisible(false);
      };
    }
  }, [visible, open, itemType]);

  if (!visible) return null;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      <div className="modalBox modalSelect">
        <div className="SelectTitle">
          {itemType === "ingredient" && "원하는 재료를 선택해주세요"}
          {itemType === "side" && "원하는 사이드를 선택해주세요"}
          {itemType === "drink" && "원하는 음료를 선택해주세요"}
        </div>
        <ul className="SelectDisplay">
          {items.map((item: Item, index: number) => (
            <li className="SelectChangeMenu" key={itemType === "ingredient" ? `ingredient-${item.ingredient_id || index}` : `item-${item.item_id || index}`} onClick={() => onSelect(item)}>
              <LazyLoadImage src={itemType === "ingredient" ? item.ingredient_image : item.item_image} alt="" />
              <span>{itemType === "ingredient" ? item.ingredient_title : item.item_title}</span>
              <span className="red SelectPrice">+{itemType === "ingredient" ? item.ingredient_price : item.item_price}원</span>
            </li>
          ))}
        </ul>
        <span className="modal-button cancel-button cancel-button2 bottom left" onClick={close}>취소</span>
      </div>
    </div>
  );
};

export default ModalItemSelect;
