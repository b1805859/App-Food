import { useEffect, useReducer, useState } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Carousel from 'react-bootstrap/Carousel';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import Banner1 from '../assets/img/banner1.jpg';
import Banner2 from '../assets/img/banner2.jpg';
import Banner3 from '../assets/img/banner3.jpg';
import { Link } from 'react-router-dom';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

function HomeScreen() {
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  });
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('/api/products');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }

      // setProducts(result.data);
    };

    fetchData();
  }, []);
  const [showbtn, setShowBtn] = useState(true);
  const [showcol, setShowCol] = useState(false);
  const handleShow = () => {
    setShowBtn(!showbtn);
    setShowCol(!showcol);
  };
  return (
    <div className="homepage">
      <Helmet>
        <title>Italian Food | Stave</title>
      </Helmet>
      {/* Banner */}
      <Carousel className="banner" fade>
        <Carousel.Item>
          <img className="d-block w-100" src={Banner1} alt="First slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Banner2} alt="Second slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-block w-100" src={Banner3} alt="Third slide" />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      {/* end banner */}
      <div className="boxtext">
        <div className="title">Welcome to Stave!</div>
        <div className="subtitle">Family Cafe & Pizzeria</div>
        <div className="smalltext">
          Apparently we had reached a great height in the atmosphere, for the
          sky was a dead black, and the stars had ceased to twinkle. By the same
          illusion which lifts the horizon of the sea to the level
        </div>
      </div>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {products.slice(0, 8).map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))}
            {showcol &&
              products.slice(8, products.length).map((product) => (
                <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
          </Row>
        )}
        {showbtn && (
          <div className="btn-product">
            <button className="a-product" onClick={handleShow}>
              <span>View all products</span>
              <span>
                <i class="fas fa-angle-right"></i>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default HomeScreen;
