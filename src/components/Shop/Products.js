import ProductItem from './ProductItem';
import classes from './Products.module.css';
import { v4 as uuid } from 'uuid';

const DUMMY_PRODUCTS = [
  {
    id: uuid(),
    price: 6,
    title: "My First Book",
    description: 'The First book i ever wrote',
  },
  {
    id: uuid(),
    price: 5,
    title: "My Second Book",
    description: 'The Second book i ever wrote',
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => 
        {return <ProductItem key={product.id} id={product.id} title={product.title} price={product.price} description={product.description} />})}
      </ul>
    </section>
  );
};

export default Products;
