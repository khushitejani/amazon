// import logo from './logo.svg';
import './App.css';
import { Container, Row, Col,Card,Button, } from 'react-bootstrap';
import logo from './image/logo.png'
import { FaSearch } from "react-icons/fa";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaStar,FaStarHalfAlt,FaChevronDown,} from "react-icons/fa";
import { Link } from 'react-router-dom';
import { IoClose } from "react-icons/io5";
import More from './more';
import { increment,decrement } from "./app/reducer/dataSlice";

import { useSelector, useDispatch } from 'react-redux'; 
// import { Link } from 'react-router-dom';

function Home() {
  var [catagory, setcatagory] = useState([])
  var [id, setid] = useState([])
  var [cartz,setcartz]=useState([])
  var [search,setsearch]=useState([])
  var [all,setall]=useState([])
  var [status,setstatus]=useState('0')
  var [singlecategory,setsinglecategory]=useState([])
  const count = useSelector((state) => state.data.value)
  
      const dispatch=useDispatch()

  useEffect(() => {
    axios.get('https://dummyjson.com/products/categories')
      .then(function (response) {
        // handle success
        console.log(response);
        // setcatagory(response.data)
        setcatagory(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })


  }, [])
  //  ===========================================================
  var [data, setdata] = useState(null)
  useEffect(() => {
    axios.get('https://dummyjson.com/products')
      .then(function (response) {
        // handle success
        console.log(response.data);
        // setcatagory(response.data)
        setdata(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

    console.log('data', data?.products)
  }, [])


 const btnhandler=(ind)=>{
    setid(ind)
}



const addhendler=(ele,ind)=>{
  let cartData = ([...cartz,ele])
  setcartz(cartData)
}



const delethendler=(ind)=>{

  let deleting=cartz.filter((ele,ind1)=>{

    return ind1!=ind
  })
  // alert(deleting)
  setcartz(deleting);
}



const catagoryhendler=(ele)=>{
  var  catagories=data.products.filter((ele1,ind)=>{
    return ele1.category===ele
  })
  setsinglecategory([...catagories])
  setstatus('1');

}

const allhendler=()=>{
  setstatus('0')
}



const searchendler=()=>{
  // alert(search)
  var searching=data.products.filter((ele2,ind)=>{
    return ele2.brand==search
    // console.log(ele2.brand==search)
   
  })
  setsinglecategory([...searching])
  console.log(searching)
  if(search!='')
  {
  setstatus('1');
}else{
  setstatus('0')
}
}
// export function counter(){


//   return(
//      <>
      
//       </>
//   )
// }


  return (
    <div className="App">
      {/* ==================== start header================ */}
      <Container className='bg-black py-2 header' fluid  style={{position:''}}>
        <Row>
          <Col className='d-flex justify-content-start'><img src={logo} className='w-25 text-start'></img></Col>
          <Col className='d-flex'  >
            <div> <input type='text' style={{ height: '40px', borderTopLeftRadius: '10px', borderBottomLeftRadius: '10px', width: '500px', border: 'none' }} placeholder='Search Amazon.in' onChange={(e)=>setsearch(e.target.value)} ></input>  </div>
            <div style={{ height: '40px', width: '45px', backgroundColor: 'rgb(254,189,105)', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', border: 'none' }} className='fs-4 ps-2'onClick={()=>searchendler()}><FaSearch></FaSearch></div>
          </Col>
          <Col className='fw-bolder text-white  text-end fs-5 my-auto' style={{ position: 'relative' }}>
            <button style={{ padding: '0 30px', marginRight: '20px', color: 'rgb(254,189,105) ', fontWeight: 'bolder' }} className='my-0'  onClick={()=>allhendler()}>ALL</button>
            cart<img src={require('./image/cart.png')} style={{ width: '50px' }}></img>
            <div style={{ position: 'absolute', top: '-10px', right: '35px', color: 'rgb(254,189,105)' }}>o</div></Col>
        </Row>
      </Container>
      <Container style={{position:'fixed', zIndex:'1', right:'-15PX', top:'56px', width:'300PX'}}>
      {
         cartz.map((ele, ind)=>{
          return(
            
                  <div style={{ backgroundColor:'black',}} className='d-flex justify-content-between'>
                <li key={ind} style={{color:'rgb(254,189,105)',padding:'0 30px'}}>{ele}</li><button style={{border:'none', backgroundColor:'black', color:'rgb(254,189,105) '}} onClick={()=>delethendler(ind)}><IoClose></IoClose></button>
                </div>
          )
        })
      }
      </Container>
      {/* ==================== End header================ */}




      {/* =================start category================= */}
      <Container fluid >
        <Row className=''>
          <Col   className='side_bar' >{

            catagory.map((ele, ind) => {
              return (
                <div key={ind} className='py-2 fs-4'><a onClick={()=>catagoryhendler(ele)}>{ele}</a></div>
              )
            })
          }
          </Col>
          <Col  className='main_content pt-5'>
            <Row className='w-100 px-auto py-auto ps-4'>
            
            {
             status=='0'&& data != null && data.products.map((ele, ind) => {
                return (
                  <Col lg='3' className='my-3'>
                 <Card style={{height:'100% ', width:'100%'}}>
                  {/* <Card.Img variant="top" className='w-100 object-fit-cover' src= ""/> */}
                  <div className='card_img'><img src={ele.thumbnail} className=''></img></div>
                 <Link to={`/more/${ele.id}`} className='nav-link'>

                  <Card.Body  style={{height:'250px'}}>
                      <h4>{ele.title}</h4>
                      <div>{ele.category}</div>
                      <h5 style={{color:'rgba(0,0,0,.3)'}} className='card_description'>{ele.description}</h5>
                      <h5>$-{ele.price}<span  style={{color:'green'}}><FaChevronDown style={{fontSize:'13px',color:'rgb(254,189,105)' }} className='ms-3 '></FaChevronDown> off({ele.discountPercentage}%)</span></h5>
                       <div style={{color:'rgb(254,189,105)'}}><FaStar ></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStarHalfAlt></FaStarHalfAlt>-<span className='text-black'>{ele.rating} %</span>
                       
                       </div>
                       <div className='d-flex justify-content-between'>
                        <div className='fw-bolder'>Brand:{ele.brand}</div>
                        <div  className='fw-bolder '>stocks:{ele.stock}</div>
                       </div>
                  </Card.Body>
                  
                

                 </Link>
                 

                    <div className='d-flex justify-content-center'>
                 <Button variant="dark"  style={{color:'rgb(254,189,105)',}} onClick={()=>{dispatch(increment())}}>+</Button> <span style={{fontSize:'25px',padding:'0 10px', fontWeight:'bolder'}}>{count}</span>
                  <Button variant="dark"  style={{color:'rgb(254,189,105)',}} onClick={()=>{dispatch(decrement())}}>-</Button> 
                    </div>
                    <Link to={`/more/${ele.id}`} className='nav-link'><Button variant="dark" className='m-2 ' style={{color:'rgb(254,189,105)',width:'94%'}} onClick={()=>btnhandler(ind)}  index={ind}>More...</Button></Link>

                 <Button variant="dark" className='m-2' style={{color:'rgb(254,189,105)'}} onClick={()=>addhendler(ele.title,ind)} >ADD</Button>

                </Card>
                  </Col>
                  

                )
              })
            }
                {
             status=='1'&& data != null && singlecategory.map((ele, ind) => {
                return (
                  <Col lg='3' className='my-3'>
                  <Card style={{height:'100% ', width:'100%'}}>
                   {/* <Card.Img variant="top" className='w-100 object-fit-cover' src= ""/> */}
                   <div className='card_img'><img src={ele.thumbnail} className=''></img></div>
                  <Link to={`/more/${ele.id}`} className='nav-link'>
 
                   <Card.Body  style={{height:'250px'}}>
                       <h4>{ele.title}</h4>
                       <div>{ele.category}</div>
                       <h5 style={{color:'rgba(0,0,0,.3)'}} className='card_description'>{ele.description}</h5>
                       <h5>$-{ele.price}<span  style={{color:'green'}}><FaChevronDown style={{fontSize:'13px',color:'rgb(254,189,105)' }} className='ms-3 '></FaChevronDown> off({ele.discountPercentage}%)</span></h5>
                        <div style={{color:'rgb(254,189,105)'}}><FaStar ></FaStar><FaStar></FaStar><FaStar></FaStar><FaStar></FaStar><FaStarHalfAlt></FaStarHalfAlt>-<span className='text-black'>{ele.rating} %</span>
                        
                        </div>
                        <div className='d-flex justify-content-between'>
                         <div className='fw-bolder'>Brand:{ele.brand}</div>
                         <div  className='fw-bolder '>stocks:{ele.stock}</div>
                        </div>
                   </Card.Body>
                   
                 
 
                  </Link>
                  
 
                     <div className='d-flex justify-content-center'>
                  <Button variant="dark"  style={{color:'rgb(254,189,105)',}} onClick={()=>{dispatch(increment())}}>+</Button> <span style={{fontSize:'25px',padding:'0 10px', fontWeight:'bolder'}}>{count}</span>
                   <Button variant="dark"  style={{color:'rgb(254,189,105)',}} onClick={()=>{dispatch(decrement())}}>-</Button> 
                     </div>
                   <Link to={`/more/${ele.id}`} className='nav-link'><Button variant="dark" className='m-2 ' style={{color:'rgb(254,189,105)',width:'94%'}} onClick={()=>btnhandler(ind)}  index={ind}>More...</Button></Link>
 
                   <Button variant="dark" className='m-2' style={{color:'rgb(254,189,105)'}} onClick={()=>addhendler(ele.title,ind)} >ADD</Button>
 
                 </Card>
                   </Col>
                  

                )
              })

            }
            </Row>   
            </Col>
        </Row>  
        </Container>
  
      {/* =================start category================= */}







    </div>
  );
}

export default Home;
