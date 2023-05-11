import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useLoaderData } from 'react-router-dom'
import '../css/order.css'

export default function Orders() {
  let orderData=useLoaderData();
  console.log(orderData)
  return (
    <Container fluid style={{position:'relative',top:'12vh',padding:'40px'}}>
        <Row>
        <Col></Col>
            <Col lg={8}>
                  {
                    orderData.map((ele)=>{
                      return(
                        <Row style={{padding:'20px'}}>
                            <Card>
                              <Card.Body>
                                <Card.Title>
                                    <h3>order no: {ele.oid}</h3>
                                </Card.Title>
                                <Card.Body>
                                  {
                                      ele.orderData.map((eleCard)=>{
                                        return(
                                        <div class="row p-2 bg-white border rounded" >
                                            <div class="col-md-3 mt-1"><img class="img-fluid img-responsive rounded product-image" src={`${process.env.REACT_APP_SERVER_URL}productImages/${eleCard.productId.image.fileName}`} /></div>
                                            <div class="col-md-6 mt-1">
                                                <h5>{eleCard.productId.name}</h5>
                                                <span>quantity: {eleCard.quantity}</span>
                                            </div>
                                            <div class="align-items-center align-content-center col-md-3 border-left mt-1">
                                                <div class="d-flex flex-row align-items-center">
                                                    <span>Price : Rs{eleCard.productId.price}</span>
                                                </div>
                                                
                                            </div>
                                        </div>  
                                        )
                                      })
                                  }
                                </Card.Body>
                                <Card.Footer>
                                    <span className='fs-4'>Placed At: {ele.createdAt.split('T')[0]}</span>
                                    <span className='fs-4'>order value: Rs {ele.OrderValue}</span>
                                    <span className='fs-4'>No of items: {ele.orderData.length}</span>
                                </Card.Footer>
                              </Card.Body>
                            </Card>

                        </Row>
                      )
                    })
                  }
                  
            </Col>
        <Col></Col>
        </Row>
    </Container>
  )
}
