import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DropdownButton, Dropdown, Image } from "react-bootstrap";
import { logout } from "../../actions/userActions";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.authState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout);
  };
  return (
    <>
      {/* <!-- Navigation--> */}
      <nav
        className="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top"
        id="mainNav"
      >
        <div className="container">
          <a className="navbar-brand" href="#">
          <Link  to="/" >MaxicabRide</Link>
            
          </a>
          <button
            className="navbar-toggler text-uppercase font-weight-bold bg-primary text-white rounded"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item mx-0 mx-lg-1">
                <a
                  className="nav-link py-3 px-0 px-lg-3 rounded"
                  href="#portfolio"
                >
                  Our Vehicles
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <a className="nav-link py-3 px-0 px-lg-3 rounded" href="#about">
                  Our Services
                </a>
              </li>
              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded"
                  to="/booknow"
                >
                  Book now
                </Link>
              </li>

              <li className="nav-item mx-0 mx-lg-1">
                <Link
                  className="nav-link py-3 px-0 px-lg-3 rounded"
                  to="/myprofile"
                >
                  {isAuthenticated ? (<figure className="avatar avatar-nav">
                      <Image
                        width="30rem"
                        src={user.avatar ?? "./images/default_avatar.png"}
                      />
                    </figure>) : null }
                 
                </Link>
              </li>

              

              <li className="">
              {isAuthenticated ? (
                <Dropdown className="d-flex flex-column">

                  <Dropdown.Toggle
                    id="dropdown-basic"
                    variant="default text-white pr-5"
                  >

                    


                    <span>{user.name}</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        navigate("/myprofile");
                      }}
                      className="text-dark"
                    >
                      Profile
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={logoutHandler}
                      className="text-danger"
                    >
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Link
                  to="/login"
                  class="btn btn-outline-primary my-2 my-sm-0 mx-5"
                >
                  Login
                </Link>
              )}
              </li>


              
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
