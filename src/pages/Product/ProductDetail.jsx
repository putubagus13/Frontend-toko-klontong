import React from "react";
import Header from "../../components/Header";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { Await, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import http from "../../helper/http";

function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.auth.token);
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

  const doDelete = async () => {
    try {
      const { data } = await http(token).delete(`/products/${id}`);
      if (data.success === true) {
        navigate("/products");
      }
    } catch (error) {
      const message = error?.response?.data?.error;
      return message;
    }
  };

  React.useEffect(() => {
    getProduct();
  }, [token]);
  return (
    <div>
      <Header />
      <div className="px-[10%] py-[5%] bg-base-100 h-screen">
        <h1 className="w-full text-center font-bold text-primary text-4xl md:text-6xl drop-shadow-lg my-10">
          Detail Product
        </h1>
        <div className="w-full h-[600px] flex flex-col md:flex-row gap-5 shadow-xl bg-white">
          <div className="flex-1 w-full h-full overflow-hidden rounded-2xl">
            <img
              src="https://cf.shopee.co.id/file/7cb930d1bd183a435f4fb3e5cc4a896b"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 flex flex-col gap-10 w-full px-[10%] py-4">
            <h1 className="text-4xl md:text-6xl font-bold text-black text-center">
              {product?.name}
            </h1>
            <div className="flex flex-col gap-2">
              <div className="flex flex w-full justify-between">
                <div className="flex-1 text-black text-md md:text-2xl font-bold">
                  <p>Category :</p>
                </div>
                <div className="flex-1 text-black text-md md:text-2xl">
                  <p>{product?.categoryName}</p>
                </div>
              </div>
              <div className="flex flex w-full justify-between">
                <div className="flex-1 text-black text-md md:text-2xl font-bold">
                  <p>Description :</p>
                </div>
                <div className="flex-1 text-black text-md md:text-2xl">
                  <p>{product?.description}</p>
                </div>
              </div>
              <div className="flex flex w-full justify-between">
                <div className="flex-1 text-black text-md md:text-2xl font-bold">
                  <p>SKU :</p>
                </div>
                <div className="flex-1 text-black text-md md:text-2xl">
                  <p>{product?.sku}</p>
                </div>
              </div>
              <div className="flex flex w-full justify-between">
                <div className="flex-1 text-black text-md md:text-2xl font-bold">
                  <p>Weight :</p>
                </div>
                <div className="flex-1 text-black text-md md:text-2xl">
                  <p>{product?.weight} gr</p>
                </div>
              </div>
              <div className="flex flex w-full justify-between">
                <div className="flex-1 text-black text-md md:text-2xl font-bold">
                  <p>Width :</p>
                </div>
                <div className="flex-1 text-black text-md md:text-2xl">
                  <p>{product?.width} cm</p>
                </div>
              </div>
              <div className="flex flex w-full justify-between">
                <div className="flex-1 text-black text-md md:text-2xl font-bold">
                  <p>Length :</p>
                </div>
                <div className="flex-1 text-black text-md md:text-2xl">
                  <p>{product?.length} cm</p>
                </div>
              </div>
              <div className="flex flex w-full justify-between">
                <div className="flex-1 text-black text-md md:text-2xl font-bold">
                  <p>Height :</p>
                </div>
                <div className="flex-1 text-black text-md md:text-2xl">
                  <p>{product?.Height} cm</p>
                </div>
              </div>
              <div className="flex flex w-full justify-between">
                <div className="flex-1 text-black text-md md:text-2xl font-bold">
                  <p>Harga:</p>
                </div>
                <div className="flex-1 text-primary text-lg md:text-4xl font-bold">
                  <p>Rp{product?.harga}</p>
                </div>
              </div>
              <div className="flex gap-3 w-full justify-center my-5">
                <button
                  className="btn btn-accent"
                  onClick={() => window.my_modal_1.showModal()}
                >
                  <RiDeleteBin6Fill size={20} className="text-white" />
                </button>
                <dialog id="my_modal_1" className="modal">
                  <form method="dialog" className="modal-box">
                    <h3 className="font-bold text-lg">Delete Product</h3>
                    <p className="py-4">
                      Are you sure want to delete this product?
                    </p>
                    <div className="modal-action">
                      <button
                        onClick={doDelete}
                        className="btn normal-case btn-error text-white"
                      >
                        Delete
                      </button>
                      <button className="btn normal-case">Close</button>
                    </div>
                  </form>
                </dialog>
                <button
                  onClick={() => navigate(`/update-product/${id}`)}
                  className="btn btn-secondary normal-case text-white font-semibold"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
