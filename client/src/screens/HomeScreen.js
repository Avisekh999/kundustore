import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Slide from "../components/Slide"
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions.js";
import dotenv from "dotenv";

dotenv.config();

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
        <Slide />
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} xs={4} sm={4} md={6} lg={4} xl={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        
      )}
      <Slide />
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id}  xs={4} sm={4} md={6} lg={4} xl={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
        
      )}
    </>
  );
};

export default HomeScreen;
