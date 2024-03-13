
const EditDialog = ({ isOpen, onClose, product })=> {
    console.log("product",product);
    const [name, setName] = useState(product ? product.name : '');
    const [type, setType] = useState(product ? product.type : '');
    const [price, setPrice] = useState(product ? product.price : 0);
    const [description, setDescription] = useState(product ? product.description : '');
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formdata = {
        name,
        type,
        price,
        description,
      };
      console.log("formdata",formdata)
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
        }
      } catch (error) {
        toast.error(error.response.data.error);
        console.log(error);
      }
      onClose();
    };
  
    return (
      <div className="relative">
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-gray-900 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  Add Product
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
                      onChange={(e)=>setName(e.target.value)}
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
                    {" "}
                    Type/Category{" "}
                  </label>
                  <div className="mt-1">
                    <input
                      id="type"
                      name="type"
                      value={type}
                      onChange={(e)=>setType(e.target.value)}
                      type="text"
                      autoComplete="type"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
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
                      onChange={(e)=>setPrice(e.target.value)}
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
                      onChange={(e)=>setDescription(e.target.value)}
                      id="description"
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    ></textarea>
                  </div>
                </div>
                {/* <div>
                                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                                  <select id="location" name="location" className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
                                      <option value=''>select location</option>
                                      <option value='canada'>Canada</option>
                                      <option value='us'>United States</option>
                                      <option value='mexico'>Mexico</option>
                                  </select>
  
                              </div> */}
                {/* <div className="flex items-center justify-between">
                                  <div className="flex items-center">
                                      <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                                      <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900"> Remember me </label>
                                  </div>
                              </div> */}
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
        )}
      </div>
    );
  }

  export default EditDialog;
  