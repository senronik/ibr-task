import React, { useEffect, useState } from "react";
import { SEND_EMAIL, GET_EMAILS,UPLOAD_IMG } from "../api/apiUrl";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";
import { MdEmail } from "react-icons/md";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const ProductImg = () => {
  const navigate = useNavigate();
  const [formdata, setFormdata] = useState({
    email: "",
    subject: "",
    file: "",
  });
  const [data1,setData1]= useState('');
  const [data, setData] = useState([]);
  console.log("Data", data);
  // const [isDragging, setIsDragging] = useState(false);
  // const [selectedFile, setSelectedFile] = useState(null);
  console.log("formdata", formdata);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name !== "file") {
      setFormdata({
        ...formdata,
        [name]: value,
      });
    } else {
      setFormdata({
        ...formdata,
        [name]: e.target.files[0],
      });
      // const file = e.target.files[0];
      // setSelectedFile(file);
    }
  };

  // const handleDragOver = (e) => {
  //   e.preventDefault();
  //   setIsDragging(true);
  // };

  // const handleDrop = (e) => {
  //   e.preventDefault();
  //   setIsDragging(false);
  //   setFormdata({
  //     ...formdata,
  //     file: e.dataTransfer.files[0],
  //   });
  //   const file = e.dataTransfer.files[0];
  //   setSelectedFile(file);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", formdata.email);
    data.append("subject", formdata.subject);
    data.append("text", data1);
    try {
      const token = Cookies.get("token");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-type": "multipart/form-data",
        role: "admin",
      };

      const response = await axios.post(`${SEND_EMAIL}`, data, {
        headers,
      });
      if (response.status === 201) {
        console.log(response);
        toast.success("Send success");
        getAllEmails();
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };
  const getAllEmails = async () => {
    const token = Cookies.get("token");
    const headers = {
      Authorization: `Bearer ${token}`,
      role: "admin",
    };
    try {
      const response = await axios.get(`${GET_EMAILS}`, {
        headers,
      });
      if (response.status === 200) {
        setData(response.data);

        console.log("response of get", response);
      }
    } catch (error) {
      toast.error(error.response.data.error);
      console.log(error);
    }
  };
 
  //Image handling in CKEditor5
  const handleOnChange = (data)=>{
    setData1(data);
  }
  const uploadImage = async (body) => {
    return await axios.post(
        `${UPLOAD_IMG}`,
        body
    )
}
  function uploadAdapter(loader) {
    return {
      upload: () => {
        return new Promise((resolve, reject) => {
          const body = new FormData();
          loader.file
            .then((file) => {
              body.append("uploadImg", file);
              uploadImage(body)
                .then((res) => {
                  const imageUrl = `http://localhost:5000/upload/${res.data.url}`;
                  resolve({ default: imageUrl });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => reject(err));
        });
      },
    };
  }
  

function uploadPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return uploadAdapter(loader);
  };
}

  useEffect(() => {
    getAllEmails();
  }, []);
  return (
    <>
      <header className="bg-indigo-600">
        <Header />
      </header>
      <div className="space-y-6">
        <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">
                Email to User
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>
            <div className="mt-5 md:mt-0 md:col-span-2">
              <form className="space-y-6" onSubmit={handleSubmit} method="POST">
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email To
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="email"
                        name="email"
                        id="email"
                        onChange={handleChange}
                        required
                        className="focus:ring-indigo-500 border pl-2 py-2 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="email@gmail.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <div className="col-span-3 sm:col-span-2">
                    <label
                      htmlFor="company-website"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Subject
                    </label>
                    <div className="mt-1 flex rounded-md shadow-sm">
                      <input
                        type="text"
                        name="subject"
                        onChange={handleChange}
                        required
                        id="company-website"
                        className="focus:ring-indigo-500 border pl-2 py-2  focus:border-indigo-500 flex-1 block w-full rounded-none rounded-r-md sm:text-sm border-gray-300"
                        placeholder="subject"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Text
                  </label>
                  <div className="mt-1">
                    {/* <textarea
                    id="about"
                    name="text"
                    required
                    onChange={handleChange}

                    rows={3}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                    defaultValue={''}
                  /> */}
                    <CKEditor
                      editor={ClassicEditor}
                      data={data1}
                      config={{
                        extraPlugins: [uploadPlugin],
                      }}
                      onChange={(event, editor) => {
                        const data = editor.getData();
                        handleOnChange(data);
                        console.log({ event, editor, data });
                      }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Brief description for your profile. URLs are hyperlinked.
                  </p>
                </div>
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Attachments
                  </label>
                  <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md ${
                      isDragging ? "bg-gray-100" : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                  >
                    <div className="space-y-1 text-center">
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a Image</span>
                          <input
                            id="file-upload"
                            onChange={handleChange}
                            name="file"
                            hidden
                            type="file"
                          />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      {selectedFile && (
                        <p className="text-sm text-gray-700">
                          Selected File: {selectedFile.name} (
                          {selectedFile.size} bytes)
                        </p>
                      )}
                    </div>
                  </div>
                </div> */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send Email
                    <MdEmail
                      className="ml-3 -mr-1 h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8 mb-5">
        <div className="mt-8 flex flex-col">
          <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                      >
                        Img
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Subject
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        text
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white">
                    {data.map((person, personIdx) => (
                      <tr
                        key={person._id}
                        className={
                          personIdx % 2 === 0 ? undefined : "bg-gray-50"
                        }
                      >
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          <div className="relative h-[50px] bg-gray-300 w-full sm:h-[50px] md:h-[70px] lg:w-[50px] md:w-[50px] lg:h-[50px] xl:h-[50px]">
                            <img
                              src={person?.file}
                              alt="img"
                              class="h-full w-full object-cover"
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.subject}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 flex-intial w-64">
                          {person.text}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default ProductImg;
