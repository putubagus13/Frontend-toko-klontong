import React from "react";
import StoreImage from "../../assets/store.jpg";
import { Formik } from "formik";
import { MdError } from "react-icons/md";
import { TbBuildingStore } from "react-icons/tb";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { clearMessage } from "../../redux/reducers/auth";
import { asyncRegisterAction } from "../../redux/actions/auth";

const validationSchema = Yup.object({
  fullName: Yup.string().min(3, "Name invalid").required("Name is invalid"),
  email: Yup.string().email("Email is invalid").required("Email is invalid"),
  password: Yup.string().required("Password is invalid"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm Password is invalid"),
});

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [open, setOpen] = React.useState(false);
  const [openEye, setOpenEye] = React.useState(false);

  const doRegister = async (values) => {
    dispatch(clearMessage());
    dispatch(asyncRegisterAction(values));
  };

  React.useEffect(() => {
    if (token) {
      navigate("/products");
    }
  });

  return (
    <div className="flex justify-center items-center px-[3%] py-16 h-screen bg-base-100">
      <div className="flex w-[90%] h-full shadow-xl rounded-2xl overflow-hidden">
        <div className="hidden lg:block flex-2 overflow-hidden">
          <img
            className="w-full h-full object-cover"
            src={StoreImage}
            alt="store"
          />
        </div>
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={doRegister}
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
              <div className="flex flex-col gap-3">
                <p className="text-black">Create new account</p>
                <div className="form-control w-full">
                  <input
                    name="fullName"
                    type="text"
                    placeholder="Enter your fullname"
                    className="input input-bordered bg-white border-accent hover:border-secondary w-full text-black"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                  />
                  {errors.fullName && touched.fullName && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.fullName}
                      </span>
                    </label>
                  )}
                </div>
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
                <div className="relative form-control w-full">
                  <input
                    name="confirmPassword"
                    type={!open ? "password" : "text"}
                    placeholder="Confirm password"
                    className="input input-bordered bg-white border-accent hover:border-secondary w-full text-black"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                  />
                  {errors.confirmPassword && touched.confirmPassword && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.confirmPassword}
                      </span>
                    </label>
                  )}
                  {!open ? (
                    <button
                      onClick={() => setOpen(true)}
                      className="absolute right-4 top-4"
                    >
                      <BsEye className="text-accent" size={20} />
                    </button>
                  ) : (
                    <button
                      onClick={() => setOpen(false)}
                      className="absolute right-4 top-4"
                    >
                      <BsEyeSlash className="text-accent" size={20} />
                    </button>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary normal-case text-lg font-semibold text-neutral"
                >
                  Sign Up
                </button>
                <p className="text-black flex gap-1">
                  Already have an account?
                  <Link
                    to="/"
                    className="text-secondary hover:text-primary font-bold"
                  >
                    Log in
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

export default SignUp;
