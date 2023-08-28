import React from "react";
import StoreImage from "../assets/store.jpg";
import { Formik } from "formik";
import { MdError } from "react-icons/md";
import { TbBuildingStore } from "react-icons/tb";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../redux/reducers/auth";
import { asyncLoginAction } from "../redux/actions/auth";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is invalid"),
  password: Yup.string().required("Password is invalid"),
});

function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const errorMessage = useSelector((state) => state.auth.errorMessage);
  const [openEye, setOpenEye] = React.useState(false);

  const doLogin = async (values) => {
    dispatch(clearMessage());
    dispatch(asyncLoginAction(values));
  };

  React.useEffect(() => {
    if (token) {
      navigate("/products");
    }
  });

  return (
    <div className="flex justify-center items-center px-[3%] py-16 h-screen bg-base-100">
      <div className="flex w-[90%] h-full shadow-xl rounded-2xl overflow-hidden">
        <div className="hidden lg:block flex-2">
          <img
            className="w-full h-full object-cover"
            src={StoreImage}
            alt="store"
          />
        </div>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={doLogin}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form
              onSubmit={handleSubmit}
              className="flex-1 flex flex-col py-10 px-[5%] gap-10 justify-center bg-white"
            >
              <span className="text-primary text-3xl font-bold w-full justify-center items-center flex gap-1">
                <TbBuildingStore size={40} className="drop-shadow-md" />
                Klontong
              </span>
              {errorMessage && (
                <div className="flex gap-2 w-full justify-center items-center">
                  <MdError size={20} className="text-error" />
                  <p className="text-error font-semibold">{errorMessage}</p>
                </div>
              )}
              <div className="flex flex-col gap-3">
                <p className="text-black">Login to your account</p>
                <div className="form-control w-full">
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="input input-bordered bg-white border-accent hover:border-secondary w-full text-black"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.email}
                      </span>
                    </label>
                  )}
                </div>
                <div className="relative form-control w-full">
                  <input
                    name="password"
                    type={!openEye ? "password" : "text"}
                    placeholder="Enter your password"
                    className="input input-bordered bg-white border-accent hover:border-secondary w-full text-black"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.password}
                      </span>
                    </label>
                  )}
                  {!openEye ? (
                    <button
                      onClick={() => setOpenEye(true)}
                      className="absolute right-4 top-4"
                    >
                      <BsEye className="text-accent" size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setOpenEye(false)}
                      className="absolute right-4 top-4"
                    >
                      <BsEyeSlash className="text-accent" size={20} />
                    </button>
                  )}
                </div>
                <Link
                  to="/forgot-password"
                  className="text-secondary hover:text-primary font-semibold"
                >
                  Forgot Password?
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary normal-case text-lg font-semibold text-neutral"
                >
                  Login
                </button>
                <p className="text-black flex gap-1">
                  Let's create an account, click
                  <Link
                    to="/sign-up"
                    className="font-semibold text-secondary hover:text-primary"
                  >
                    here
                  </Link>
                </p>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default LandingPage;
