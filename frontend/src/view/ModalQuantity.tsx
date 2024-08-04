import React, { useState, useEffect } from "react";
import "../css/Modal.scss";
import IMG_PLUS from "../images/plus.png";
import IMG_MINUS from "../images/minus.png";
import axios from "axios";

// 메뉴 전달 타입
type Menu = {
  item_id: number;
  itemgroup_id: number;
  item_title: string;
  item_image: string;
  item_price: number;
  item_recommend: boolean;
};

interface ModalQuantityProps {
  open: boolean;
  close: () => void;
  menu: Menu | null;
  fetchCart: () => void;
}

const ModalQuantity: React.FC<ModalQuantityProps> = ({ open, close, menu, fetchCart }) => {
  // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
  const [visible, setVisible] = useState(open);

  // 숫자 감소/증가
  const [num, setNum] = useState(1);

  const increase = () => {
    setNum(num + 1);
  };

  const decrease = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };

  useEffect(() => {
    setVisible(open);

    // open 값이 true -> false 가 되는 것을 감지 (즉, 모달창을 닫을 때)
    if (visible && !open) {
      return () => {
        setNum(1);
        setVisible(false);
      };
    }
  }, [visible, open]);

  if (!visible || !menu) return null;

  // 상품을 장바구니에 추가하기
  const onClickAddCart = (title: string, image: string, quantity: number, price: number) => {
    const data = { title, image, quantity, price };
    axios.post("/api/addcart", data).then((res) => {
      fetchCart();
    }).catch((error) => {
      console.error('데이터를 추가하는 중 오류 발생: ', error);
    });
  }

  return (
    <div className={open ? "openModal modal" : "modal"}>
      <div className="modalBox">
        <div>수량을 선택해주세요</div>
        <div className="red">{menu.item_price * num} 원</div>
        <div>
          <span className="decrease-button" onClick={decrease}>
            <img src={IMG_MINUS} alt="-" />
          </span>
          <span className="quantity">{num}</span>
          <span className="increase-button" onClick={increase}>
            <img src={IMG_PLUS} alt="+" />
          </span>
        </div>
        <span className="modal-button cancel-button bottom left" onClick={close}>아니요</span>
        <span className="modal-button bottom right" onClick={() => {
          onClickAddCart(menu.item_title, menu.item_image, num, menu.item_price);
          close();
          }}>예</span>
      </div>
    </div>
  );
};

export default ModalQuantity;