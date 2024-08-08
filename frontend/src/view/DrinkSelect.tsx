import axios from "axios";
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../css/Modal.scss";

interface DrinkSelectProps {
  open: boolean;
  close: () => void;
  onSelect: (drink: Side) => void; // 추가된 부분
}

interface Side {
  item_id: number;
  item_title: string;
  item_image: string;
  item_price: number;
}

const DrinkSelect: React.FC<DrinkSelectProps> = ({ open, close, onSelect }) => {
  // 음료 아이템 DB State
  let [DrinkItem, setDrinkItem] = useState<Side[]>([]); // 타입 수정

  // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    // 음료 아이템 DB 가져오기
    axios.get("/api/drinkitem").then((res) => {
      const drinkItemData = res.data.result;
      setDrinkItem(drinkItemData);
    }).catch((error) => {
      console.log("데이터 가져오기 실패: ", error);
    });

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
        <div className="SelectTitle">원하는 음료를 선택해주세요</div>
        <ul className="SelectDisplay">
          {DrinkItem.map((Drink: Side) => (
              <li className="SelectChangeMenu" key={Drink.item_id} onClick={() => onSelect(Drink)}>
                <LazyLoadImage src={Drink.item_image} alt="" />
                <span>{Drink.item_title}</span>
                <span className="red SelectPrice">+{Drink.item_price}원</span>
              </li>
          ))}
        </ul>
        <span className="modal-button cancel-button cancel-button2 bottom left" onClick={close}>취소</span>
      </div>
    </div>
  );
};

export default DrinkSelect;
