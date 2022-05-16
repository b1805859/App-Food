import Axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Helmet } from "react-helmet-async";
import { useContext, useEffect, useState } from "react";
import { Store } from "../Store";
import { toast } from "react-toastify";
import { getError } from "../utils";

export default function SignupScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const { data } = await Axios.post("/api/users/signup", {
        name,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      toast.error(getError(err));
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <div className="signin-card">
        <h1 className="my-3 signin-title">Sign Up</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label className="signin-subtitle">Name</Form.Label>
            <Form.Control className="signin-input" onChange={(e) => setName(e.target.value)} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label className="signin-subtitle">Email</Form.Label>
            <Form.Control
            className="signin-input"
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label className="signin-subtitle">Password</Form.Label>
            <Form.Control
            className="signin-input"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Group className="mb-3" controlId="confirmPassword">
              <Form.Label className="signin-subtitle">Confirm Password</Form.Label>
              <Form.Control
              className="signin-input"
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
          </Form.Group>
          <div className="mb-3">
            <Button className="btn-signin" type="submit">Sign Up</Button>
          </div>
          <div className="mb-3 signin-smalltext">
            Already have an account?{" "}
            <Link className="signin-link" to={`/signin?redirect=${redirect}`}>Sign-In</Link>
          </div>
        </Form>
      </div>
    </Container>
  );
}
