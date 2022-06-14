import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ConfirmationAlert from "../../../Shared/ConfirmationAlert/ConfirmationAlert";
import Loader from "../../../Shared/Loader/Loader";

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://shrouded-shelf-19560.herokuapp.com/candidates")
      .then((res) => {
        if (res.status === 200) {
          setCandidates(res.data);
          setLoading(false);
        }
      })
      .catch((error) => {
        toast.error(error.response);
      });
  }, []);

  const onDeleteHandler = (id) => {
    setSelectedId(id);
    ConfirmationAlert(() => handleDelete());
  };

  const handleDelete = () => {
    fetch(
      `https://shrouded-shelf-19560.herokuapp.com/candidate/delete/${selectedId}`,
      {
        method: "DELETE",
      }
    ).then((res) => {
      if (res.status === 200) {
        const updateCandidates = [...candidates];

        setCandidates(updateCandidates.filter((x) => x._id !== selectedId));
        toast.success("Candidate Delete successfully Done!");
      }
    });
  };

  let content;
  if (loading) content = <Loader />;
  else
    content = (
      <div className="card-body">
        <h2>Candidates List : {candidates.length}</h2>

        <div>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col"></th>
                <th className="text-center" scope="col">
                  Name
                </th>
                <th className="text-center" scope="col">
                  Date of Birth
                </th>
                <th className="text-center" scope="col">
                  Email
                </th>
                <th className="text-center" scope="col">
                  Result
                </th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {candidates.map((candidate, index) => (
                <tr className="text-center" key={index}>
                  <th>{index + 1}</th>
                  <td>{candidate.name}</td>
                  <td>{candidate.birthDate}</td>
                  <td>{candidate.email}</td>
                  <td>
                    <select className="form-select custom-select-style">
                      {candidate.state === "1" ? (
                        <>
                          <option selected>Shortlist</option>
                          <option>Rejected </option>
                        </>
                      ) : (
                        <>
                          <option>Shortlist</option>
                          <option selected>Rejected </option>
                        </>
                      )}
                    </select>
                  </td>
                  <td>
                    <span
                      className="ms-5 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(`/candidates/edit/${candidate._id}`)
                      }
                    >
                      <i className="fas fa-pen fa-1x"></i>
                    </span>
                    <span
                      className="ms-5 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => onDeleteHandler(candidate._id)}
                    >
                      <i className="fas fa-trash-alt"></i>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to="/candidates/create" style={{ textDecoration: "none" }}>
            + Add new Candidate
          </Link>
        </div>
      </div>
    );
  return (
    <div>
      <div className="card mx-auto" style={{ width: "95%", height: "100vh" }}>
        {content}
      </div>
    </div>
  );
};

export default Candidates;
