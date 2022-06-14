import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const onSubmit = (data, event) => {
    event.preventDefault();

    axios
      .post("http://localhost:5000/candidates/create", data, {
        headers: { "content-type": "application/json" },
      })
      .then((res) => {
        if (res.status === 200) {
          event.target.reset();
          toast.success("New Candidate Created!");
          navigate("/candidates");
        }
      })
      .catch((error) => {
        toast.error(error.response);
        console.log(error.response);
      });
  };

  return (
    <div>
      <div className="card mx-auto mt-3" style={{ width: "80%" }}>
        <div className="card-body p-5">
          <h3 className=" fw-bold">Create Candidate</h3>
          <div className="mx-auto mt-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="input-group d-flex justify-content-around mb-4">
                <div>
                  <label
                    htmlFor="exampleInputName"
                    className="form-label fw-bold"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="enter your name"
                    className="form-control candidate-form-input"
                    id="exampleInputName"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="exampleInputAddress"
                    className="form-label fw-bold"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    {...register("address")}
                    placeholder="enter your address"
                    className="form-control candidate-form-input"
                    id="exampleInputAddress"
                    required
                  />
                </div>
                {/* <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div> */}
              </div>

              <div className="input-group d-flex justify-content-around mb-4">
                <div>
                  <label
                    htmlFor="exampleInputDate"
                    className="form-label fw-bold"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    {...register("birthDate")}
                    placeholder="enter your Date of Birth"
                    className="form-control candidate-form-input"
                    id="exampleInputDate"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="exampleInputEmail1"
                    className="form-label fw-bold"
                  >
                    State
                  </label>
                  <select
                    {...register("state")}
                    className="form-select candidate-form-input"
                    required
                  >
                    <option value="1">Shortlist</option>
                    <option value="2">Rejected </option>
                  </select>
                </div>
                {/* <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div> */}
              </div>

              <div className="input-group d-flex justify-content-around mb-4">
                <div>
                  <label
                    htmlFor="exampleInputAge"
                    className="form-label fw-bold"
                  >
                    Age
                  </label>
                  <input
                    type="number"
                    {...register("age")}
                    placeholder="enter your age"
                    className="form-control candidate-form-input"
                    id="exampleInputAge"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="exampleInputPin"
                    className="form-label fw-bold"
                  >
                    Pin Code
                  </label>
                  <input
                    type="number"
                    {...register("code")}
                    placeholder="enter your 6-digit pin code"
                    className="form-control candidate-form-input"
                    id="exampleInputPin"
                    required
                  />
                </div>
                {/* <div id="emailHelp" class="form-text">
                We'll never share your email with anyone else.
              </div> */}
              </div>

              <div className="d-flex justify-content-end mt-5">
                <div className="" style={{ width: "29rem" }}>
                  <Link to="/candidates">
                    <button
                      type="button"
                      className="btn btn-outline-primary btn-lg px-5"
                    >
                      Cancel
                    </button>
                  </Link>
                  <input
                    type="submit"
                    value="Create"
                    className="btn btn-primary btn-lg px-5 ms-5"
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create;
