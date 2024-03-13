import React, { useEffect, useState } from "react";
import { GET_PRODUCT, IMPORT_CSV } from "../api/apiUrl";
import { DELETE_PRODUCT } from "../api/apiUrl";
import { ADD_PRODUCT } from "../api/apiUrl";
import { EDIT_PRODUCT } from "../api/apiUrl";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import ConfirmDeleteModal from "./ConfirmModal";
import { GoUnfold } from "react-icons/go";
import axios from "axios";
import { EXPORT_CSV } from "../api/apiUrl";
import exportFromJSON from 'export-from-json'
const TableContent = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [paging, setPaging] = useState({});
  const [csvData,setCsvData]=useState([]);
  console.log("csvdata",csvData);
  const [showModal, setShowModal] = useState(null);
  const [page, setPage] = useState(1);
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState(0);
  const [sort, setSort] = useState(null);
  const [asc,setAsc]=useState(false)
  const [isOpen,setOpen]=useState(false)
  const handlePriceRangeChange = (event) => {
    console.log("event price", event.target);
    setPriceRange(event.target.value);
  };
  const [query, setQuery] = useState(null);

  const [dialogState, setDialogState] = useState({
    isOpen: false,
    product: null,
  });
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleEditClick = (product) => {
    setDialogState({
      isOpen: true,
      product: product,
    });
  };
  const handleAddClick = () => {
    setDialogState({
      isOpen: true,
      product: null,
    });
  };
  const handleCloseDialog = () => {
    setDialogState({
      isOpen: false,
      product: null,
    });
  };
  const handleCloseDialog1 = () => {
    setOpen(false)
  };
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${DELETE_PRODUCT}/${id}`);
      if (response.status === 200) {
        console.log("response", response);
        getAllproducts();
      }
    } catch (error) {
      console.error(error);
    }
    setShowModal(false);
  };
  const handleSorting= (sort) =>{
    setSort(sort);
    setAsc(!asc)
  }
  const handleUpdateproject = async (updatedData) => {
    console.log("formdata", updatedData);
    try {
      const response = await axios.post(
        `${EDIT_PRODUCT}/${updatedData._id}`,
        updatedData
      );
      if (response.status === 200) {
        console.log(response);
        toast.success("Product updated");
        getAllproducts();
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };
  const handleEportCsv = async () =>{
    try {
      const response = await axios.get(`${EXPORT_CSV}`);
      if(response.status === 200){
        console.log("exported",response)
        downloadCSV(response.data)
      }
    } catch (error) {
      console.log(error);
    }
  }
  const handleExport = (e) =>{
      const value = e.target.value;
      const data = csvData;
      if(value === 'all'){
        handleEportCsv();
      }else if(value === 'filtered'){
          const fileName = "download";
          const exportType =  exportFromJSON.types.csv
          exportFromJSON({ data, fileName, exportType });
      }
  }
  
  const downloadCSV = (csvData) => {
    if (!csvData) return;

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'data.csv';
    document.body.appendChild(a);
    
    a.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };
  //add data fun
  const handleFormSubmit = async (formdata) => {
    console.log("formdata", formdata);
    try {
      const token = Cookies.get("token");

      const headers = {
        Authorization: `Bearer ${token}`,
        role: "admin",
      };

      const response = await axios.post(`${ADD_PRODUCT}`, formdata, {
        headers,
      });
      if (response.status === 201) {
        console.log(response);
        toast.success("Product Added");
        getAllproducts();
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };
  const getAllproducts = async () => {
    let maxPrice;
    if (priceRange !== 0) {
      maxPrice = priceRange;
    }
    try {
      const response = await axios.get(
        `${GET_PRODUCT}?page=${page}&type=${type ? type : ""}${query ? `&query=${query}` : ""}&maxPrice=${maxPrice ? maxPrice : ""}&sort=${sort}&asc=${asc}`);

      if (response.status === 200) {
        console.log("response", response);
        setData(response.data.data);
        setPaging(response.data.paging);
        setCsvData(response.data.filterData)
       
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllproducts();
  }, [type, page, query, priceRange,sort,asc]);
  return (
    <>
      <div>
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="sm:flex sm:items-center">
            <div class="sm:flex-auto">
              <h1 class="text-xl font-semibold text-gray-900">Products</h1>
              <p class="mt-2 text-sm text-gray-700">
                A list of all the users in your account including their name,
                title, email and role.
              </p>
            </div>
            <div class="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                // onClick={()=>navigate('/add-product')}
                onClick={handleAddClick}
              >
                Add Product
              </button>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-1 mt-5">
            <div>
              <form class="max-w-md mx-auto">
                <label
                  for="default-search"
                  class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div class="relative">
                  <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg
                      class="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search Products"
                    required
                  />
                </div>
              </form>
            </div>
            <div class="grid grid-cols-3 gap-1">
            {/* <div className="...">
              </div> */}
              <div className="...">
                <label htmlFor="priceRange">Price Range:</label>{" "}
                <span>{`₹ 0 - ₹ ${priceRange}`}</span><br/>
                <input
                  type="range"
                  id="priceRange"
                  name="priceRange"
                  min="0"
                  max="25000"
                  className="cursor-pointer"
                  step="15"
                  value={priceRange}
                  onChange={handlePriceRangeChange}
                />
              </div>
              <div className="...">
              {/* <button
                type="button"
                class="inline-flex items-center justify-center rounded-md border   px-4 py-2 text-sm font-medium text-base shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                // onClick={()=>navigate('/add-product')}
                onClick={handleEportCsv}
              >
                Export File
              </button> */}
               <select
                  id="type"
                  name="type"
                  onChange={handleExport}
                  class="block cursor-pointer border   pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="">Export File</option>
                  <option value="all">All data</option>
                  <option value="filtered">Filtered</option>
                </select>
              </div>
              <div className="...">
              <button
                type="file"
                class="inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium text-base shadow-sm  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                onClick={()=>setOpen(true)}
              >
                Import File
              </button>
              </div>
            </div>
          </div>
          <div class="mt-8 flex flex-col">
            <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                  <table class="min-w-full divide-y divide-gray-300">
                    <thead class="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <a className="group inline-flex">
                            Name
                            <span className="ml-2 flex-none cursor-pointer rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                              <GoUnfold
                                className="h-5 w-5"
                                aria-hidden="true"
                               onClick={()=>handleSorting('name')}
                              />
                            </span>
                          </a>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          {/* <a className="group inline-flex">
                            Category
                            <span className="ml-2 cursor-pointer flex-none rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                              <GoUnfold
                                className="h-5 w-5"
                                aria-hidden="true"
                                onClick={()=>handleSorting('type')}
                              />
                            </span>
                          </a> */}
                          <div>
                          <select
                            id="type"
                            name="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            class="block cursor-pointer border   pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                          >
                            <option value="">Select Category</option>
                            <option value="furniture">Furniture</option>
                            <option value="electronic">Electronic</option>
                            <option value="fashion">Fashion</option>
                            <option value="grocery">Grocery</option>
                          </select>
                          </div>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <a className="group inline-flex">
                            Description
                            <span className="ml-2 flex-none cursor-pointer rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                              <GoUnfold
                                className="h-5 w-5"
                                aria-hidden="true"
                                onClick={()=>handleSorting('description')}
                              />
                            </span>
                          </a>
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          <a className="group inline-flex">
                            Price
                            <span className="ml-2 flex-none cursor-pointer rounded bg-gray-200 text-gray-900 group-hover:bg-gray-300">
                              <GoUnfold
                                className="h-5 w-5"
                                aria-hidden="true"
                                onClick={()=>handleSorting('price')}
                              />
                            </span>
                          </a>
                        </th>
                        <th
                          scope="col"
                          class="relative py-3.5 pl-3 pr-4 sm:pr-6"
                        >
                          <span class="sr-only">Edit</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 bg-white">
                      {data.map((product) => {
                        return (
                          <>
                            <tr key={product._id}>
                              <td class="whitespace-nowrap capitalize py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                {product.name}
                              </td>
                              <td class="whitespace-nowrap capitalize px-3 py-4 text-sm text-gray-500">
                                {product.type}
                              </td>
                              <td class="whitespace-nowrap capitalize px-3 py-4 text-sm text-gray-500">
                                {product.description}
                              </td>
                              <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                {`₹ ${product.price}`}
                              </td>
                              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  onClick={() => handleEditClick(product)}
                                  class="text-indigo-600 hover:text-indigo-900 cursor-pointer	"
                                >
                                  Edit
                                </a>
                              </td>
                              <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                <a
                                  class="text-indigo-600 hover:text-indigo-900 cursor-pointer	"
                                  onClick={() => setShowModal(product)}
                                >
                                  delete
                                </a>
                               {showModal && <ConfirmDeleteModal
                                  isOpen={showModal}
                                  onCancel={handleCancel}
                                  onConfirm={handleDelete}
                                />}
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                  <Pagination
                    page={page}
                    setPage={setPage}
                    paging={paging}
                    results={data?.length}
                  />
                </div>
              </div>
            </div>
          </div>
          {dialogState.isOpen && (
            <FormDialog
              product={dialogState.product}
              onSubmit={
                dialogState.product ? handleUpdateproject : handleFormSubmit
              }
              onClose={handleCloseDialog}
            />
          )}
           {isOpen && (
            <FormDialog1
              getAllproducts={getAllproducts}
              onClose={handleCloseDialog1}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default TableContent;

function FormDialog({ onSubmit, onClose, product }) {
  const [name, setName] = useState(product ? product.name : "");
  const [type, setType] = useState(product ? product.type : "");
  const [price, setPrice] = useState(product ? product.price : 0);
  const [description, setDescription] = useState(
    product ? product.description : ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      type,
      price,
      description,
    };
    if (product) {
      const updatedproject = {
        ...product,
        ...formData,
      };

      onSubmit(updatedproject);
    } else {
      onSubmit(formData);
    }

    onClose();
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {product ? "Edit product" : "Add Product"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name{" "}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Type/Category{" "}
              </label>
              <select
                id="type"
                name="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">select location</option>
                <option value="electronic">Electronic</option>
                <option value="furniture">Furniture</option>
                <option value="fashion">Fashion</option>
                <option value="grocery">Grocery</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm font-medium text-gray-700"
              >
                {" "}
                Price{" "}
              </label>
              <div className="mt-1">
                <input
                  id="price"
                  name="price"
                  value={price}
                  onChange={(e) =>
                    e.target.value >= 0 ? setPrice(e.target.value) : 0
                  }
                  type="number"
                  autoComplete="current-price"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <label
                for="description"
                class="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <div class="mt-1">
                <textarea
                  rows="4"
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                {product ? "Edit product" : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function FormDialog1({ onClose,getAllproducts }) {
  const [file, setFile] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = Cookies.get("token")
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      const headers = {
        "Content-type": "multipart/form-data",
        id:userId
      };
      console.log("file",file)
      let formData = new FormData();
      formData.append('file',file)
      
      const response = await axios.post(`${IMPORT_CSV}`,
      formData,
      {
        headers,
      }
      );
      if (response.status === 200) {
        console.log("response", response);
        toast.success("inserted file");
        getAllproducts();
      }
    } catch (error) {
      console.error(error);
    }
    onClose();
  };

  return (
    <div className="relative">
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Insert Products
            </h2>
            <button
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit} method="POST">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
              File{" "}
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  onChange={(e) => setFile(e.target.files[0])}
                  type="file"
                  autoComplete="name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Insert File
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
