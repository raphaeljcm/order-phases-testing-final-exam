# Sundaes on Demand

This project accompanies the Udemy course [Testing React with Jest and Testing Library](https://www.udemy.com/course/react-testing-library/).

## Final Exam Code Quiz Spec

### What to Test

* "Happy path" (aka "Happy Day" or "Golden Path") test
  * Tests that execute customer flow without error
* For our app:
  * Create order
  * Accept terms and submit
  * Click “new order” on confirmation page
* Don’t need to test different combinations of orders
  * Covered in order page testing

### New Mock Service Worker Handler

* New Handler
  * mimic POST for order confirmation with Mock Service Worker
  * implementation: call POST via useEffect in OrderConfirmation
  * make up format of the data sent to server, or send no data
  * server simply generates random order number and sends it back as JSON
* Warning about using copy/paste to create new handler
  * I do this all the time
  * If you do, be sure to change the method from get to post
  * If you neglect to do this, it's very difficult to track down!
    * Will get error like Error: connect ECONNREFUSED 127.0.0.1

Good luck!