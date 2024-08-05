import React from "react";

// 로고 이미지
import IMG_LOGO2 from "../../images/logo2.webp";

// SCSS 파일
import "../../css/Header.scss"

const Header: React.FC = () => {
  return (
    <div className="header">
      <img src={IMG_LOGO2} alt="Logo" />
    </div>
  )
}

export default Header;