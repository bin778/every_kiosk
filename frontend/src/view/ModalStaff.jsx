import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../css/Modal.css"

const ModalStaff = (props) => {
    // 열기, 닫기 텍스트를 부모로부터 받아옴
    const {open, close} = props;

    // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
    const [visible, setVisible] = useState(open);

    const movePage = useNavigate();

    useEffect(() => {
        setVisible(open);

        // open 값이 true -> false 가 되는 것을 감지 (즉, 모달창을 닫을 때)
        if (visible && !open) {
            return () => {
                setVisible(false);
            };
        };
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