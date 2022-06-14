import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const SignUp = () => {
  const [signUpData, setSignUpData] = useState({});

  const navigate = useNavigate();

  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newSignUpData = { ...signUpData };
    newSignUpData[field] = value;
    setSignUpData(newSignUpData);
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    const regularExpression = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    if (signUpData.phoneNumber.length !== 10) {
      toast.error("Phone number should be 10 Digit!");
      return;
    }
    if (!regularExpression.test(signUpData.password)) {
      toast.error(
        "password should contain atleast one number, one Capital letters, one small letters and one special character"
      );
      return;
    } else {
      axios
        .post("http://localhost:5000/candidates/create", signUpData, {
          headers: { "content-type": "application/json" },
        })
        .then((res) => {
          if (res.status === 200) {
            toast.success("registration Successfull!");
            navigate("/login");
          }
        })
        .catch((error) => {
          toast.error(error.response);
        });
    }
  };

  return (
    <div>
      <div
        className="card sign-in-box"
        style={{ width: "35rem", height: "80vh" }}
      >
        <div className="card-body">
          <h2 className="text-center fw-bold">Sign Up</h2>
          <div className="w-75 mx-auto mt-5">
            <form onSubmit={handleSignUpSubmit}>
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
                  htmlFor="exampleInputnumber"
                  className="form-label fw-bold"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  onBlur={handleOnBlur}
                  name="phoneNumber"
                  placeholder="enter your phone number"
                  className="form-control"
                  id="exampleInputnumber"
                />
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
                Already Registered? Please Login
              </Link>
              <div className="mb-3 text-center mt-5">
                <button type="submit" className="btn btn-primary btn-lg">
                  Sign Up
                </button>
              </div>
            </form>
            {/* {isLoading && <Loader />} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
