import { useCancelPayment } from '@/hooks/useBooking';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

type Props = {};

function PaymentCancelled({}: Props) {
  const params = useSearchParams();
  const cancel = params.get('cancel');
  const orderCode = params.get('orderCode');

  const { mutate: handleCancel } = useCancelPayment();

  useEffect(() => {
    if (cancel === 'true' && orderCode) {
      handleCancel(parseInt(orderCode));
    }
  }, [cancel, orderCode, handleCancel]);

  return <div>PaymentCancelled</div>;
}

export default PaymentCancelled;
