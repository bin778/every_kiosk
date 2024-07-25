import React, { useState, ChangeEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalCancel from "./ModalCancel";
import ModalStaff from "./ModalStaff";
import ModalQuantity from "./ModalQuantity";
import ModalQuantitySet from "./ModalQuantitySet";
import axios from 'axios';

// 이미지 파일
import IMG_RECO from "../images/recommend.png";
import IMG_SINGLE from "../images/hamburger.png";
import IMG_SET from "../images/hamburger_set.png";
import IMG_SIDE from "../images/side.png";
import IMG_DRINK from "../images/drink.png";
import IMG_SEARCH from "../images/search.png";
import IMG_CLOSE from "../images/close.png";

// CSS 파일, Header 컴포넌트
import "../css/Order.scss";
import Header from "./Component/Header";

interface Item {
  item_id: number;
  itemgroup_id: number;
  item_title: string;
  item_image: string;
  item_price: number;
  item_recommend: boolean;
}

interface Sets {
  sets_id: number;
  sets_title: string;
  sets_image: string;
  sets_price: number;
}

interface CartItem {
  itemId: number;
  quantity: number;
}

// 테스트용 데이터
const initialState = {
  items: [
    { id: 0, name: '불고기버거', img: `${process.env.PUBLIC_URL}/Item/bulgogi.png`, price: 5000 },
    { id: 1, name: '통새우버거', img: `${process.env.PUBLIC_URL}/Item/shrimp.png`, price: 6000 },
  ],
  cartItems: [
    {
      itemId: 0,
      quantity: 1
    }
  ]
};

const Order: React.FC = () => {
  const [active, setActive] = useState<string>('recommend');
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [staffModalOpen, setStaffModalOpen] = useState<boolean>(false);
  const [quantityModalOpen, setQuantityModalOpen] = useState<boolean>(false);
  const [quantitySetModalOpen, setQuantitySetModalOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [cartItems, setCartItems] = useState<CartItem[]>(initialState.cartItems);

  const navigate = useNavigate();

  // DB 목록 State
  let [Item, setItem] = useState([]);
  let [Sets, setsItem] = useState([]);
  let [RecommendItem, setRecommendItem] = useState([]);
  let [HamburgerItem, setHamburgerItem] = useState([]);
  let [SideItem, setSideItem] = useState([]);
  let [DrinkItem, setDrinkItem] = useState([]);

  // 메뉴 State
  const [selectedMenu, setSelectedMenu] = useState<Item | null>(null);
  const [selectedSets, setSelectedSets] = useState<Sets | null>(null);

  // 전체 아이템 DB 가져오기
  useEffect(() => {
    // 전체 아이템 DB 가져오기
    axios.get("/api/item").then((res) => {
      const itemData = res.data.result;
      setItem(itemData);
    }).catch((error) => {
      console.log('데이터 가져오기 실패: ', error);
    });

    // 세트 아이템 DB 가져오기
    axios.get("/api/sets").then((res) => {
      const SetsData = res.data.result;
      setsItem(SetsData);
    }).catch((error) => {
      console.error('데이터 가져오기 실패: ', error.response ? error.response.data : error.message);
    });

    // 추천 아이템 DB 가져오기
    axios.get("/api/recommenditem").then((res) => {
      const recommendItemData = res.data.result;
      setRecommendItem(recommendItemData);
    }).catch((error) => {
      console.log('데이터 가져오기 실패: ', error);
    });

    // 햄버거 아이템 DB 가져오기
    axios.get("/api/hamburgeritem").then((res) => {
      const hamburgerItemData = res.data.result;
      setHamburgerItem(hamburgerItemData);
    }).catch((error) => {
      console.log('데이터 가져오기 실패: ', error);
    });

    // 사이드 아이템 DB 가져오기
    axios.get("/api/sideitem").then((res) => {
      const sideItemData = res.data.result;
      setSideItem(sideItemData);
    }).catch((error) => {
      console.log('데이터 가져오기 실패: ', error);
    });

    // 음료 아이템 DB 가져오기
    axios.get("/api/drinkitem").then((res) => {
      const drinkItemData = res.data.result;
      setDrinkItem(drinkItemData);
    }).catch((error) => {
      console.log('데이터 가져오기 실패: ', error);
    });
  }, []);

  // 모달 창 열기 및 닫기
  const openModalCancel = () => {
    setCancelModalOpen(true);
  };

  const closeModalCancel = () => {
    setCancelModalOpen(false);
  };

  const openModalStaff = () => {
    setStaffModalOpen(true);
  };

  const closeModalStaff = () => {
    setStaffModalOpen(false);
  };

  const openModalQuantity = (item: Item) => {
    setSelectedMenu(item);
    setQuantityModalOpen(true);
  };

  const closeModalQuantity = () => {
    setQuantityModalOpen(false);
    setSelectedMenu(null);
  };

  const openModalQuantitySet = (sets: Sets) => {
    setSelectedSets(sets);
    setQuantitySetModalOpen(true);
  };

  const closeModalQuantitySet = () => {
    setQuantitySetModalOpen(false);
    setSelectedSets(null);
  };

  const staffCall = (reason: string) => {
    axios.post('/api/staff', { reason }).then(response => console.log(response.data));
  };

  const getSearchData = (e: ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value.toLowerCase());
  };

  const decomposeHangul = (s: string): string => {
    const initial = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
    const medial = ["ㅏ", "ㅐ", "ㅑ", "ㅒ", "ㅓ", "ㅔ", "ㅕ", "ㅖ", "ㅗ", "ㅘ", "ㅙ", "ㅚ", "ㅛ", "ㅜ", "ㅝ", "ㅞ", "ㅟ", "ㅠ", "ㅡ", "ㅢ", "ㅣ"];
    const final = ["", "ㄱ", "ㄲ", "ㄳ", "ㄴ", "ㄵ", "ㄶ", "ㄷ", "ㄹ", "ㄺ", "ㄻ", "ㄼ", "ㄽ", "ㄾ", "ㄿ", "ㅀ", "ㅁ", "ㅂ", "ㅄ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  
    let result = "";
  
    for (let i = 0; i < s.length; i++) {
      const code = s.charCodeAt(i);
  
      if (code >= 0xAC00 && code <= 0xD7A3) {
        const syllable = code - 0xAC00;
        const chosungIndex = Math.floor(syllable / 588);
        const jungsungIndex = Math.floor((syllable - (chosungIndex * 588)) / 28);
        const jongsungIndex = syllable % 28;
  
        result += initial[chosungIndex] + medial[jungsungIndex] + final[jongsungIndex];
      } else {
        result += s.charAt(i);
      }
    }
  
    return result;
  };

  const extractInitials = (str: string): string => {
  const initial = ["ㄱ", "ㄲ", "ㄴ", "ㄷ", "ㄸ", "ㄹ", "ㅁ", "ㅂ", "ㅃ", "ㅅ", "ㅆ", "ㅇ", "ㅈ", "ㅉ", "ㅊ", "ㅋ", "ㅌ", "ㅍ", "ㅎ"];
  let result = "";

  for (let i = 0; i < str.length; i++) {
    const code = str.charCodeAt(i);

    if (code >= 0xAC00 && code <= 0xD7A3) {
      const syllable = code - 0xAC00;
      const chosungIndex = Math.floor(syllable / 588);
      result += initial[chosungIndex];
    } else {
      result += str.charAt(i);
    }
  }

  return result;
};

  const getJamo = (str: string): string => {
    return decomposeHangul(str.replace(" ", "").toLowerCase());
  };

  const getInitials = (str: string): string => {
    return extractInitials(str.replace(" ", "").toLowerCase());
  };

  const filterName = Item.filter((item: Item): boolean => {
    if (!userInput.trim()) return false;

    const userJamo: string = getJamo(userInput);
    const itemJamo: string = getJamo(item.item_title);
    const userInitials: string = getInitials(userInput);
    const itemInitials: string = getInitials(item.item_title);

    return itemJamo.includes(userJamo) || itemInitials.includes(userInitials);
  });

  const handleDelete = (itemId: number) => {
    setCartItems(cartItems.filter((ele) => ele.itemId !== itemId));
  };

  const moveCheck = () => {
    navigate("/check");
  };

  interface CatalogueProps {
    type: string;
    border: string;
    image: string;
    title: string;
  }

  // 목록 컴포넌트
  const CatalogueComponent = ({ type, border, image, title }: CatalogueProps) => {
    return (
      <Link to="/order" onClick={() => setActive(type)}>
        <span className={"menu-button1" + border + (active === type ? ' active' : '')}>
          <img src={image} alt={type} />
          <div>{title}</div>
        </span>
      </Link>
    )
  }

  // 메뉴 컴포넌트
  interface MenuProps {
    items: Item;
    type: string;
  }

  const MenuComponent = ({ items, type }: MenuProps) => {
    return (
      <>
        <li onClick={() => openModalQuantity(items)} key={items.item_id} className={(active === type ? 'menu-card' : 'card-hidden')}>
          <MenuCard name={items.item_title} img={items.item_image} price={items.item_price} />
        </li>
      </>
    )
  }

  // 세트 컴포넌트
  interface SetsProps {
    sets: Sets;
    type: string;
  }

  const SetComponent = ({ sets, type }: SetsProps) => {
    return (
      <>
        <li onClick={() => openModalQuantitySet(sets)} key={sets.sets_id} className={(active === type ? 'menu-card' : 'card-hidden')}>
            <MenuCard name={sets.sets_title} img={sets.sets_image} price={sets.sets_price} />
        </li>
      </>
    )
  }

  return (
    <div className="order-layer">
      <Header />
      <div className="order-menu">
        <div>
          <CatalogueComponent type={'recommend'} border={' first'} image={IMG_RECO} title={'추천 메뉴'} />
          <CatalogueComponent type={'sets'} border={''} image={IMG_SET} title={'햄버거 세트'} />
          <CatalogueComponent type={'hamburger'} border={' right'} image={IMG_SINGLE} title={'햄버거 단품'} />
          <CatalogueComponent type={'side'} border={''} image={IMG_SIDE} title={'사이드메뉴'} />
          <CatalogueComponent type={'drink'} border={''} image={IMG_DRINK} title={'음료수'} />
          <CatalogueComponent type={'search'} border={' right'} image={IMG_SEARCH} title={'검색'} />
          <div className={(active === 'search' ? '' : 'search-hidden')}>
            <input onChange={getSearchData} type="text" name="search" className="menu-search" placeholder="원하는 메뉴를 검색하세요" />
          </div>
        </div>
        <div className="select-list">
          <ul>
            {/* 추천 메뉴 */}
            {RecommendItem.map((Item: Item) => <MenuComponent items={Item} key={Item.item_id} type={'recommend'} />)}
            {/* 세트 메뉴 */}
            {Sets.map((Sets: Sets) => <SetComponent sets={Sets} key={Sets.sets_id} type={'sets'} />)}
            {/* 단품 메뉴 */}
            {HamburgerItem.map((Item: Item) => <MenuComponent items={Item} key={Item.item_id} type={'hamburger'} />)}
            {/* 사이드 메뉴 */}
            {SideItem.map((Item: Item) => <MenuComponent items={Item} key={Item.item_id} type={'side'} />)}
            {/* 음료 메뉴 */}
            {DrinkItem.map((Item: Item) => <MenuComponent items={Item} key={Item.item_id} type={'drink'} />)}
            {/* 모든 메뉴 */}
            {filterName.map((Item: Item) => <MenuComponent items={Item} key={Item.item_id} type={'search'} />)}
          </ul>
        </div>
      </div>
      <div className="order-list">
        <div className="list">
          <span className="list-text">주문 내역</span>
          <span className="list-count">2</span>
        </div>
        <div className="amount">
          <span className="list-text">총 주문금액</span>
          <span className="list-text red">{10000}원</span>
        </div>
        <div className="card-list">
          <ul>
            <li className="order-card">
              <div className="card-text1">불고기버거</div>
              <img src={`${process.env.PUBLIC_URL}/Item/bulgogi.png`} className="ordered" alt="Ordered Item" />
              <img src={IMG_CLOSE} className="btn-close" onClick={() => handleDelete(0)} alt="Close" />
              <div className="card-text2 position-up">1개</div>
              <div className="card-text2 red">{5000}원</div>
            </li>
          </ul>
        </div>
        <div className="button-select1">
          <span className="guide-button" onClick={openModalCancel}>주문 취소</span>
          <span className="guide-button" onClick={() => {
            openModalStaff();
            staffCall("고객 호출");
          }}>직원 호출</span>
          <span className="guide-button order-button" onClick={moveCheck}>결제하기</span>
          <ModalCancel open={cancelModalOpen} close={closeModalCancel} />
          <ModalStaff open={staffModalOpen} close={closeModalStaff} />
          <ModalQuantity open={quantityModalOpen} close={closeModalQuantity} menu={selectedMenu} />
          <ModalQuantitySet open={quantitySetModalOpen} close={closeModalQuantitySet} menu={selectedSets} />
        </div>
      </div>
    </div>
  );
};

interface MenuCardProps {
  name: string;
  img: string;
  price: number;
}

const MenuCard: React.FC<MenuCardProps> = ({ name, img, price }) => {
  return (
    <>
      <img src={img} alt="" />
      <div className="menu-text">{name}</div>
      <div className="menu-text position-down red">{price}원~</div>
    </>
  );
};

export default Order;
