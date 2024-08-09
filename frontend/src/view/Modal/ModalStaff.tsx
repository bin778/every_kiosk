import React, { useState, useEffect } from 'react';
import "../../css/Modal.scss";

interface ModalStaffProps {
  open: boolean;
  close: () => void;
}

const ModalStaff: React.FC<ModalStaffProps> = ({ open, close }) => {
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
        <div>직원을 호출하였습니다.</div>
        <div>잠시만 기다려주세요!</div>
        <span className='modal-button bottom center' onClick={close}>예</span>
      </div>
    </div>
  );
};

export default ModalStaff;
