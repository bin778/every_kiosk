import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../css/Modal.css"
import IMG_PLUS from "../images/plus.png";
import IMG_MINUS from "../images/minus.png";

const ModalQuantitySet = (props) => {
    // 열기, 닫기 텍스트를 부모로부터 받아옴
    const {open, close, menu} = props;

    // 실제 컴포넌트가 사라지는 시점을 지연시키기 위한 값
    const [visible, setVisible] = useState(open);

    // 숫자 감소/증가
    const [num, setNum] = useState(1);

    const increase = () => {
        setNum(num + 1);
    }

    const decrease = () => {
        if (num > 0) {
            setNum(num - 1);
        }
    }

    // 옵션 선택 화면으로 이동한다
    const movePage = useNavigate();
    
    function moveSelect() {
        movePage("/option_select", { state: { price: ((menu.price + 1000) * num) } });
    }

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
            <div className='modalBox modalBoxSet'>
                <div>수량을 선택해주세요</div>
                <div className='red'>{(menu.price + 1000) * num} 원</div>
                <div>
                    <span className='decrease-button' onClick={decrease}>
                        <img src={IMG_MINUS} alt="" />
                    </span>
                    <span className='quantity'>{num}</span>
                    <span className='increase-button' onClick={increase}>
                        <img src={IMG_PLUS} alt="" />
                    </span>
                </div>
                <div>
                    <div className='default-text'>주문이 복잡하시나요?</div>
                    <span className='modal-button center'>기본값 선택</span>
                </div>
                <span className='modal-button cancel-button bottom left' onClick={close}>아니요</span>
                <span className='modal-button bottom right' onClick={moveSelect}>세트 선택</span>
            </div>
        </div>
    );
};

export default ModalQuantitySet;