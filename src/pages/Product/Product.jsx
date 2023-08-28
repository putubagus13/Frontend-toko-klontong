import React from "react";
import Header from "../../components/Header";
import http from "../../helper/http";
import { BsSearch } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Product() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [sort, setSort] = React.useState("");
  const [sortBy, setSortBy] = React.useState("");
  const [page, setPage] = React.useState(1);
  const [category, setcategory] = React.useState("");
  const [sku, setSku] = React.useState("");
  const [limit, setLimit] = React.useState("");
  const [categories, setCategories] = React.useState([]);
  const [pageInfo, setPageInfo] = React.useState({});

  const getProduct = async (
    search,
    sort,
    sortBy,
    page,
    category,
    sku,
    limit
  ) => {
    try {
      const { data } = await http(token).get("/products", {
        params: {
          search: search,
          sort: sort,
          sortBy: sortBy,
          page: page,
          category: category,
          sku: sku,
          limit: limit,
        },
      });
      if (data.results) {
        setProducts(data.results);
        setPageInfo(data.pageInfo.totalPage);
      }
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

  React.useEffect(() => {
    getCategories();
    getProduct(search, sort, sortBy, page, category, sku, limit);
  }, [search, sort, sortBy, page, category, sku, limit]);
  return (
    <div>
      <Header />
      <div className="flex flex-col md:flex-row w-full p-[5%] gap-3">
        <div className="bg-white shadow-lg rounded-xl full p-[1%] flex flex-col items-center">
          <label className="label">
            <span className="label-text text-black font-semibold text-xl">
              Filter
            </span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-1">
            <div className="form-control w-full max-w-xs">
              <select
                onChange={(e) => setSortBy(e.target.value)}
                className="select select-bordered"
              >
                <option disabled selected>
                  --Sort By--
                </option>
                <option>ASC</option>
                <option>DESC</option>
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <select
                onChange={(e) => setSort(e.target.value)}
                className="select select-bordered"
              >
                <option disabled selected>
                  --Sort--
                </option>
                <option>id</option>
                <option>name</option>
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <select
                onChange={(e) => setLimit(e.target.value)}
                className="select select-bordered"
              >
                <option disabled selected>
                  --Limit--
                </option>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </select>
            </div>
            <div className="form-control w-full max-w-xs">
              <select
                onChange={(e) => setcategory(e.target.value)}
                className="select select-bordered"
              >
                <option disabled selected>
                  --category--
                </option>
                {categories.map((category) => (
                  <option key={`category${category.id}`}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={() => navigate("/create-product")}
            className="btn btn-secondary normal-case my-2 md:my-16"
          >
            Create Product
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-xl p-[2%] w-full ">
          <h1 className="w-full text-center text-primary font-bold text-2xl">
            My Products
          </h1>
          <div className="relative w-full max-w-xs my-10">
            <input
              type="text"
              placeholder="Search product"
              className="input input-bordered w-full bg-white px-10"
              onChange={(e) => setSearch(e.target.value)}
            />
            <BsSearch size={20} className="absolute text-black top-4 left-3" />
          </div>
          <div className="w-full h-[800px] overflow-y-scroll">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-5 overflow-y-scroll">
              {products.map((items) => (
                <Link
                  to={`/product-detail/${items.id}`}
                  key={`product${items.id}`}
                  className="transition ease-in-out delay-150 bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white duration-300 w-[200px] h-400px p-[2%] rounded-lg shadow-lg my-2"
                >
                  <div className="w-full h-[100] rounded-md overflow-hidden">
                    <img
                      src={items.image}
                      alt=""
                      className="w-full h-full object-fit"
                    />
                    <p className="text-black font-semibold">{items.name}</p>
                    <div className="text-black">SKU: {items.sku}</div>
                    <div className="text-lg text-primary font-semibold">
                      Rp{items.harga}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="w-full flex justify-center gap-4 items-center">
            {page === 1 ? (
              <button className="btn btn-active btn-accent normal-case text-white">
                Back
              </button>
            ) : (
              <button
                onClick={() => setPage(page - 1)}
                className="btn btn-active btn-secondary normal-case text-white"
              >
                Back
              </button>
            )}
            <p className="text-black font-semibold text-lg">{page}</p>
            {pageInfo === page ? (
              <button className="btn btn-active btn-accent normal-case text-white">
                Next
              </button>
            ) : (
              <button
                onClick={() => setPage(page + 1)}
                className="btn btn-active btn-secondary normal-case text-white"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
