// import logo from './logo.svg';
import './App.css';
import { Container, Row, Col, Card, Button, } from 'react-bootstrap';
import logo from './image/logo.png'
import { FaSearch } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar, FaStarHalfAlt, FaChevronDown, } from "react-icons/fa";
import Home from './Home';
import { useParams } from 'react-router-dom';


function More(props) {
  const { id } = useParams();
  //  ===========================================================
  var [data, setdata] = useState(null)
  var [thumbnail, setthumbnail] = useState()

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(function (response) {
        // handle success
        console.log(response.data);
        // setcatagory(response.data)
        setdata(response.data);
        setthumbnail(data.thumbnail)

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    // console.log('data', data?.products)
    // console.log(data.title)
  }, [])
  const thumbnailhendler=(ele)=>{
        setthumbnail(ele);
        // console.log(thumbnail)
  }


  return (
    data != null && <div className="App">
      {/* ================klk==== start header================ */}
     


          <Container fluid>
            <Row xxl={3}>
              <Col xxl={2}>  {
                    data.images.map((ele,ind)=>{
                    return(
                    <>
                    
                    <img src={ele}  onClick={()=>thumbnailhendler(ele)} style={{height:'20%', width:'100% ',}}></img>
                    
                      </>
                    )
                   })
                 }
              </Col>
              <Col xxl={6}>
              <img src={thumbnail}  className='h-60% ms-5 mt-5'></img>
              </Col>
              <Col className='pt-5 mt-5'>
                 <h1 className='me-auto pb-4'>{data.title}</h1>
                      <div>{data.category}</div>
                      <h5 style={{color:'rgba(0,0,0,.3)'}} className='card_description'>{data.description}</h5>
                      <h5>$-{data.price}<span  style={{color:'green'}}><FaChevronDown style={{fontSize:'13px',color:'rgb(254,189,105)' }} className='ms-3 pt-5'></FaChevronDown> off({data.discountPercentage}%)</span></h5>
                       <div style={{color:'rgb(254,189,105)'}} className='py-3'><FaStar ></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStarHalfAlt></FaStarHalfAlt>-<span className='text-black'>{data.rating} %</span>
                       
                       </div>
                       <div className='d-flex justify-content-between pt-1'>
                        <div className='fw-bolder '>Brand:{data.brand}</div>
                        <div  className='fw-bolder '>stocks:{data.stock}</div>
                       </div>
              </Col>
            </Row>
          </Container>
      {/* ==================== End header================ */}



    </div>
  );
}

export default More;