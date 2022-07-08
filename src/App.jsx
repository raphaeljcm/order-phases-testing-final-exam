import { useState } from 'react';
import Container from 'react-bootstrap/Container';

import { OrderEntry } from './pages/entry/OrderEntry';
import { OrderSummary } from './pages/summary/OrderSummary';
import { OrderConfirmation } from './pages/confirmation/OrderConfirmation';

import { OrderDetailsProvider } from './contexts/OrderDetails';

export default function App() {
  const [orderPhase, setOrderPhase] = useState('inProgress');

  const CurrentComponent = (
    orderPhase === 'inProgress' ? OrderEntry :
    orderPhase === 'review' ? OrderSummary : OrderConfirmation
  );

  return (
    <OrderDetailsProvider>
      <Container>
        <CurrentComponent setOrderPhase={setOrderPhase} />
      </Container>
    </OrderDetailsProvider>
  );
}
