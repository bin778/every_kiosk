import React, { useState, useEffect, ChangeEvent, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalCancel from "./Modal/ModalCancel";
import ModalEmpty from "./Modal/ModalEmpty";
import ModalStaff from "./Modal/ModalStaff";
import ModalQuantity from "./Modal/ModalQuantity";
import ModalQuantitySet from "./Modal/ModalQuantitySet";
import { LazyLoadImage } from "react-lazy-load-image-component";
import axios from 'axios';

// 이미지 파일
import IMG_RECO from "../images/recommend.webp";
import IMG_SINGLE from "../images/hamburger.webp";
import IMG_SET from "../images/hamburger_set.webp";
import IMG_SIDE from "../images/side.webp";
import IMG_DRINK from "../images/drink.webp";
import IMG_SEARCH from "../images/search.webp";
import IMG_CLOSE from "../images/close.webp";
import IMG_MICROPHONE from "../images/microphone.webp";

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

interface Cart {
  orders_id: number;
  orders_title: string;
  orders_image: string;
  orders_quantity: number;
  orders_price: number;
  sets_ingredient: string;
  sets_side: string;
  sets_drink: string;
}

interface TotalQuantity {
  orders_count: number;
}

interface TotalPrice {
  total_price: number;
}

const Order: React.FC = () => {
  const [active, setActive] = useState<string>('recommend');
  const [cancelModalOpen, setCancelModalOpen] = useState<boolean>(false);
  const [emptyModalOpen, setEmptyModalOpen] = useState<boolean>(false);
  const [staffModalOpen, setStaffModalOpen] = useState<boolean>(false);
  const [quantityModalOpen, setQuantityModalOpen] = useState<boolean>(false);
  const [quantitySetModalOpen, setQuantitySetModalOpen] = useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>('');
  const [isListening, setIsListening] = useState<boolean>(false); // 음성 인식 활성화 상태
  const inputRef = useRef<HTMLInputElement>(null); // input 요소 참조

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

  // DB 주문 State
  let [Cart, setCart] = useState([]);
  let [CartQuantity, setCartQuantity] = useState<TotalQuantity>({ orders_count: 0 });
  let [CartPrice, setCartPrice] = useState<TotalPrice>({ total_price: 0 });

  useEffect(() => {
    const fetchData = async (url: string, setter: React.Dispatch<React.SetStateAction<any>>) => {
      try {
        const res = await axios.get(url);
        setter(res.data.result);
      } catch (error) {
        console.log('데이터 가져오기 실패: ', error);
      }
    };

    if (inputRef.current) {
      inputRef.current.value = userInput;
    }

    // fetch 함수 목록
    fetchData("/api/item", setItem);
    fetchData("/api/sets", setsItem);
    fetchData("/api/recommenditem", setRecommendItem);
    fetchData("/api/hamburgeritem", setHamburgerItem);
    fetchData("/api/sideitem", setSideItem);
    fetchData("/api/drinkitem", setDrinkItem);
    
    fetchCart();
  }, [userInput]);

  // 장바구니 목록을 불러온다.
  const fetchCart = () => {
    axios.get("/api/cart").then((res) => {
      const cartData = res.data.result;
      setCart(cartData);

      // 장바구니 총 개수 및 총 가격을 여기서 계산
      const totalQuantity = cartData.length;
      const totalPrice = cartData.reduce((acc: number, item: Cart) => acc + (item.orders_price * item.orders_quantity), 0);
      setCartQuantity({ orders_count: totalQuantity });
      setCartPrice({ total_price: totalPrice });
    }).catch((error) => {
      console.log('데이터 가져오기 실패: ', error);
    });
  };

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

  const openModalEmpty = () => {
    setEmptyModalOpen(true);
  }

  const closeModalEmpty = () => {
    setEmptyModalOpen(false);
  }

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
    console.log(userInput)
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

  // 음성 인식 기능
  const startListening = () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'ko-KR';
    recognition.continuous = false;
    recognition.interimResults = false;
    console.log("음성 인식 시작");

    // 음성 인식 시작
    recognition.onstart = () => {
      setIsListening(true);
    };

    // 음성 인식 결과 출력
    recognition.onresult = (event: { results: { transcript: string; }[][]; }) => {
      const speechResult = event.results[0][0].transcript;
      setUserInput(speechResult.toLowerCase());
    };

    // 음성 인식 오류
    recognition.onerror = (event: { error: string; }) => {
      console.error("음성 인식 오류:", event.error);
      setIsListening(false);
    };

    // 음석 인식 완료
    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  const DeleteCart = (id: number) => {
    axios.delete(`/api/deletecart/${id}`).then((res) => {
      fetchCart();
    }).catch((error) => {
      console.error("데이터를 삭제하는 중 오류 발생: ", error);
    })
  };

  const moveCheck = () => {
    if (CartQuantity.orders_count > 0)
      navigate("/check");
    else
      openModalEmpty();
  };

  // 목록 컴포넌트
  interface CatalogueProps {
    type: string;
    border: string;
    image: string;
    title: string;
  }

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
          <CatalogueComponent type={'side'} border={''} image={IMG_SIDE} title={'곁들임'} />
          <CatalogueComponent type={'drink'} border={''} image={IMG_DRINK} title={'음료수'} />
          <CatalogueComponent type={'search'} border={' right'} image={IMG_SEARCH} title={'검색'} />
          <div className={(active === 'search' ? '' : 'search-hidden')}>
            <input ref={inputRef} onChange={getSearchData} type="text" name="search" className="menu-search" placeholder="원하는 메뉴를 검색하세요" />
            <button onClick={startListening} disabled={isListening}>
              <img src={IMG_MICROPHONE} className={isListening ? "isListening" : "noListening"} alt="close" />
            </button>
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
            {/* 곁들임 메뉴 */}
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
          <span className="list-count">{CartQuantity.orders_count}</span>
        </div>
        <div className="amount">
          <span className="list-text">총 주문금액</span>
          <span className="list-text red">{String(CartPrice.total_price).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</span>
        </div>
        <div className="card-list">
          <ul>
            {Cart.map((Cart: Cart) => (
              <li key={Cart.orders_id} className="order-card">
                <div className="card-text1">{Cart.orders_title}</div>
                <LazyLoadImage src={Cart.orders_image} className="ordered" alt="Ordered Item" />
                <img src={IMG_CLOSE} className="btn-close" onClick={() => DeleteCart(Cart.orders_id)} alt="Close" />
                <div className="card-text2 position-ingredient">{Cart.sets_ingredient === "추가 없음" || Cart.sets_ingredient === null ? "" : Cart.sets_ingredient + " 추가"}</div>
                <div className="card-text2 position-side">{Cart.sets_side}</div>
                <div className="card-text2 position-drink">{Cart.sets_drink}</div>
                <div className="card-text2 position-up">{Cart.orders_quantity}개</div>
                <div className="card-text2 red">{String(Cart.orders_price * Cart.orders_quantity).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원</div>
              </li>
            ))}
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
          <ModalEmpty open={emptyModalOpen} close={closeModalEmpty} />
          <ModalStaff open={staffModalOpen} close={closeModalStaff} />
          <ModalQuantity open={quantityModalOpen} close={closeModalQuantity} menu={selectedMenu} fetchCart={fetchCart} />
          <ModalQuantitySet open={quantitySetModalOpen} close={closeModalQuantitySet} menu={selectedSets} fetchCart={fetchCart} />
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
      <LazyLoadImage src={img} alt="" />
      <div className="menu-text">{name}</div>
      <div className="menu-text position-down red">{price}원~</div>
    </>
  );
};

export default Order;
