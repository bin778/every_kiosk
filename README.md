<div>
<h1>🍔Every Kiosk</h1>
</div>

## 프로젝트 소개
* 사용이 불편한 중노년층의 사용편의성을 고려한 햄버거 키오스크
* 기본값 옵션, 음성 검색 기능 등 사용자에게 편의성을 제공하는 기능 추가
* 실제 결제가 안되는 테스트지만 토스페이먼츠 결제 API를 구현하여 사용자의 결제 요청 및 인증, 승인 가능

## 개발 동기
* 중노년층은 물론 청년층 또한 키오스크를 이용할 때 조작이 어렵거나 시간이 오래 걸려 키오스크 이용에 불편함을 겪고 혹평이 많음
* 특히 메뉴 및 버튼 구분이 없거나 불필요한 메뉴 권유 팝업창이 있는 불편한 UX를 보고 사용자의 편의성을 위해 키오스크를 개선해야 겠다는 생각이 들었음
* 개인적인 이유로는 프로젝트에서 TypeScript를 처음 경험하기 때문에 조금이라도 친숙해져서 언어 스킬을 향상시키고 싶었음

## 개발 인원
* 최영빈(개인 토이 프로젝트)

## 개발 기간
* 2024.07~2024.08⏰

| 일정 | 개발 내용 |
| :----------------------: | :----------------------: |
| 7-1주차 | GitHub 연동, JS -> TS 변환 |
| 7-2주차 | MySQL 연동, 반응형 UI 구현 |
| 7-3주차 | 햄버거 및 음료 메뉴 DB 추가 |
| 7-4주차 | 장바구니 기능 구현 |
| 8-1주차 | 세트메뉴 주문 기능 구현, 토스페이스먼츠 결제 API 구현 |
| 8-2주차 | 코드 리팩토링(반복 코드 개선) |
| 8-3주차 | 기본값 세트 선택, 음성 검색 기능 구현 |
| 8-4주차 | 디버깅 및 보고서 작성 |

## 주요 기술
#### Front-End

<img src="https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> 
#### Back-End

<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white">

## 기능 소개
| 초기 화면 | 주문 화면 |
| :----------------------: | :----------------------: |
| ![image](https://github.com/user-attachments/assets/32f23058-cf59-478b-beb4-4d233c60cc1a) | ![image](https://github.com/user-attachments/assets/1eba0d11-033b-4934-b282-d5d2c83f3c4a) |
| 주문 화면(Tablet) | 주문 화면(Mobile) |
| ![image](https://github.com/user-attachments/assets/1d02d069-3a23-45e1-8e3e-ddb53900b8bc) | ![image](https://github.com/user-attachments/assets/981df338-98cf-405a-b510-127a3fee9793) |
| 세트 주문 화면 | 세트 옵션 창 |
| ![image](https://github.com/user-attachments/assets/280d9dfe-0462-4f1d-9cdc-bc7bbec20a30) | ![image](https://github.com/user-attachments/assets/c7683003-f2ff-4c7a-9505-b4bfc7da1655) |
| 결제 API | 결제 API(Mobile) |
| ![image](https://github.com/user-attachments/assets/09377260-4172-448d-b2b3-6b352ce05518) | ![image](https://github.com/user-attachments/assets/02c77e97-9131-4fc2-8898-ca9c2c79d729) |

### 반응형 웹
* PC, 태블릿, 모바일 등 다양한 환경에서의 지원을 위해 반응형 웹 구현

### 메뉴 주문 기능
* 사용자가 메뉴나 수량을 선택하면 장바구니(주문 내역)에 구매할 메뉴가 추가됨
* LazyLoadImage를 사용하여 이미지 로딩으로 인한 시간 단축 및 최적화

### 세트 주문 기능
* 옵션 선택에 어려워하고 복잡한 사용자를 위해 기본값 선택 기능 제공(감자튀김(중), 코카콜라(중))
* 세트 옵션 창에서 재료 추가, 사이드메뉴 변경, 음료 변경 가능

### 검색 기능
* 검색 입력 창에 단어 또는 초성을 입력하면 원하는 메뉴를 검색할 수 있음
* 음성 인식 기능을 이용하여 자신이 말한 음성을 감지하여 원하는 메뉴를 검색할 수 있음

### 결제 API 기능
* 토스페이먼츠 API 결제 기능 구현하여 PC는 물론 태블릿 및 모바일에서도 결제 기능 사용 가능
* 결제가 성공하면 번호표 화면으로, 실패하거나 취소하면 주문 화면으로 이동

## 실행 화면
### 메뉴 주문
https://github.com/user-attachments/assets/4e4a40b8-bbcd-4c9b-8346-80992c90a4fc

### 세트 주문
https://github.com/user-attachments/assets/d765e2fb-3b3e-44ae-a732-bf550d77bcea

### 검색 기능
https://github.com/user-attachments/assets/c61f7eb0-38b8-4a51-8d38-57995fd692cb

### 음성 검색 기능
https://github.com/user-attachments/assets/c1f8ffc0-6d56-4f39-8033-daa14ca93707

## 프로젝트 후기
* TypeScript를 사용하여 프로젝트를 개발하고 진행하였다. TypeScript는 타입을 검사하기 때문에 JavaScript에 비해 까다롭고 어려움이 많았지만, 이 과정에서 TypeScript와 조금이나마 친해질 수 있어서 좋았다.
* 프로젝트를 진행할 때 반응형 웹 구현, 글씨나 아이콘 크기 조절, 기본값 제공, 음성 검색 기능 등 사용자에게 친화적인 UX를 구현하면서 사용자들에게 과연 편리하게 이용할 수 있는지에 대해 고려하고 생각해 볼 수 있는 계기가 되었다.
* 중노년층을 위한 UI 디자인이 아닌 기존 UI 디자인을 사용하여 개발했다는 점이 아쉬웠다. 신한은행 ATM 처럼 UI 디자인을 쉽고 간편한 버전을 따로 추가했으며 어떨까 아쉬운 생각이 들었다.
* 모바일 결제 API에서 결제 취소할 때 400 에러를 해결하지 못한 것도 아쉬웠다. 모바일 결제 API를 구현할 때 결제를 취소해도 결제 성공으로 넘어가는 논리적 에러를 해결했지만 400 에러를 해결을 못한 점은 아쉬웠다.



