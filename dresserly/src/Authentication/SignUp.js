import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserAuth } from "../UserAuthContext.js";
import { auth, db } from "../firebase.js";
import { collection, setDoc, doc } from "firebase/firestore";
import { Container, Form, Button, Modal } from "react-bootstrap";

function SignUp() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { Registration } = useUserAuth();

	const [showModal, setShowModal] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [profileData, setProfileData] = useState({
		firstName: "",
		lastName: "",
	});

	function update(e) {
		const { name, value } = e.target;
		setProfileData({ ...profileData, [name]: value });
	}
	const navigate = useNavigate();

	/**
	 *
	 * @param {*} e
	 */
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await Registration(email, password).then((word) => {
				setDoc(doc(collection(db, "users_information"), auth.currentUser.uid), {
					firstName: profileData.firstName,
					lastName: profileData.lastName,
					email: email,
				});
			});
			// navigate them to the main page or smth
			navigate("/");
		} catch (error) {
			console.log(error.message);
			setErrorMessage(error.message);
			setShowModal(true);
		}
	};

	//This closes the modal on the user's screen.
	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<Container fluid>
				<div>
					<p className="text-center slogan pt-4 pb-3">Welcome to Dresserly</p>
				</div>
				<div className="text-center containerForm">
					<Form onSubmit={handleSubmit}>
						<Form.Text className="sign center">Sign Up</Form.Text>
						<center>
							<Form.Group className="mb-3 mt-4" controlId="formFirstName">
								<Form.Control
									className="input_box"
									type="text"
									name="firstName"
									onChange={update}
									value={profileData.firstName}
									placeholder="First Name"
									required
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formLastName">
								<Form.Control
									className="input_box"
									type="text"
									name="lastName"
									onChange={update}
									value={profileData.lastName}
									placeholder="Last Name"
									required
								/>
							</Form.Group>
							<Form.Group className="mb-3 mt-4" controlId="formBasicEmail">
								<Form.Control
									className="input_box"
									type="email"
									placeholder="Enter email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
								/>
							</Form.Group>

							<Form.Group className="mb-3" controlId="formBasicPassword">
								<Form.Control
									className="input_box"
									type="password"
									placeholder="Password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
								/>
							</Form.Group>
						</center>
						<Button className="sign_button mb-3 mt-4" type="submit">
							Sign Up
						</Button>
						<br></br>
						<Form.Text className="text-muted">
							Already have an account?{" "}
							<a href="/SignIn" className="join">
								Sign In
							</a>
						</Form.Text>
					</Form>
				</div>
				<MyModal
					showModal={showModal}
					handleCloseModal={handleCloseModal}
					errorMessage={errorMessage}
				/>
			</Container>
		</>
	);
}

//This sets a custom message depending on the error that is captured upon trying to sign-up.
const MyModal = ({ showModal, handleCloseModal, errorMessage }) => {
	if (errorMessage) {
		let message = ""; //Error message variable is instantiated.

		//The appropriate message is assigned.

		if (
			errorMessage ===
			"Firebase: Password should be at least 6 characters (auth/weak-password)."
		) {
			message =
				"Your password should be at least 6 characters. Please try again.";
		} else {
			message = "This email is already in use. Please enter a different one.";
		}

		//Here we return the modal to the user.
		return (
			<Modal show={showModal} onHide={handleCloseModal}>
				<Modal.Header closeButton>
					<Modal.Title>Sign-Up Error</Modal.Title>
				</Modal.Header>
				<Modal.Body>{message}</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						style={{ borderRadius: "20px" }}
						onClick={handleCloseModal}
					>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		);
	}
};

export default SignUp;
