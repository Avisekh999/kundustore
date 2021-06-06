import React from "react";
import {Form, Button, FormControl,Row,Col } from "react-bootstrap"

const Search = () => {
  return (
    <div>

      <Form >
          <Row>
              <Col md={8}>
              <FormControl type="text" placeholder="Search Products" className="mr-sm-2" />
              </Col>
              <Col md={2}>
              <Button variant="outline-success"  >Search</Button>
              </Col>
          </Row>

       
       
      </Form>
    </div>
  );
};

export default Search;
