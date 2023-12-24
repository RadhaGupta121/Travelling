import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useCookies } from 'react-cookie';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function BasicExample() {
  const userData =useSelector((state) => state.userDetail);
  const[cookies,removeCookie]=useCookies([]);
   const navigate=useNavigate();
    const userId=(userData.value._id);
    console.log('this is in nav',userId);
    const Logout=()=>{
      removeCookie('token');
      navigate('/login');
  }
  return (
    <Navbar expand="lg" className="bg-body-tertiary" 
     style={{  background:'transparent', color:"black",backdropFilter:" blur(10px)"}}>
      <Container>
        <Navbar.Brand href="#home">TravelandShare</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
            {userId===undefined?(<>
              <Nav.Link as={Link} to="/login">Signin</Nav.Link>
            <Nav.Link as={Link} to="/register">Register</Nav.Link>

            </>):(<>
              <Nav.Link as={Link} to="/trendingtrip">Trending Trip</Nav.Link>
              <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/network">Network</Nav.Link>
            <Nav.Link as={Link} to="/triphistory">My Trip</Nav.Link>
            <button onClick={Logout} style={{width:"auto",border:"none",position:'absolute',top:"12px",right:"0"}}>LOGOUT</button>
             </>)}
           
           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;

