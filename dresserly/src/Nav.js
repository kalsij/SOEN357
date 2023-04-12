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
					<Navbar.Collapse id="navbarScroll">
						<Nav className="ms-auto"></Nav>
						<Nav>
							{userr && (
								<>
									<Nav>
										<button onClick={handleLogout} className="logout_button">
											Sign Out
										</button>
									</Nav>
								</>
							)}
							{!userr && (
								<>
									<Nav>
										<Link to="/SignIn">Sign In</Link>
									</Nav>
									<Nav>
										<Link to="/SignUp">Sign Up</Link>
									</Nav>
								</>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>

			<Outlet />
		</>
	);
}

export default NavbarFun;
