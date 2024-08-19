import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Modal.scss";
import IMG_PLUS from "../../images/plus.webp";
import IMG_MINUS from "../../images/minus.webp";
import axios from "axios";

// 세트 메뉴 전달 타입
type Sets = {
  sets_id: number;
  sets_title: string;
  sets_image: string;
  sets_price: number;
};

interface ModalQuantitySetProps {
  open: boolean;
  close: () => void;
  menu: Sets | null;
  fetchCart: () => void;
}

const ModalQuantitySet: React.FC<ModalQuantitySetProps> = ({ open, close, menu, fetchCart }) => {
  const [visible, setVisible] = useState(open);
  const [num, setNum] = useState(1);
  const title2 = menu?.sets_title.replace("세트", "");

  const increase = () => {
    setNum(num + 1);
  };

  const decrease = () => {
    if (num > 1) {
      setNum(num - 1);
    }
  };

  const movePage = useNavigate();

  function moveSelect() {
    if (menu) {
      movePage("/option_select", { state: { price: menu.sets_price - 2000, quantity: num, title: title2, img: menu.sets_image } });
    }
  }

  useEffect(() => {
    setVisible(open);

    if (visible && !open) {
      return () => {
        setNum(1);
        setVisible(false);
      };
    }
  }, [visible, open]);

  if (!visible || !menu) return null;

  // 상품을 장바구니에 추가하기
  const onClickSetAddCart = (title: string, image: string, quantity: number, price: number, ingredient: string, side: string, drink: string) => {
    const data = { title, image, quantity, price, ingredient, side, drink };
    axios.post("/api/addsetcart", data).then((res) => {
      fetchCart();
    }).catch((error) => {
      console.error('데이터를 추가하는 중 오류 발생: ', error);
    });
  };

  return (
    <div className={open ? "openModal modal" : "modal"}>
      <div className="modalBox modalBoxSet">
        <div>수량을 선택해주세요</div>
        <div className="red">{menu.sets_price * num} 원</div>
        <div>
          <span className="decrease-button" onClick={decrease}>
            <img src={IMG_MINUS} alt="" />
          </span>
          <span className="quantity">{num}</span>
          <span className="increase-button" onClick={increase}>
            <img src={IMG_PLUS} alt="" />
          </span>
        </div>
        <div>
          <div className="default-text">주문이 복잡하시나요?</div>
          <span className="modal-button center" onClick={() => {
            onClickSetAddCart(menu.sets_title, menu.sets_image, num, menu.sets_price, "추가 없음", "감자튀김(중)", "코카콜라(중)");
            close();
          }}>기본값 선택</span>
        </div>
        <span className="modal-button cancel-button bottom left" onClick={close}>아니요</span>
        <span className="modal-button bottom right" onClick={moveSelect}>세트 선택</span>
      </div>
    </div>
  );
};

export default ModalQuantitySet;
