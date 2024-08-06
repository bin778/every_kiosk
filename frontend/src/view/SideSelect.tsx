import axios from "axios";
import React, { useState, useEffect } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "../css/Modal.scss";

interface SideSelectProps {
  open: boolean;
  close: () => void;
}

interface Side {
  item_id: number;
  item_title: string;
  item_image: string;
  item_price: number;
}

const SideSelect: React.FC<SideSelectProps> = ({ open, close }) => {
  // 사이드 아이템 DB State
  let [SideItem, setSideItem] = useState([]);

  // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    // 사이드 아이템 DB 가져오기
    axios.get("/api/sideitem").then((res) => {
      const sideItemData = res.data.result;
      setSideItem(sideItemData);
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
        <div className="SelectTitle">원하는 사이드를 선택해주세요</div>
        <ul className="SelectDisplay">
          {SideItem.map((Side: Side) => (
              <li className="SelectChangeMenu" key={Side.item_id}>
                <LazyLoadImage src={Side.item_image} alt="" />
                <span>{Side.item_title}</span>
                <span className="red SelectPrice">+{Side.item_price}원</span>
              </li>
          ))}
        </ul>
        <span className="modal-button cancel-button bottom left" onClick={close}>취소</span>
        <span className="modal-button bottom right">선택</span>
      </div>
    </div>
  );
};

export default SideSelect;
