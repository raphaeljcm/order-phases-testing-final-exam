import Container from 'react-bootstrap/Container';

import { OrderDetailsProvider } from './contexts/OrderDetails';

export default function App() {

  return (
    <OrderDetailsProvider>
      <Container></Container>
    </OrderDetailsProvider>
  );
}
