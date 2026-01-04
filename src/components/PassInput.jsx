import React, { useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";
import eye from "../assets/eye.png";
import eyeCross from "../assets/eye-off.png";
import { Copy, Pencil, Trash } from "lucide-react";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PassInput = () => {
  const ref = useRef();
  const reff = useRef();
  const [url, setUrl] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [allPassword, setAllPassword] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const passManager = () => {
    if (ref.current.src.includes(eyeCross)) {
      ref.current.src = eye;
      reff.current.type = "text";
    } else {
      ref.current.src = eyeCross;
      reff.current.type = "password";
    }
  };
  function savePassword(e) {
    e.preventDefault();
    let copyPassword = [...allPassword];

    if (editIndex !== null) {
      copyPassword[editIndex] = { url, username, password };
      setEditIndex(null);
      toast.success(` Password Updated `, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      copyPassword.push({ url, username, password });
      toast.success(` Password saved!`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
    setAllPassword(copyPassword);
    localStorage.setItem("allPasswords", JSON.stringify(copyPassword));

    setUrl("");
    setUsername("");
    setPassword("");
  }

  useEffect(() => {
    const savedPassword = localStorage.getItem("allPasswords");

    if (savedPassword) {
      setAllPassword(JSON.parse(savedPassword));
    }
  }, []);

  function copyText(text) {
    toast.info(`Copied to Clipboard `, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Bounce,
    });
    navigator.clipboard.writeText(text);
  }

  function deletePassword(idx) {
    let confirm = window.confirm(
      "Are you sure you want to delete this password?"
    );

    if (confirm) {
      const copyPassword = [...allPassword];
      copyPassword.splice(idx, 1);
      setAllPassword(copyPassword);
      localStorage.setItem("allPasswords", JSON.stringify(copyPassword));
      toast.success(` Successfully Deleted `, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    } else {
      toast.info(`Password not Delete`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
      });
    }
  }

  function editPassword(idx) {
    const selected = allPassword[idx];

    setUrl(selected.url);
    setUsername(selected.username);
    setPassword(selected.password);

    setEditIndex(idx);
  }

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      <div className="w-full h-full flex justify-center items-center">
        <div className="lg:w-[80%] w-[95%] mt-20 h-full  ">
          <form
            onSubmit={(e) => {
              savePassword(e);
            }}
            className="flex flex-col gap-5 items-center"
          >
            <input
              required
              className="w-full border border-blue-400 rounded-full px-4 py-2 text-lg outline-none"
              type="text"
              placeholder="Enter Website URL"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
              }}
            />
            <div className="w-full lg:flex">
              <input
                required
                className="lg:w-[60%]  w-full border border-blue-400 rounded-full px-4 py-2 text-lg outline-none"
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
              <div className="lg:w-[40%] lg:mt-0 lg:ml-3 mt-5 w-full relative">
                <input
                  required
                  ref={reff}
                  className="w-full border border-blue-400 rounded-full px-4 py-2 text-lg outline-none"
                  type="password"
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <span
                  onClick={passManager}
                  className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer"
                >
                  <img
                    className="active:scale-95"
                    ref={ref}
                    src={eyeCross}
                    alt=""
                  />
                </span>
              </div>
            </div>
            <button className="flex active:scale-95 justify-center items-center gap-2 text-xl bg-blue-500 w-fit text-white px-4 py-1.5 rounded-full">
              {" "}
              <Save strokeWidth={2.25} /> Save Password
            </button>
          </form>
          <div className="w-full mt-10 overflow-x-auto">
            <h1 className="text-3xl font-bold my-3">Your Passwords</h1>
            {allPassword.length === 0 ? (
              <div>
                <h1>No password to show</h1>
              </div>
            ) : (
              <div>
                <div className="md:hidden  space-y-4">
                  {allPassword.map((elem, idx) => (
                    <div
                      key={idx}
                      className="bg-blue-100 border flex flex-col py-5 justify-center items-center gap-2  border-blue-300 rounded-lg "
                    >
                      <div className=" flex flex-col items-center justify-center">
                        <span className="font-semibold text-xl">Website</span>
                        <span className="break-all flex items-center justify-center gap-2">
                          <a href={elem.url} target="_blank">
                            {elem.url}
                          </a>
                          <div
                            onClick={() => {
                              copyText(elem.url);
                            }}
                            className="cursor-pointer active:scale-95"
                          >
                            <Copy size={16} />
                          </div>
                        </span>
                      </div>

                      <div className=" flex flex-col items-center justify-center">
                        <span className="font-semibold text-xl">Username</span>
                        <span className="break-all flex items-center justify-center gap-2">
                          {elem.username}{" "}
                          <div
                            onClick={() => {
                              copyText(elem.username);
                            }}
                            className="cursor-pointer active:scale-95"
                          >
                            <Copy size={16} />
                          </div>
                        </span>
                      </div>

                      <div className=" flex flex-col items-center justify-center">
                        <span className="font-semibold text-xl">Password</span>
                        <span className="break-all flex items-center justify-center gap-2">
                          {"*".repeat(elem.password.length)}{" "}
                          <div
                            onClick={() => {
                              copyText(elem.password);
                            }}
                            className="cursor-pointer active:scale-95"
                          >
                            <Copy size={16} />
                          </div>
                        </span>
                      </div>

                      <div className=" flex flex-col items-center justify-center ">
                        <span className="font-semibold text-xl">Action</span>
                        <div className="flex justify-center items-center gap-2">
                          <Pencil
                            size={18}
                            onClick={() => editPassword(idx)}
                            className="cursor-pointer"
                          />
                          <Trash
                            size={18}
                            onClick={() => deletePassword(idx)}
                            className="cursor-pointer"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <table className="hidden md:table table-auto w-full rounded-md overflow-hidden  ">
                  <thead className="bg-blue-300">
                    <tr>
                      <th className=" p-1 text-xl ">Website</th>
                      <th className=" p-1 text-xl">Username</th>
                      <th className=" p-1 text-xl ">Password</th>
                      <th className=" p-1 text-xl ">Actions</th>
                    </tr>
                  </thead>
                  {allPassword.map((elem, idx) => {
                    return (
                      <tbody
                        key={idx}
                        className="bg-blue-100  border border-blue-200"
                      >
                        <tr>
                          <td className=" text-center text-md p-2 break-all">
                            <div className="flex items-center justify-center gap-3">
                              <a href={elem.url} target="_blank">
                                {elem.url}
                              </a>
                              <div
                                onClick={() => {
                                  copyText(elem.url);
                                }}
                                className="cursor-pointer active:scale-95"
                              >
                                <Copy size={16} />
                              </div>
                            </div>
                          </td>
                          <td className="text-center text-md  p-2 break-all">
                            <div className="flex items-center justify-center gap-3">
                              {elem.username}
                              <div
                                onClick={() => {
                                  copyText(elem.username);
                                }}
                                className="cursor-pointer active:scale-95"
                              >
                                <Copy size={16} />
                              </div>
                            </div>
                          </td>
                          <td className="text-center text-md  p-2 break-all">
                            <div className="flex items-center justify-center gap-3">
                              {"*".repeat(elem.password.length)}
                              <div
                                onClick={() => {
                                  copyText(elem.password);
                                }}
                                className="cursor-pointer active:scale-95"
                              >
                                <Copy size={16} />
                              </div>
                            </div>
                          </td>
                          <td className="text-center text-md  p-2 break-all">
                            <div className="flex items-center justify-center gap-3">
                              <div
                                onClick={() => {
                                  editPassword(idx);
                                }}
                                className="cursor-pointer active:scale-95"
                              >
                                <Pencil size={18} />
                              </div>
                              <div
                                onClick={() => {
                                  deletePassword(idx);
                                }}
                                className="cursor-pointer active:scale-95"
                              >
                                <Trash size={18} />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default PassInput;
