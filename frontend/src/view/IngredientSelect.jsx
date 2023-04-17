import React, { useState, useEffect } from 'react';
import "../css/Modal.css"

const IngredientSelect = (props) => {
    // 열기, 닫기 텍스트를 부모로부터 받아옴
    const {open, close} = props;

    // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
    const [visible, setVisible] = useState(open);

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
            <div className='modalBox modalSelect'>
                <div className='SelectTitle'>원하는 재료를 선택해주세요</div>
                <div className='SelectDisplay'>
                    
                </div>
                <span className='modal-button cancel-button bottom left' onClick={close}>취소</span>
                <span className='modal-button bottom right'>선택</span>
            </div>
        </div>
    );
};

export default IngredientSelect;