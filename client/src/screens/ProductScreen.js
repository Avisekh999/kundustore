import React,{useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
  Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import Loader from "../components/Loader";
import Message from "../components/Message";
import  {listProductDetails} from '../actions/productActions.js'



const ProductScreen = ({ history,match }) => {
  const [qty, setQty] = useState(1)
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;
  

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [dispatch,match]);

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id} ?qty=${qty}`)

  }
  // const date = (new Date()).toLocaleDateString('en-US');
  // // console.log(date)
  // const date1 =Number(date.substr(0,1))
  // const date2 = date.substr(1,10)
  // console.log(date2)

  
var today = new Date();
var dd = String(today.getDate()).padStart(2, "0"); // get the date padStart => 01
var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
// var yyyy = today.getFullYear();
// var fullDate = dd + "." + mm + "." + yyyy;

var someDate = new Date();
var numberOfDaysToAdd = 1;
someDate.setDate(someDate.getDate() + numberOfDaysToAdd);

var dd = String(someDate.getDate()).padStart(2, "0");
var mm = String(someDate.getMonth() + 1).padStart(2, "0");
var y = someDate.getFullYear();

var someFormattedDate = dd + "." + mm + "." + y;
 

  return (
    <>
      <Link className="btn btn-danger my-3" to="/">
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroupItem>
              <Rating
                value={product.rating}
                text={`${product.numReviews} reviews`}
              />
            </ListGroupItem>
            <ListGroupItem>Price: ₹{product.price}</ListGroupItem>
            <ListGroupItem>Description: {product.description}</ListGroupItem>
            <ListGroupItem>Estimate Delivery Date: <strong>{someFormattedDate}</strong> </ListGroupItem>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>₹{product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>

            {product.countInStock > 0 &&(
              <ListGroupItem>
                <Row>
                  <Col>Qty</Col>
                  <Col>
                   <Form.Control as="select" value={qty} onChange={(e) => 
                   setQty(e.target.value)}>
                    { [...Array(product.countInStock).keys()].map((x) => (
                       <option key={x+1} value={x+1}>
                         {x + 1}
                       </option>
                     ))}

                   </Form.Control>
                  </Col>
                </Row>
              </ListGroupItem>
            ) }

              <ListGroup.Item>
                <Button
                onClick={addToCartHandler}
                  className="btn-block"
                  type="button"
                  disabled={product.countInStock === 0}
                >
                  Add To cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
      )}
      
    </>
  );
};

export default ProductScreen;
