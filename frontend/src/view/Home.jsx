import { useNavigate } from "react-router-dom";
import IMG_LOGO1 from "../images/logo1.png";
import IMG_KOREA from "../images/Korea.png";
import IMG_USA from "../images/USA.png";
import IMG_CHINA from "../images/China.png";
import IMG_JAPAN from "../images/Japan.png";
import IMG_SHOP from "../images/Shop.png";
import IMG_TAKE_OUT from "../images/TakeOut.png";

import "../css/Home.css"

export default function Home() {
  const movePage = useNavigate();

  function moveOrder() {
    movePage("/order");
  }

  return (
    <div className="home-layer">
      {/* body 화면 */}
      <div className="home">
        <img className="logo-image" src={IMG_LOGO1} alt="" />
        <h1 className="logo-title">어디서 드실건가요?</h1>
        <span className="home-button" onClick={moveOrder}>
          <div><img src={IMG_SHOP} alt="" /></div>
          <div>매장 식사</div>
        </span>
        <span className="home-button" onClick={moveOrder}>
          <div><img src={IMG_TAKE_OUT} alt="" /></div>
          <div>포장 주문</div>
        </span>
      </div>
      {/* footer 화면 */}
      <div className="footer">
        <div className="footer-text1">화면을 터치하세요</div>
        <div className="footer-text2">LANGUAGE SELECTION</div>
        <span className="language">
          <div><img src={IMG_KOREA} alt="" /></div>
          <div>한국어</div>
        </span>
        <span className="language">
          <div><img src={IMG_USA} alt="" /></div>
          <div>English</div>
        </span>
        <span className="language">
          <div><img src={IMG_CHINA} alt="" /></div>
          <div>中国</div>
        </span>
        <span className="language">
          <div><img src={IMG_JAPAN} alt="" /></div>
          <div>日本語</div>
        </span>
      </div>
    </div>
  );
}
