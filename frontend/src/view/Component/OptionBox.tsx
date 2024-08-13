import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

interface OptionBoxProps { 
  optionNumber: number;
  optionTitle: string;
  imageSrc: string;
  itemName: string;
  ingredientName?: string;
  onSelect: () => void;
}

const OptionBox: React.FC<OptionBoxProps> = ({ optionNumber, optionTitle, imageSrc, itemName, ingredientName, onSelect }) => {
  return (
    <li className="option-box">
      <div>
        <span className="option-number">{optionNumber}</span>
        <span className="option-select1">{optionTitle}</span>
      </div>
      <LazyLoadImage src={imageSrc} alt="" />
      <span className="option-name">{itemName}</span>
      {ingredientName && <span className="option-ingredient">{ingredientName}</span>}
      <span className="option-select2" onClick={onSelect}>{optionTitle}</span>
    </li>
  );
};

export default OptionBox;