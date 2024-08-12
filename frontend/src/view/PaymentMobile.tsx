import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const PaymentMobile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const alertShown = useRef(false); // alert 호출 여부를 추적하는 ref

  useEffect(() => {
    // alert가 이미 표시된 경우, 이후 코드 실행을 방지합니다.
    if (alertShown.current) return;

    const query = new URLSearchParams(location.search);
    const imp_uid = query.get('imp_uid');
    const merchant_uid = query.get('merchant_uid');
    const paid_amount = query.get('amount');

    if (imp_uid && merchant_uid) {
      axios.post('/api/payment', {
        imp_uid,
        merchant_uid,
        amount: paid_amount ? Number(paid_amount) : 0,
      })
      .then(() => {
        if (!alertShown.current) {  // alert가 아직 표시되지 않았으면
          alert('결제 성공');
          alertShown.current = true;  // alert 표시 여부를 기록
          navigate("/number");  // 결제 완료 페이지로 이동
        }
      })
      .catch(error => {
        if (!alertShown.current) {  // alert가 아직 표시되지 않았으면
          if (error.response) {
            if (error.response.status === 400) {
              alert('결제 요청이 잘못되었거나 취소하였습니다.');
            } else {
              alert('결제 실패: 서버 오류가 발생했습니다. 다시 시도해주세요.');
            }
          } else if (error.request) {
            alert('결제 실패: 서버로부터 응답이 없습니다. 인터넷 연결을 확인해주세요.');
          } else {
            alert('결제 실패: 요청 설정 중 오류가 발생했습니다.');
          }
          alertShown.current = true;  // alert 표시 여부를 기록
          navigate("/order");  // 주문 페이지로 돌아가기
        }
      });
    } else {
      if (!alertShown.current) {  // alert가 아직 표시되지 않았으면
        alert('결제 정보가 부족합니다.');
        alertShown.current = true;  // alert 표시 여부를 기록
        navigate("/order");  // 주문 페이지로 돌아가기
      }
    }
  }, [location.search, navigate]);

  return (
    <div>
      <p>결제 결과를 확인하는 중입니다...</p>
    </div>
  );
}

export default PaymentMobile;
