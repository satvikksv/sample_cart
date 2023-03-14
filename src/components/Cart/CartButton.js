import classes from './CartButton.module.css';
import { toggleCartActions } from '../../store/toggle-cart-slice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


const CartButton = (props) => {
  const itemsQuantity = useSelector((state) => state.items.totalQuantity);
 const dispatch = useDispatch();

 const cartHandler = () => {
   dispatch(toggleCartActions.toggle());
 }
  return (
    <button onClick={cartHandler} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{itemsQuantity}</span>
    </button>
  );
};

export default CartButton;
