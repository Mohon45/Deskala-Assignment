import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [loginData, setLoginData] = useState({});
  const [filterdata, setFilterData] = useState([]);

  const navigate = useNavigate();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newLoginData = { ...loginData };
    newLoginData[field] = value;
    setLoginData(newLoginData);
  };
  useEffect(() => {
    axios
      .get("https://shrouded-shelf-19560.herokuapp.com/candidates")
      .then((res) => {
        if (res.status === 200) {
          setFilterData(res.data);
        }
      })
      .catch((error) => {
        toast.error(error.response);
      });
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    const query = filterdata.find(
      (item) =>
        item.email === loginData.email || item.password === loginData.password
    );
    if (query) {
      toast.success("Login Successfull!");
      navigate("/candidates");
    } else {
      toast.error("Email or password not match");
    }
  };

  return (
    <div>
      <div
        className="card sign-in-box"
        style={{ width: "35rem", height: "80vh" }}
      >
        <div className="card-body">
          <h2 className="text-center fw-bold">Login</h2>
          <div className="w-75 mx-auto mt-5">
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label
                  htmlFor="exampleInputEmail1"
                  className="form-label fw-bold"
                >
                  Email id
                </label>
                <input
                  type="email"
                  name="email"
                  onBlur={handleOnBlur}
                  placeholder="enter your email id"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
                {/* <div id="emailHelp" class="form-text">
              We'll never share your email with anyone else.
            </div> */}
              </div>

              <div className="mb-3">
                <label
                  htmlFor="exampleInputPassword1"
                  className="form-label fw-bold"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  onBlur={handleOnBlur}
                  placeholder="enter your password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <Link style={{ textDecoration: "none" }} to="/login">
                New User? Please Register
              </Link>
              <div className="mb-3 text-center mt-5">
                <button type="submit" className="btn btn-primary btn-lg">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
