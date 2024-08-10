import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';

const PaymentMobile: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const imp_uid = query.get('imp_uid');
    const merchant_uid = query.get('merchant_uid');
    const paid_amount = query.get('amount');

    if (imp_uid && merchant_uid && paid_amount) {
      axios.post('/api/payment', {
        imp_uid,
        merchant_uid,
        amount: Number(paid_amount),
      }).then(response => {
        if (response.data.success) {
          alert('결제 성공');
          navigate("/number");  // 결제 완료 페이지로 이동
        } else {
          alert('결제 실패: ' + response.data.message);
          navigate("/order");  // 주문 페이지로 돌아가기
        }
      }).catch(error => {
        console.error('결제 처리 중 오류:', error); // 오류 내용을 콘솔에 출력
        alert('결제 처리 중 오류가 발생했습니다.');
        navigate("/order");  // 주문 페이지로 돌아가기
      });
    } else {
      alert('사용자가 결제를 취소하였습니다.');
      navigate("/order");  // 주문 페이지로 돌아가기
    }
  }, [location.search, navigate]);

  return (
    <div>
      <p>결제 결과를 확인하는 중입니다...</p>
    </div>
  );
}

export default PaymentMobile;
