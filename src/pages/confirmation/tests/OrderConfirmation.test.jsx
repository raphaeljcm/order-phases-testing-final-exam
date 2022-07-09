import { rest } from 'msw';
import { server } from '../../../mocks/server';
import { render, screen } from '../../../test-utils/testing-library-utils';
import { OrderConfirmation } from '../OrderConfirmation';

it('shows AlertBanner for Error when Submitting Order has failed', async () => {
  // override default msw response for options endpoint with error response
  server.resetHandlers(
    rest.post('http://localhost:3030/order', (req, res, ctx) => {
      res(ctx.status(500));
    }),
  );
  
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);

  const alertBanner = await screen.findByRole('alert');
  expect(alertBanner).toHaveTextContent('An unexpected error occurred. Please try again later.');
});