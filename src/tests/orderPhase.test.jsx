import { render, screen } from "@testing-library/react"; 
import userEvent from '@testing-library/user-event'

import App from '../App';

test('order phases for happy path', async () => {
  // render app
  render(<App />);
  // add ice cream scoops and toppings
  const chocolateScoop = await screen.findByRole('spinbutton', {
    name: 'Chocolate'
  });
  userEvent.clear(chocolateScoop);
  userEvent.type(chocolateScoop, '2');

  const mmsTopping = await screen.findByRole('checkbox', {
    name: 'M&Ms',
  });
  const hotFudgeTopping = screen.getByRole('checkbox', {
    name: 'Hot fudge',
  });
  userEvent.click(mmsTopping);
  userEvent.click(hotFudgeTopping);

  // find and click order button
  const orderButton = screen.getByRole('button', { name: /order sundae!/i });
  userEvent.click(orderButton);

  // check summary information based on order
  const summaryHeading = screen.getByRole('heading', { name: 'Order Summary' });
  expect(summaryHeading).toBeInTheDocument();

  const scoopInfo = screen.getByRole('heading', { name: 'Scoops: $4.00' });
  expect(scoopInfo).toBeInTheDocument();

  const toppingInfo = screen.getByRole('heading', { name: 'Toppings: $3.00' });
  expect(toppingInfo).toBeInTheDocument();

  // check summary option items
  expect(screen.getByText('2 Chocolate')).toBeInTheDocument();
  expect(screen.getByText('M&Ms')).toBeInTheDocument();
  expect(screen.getByText('Hot fudge')).toBeInTheDocument();

  // accept terms and conditions and click button to confirm order
  const checkboxTermsConditions = screen.getByRole('checkbox', {
    name: /i agree to terms and conditions/i,
  });
  const buttonConfirmOrder = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(checkboxTermsConditions);
  userEvent.click(buttonConfirmOrder);

  // confirm order number on confirmation page 
  const thankyouHeader = await screen.findByRole('heading', {
    name: /thank you/i,
  });
  expect(thankyouHeader).toBeInTheDocument();

  const orderNumber = await screen.findByText('Your order number is', { exact: false });
  expect(orderNumber).toBeInTheDocument();
  
  // click new order button on confirmation page
  const newOrderButton = screen.getByRole('button', { name: /create new order/i });
  userEvent.click(newOrderButton);

  // check that scoops and toppings subtotals have been reset
  const scoopsTotal = screen.getByText('Scoops total: $', { exact: false });
  const toppingTotal = screen.getByText('Toppings total: $', { exact: false });
  expect(scoopsTotal).toBeInTheDocument();
  expect(toppingTotal).toBeInTheDocument();

  // I need to await anything to avoid those fucking test error?!
  await screen.findByRole('spinbutton', { name: 'Chocolate' });
  await screen.findByRole('checkbox', { name: 'M&Ms' });
});