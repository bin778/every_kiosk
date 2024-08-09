import React, { useState, useEffect } from 'react';
import "../../css/Modal.scss";

interface ModalEmptyProps {
  open: boolean;
  close: () => void;
}

const ModalEmpty: React.FC<ModalEmptyProps> = ({ open, close }) => {
  const [visible, setVisible] = useState(open);

  useEffect(() => {
    setVisible(open);

    // 모달창을 닫을 때 visible 값을 false로 설정
    if (visible && !open) {
      return () => {
        setVisible(false);
      };
    }
  }, [visible, open]);

  if (!visible) return null;

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      <div className='modalBox'>
        <div>주문할 메뉴를 선택해주세요!</div>
        <span className='modal-button bottom center' onClick={close}>예</span>
      </div>
    </div>
  );
};

export default ModalEmpty;
