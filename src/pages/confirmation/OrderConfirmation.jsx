import { useEffect, useState } from "react";
import axios from 'axios';
import { useOrderDetails } from "../../contexts/OrderDetails";
import { AlertBanner } from '../common/AlertBanner';

export function OrderConfirmation({ setOrderPhase }) {
  const [orderNumber, setOrderNumber] = useState(null);
  const [error, setError] = useState(false);
  const [, , resetOrder] = useOrderDetails();

  useEffect(() => {
    axios.post('http://localhost:3030/order')
      .then(res => {
        setOrderNumber(res.data.orderNumber);
      })
      .catch(err => {
        setError(true);
      })
  }, []);

  if(error) {
    return <AlertBanner />;
  }

  return (
    <>
      {orderNumber ? (
        <div style={{ textAlign: 'center' }}>
          <h2>Thank you!</h2>
          <p>Your order number is {orderNumber}</p>
          <p style={{ fontSize: '25%' }}>as per our terms and conditions, nothing will happen now</p>
          <button type="button" onClick={() => {
            resetOrder();
            setOrderPhase('inProgress');
          }}>Create new order</button>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}