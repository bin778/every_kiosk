import React, { useState, useEffect } from 'react';
import "../css/Modal.scss"

interface SideSelectProps {
    open: boolean;
    close: () => void;
}

const SideSelect: React.FC<SideSelectProps> = ({open, close}) => {
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
                <div className='SelectTitle'>원하는 사이드를 선택해주세요</div>
                <ul className='SelectDisplay'>
                    <li className='SelectChangeMenu'>
                        <img src={`${process.env.PUBLIC_URL}/Item/potato.png`} alt="" />
                        <span>감자튀김(小)</span>
                        <span className='red SelectPrice'>+1000원</span>
                    </li>
                    <li className='SelectChangeMenu'>
                         <img src={`${process.env.PUBLIC_URL}/Item/potato.png`} alt="" />
                        <span>감자튀김(大)</span>
                        <span className='red SelectPrice'>+1500원</span>
                    </li>
                    <li className='SelectChangeMenu'>
                         <img src={`${process.env.PUBLIC_URL}/Item/cheesestick.png`} alt="" />
                        <span>치즈스틱</span>
                        <span className='red SelectPrice'>+2000원</span>
                    </li>
                </ul>
                <span className='modal-button cancel-button bottom left' onClick={close}>취소</span>
                <span className='modal-button bottom right'>선택</span>
            </div>
        </div>
    );
};

export default SideSelect;