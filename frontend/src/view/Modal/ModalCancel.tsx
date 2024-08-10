import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Modal.scss";

interface ModalCancelProps {
  open: boolean;
  close: () => void;
}

const ModalCancel: React.FC<ModalCancelProps> = ({ open, close }) => {
  // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
  const [visible, setVisible] = useState(open);

  const movePage = useNavigate();

  // 홈 화면으로 이동한다
  function moveHome() {
    movePage("/");
  }

  const AllDelete = () => {
    axios.delete(`/api/alldelete`).then((res) => {

    }).catch((error) => {
      console.error("데이터를 삭제하는 중 오류 발생: ", error);
    })
  }

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
      <div className="modalBox">
        <div>정말로 주문을 취소하시겠습니까?</div>
        <span className="modal-button cancel-button bottom left" onClick={close}>아니요</span>
        <span className="modal-button bottom right" onClick={() => { 
          AllDelete();
          moveHome();
        }}>예</span>
      </div>
    </div>
  );
};

export default ModalCancel;
