import React from "react";
import { useNavigate } from "react-router-dom";
import IMG_LOGO1 from "../images/logo1.png";
import IMG_KOREA from "../images/Korea.png";
import IMG_USA from "../images/USA.png";
import IMG_CHINA from "../images/China.png";
import IMG_JAPAN from "../images/Japan.png";
import IMG_GENERAL from "../images/general.png";
import IMG_EASY from "../images/easy.png";

import "../css/Home.scss"

const Home: React.FC = () => {
  const navigate = useNavigate();

  const moveOrder: React.MouseEventHandler<HTMLSpanElement> = () => {
    navigate("/order");
  };

  return (
    <div className="home-layer">
      {/* body 화면 */}
      <div className="home">
        <img className="logo-image" src={IMG_LOGO1} alt="Logo" />
        <h1 className="logo-title">주문 타입 선택</h1>
        <span className="home-button" onClick={moveOrder}>
          <div><img src={IMG_GENERAL} alt="Shop" /></div>
          <div>일반 주문</div>
        </span>
        <span className="home-button">
          <div><img src={IMG_EASY} alt="Take Out" /></div>
          <div>간편 주문</div>
        </span>
      </div>
      {/* footer 화면 */}
      <div className="footer">
        <div className="footer-text1">화면을 터치하세요</div>
        <div className="footer-text2">LANGUAGE SELECTION</div>
        <span className="language">
          <div><img src={IMG_KOREA} alt="Korean" /></div>
          <div>한국어</div>
        </span>
        <span className="language">
          <div><img src={IMG_USA} alt="English" /></div>
          <div>English</div>
        </span>
        <span className="language">
          <div><img src={IMG_CHINA} alt="Chinese" /></div>
          <div>中国</div>
        </span>
        <span className="language">
          <div><img src={IMG_JAPAN} alt="Japanese" /></div>
          <div>日本語</div>
        </span>
      </div>
    </div>
  );
};

export default Home;
