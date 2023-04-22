import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useUserAuth } from "./UserAuthContext";
import { auth } from "./firebase";
import { Navbar, Nav, Container } from "react-bootstrap";

function NavbarFun() {
  const userr = auth.currentUser;
  const { logOut } = useUserAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Navbar bg="white" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/"></Navbar.Brand>
          {userr && (
            <>
              <Nav>
                <div className="mt-3"></div>
              </Nav>
            </>
          )}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Nav className="ms-auto"></Nav>
          <Nav className="flex flex-row justify-between">
            {userr && (
              <>
                <Nav className="flex mr-2">
                  <button onClick={handleLogout} className="text-indigo-700">
                    Sign Out
                  </button>
                </Nav>
                <Nav className="flex mr-2">
                  <button
                    onClick={() => navigate("/UploadItemPage")}
                    className="text-indigo-700"
                  >
                    Upload Item
                  </button>
                </Nav>
                <Nav className="flex mr-2">
                  <button
                    onClick={() => navigate("/ClothesLibrary")}
                    className="text-indigo-700"
                  >
                    Item Library
                  </button>
                </Nav>
                <Nav className="flex mr-2">
                  <button
                    onClick={() => navigate("/Match")}
                    className="text-indigo-700"
                  >
                    Matching Page
                  </button>
                </Nav>
              </>
            )}
            {!userr && (
              <>
                <Nav className="flex-items mr-2">
                  <Link to="/SignIn">Sign In</Link>
                </Nav>
                <Nav className="flex">
                  <Link to="/SignUp">Sign Up</Link>
                </Nav>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

export default NavbarFun;
