import React from "react";
import { MdError } from "react-icons/md";
import { AiFillCheckCircle } from "react-icons/ai";
import Header from "../../components/Header";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import http from "../../helper/http";
import { useNavigate, useParams } from "react-router-dom";

function UpdateProduct() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [product, setProduct] = React.useState({});

  const getProduct = async () => {
    try {
      const { data } = await http(token).get(`/products/${id}`);
      setProduct(data.results);
    } catch (error) {
      const message = error?.response?.data?.error;
      return message;
    }
  };

  const getCategories = async () => {
    try {
      const { data } = await http(token).get("/categories");
      setCategories(data.results);
    } catch (error) {
      const message = error?.response?.data?.error;
      return message;
    }
  };

  React.useState(() => {
    getCategories();
    getProduct();
  }, [token]);

  const updateProduct = async (values) => {
    try {
      console.log(values.categoryId);
      const form = {
        categoryId: values.categoryId,
        sku: values.sku,
        name: values.name,
        description: values.description,
        weight: values.weight,
        width: values.width,
        length: values.length,
        height: values.height,
        image: values.image,
        price: values.price,
      };
      const formJson = JSON.stringify(form);
      const { data } = await http(token).patch(`/products/${id}`, formJson, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (data.success === true) {
        setSuccessMessage(data.message);
      }
      setTimeout(() => {
        setSuccessMessage("");
        navigate(`/product-detail/${id}`);
      }, 3 * 1000);
    } catch (error) {
      const message = error?.response?.data?.error;
      return message;
    }
  };
  return (
    <div>
      <Header />
      <div className="px-[15%] py-[y%] bg-base-100 h-full">
        <h1 className="w-full text-center font-bold text-primary text-4xl md:text-6xl drop-shadow-lg my-10">
          Update Product
        </h1>
        <div className="w-full flex flex-col md:flex-row gap-5 shadow-xl bg-white rounded-2xl py-5 mb-10">
          <Formik
            initialValues={{
              categoryId: product?.categoryId,
              sku: product?.sku,
              name: product?.name,
              description: product?.description,
              weight: product?.weight,
              width: product?.width,
              length: product?.length,
              height: product?.height,
              image: product?.image,
              price: product?.price,
            }}
            onSubmit={updateProduct}
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
                className="flex flex-col w-full px-[10%] py-4"
              >
                {successMessage && (
                  <div className="w-full flex gap-1 justify-center items-center text-success">
                    <AiFillCheckCircle size={30} />
                    {successMessage}
                  </div>
                )}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Name Product
                    </span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter name product"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    className="input input-bordered w-full"
                  />
                  {errors.name && touched.name && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.name}
                      </span>
                    </label>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">
                      Description
                    </span>
                  </label>
                  <textarea
                    type="text"
                    name="description"
                    placeholder="Enter description"
                    className="input input-bordered w-full h-[100px]"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                  />
                  {errors.description && touched.description && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.description}
                      </span>
                    </label>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Category Product</span>
                  </label>
                  <select
                    name="categoryId"
                    className="select select-bordered"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.categoryId}
                  >
                    <option disabled selected>
                      -- Select category --
                    </option>
                    {categories.map((items) => (
                      <option key={`category${items.id}`} value={items.id}>
                        {items.name}
                      </option>
                    ))}
                  </select>
                </div>
                {errors.categoryId && touched.categoryId && (
                  <label className="label">
                    <span className="label-text-alt text-error flex gap-1 items-center">
                      <MdError size={15} />
                      {errors.categoryId}
                    </span>
                  </label>
                )}
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">
                      SKU Product
                    </span>
                  </label>
                  <input
                    type="text"
                    name="sku"
                    placeholder="Enter sku"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.sku}
                    className="input input-bordered w-full"
                  />
                  {errors.sku && touched.sku && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.sku}
                      </span>
                    </label>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Weight Product (gram)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="weight"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.weight}
                      className="input input-bordered w-[100px]"
                    />
                    {errors.weight && touched.weight && (
                      <label className="label">
                        <span className="label-text-alt text-error flex gap-1 items-center">
                          <MdError size={15} />
                          {errors.weight}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Widht Product (mm)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="width"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.width}
                      className="input input-bordered w-[100px]"
                    />
                    {errors.width && touched.width && (
                      <label className="label">
                        <span className="label-text-alt text-error flex gap-1 items-center">
                          <MdError size={15} />
                          {errors.width}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Height Product (mm)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="height"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.height}
                      className="input input-bordered w-[100px]"
                    />
                    {errors.height && touched.height && (
                      <label className="label">
                        <span className="label-text-alt text-error flex gap-1 items-center">
                          <MdError size={15} />
                          {errors.height}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text font-semibold">
                        Length Product (mm)
                      </span>
                    </label>
                    <input
                      type="text"
                      name="length"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.length}
                      className="input input-bordered w-[100px]"
                    />
                    {errors.length && touched.length && (
                      <label className="label">
                        <span className="label-text-alt text-error flex gap-1 items-center">
                          <MdError size={15} />
                          {errors.length}
                        </span>
                      </label>
                    )}
                  </div>
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Price (Rp)</span>
                  </label>
                  <input
                    type="text"
                    name="price"
                    placeholder="Enter product price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.price}
                    className="input input-bordered w-[50%]"
                  />
                  {errors.price && touched.price && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.price}
                      </span>
                    </label>
                  )}
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text font-semibold">Image URL</span>
                  </label>
                  <input
                    type="text"
                    name="image"
                    placeholder="Enter product price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.image}
                    className="input input-bordered w-full"
                  />
                  {errors.image && touched.image && (
                    <label className="label">
                      <span className="label-text-alt text-error flex gap-1 items-center">
                        <MdError size={15} />
                        {errors.image}
                      </span>
                    </label>
                  )}
                </div>
                <button
                  type="submit"
                  className="btn btn-primary normal-case text-white font-semibold my-5 md:text-xl"
                >
                  Update Product
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
