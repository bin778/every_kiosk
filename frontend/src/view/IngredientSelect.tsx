import React, { useState, useEffect } from 'react';
import "../css/Modal.scss"

import IMG_CHEESE from "../images/cheese.png";

interface IngredientSelectProps {
    open: boolean;
    close: () => void;
}

const IngredientSelect: React.FC<IngredientSelectProps> = ({open, close}) => {

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
                <ul className='SelectDisplay'>
                    <li className='SelectChangeMenu'>
                        <img src={IMG_CHEESE} alt="" />
                        <span>치즈</span>
                        <span className='red SelectPrice'>+200원</span>
                    </li>
                    <li className='SelectChangeMenu'>
                        <img src={IMG_CHEESE} alt="" />
                        <span>치즈</span>
                        <span className='red SelectPrice'>+200원</span>
                    </li>
                    <li className='SelectChangeMenu'>
                        <img src={IMG_CHEESE} alt="" />
                        <span>치즈</span>
                        <span className='red SelectPrice'>+200원</span>
                    </li>
                </ul>
                <span className='modal-button cancel-button bottom left' onClick={close}>취소</span>
                <span className='modal-button bottom right'>추가</span>
            </div>
        </div>
    );
};

export default IngredientSelect;