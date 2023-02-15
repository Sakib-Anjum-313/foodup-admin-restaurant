import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";

const LoginPage = () => {
  const {
    user,
    setUser,
    logInUser,
    logOutUser,
    isLogIn,
    setIsLogIn,
    setLoading,
    checkLogIn,
    setCheckLogIn,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  let location = useLocation();

  const [isAdmin, setIsAdmin] = useState(false);
  const [isResAdmin, setIsResAdmin] = useState(false);

  // location = { state: {from :''} };

  // let verifiedId = location.state;
  // console.log(verifiedId);

  // const from = location.state?.from?.pathname || '/';

  const handleUserRole = (email, password) => {
    fetch(`http://localhost:5000/checkingUserRole/${email}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.Role === "ResAdmin") {
          setIsAdmin(false);
          setIsResAdmin(true);
          logInUser(email, password)
            .then((result) => {
              console.log(result);
              setIsLogIn(true);
              setCheckLogIn(false);

              navigate(`/restaurantAdmin`);
              setLoading(false);
            })
            .catch((error) => {
              console.error(error);
            });
        } else if (data.Role === "Admin") {
          logInUser(email, password).then((result) => {
            console.log(result);
            setIsLogIn(true);
            setCheckLogIn(false);
            navigate("/adminPage");
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setCheckLogIn(true);
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (isLogIn) {
      // setLoading(true);
      setCheckLogIn(true);

      logOutUser()
        .then(() => {
          setLoading(true);
        })
        .catch((error) => {
          console.error(error);
        });

      handleUserRole(email, password);
    } else {
      handleUserRole(email, password);
    }
  };



  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>

          <Link className="mr-6" to={"/adminPage"}>
            <button className="btn btn-success">Admin</button>
          </Link>
          <Link to={"/restaurantAdmin"}>
            <button className="btn btn-warning">Res Admin</button>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100"
        >
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                name="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                name="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
              <label className="label">
                <Link
                  to={"/register"}
                  className="label-text-alt link link-hover"
                >
                  Register the Restauarant Admin
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              {checkLogIn ? (
                <button className="btn btn-primary loading hover:bg-sky-600">
                  LOGIN
                </button>
              ) : (
                <button className="btn btn-primary">LOGIN</button>
              )}
              {/* <button type="submit" className="btn btn-primary">
                {!checkLogIn && (
                  <span className="btn btn-primary border-none loading"></span>
                )}
                Login
              </button> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
