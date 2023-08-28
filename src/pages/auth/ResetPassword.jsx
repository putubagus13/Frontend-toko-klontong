import React from "react";
import StoreImage from "../../assets/store.jpg";
import { Formik } from "formik";
import { MdError } from "react-icons/md";
import { TbBuildingStore } from "react-icons/tb";
import { BiSolidCheckCircle } from "react-icons/bi";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import http from "../../helper/http";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is invalid"),
  code: Yup.string().required("Code is required"),
  password: Yup.string().required("Password is invalid"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm Password is invalid"),
});

function ResetPassowrd() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [message, setMassage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [openEye, setOpenEye] = React.useState(false);

  const doReset = async (values) => {
    try {
      setErrorMessage("");
      setMassage("");
      const form = {
        email: values.email,
        code: values.code,
        password: values.password,
      };
      const formJson = JSON.stringify(form);
      console.log(formJson);
      const { data } = await http().post("/auth/reset-password", formJson, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setMassage(data.message);
    } catch (error) {
      const message = error?.response?.data?.message;
      if (message) {
        console.log(message);
        setErrorMessage(message);
      }
    }
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
            code: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={doReset}
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
                <p className="text-primary font-semibold text-lg w-full text-center">
                  Reset Password
                </p>
                {errorMessage && (
                  <div className="flex gap-2 w-full justify-center items-center">
                    <MdError size={20} className="text-error" />
                    <p className="text-error font-semibold">{errorMessage}</p>
                  </div>
                )}
                {message && (
                  <div className="flex gap-2 w-full justify-center items-center">
                    <BiSolidCheckCircle size={20} className="text-success" />
                    <p className="text-success font-semibold">{message}</p>
                  </div>
                )}
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
                <div className="form-control w-full">
                  <input
                    name="code"
                    type="number"
                    placeholder="Enter your code"
                    className="input input-bordered bg-white border-accent hover:border-secondary w-full text-black"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.code}
                  />
                  {errors.code && touched.code && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.code}
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
                  Send Request
                </button>
                <p className="text-black flex gap-1 w-full justify-center mt-16">
                  Back to
                  <Link
                    to="/"
                    className="font-semibold text-secondary hover:text-primary"
                  >
                    Login
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

export default ResetPassowrd;
