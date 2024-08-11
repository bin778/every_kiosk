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
    const success = query.get('success');
    const error_msg = query.get('error_msg');

    if (success === 'false') {
      alert(`결제 실패: ${error_msg || '사용자가 결제를 취소하였습니다.'}`);
      navigate("/order");  // 주문 페이지로 돌아가기
      return;
    }

    if (imp_uid && merchant_uid) {
      axios.post('/api/payment', {
        imp_uid,
        merchant_uid,
        amount: paid_amount ? Number(paid_amount) : 0,
      })
      .then(response => {
        if (response.data.success) {
          alert('결제 성공');
          navigate("/number");  // 결제 완료 페이지로 이동
        } else {
          alert('결제 실패: ' + response.data.message);
          navigate("/order");  // 주문 페이지로 돌아가기
        }
      })
      .catch(error => {
        alert('결제 실패');
        navigate("/order");  // 주문 페이지로 돌아가기
      });
    } else {
      alert('결제 정보가 부족합니다.');
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
