import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { toggleCartActions } from './store/toggle-cart-slice'; //I exported with that name, even though it is not relevant here 
import Notification from './components/UI/Notification';
import { itemsActions } from './store/items-slice';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.toggleCart.showCart);
  const cart = useSelector((state) => state.items);
  const notification = useSelector((state) => state.toggleCart.notification);

  useEffect(() => {
    const sendCartData = async() => {
      dispatch(toggleCartActions.showNotification({
        status: "pending",
        title: "sending...",
        message: "sending cart data!"
      }));
      const response = await fetch("https://e-comm-project-5fbfd-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json" ,{
        method: "PUT",
        body: JSON.stringify(cart),
      });
      
      if(!response.ok) {
        throw new Error("sending cart data failed.")
      }
     // const responseData = await response.json();

     dispatch(toggleCartActions.showNotification({
      status: "success",
      title: "success!",
      message: "sent cart data!"
    }));
    };

    const getCartData = async() => {
      try{
      const response = await fetch("https://e-comm-project-5fbfd-default-rtdb.asia-southeast1.firebasedatabase.app/cart.json");

      if (!response.ok) {
        throw new Error("Getting cart data failed");
      }
      const responseData = await response.json();
      if (responseData.totalQuantity === 0) {
        return;
      }
      dispatch(itemsActions.replaceCart(responseData));
    } catch(e) {
      dispatch(toggleCartActions.showNotification({status: "error", title: "Error", message: "Getting cart data failed!"}))
    }
    };
    
    if (isInitial) {
       getCartData();
      isInitial = false;
      return;
    }

    sendCartData().catch((error) => {
      dispatch(toggleCartActions.showNotification({
        status: "error",
        title: "Error!",
        message: error.message
      }));
    });
  
  }, [cart, dispatch]);

  return (
    <>
   {notification && <Notification status={notification.status} title={notification.title} message={notification.message} /> }
    <Layout>
      { showCart &&<Cart />}
      <Products />
    </Layout>
    </>
  );
}

export default App;
