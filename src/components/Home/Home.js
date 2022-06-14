import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <div className="card home-page">
        <h2 className="mx-auto my-5">Deskala Assignment Solution</h2>
        <div className="card-body home-page-body">
          {/* Task 1 */}
          <Link className="link-style" to="/sign-up">
            <div className="card" style={{ width: "18rem", height: "18rem" }}>
              <div className="card-body">
                <h1 className="text-center mt-5">Task-1</h1>
              </div>
            </div>
          </Link>

          {/* Task 2 */}
          <Link className="link-style" to="/candidates">
            <div className="card" style={{ width: "18rem", height: "18rem" }}>
              <div className="card-body">
                <h1 className="text-center mt-5">Task-2</h1>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
