import React from "react";
import StoreImage from "../../assets/store.jpg";
import { Formik } from "formik";
import { MdError } from "react-icons/md";
import { TbBuildingStore } from "react-icons/tb";
import { BiSolidCheckCircle } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import http from "../../helper/http";

const validationSchema = Yup.object({
  email: Yup.string().email("Email is invalid").required("Email is invalid"),
});

function ForgotRequest() {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const [message, setMassage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  const doRequest = async (values) => {
    try {
      setErrorMessage("");
      setMassage("");
      const form = {
        email: values.email,
      };
      const formJson = JSON.stringify(form);
      console.log(formJson);
      const { data } = await http().post("/auth/forgot-password", formJson, {
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
          }}
          validationSchema={validationSchema}
          onSubmit={doRequest}
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
                  Forgot Password
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

export default ForgotRequest;
