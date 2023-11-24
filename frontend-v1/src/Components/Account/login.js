import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const loginHandler = async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('/login', {
              username, password
          });
          
          navigate('/dashboard');
          console.log("berhasil login");
          console.log("Response :", response.data);
          
      } catch (error) {
          console.log(error.response.data.msg);
          setMsg(error.response.data.msg);
          setError(true);
      }
  }

  return (
    <div className="bg-gray-200 flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg w-1/4 bg-base-100 shadow-xl flex justify-center items-center " style={{ width: '50%' }}>
        <div className="card-body">
          <h2 className="card-title mb-4">Login</h2>
          <Form onSubmit={loginHandler}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="*******" onChange={(e) => setPassword(e.target.value)} required/>
            </Form.Group>

            {error ? (
              <Alert variant="danger">
                {msg}
              </Alert>
            ): null}

            <p className="subtitle">Belum memiliki akun? <Link to={'/registrasi'}>Registrasi</Link></p>
            <div className="d-grid gap-2">
              <Button variant="success" type="submit">Login</Button>{' '}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
