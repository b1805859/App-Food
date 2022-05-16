import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import Rating from "./Rating";
import axios from "axios";
import { useContext } from "react";
import { Store } from "../Store";

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert("Sorry. Product is out of stock");
      return;
    }
    ctxDispatch({
      type: "CART_ADD_ITEM",
      payload: { ...item, quantity },
    });
  };

  return (
    <Card>
      <Link to={`/product/${product.slug}`}>
        <div className="zoomin card-img-top">
          <img
            src={product.image}
            // className="card-img-top"
            alt={product.name}
          />
        </div>
      </Link>
      <Card.Body>
        <Link to={`/product/${product.slug}`}>
          <Card.Title className="product-title">{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <div className="product-box">
          <Card.Text className="product-price">${product.price}</Card.Text>
          {product.countInStock === 0 ? (
            <Button className="btn-add" variant="light" disabled>
              Out of stock
            </Button>
          ) : (
            <Button
              className="btn-add"
              onClick={() => addToCartHandler(product)}
            >
              Add to cart
            </Button>
          )}
        </div>
      </Card.Body>
    </Card>
  );
}
export default Product;
