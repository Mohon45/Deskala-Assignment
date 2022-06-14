import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const [candidate, setCandidate] = useState([]);

  const navigate = useNavigate();
  let params = useParams();
  useEffect(() => {
    axios
      .get(`https://shrouded-shelf-19560.herokuapp.com/candidates/${params.id}`)
      .then((res) => {
        if (res.status === 200) {
          setCandidate(res.data);
        }
      })
      .catch((error) => {
        toast.error(error.response);
      });
  }, []);

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const address = event.target.address.value;
    const birthDate = event.target.birthDate.value;
    const state = event.target.state.value;
    const age = event.target.age.value;
    const code = event.target.code.value;

    const updateCandidate = { name, address, birthDate, state, age, code };

    fetch(
      `https://shrouded-shelf-19560.herokuapp.com/candidates/update/${params.id}`,
      {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(updateCandidate),
      }
    )
      .then((res) => {
        toast.success("Candidated Updated!");
        navigate("/candidates");
      })
      .catch((error) => {
        toast.error(error.response);
      });
  };

  const { address, age, birthDate, code, name, state } = candidate;
  return (
    <div>
      <div className="card mx-auto mt-3" style={{ width: "80%" }}>
        <div className="card-body p-5">
          <h3 className=" fw-bold">Edit Candidate</h3>
          <div className="mx-auto mt-5">
            <form onSubmit={onSubmitHandler}>
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
                    name="name"
                    value={name}
                    placeholder="enter your name"
                    className="form-control candidate-form-input"
                    id="exampleInputName"
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
                    // {...register("address")}
                    value={address}
                    name="address"
                    placeholder="enter your address"
                    className="form-control candidate-form-input"
                    id="exampleInputAddress"
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
                    // {...register("birthDate")}
                    name="birthDate"
                    value={birthDate}
                    placeholder="enter your Date of Birth"
                    className="form-control candidate-form-input"
                    id="exampleInputDate"
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
                    // {...register("state")}
                    name="state"
                    className="form-select candidate-form-input"
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
                    // {...register("age")}
                    name="age"
                    value={age}
                    placeholder="enter your age"
                    className="form-control candidate-form-input"
                    id="exampleInputAge"
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
                    // {...register("code")}
                    name="code"
                    value={code}
                    placeholder="enter your 6-digit pin code"
                    className="form-control candidate-form-input"
                    id="exampleInputPin"
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
                    value="Save"
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

export default Edit;
