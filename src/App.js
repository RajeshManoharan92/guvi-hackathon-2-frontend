import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import './index.css';
import Grid from '@mui/material/Grid';
import { Button, Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import OutlinedInput from '@mui/material/OutlinedInput'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter, Route, Routes, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import CardMedia from '@mui/material/CardMedia'
import { FaRupeeSign } from 'react-icons/fa';
import { Formik } from "formik";
import { ReactDOM } from "react";
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import 'bootstrap/dist/css/bootstrap.min.css';
import FormControl, { useFormControl } from '@mui/material/FormControl';



export default function App() {
  return (

    // Router used for navigation through pages

    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/Enquirydetails" element={<Enquirydetails />} />
          <Route path="/razorpay" element={<Razorpay />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

// function used for login page

function Login() {
  const Navigate = useNavigate()

  var modal = document.getElementById('id01');

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  return (
    <>

      {/* Top-Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "200px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Welcome to Product Rental
              </div>
              <div className="fontstyle2">
                Don't need to buy a product anymore.. JUST Rent it !!!!
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Admin & User Login Button */}

      <div>
        <button id="loginBTNa" class="btn btn-info" onClick={() => Navigate("/admin")}>Admin Login</button>
      </div> <br></br>
      <div>
        <button id="loginBTNu" class="btn btn-secondary" onClick={() => Navigate("/dashboard")}>User Login</button>
      </div>
    </>

  );
}

// Function for Admin Page

function Admin() {

  const Navigate = useNavigate()

  return (
    <>

      {/* Log Out Button */}

      <div className="logoutbtn">
        <button class="btn btn-outline-secondary" onClick={() => Navigate('/')} >  Log Out </button>
      </div>

      {/* Top Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "200px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Welcome Admin
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      {/* Dashboard, Cart, Contact Us Details, Payement Page Buttons */}

      <div>
        <button class="btn btn-info" id="AdminBTNa" onClick={() => Navigate("/dashboard")}  > Dashboard </button>
        <button class="btn btn-info" id="AdminBTNb" onClick={() => Navigate("/cart")} > Cart </button>
      </div><br></br>
      <div>
        <button class="btn btn-info" id="AdminBTNc" onClick={() => Navigate("/Enquirydetails")} > Enquiry Details </button>
        <button class="btn btn-info" id="AdminBTNd" onClick={() => Navigate("/razorpay")} > Payement Page </button>
      </div><br></br>
    </>
  )
}

//Function for Enquiry Details

function Enquirydetails() {
  const Navigate = useNavigate()

  const [array, setarray] = useState({ Product: [] })

  // using useEffect hooks to load data on page load

  useEffect(
    async () => {
      var response = await axios.get('http://localhost:3000/product/getcontactusdetails')
      setarray({ Product: response.data })
      console.log(response.data)
    }, [])


  return (
    <>

      {/* Admin Page Button */}

      <div className="cartHomeRP">
        <button class="btn btn-outline-secondary" onClick={() => Navigate('/admin')} >  Admin Page </button>
      </div>

      {/* Top Gird */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "200px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Customer Enquiry Details
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <br></br>

      {/* Table */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <Table striped bordered hover variant="primary" border='1'>
              <thead>
                <tr>
                  <td> Customer Name </td>
                  <td> Customer Contact no. </td>
                  <td> Product Name for Enquiry </td>
                </tr>
              </thead>
              <tbody>
                {array.Product.map((row) => (
                  <tr key={row.id}>
                    <td> {row.customername} </td>
                    <td> {row.customercontactno} </td>
                    <td> {row.productname} </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  )
}

//Function used For payement

function Razorpay() {
  const Navigate = useNavigate()
  const [array, setarray] = useState({ Product: [] })
  const [payarray, setpayarray] = useState({ Product: [] })
  const [cartvalue, setcartvalue] = useState(0)

  // using useEffect to load data on page load

  useEffect(
    async () => {
      var response = await axios.get('http://localhost:3000/product/get')
      setarray({ Product: response.data })

    }, [])

  // using useEffect to ger product count on page load to store in cart button

  useEffect(
    async () => {
      var response = await axios.get('http://localhost:3000/product/gettotalproductcount')
      var res = response.data.map((row) => {
        setcartvalue(row.Totalcount)
      })

    }, [])

  // functions for razorpay source details

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  // functions for razorpay Payment page details

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    const options = {
      key: "rzp_test_V7MeZu3JfFTyWS", // Enter the Key ID generated from the Dashboard
      amount: "10000",
      currency: "INR",
      name: "Rajesh Corp.",
      description: "Test Transaction",
      order_id: "order_JYMqq259ELb3UR",
      handler: async function (response) {
        const data = {
          //orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        alert("Payment Succesfull");
        alert("Your Order Placed Succesfully");

      },

      prefill: {
        name: "Rajesh Solutions",
        email: "RajeshSolutions@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Soumya Dey Corporate Office",
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      {/* Home Button */}

      <div className="cartHomeRP">
        <button class="btn btn-outline-secondary" onClick={() => Navigate('/')} >  Home </button>
      </div>

      {/* Cart Button */}

      <span className="cartR" >
        <button class="btn btn-outline-secondary" size="sl" startIcon={<DeleteIcon />}
          onClick={() => Navigate('/Cart')}>
          <FontAwesomeIcon icon={faShoppingCart} /> Cart <span id="cv" className="Cnum">{cartvalue}</span> </button>
      </span> <br></br>

      {/* Top Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "110px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle1">
                Pay Through Razorpay...
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box> <br></br>

      {/* Table */}

      <Table className="tablerazor" striped bordered hover variant="primary" border='1'>
        <thead>
          <tr>
            <td> Product Name </td>
            <td> Product company </td>
            <td> Product price </td>
            <td> Quantity </td>
            <td> From Date </td>
            <td> To Date </td>
            <td>Total Amount</td>
          </tr>
        </thead>
        <tbody>
          {array.Product.map((row) => (
            <tr key={row.id}>
              <td> {row.ProductName} </td>
              <td> {row.Productcompany} </td>
              <td> {row.Productprice} </td>
              <td> {row.Quantity}</td>
              <td> {row.FromDate}</td>
              <td> {row.ToDate}</td>
              <td>{row.TotalAMount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pay">
        <header className="App-header">
          <button class="btn btn-outline-success" onClick={displayRazorpay}>
            Pay
          </button>
        </header>
      </div>
    </>
  );
}

// Function used for Dashboard Page

function Dashboard() {
  const Navigate = useNavigate();
  // to store datas array used

  const [array, setarray] = useState({ Product: [] })

  // to store cartvalue  

  const [cartvalue, setcartvalue] = useState(0)

  // to disable add to cart button on click

  const [disable1, setDisable1] = React.useState(false);
  const [disable2, setDisable2] = React.useState(false)
  const [disable3, setDisable3] = React.useState(false)
  const [disable4, setDisable4] = React.useState(false)
  const [disable5, setDisable5] = React.useState(false)
  const [disable6, setDisable6] = React.useState(false)

  // using useEffect to get data on page load

  useEffect(
    async () => {
      var response = await axios.get('http://localhost:3000/product/gettotalproductcount')
      var res = response.data.map((row) => {
        setcartvalue(row.Totalcount)
      })
    }, [])


  // below function used for posting datas during Add to cart button pressed

  const IncreaseValue = async (e) => {
    var button = document.querySelector('#B1')

    // If atomos's Add to cart button clicked following if condition take place

    if (e.target.name === 'Atomos') {

      // getting quantity value

      var input = document.querySelector('#input1').value

      // Posting datas on database

      var post = await axios.post('http://localhost:3000/product/post', {
        ProductName: "Shogun Monitor",
        Productcompany: "Atomos",
        Productprice: 50000,
        Quantity: input,
        Hours: "",
        TotalAMount: input * 50000
      })

      // Pushing fetched data to Product Array

      var Product = [...array.Product];
      Product.push(post.data);
      setarray({ Product });

      // to make add to cart button disable

      setDisable1(true)

      // to get posted data count and pushing it to cartvalue 

      var response = await axios.get('http://localhost:3000/product/gettotalproductcount')
      var res = response.data.map((row) => {
        setcartvalue(row.Totalcount)
      })
    }

    // If light's Add to cart button clicked following if condition take place

    else if (e.target.name === 'light') {

      // getting quantity value

      var input = document.querySelector('#input2').value

      // Posting datas on database

      var post = await axios.post('http://localhost:3000/product/post', {
        ProductName: "Baby Light",
        Productcompany: "Canon",
        Productprice: 5000,
        Quantity: input,
        Hours: "",
        TotalAMount: input * 5000
      })

      // Pushing fetched data to Product Array

      var Product = [...array.Product];
      Product.push(post.data);
      setarray({ Product });

      // to make add to cart button disable

      setDisable2(true)

      // to get posted data count and pushing it to cartvalue

      var response = await axios.get('http://localhost:3000/product/gettotalproductcount')
      var res = response.data.map((row) => {
        setcartvalue(row.Totalcount)
      })

    }

    // If stand's Add to cart button clicked following if condition take place

    else if (e.target.name === 'stand') {

      // getting quantity value

      var input = document.querySelector('#input3').value

      // Posting datas on database

      var post = await axios.post('http://localhost:3000/product/post', {
        ProductName: "Backdrop Stand",
        Productcompany: "Epson",
        Productprice: 10000,
        Quantity: input,
        Hours: "",
        TotalAMount: input * 10000
      })

      // Pushing fetched data to Product Array

      var Product = [...array.Product];
      Product.push(post.data);
      setarray({ Product });

      // to make add to cart button disable

      setDisable3(true)

      // to get posted data count and pushing it to cartvalue

      var response = await axios.get('http://localhost:3000/product/gettotalproductcount')
      var res = response.data.map((row) => {
        setcartvalue(row.Totalcount)
      })
    }

    // If monopad's Add to cart button clicked following if condition take place

    else if (e.target.name === 'monopad') {

      // getting quantity value

      var input = document.querySelector('#input4').value

      // Posting datas on database

      var post = await axios.post('http://localhost:3000/product/post', {
        ProductName: "Monopad",
        Productcompany: "Benro",
        Productprice: 2000,
        Quantity: input,
        Hours: "",
        TotalAMount: input * 2000
      })

      // Pushing fetched data to Product Array

      var Product = [...array.Product];
      Product.push(post.data);
      setarray({ Product });

      // to make add to cart button disable

      setDisable4(true)

      // to get posted data count and pushing it to cartvalue

      var response = await axios.get('http://localhost:3000/product/gettotalproductcount')
      var res = response.data.map((row) => {
        setcartvalue(row.Totalcount)
      })

    }

    // If tripod's Add to cart button clicked following if condition take place

    else if (e.target.name === 'tripod') {

      // getting quantity value

      var input = document.querySelector('#input5').value

      // Posting datas on database

      var post = await axios.post('http://localhost:3000/product/post', {
        ProductName: "Tripod",
        Productcompany: "Benro",
        Productprice: 5000,
        Quantity: input,
        Hours: "",
        TotalAMount: input * 5000
      })

      // Pushing fetched data to Product Array

      var Product = [...array.Product];
      Product.push(post.data);
      setarray({ Product });

      // to make add to cart button disable

      setDisable5(true)

      // to get posted data count and pushing it to cartvalue

      var response = await axios.get('http://localhost:3000/product/gettotalproductcount')
      var res = response.data.map((row) => {
        setcartvalue(row.Totalcount)
      })
    }

    // If camera's Add to cart button clicked following if condition take place

    else if (e.target.name === 'camera') {

      // getting quantity value

      var input = document.querySelector('#input6').value

      // Posting datas on database

      var post = await axios.post('http://localhost:3000/product/post', {
        ProductName: "Camera",
        Productcompany: "canon",
        Productprice: 45000,
        Quantity: input,
        Hours: "",
        TotalAMount: input * 45000
      })

      // Pushing fetched data to Product Array

      var Product = [...array.Product];
      Product.push(post.data);
      setarray({ Product });

      // to make add to cart button disable

      setDisable6(true)

      // to get posted data count and pushing it to cartvalue

      var response = await axios.get('http://localhost:3000/product/gettotalproductcount')
      var res = response.data.map((row) => {
        setcartvalue(row.Totalcount)
      })
    }

    // to move to top of page after clicking Add to Cart Button 

    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  return (
    <>

      {/* contact us button */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <div className="topgrid">
              <Grid container spacing={2}>
                <Grid className='home' >
                  <button class="btn btn-outline-secondary" onClick={() => Navigate('/contactus')} >  Contact Us </button>
                </Grid>

                {/* cart button */}

                <div className="cart">
                  <Grid >
                    <button id="cartbtn" class="btn btn-outline-secondary" size="sl" startIcon={<DeleteIcon />}
                      onClick={() => Navigate('/Cart')}>
                      <FontAwesomeIcon icon={faShoppingCart} /> Cart <span id="cv" className="Cnum">{cartvalue}</span>
                    </button>
                  </Grid>

                  {/* Log Out button */}

                </div>
                <div className="cartHomeDp">
                  <button class="btn btn-outline-secondary" onClick={() => Navigate('/')} >  Log Out </button>
                </div>
              </Grid>
            </div>
          </div>
        </div>
      </div>
      <br></br>

      {/* Top Grid */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar style={{ height: "300px" }} className="color">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <div className="fontstyle1">
                      Products For Rental<br></br>
                    </div>
                    <div className="fontstyle2">
                      Don't need to buy a product anymore JUST Rent It !!!!
                    </div>
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div>
      <br></br>

      {/* product cards */}

      {/* Atomos Shogun Monitor card */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <Grid container spacing={7} className="grid" >
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 300 }}>

                  <CardMedia
                    component="img"
                    height="194"
                    image="monitor.jpg"
                    alt="Paella dish"
                  />

                  <CardContent style={{ height: "150px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="fontstyle3">
                        Atomos Shogun Monitor
                      </div>
                      <div className="fontstyle4">
                        <span>7 hours</span> <FaRupeeSign /> 1500
                      </div><br></br>
                      <div>
                        <input type="number" id="input1" placeholder="Quantity"></input>
                      </div>
                    </Typography>
                  </CardContent>

                  <CardActions >
                    <div className="Button">
                      <button onClick={(e) => IncreaseValue(e)} id='B1' name="Atomos" disabled={disable1} class="btn btn-outline-secondary"  >Add To Cart</button>{' '}
                    </div>
                  </CardActions>
                </Card>
              </Grid>

              {/*  Baby light card */}

              <Grid item xs={4}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image="light.jpg"
                    alt="Paella dish"
                  />

                  <CardContent style={{ height: "150px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="fontstyle3">
                        Baby light
                      </div>
                      <div className="fontstyle4">
                        <span>7 Hours</span> <FaRupeeSign /> 500
                      </div><br></br>
                      <div>
                        <input type="number" id="input2" placeholder="Quantity"></input> <br></br>
                      </div>
                    </Typography>
                  </CardContent>

                  <CardActions >
                    <div className="Button">
                      <button onClick={(e) => IncreaseValue(e)} id='B1' name="light" disabled={disable2} class="btn btn-outline-secondary">Add To Cart</button>{' '}
                    </div>
                  </CardActions>
                </Card>
              </Grid>

              {/*  Backdrop Stand card */}

              <Grid item xs={4}>
                <Card sx={{ maxWidth: 300 }}>

                  <CardMedia
                    component="img"
                    height="194"
                    image="stand.jpg"
                    alt="Paella dish"
                  />

                  <CardContent style={{ height: "150px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="fontstyle3">
                        Backdrop Stand
                      </div>
                      <div className="fontstyle4">
                        7 Hours - <FaRupeeSign /> 500
                      </div><br></br>
                      <div>
                        <input type="number" id="input3" placeholder="Quantity"></input> <br></br>
                      </div>
                    </Typography>
                  </CardContent>

                  <CardActions >
                    <div className="Button">
                      <button onClick={(e) => IncreaseValue(e)} id='B1' name="stand" disabled={disable3} class="btn btn-outline-secondary">Add To Cart</button>{' '}
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <br></br>


      {/*  Benro Monopad card */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">

            <Grid container spacing={7} className="grid1" >
              <Grid item xs={4}>
                <Card sx={{ maxWidth: 300 }}>

                  <CardMedia
                    component="img"
                    height="194"
                    image="monopad.jpg"
                    alt="Paella dish"
                  />


                  <CardContent style={{ height: "150px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="fontstyle3">
                        Benro Monopad
                      </div>
                      <div className="fontstyle4">
                        <span>7 hours</span> <FaRupeeSign /> 150
                      </div><br></br>
                      <div>
                        <input type="number" id="input4" placeholder="Quantity"></input> <br></br>
                      </div>
                    </Typography>
                  </CardContent>

                  <CardActions >
                    <div className="Button">
                      <button onClick={(e) => IncreaseValue(e)} id='B1' name="monopad" disabled={disable4} class="btn btn-outline-secondary">Add To Cart</button>{' '}
                    </div>
                  </CardActions>
                </Card>
              </Grid>

              {/*  Benro Photo Tripod card */}

              <Grid item xs={4}>
                <Card sx={{ maxWidth: 300 }}>

                  <CardMedia
                    component="img"
                    height="194"
                    image="benro tripod.jpg"
                    alt="Paella dish"
                  />

                  <CardContent style={{ height: "150px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="fontstyle3">
                        Benro Photo Tripod
                      </div>
                      <div className="fontstyle4">
                        <span>7 hours</span> <FaRupeeSign /> 300
                      </div><br></br>
                      <div>
                        <input type="number" id="input5" placeholder="Quantity"></input> <br></br>
                      </div>
                    </Typography>
                  </CardContent>

                  <CardActions >
                    <div className="Button">
                      <button onClick={(e) => IncreaseValue(e)} id='B1' name="tripod" disabled={disable5} class="btn btn-outline-secondary">Add To Cart</button>{' '}
                    </div>
                  </CardActions>
                </Card>
              </Grid>

              {/*   Camera card */}

              <Grid item xs={4}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardMedia
                    component="img"
                    height="194"
                    image="camera.jpg"
                    alt="Paella dish"
                  />
                  <CardContent style={{ height: "150px" }}>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="fontstyle3">
                        Camera
                      </div>
                      <div className="fontstyle4">
                        7 Hours - <FaRupeeSign /> 2000
                      </div><br></br>
                      <div>
                        <input type="number" id="input6" placeholder="Quantity"></input> <br></br>
                      </div>
                    </Typography>
                  </CardContent>
                  <CardActions >
                    <div className="Button">
                      <button onClick={(e) => IncreaseValue(e)} id='B1' name="camera" disabled={disable6} class="btn btn-outline-secondary">Add To Cart</button>{' '}
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
      <br></br>

      {/* Bottom Grid */}

      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar style={{ height: "150px" }} className="color">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
              <div className="fontstyle2">
                Copyright © Your Website 2022
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

// Function used for cart page

function Cart() {

  // calling navigation function for navigation purpose

  const Navigate = useNavigate();

  // array to store fetched datas

  const [array, setarray] = useState({ Product: [] })

  // array to store form values

  const [formvalue, setformvalue] = useState({
    Quantity: "",
    FromDate: "",
    ToDate: "",
    _id: ''
  })

  // initially to disable checkout button to avoid user to navigate payement untill fill datas 

  const [disablechkout, setdisablechkout] = useState(true)

  // using useEffect to load datas on page load

  useEffect(
    async () => {
      var response = await axios.get('http://localhost:3000/product/get')
      setarray({ Product: response.data })
      console.log(response.data)
    }, [])

  // validate functions used by formik for validation & error throwing purpose

  const validate = (formData) => {
    var errors = {};
    if (formData.Quantity == '') errors.Quantity = 'Quantity is Required';
    if (formData.FromDate == '') errors.FromDate = 'From Date is Required';
    if (formData.ToDate == '') errors.ToDate = 'To Date is Required';
    return errors;
  };

  // function used for updating datas to database on Add/Edit Button click

  const Update = async (_id) => {

    //getting values from textfield to update

    var valQ = document.querySelector('#ctextQ').value
    var FDate = document.querySelector('#FDate').value
    var TDate = document.querySelector('#TDate').value

    // if textfield is empty on Add/Edit Button click following if condtion work & through alert to user to fill the datas

    if (!FDate, !TDate, !valQ) {
      alert('Please Enter Quantity & Date Details, After entering click Add/Edit Button To Add')
    }

    // if user entered data on text field and by clicking Add/Edit button following else condtion works to update data on database

    else {
      //filtering datas to get datas on which row user click Add/Edit button -

      var selectedData = await array.Product.filter((row) => row._id == _id)[0]
      

      //Update

      var response = await axios.put(`http://localhost:3000/product/update/${_id}`,
        {
          ToDate: selectedData.ToDate,
          Productcompany: selectedData.Productcompany,
          Productprice: selectedData.Productprice,
          Quantity: valQ,
          TotalAMount: valQ * selectedData.Productprice,
          FromDate: FDate,
          ToDate: TDate,
        })

      var response = await axios.get('http://localhost:3000/product/get')
      console.log(response)
      await setarray({ Product: response.data })
      setformvalue({ Hours: '', Quantity: '', FromDate: "", ToDate: "" })

      // to activate disabled checkout button 

      setdisablechkout(false)

    }
  }

  // Delete function used to delete datas from database on clicking Remove from cart

  const Delete = async (_id) => {
    //Deleting data from table
    var response = await axios.delete(`http://localhost:3000/product/delete/${_id}`)
    var Product = array.Product.filter((row) => row._id !== _id)
    setarray({ Product })
  }

  // following funcitons used to setform values 

  const quantity = (e) => {
    setformvalue({ Quantity: e.target.value })
  }

  const FromDate = (e) => {
    setformvalue({ FromDate: e.target.value })
  }

  const ToDate = (e) => {
    setformvalue({ ToDate: e.target.value })
  }

  // formik submit function

  const submit = (e) => {
    e.preventDefault()
  }

  return (
    <>

      {/* Home Button */}

      <div className="cartHomeR">
        <button class="btn btn-outline-secondary" onClick={() => Navigate('/dashboard')} >  Home </button>
      </div>

      {/* Top Grid */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar style={{ height: "100px" }} className="color">
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} >
                    <div className="fontstyle1">
                      Check Out Page <br></br>
                    </div>
                  </Typography>
                </Toolbar>
              </AppBar>
            </Box>
          </div>
        </div>
      </div> <br></br>

      {/* Formik */}

      <Formik
        enableReinitialize
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => submit(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit
        }) => (
          <form className='form' onSubmit={handleSubmit}>

            {/* Quantity text field */}

            <div >
              <label>Quantity</label> &nbsp;
              <div className='input1' style={{ display: 'inline-block' }}>
                <div>
                  <input placeholder="Please enter Quantity" id="ctextQ" type="text"
                    name="Quantity"
                    value={values.Quantity}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='ctextQ' />
                </div>
              </div>
              <br />
              <span className='span' style={{ color: 'red' }}>
                {touched.Quantity && errors.Quantity}
              </span>
            </div>
            <br></br>

            {/* From Date */}

            <div>
              <label>From Date</label> &nbsp;
              <div className='input2' style={{ display: 'inline-block' }}>
                <div>
                  <input placeholder="Please enter FromDate" id="FDate" type="datetime-local"
                    name="FromDate"
                    value={values.FromDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='cinputFrom' />
                </div>
              </div>
              <br />
              <span className='span' style={{ color: 'red' }}>
                {touched.FromDate && errors.FromDate}
              </span>
            </div>
            <br></br>

            {/* To Date */}

            <div>
              <label>To Date</label> &nbsp;
              <div className='input3' style={{ display: 'inline-block' }}>
                <div>
                  <input placeholder="Please enter ToDate" id="TDate" type="datetime-local"
                    name="ToDate"
                    value={values.ToDate}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className='cinputTo' />
                </div>
              </div>
              <br />
              <span className='span' style={{ color: 'red' }}>
                {touched.ToDate && errors.ToDate}
              </span>
            </div>
            <br></br>
            <br></br>
          </form>
        )}
      </Formik>

      <div>
        <p className="p">* Please Enter Hours & Quantity After Click Add/Edit Button in Table To Add Data</p>
      </div>

      <div>
      </div>

      {/* Table */}

      <div class="container-fluid">
        <div class="row">
          <div class="col-75">
            <Table striped bordered hover variant="primary" border='1'>
              <thead>
                <tr>
                  <td> Product Name </td>
                  <td> Product company </td>
                  <td> Product price </td>
                  <td> Quantity </td>
                  <td>Total Amount</td>
                  <td> From Date</td>
                  <td> To Date</td>
                  <td> Actions </td>
                </tr>
              </thead>
              <tbody>
                {array.Product.map((row) => (
                  <tr key={row.id}>
                    <td> {row.ProductName} </td>
                    <td> {row.Productcompany} </td>
                    <td> {row.Productprice} </td>
                    <td> {row.Quantity}</td>
                    <td>{row.TotalAMount}</td>
                    <td>{row.FromDate}</td>
                    <td>{row.ToDate}</td>
                    <td> <Button variant="primary" onClick={() => Update(row._id)} >Add/Edit Date & Quantity</Button> &nbsp; &nbsp; &nbsp;
                      <Button variant="primary" onClick={() => Delete(row._id)} >Remove From Cart</Button></td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <div>
        <button id="rzp-button1" disabled={disablechkout} onClick={() => Navigate('/razorpay')} class="btn btn-outline-secondary" >CheckOut</button>
      </div>

    </>
  );
}

// function for contactus page

function Contactus() {

  // Navigate function for navigation through pages

  const Navigate = useNavigate();

  // array to store fetched datas from database

  const [array, setarray] = useState({ Product: [] })

  // formik initial value

  const [formvalue, setformvalue] = useState({
    customername: '',
    customercontactno: '',
    productname: '',
    id: '',
  })

  // formik validate function

  const validate = (formData) => {
    var errors = {};
    if (formData.customername == '') errors.customername = 'Customet Name is Required';
    if (formData.customercontactno == '') errors.customercontactno = 'Customer Contact No. is Required';
    if (formData.productname == '') errors.productname = 'Product Name is Required';
    if (formData.Gender == '') errors.Gender = 'Gender is Required';
    return errors;
  };

  // formik submit function

  const submit = async (formData) => {
    //on submit posting datas to database - Create
    var post = await axios.post('http://localhost:3000/product/contactus', {
      customername: formData.customername,
      customercontactno: formData.customercontactno,
      productname: formData.productname
    })

    // pushing fetched datas to array 

    var Product = [...array.Product];
    Product.push(post.data);
    setarray({ Product });
    setformvalue({ customername: '', customercontactno: '', productname: '' })
  }

  return (
    <>

      {/* Home Buttton */}

      <div class='container'>
        <div class="row">
          <div class="col-25">
            <div className="cartHome">
              <button class="btn btn-outline-secondary" onClick={() => Navigate('/dashboard')} >  Home </button>
            </div>
          </div>
        </div>
      </div>

      {/* Top Gird */}

      <div >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar >
              <span className="Box">Contact Us For Any Product Related Queries</span>
              <span className="Cntno">Contact No:+91-9999999999</span>
              <span className="cntmail">Contact Mail - XXXXXXX@gmail.com </span>
            </Toolbar>
          </AppBar>
        </Box>
      </div>

      {/* Formik */}

      <Formik
        enableReinitialize
        initialValues={formvalue}
        validate={(formData) => validate(formData)}
        onSubmit={(formData) => submit(formData)}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form className='form' onSubmit={handleSubmit}>

            {/* Customer Name */}

            <div >
              <label>Customer Name</label> &nbsp;
              <div className='input1' style={{ display: 'inline-block' }}>
                <Box component="form" noValidate autoComplete="off">
                  <FormControl sx={{ width: '35ch' }}>
                    <OutlinedInput placeholder="Please enter customername" type="text"
                      name="customername"
                      value={values.customername}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='input1' />
                  </FormControl>
                </Box>
              </div>
              <br />
              <span className='span' style={{ color: 'red' }}>
                {touched.customername && errors.customername}
              </span>
            </div>
            <br></br>

            {/* Customer Contact No. */}

            <div>
              <label>Customer Contact No.</label> &nbsp;
              <div className='input2' style={{ display: 'inline-block' }}>
                <Box component="form" noValidate autoComplete="off">
                  <FormControl sx={{ width: '35ch' }}>
                    <OutlinedInput placeholder="Please enter customercontactno" type="text"
                      name="customercontactno"
                      value={values.customercontactno}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='input2' />
                  </FormControl>
                </Box>
              </div>
              <br />
              <span className='span' style={{ color: 'red' }}>
                {touched.customercontactno && errors.customercontactno}
              </span>
            </div>
            <br></br>

            {/* Product Name for enquiry */}

            <div>
              <label>Product Name for enquiry</label> &nbsp;
              <div className='input3' style={{ display: 'inline-block' }}>
                <Box component="form" noValidate autoComplete="off">
                  <FormControl sx={{ width: '35ch' }}>
                    <OutlinedInput placeholder="Please enter productname" type="text"
                      name="productname"
                      value={values.productname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className='input3' />
                  </FormControl>
                </Box>
              </div>
              <br />
              <span className='span' style={{ color: 'red' }}>
                {touched.productname && errors.productname}
              </span>
            </div>
            <br></br>


            {/*Submit button */}

            <div className='Submitbutton'>
              <Button type="submit" variant="primary" disabled={isSubmitting} >submit</Button> &nbsp;
            </div>
            <br></br>
          </form>
        )}
      </Formik>
    </>
  )
}



