import React from "react";
import { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";
import { Bounce } from "react-toastify";

const Manager = () => {
  const ref = useRef();
  const passref = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);

  const copyText = (text) => {
    toast("Copied to clipboard", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  };

  const showPassword = () => {
    passref.current.type = "text";
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passref.current.type = "password";
    } else {
      ref.current.src = "icons/eyecross.png";
      passref.current.type = "text";
    }
  };

  const savePassword = () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
      setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
      localStorage.setItem(
        "passwords",
        JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
      );
      setform({ site: "", username: "", password: "" });
      toast("Password Saved Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast("Please enter min 3 length characters", {
        position: "top-right",
        autoClose: 1000, // ensure autoClose is set here
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const deletePassword = (id) => {
    let c = window.confirm("do you really want to delete this password?");
    if (c) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
      toast("Password Deleted Successfully", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const editPassword = (id) => {
    const editItem = passwordArray.find((i) => i.id === id);
    setform(editItem);
    deletePassword(id);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      {/* <div class="absolute inset-0 -z-10 h-full w-full bg-blue-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div class="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div> */}
      <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
      {/* <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(140%_140%_at_50%_10%,#fff_40%,blue_95%)]"></div>  */}

      <div className=" p-3 md:p-0 mycontainer w-10/12 min-h-[88vh]">
        <h1 className="text-4xl font-bold text-center text-white">
          <span className="text-blue-500">&lt;</span>
          Pass
          <span className="text-blue-500">Op/&gt;</span>
        </h1>
        <p className="text-blue-100 text-lg text-center">
          Your own Password Manager
        </p>

        <div className="flex flex-col p-4 text-black gap-8 items-center">
          <input
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            className="rounded-full border-2 border-blue-500 w-full px-4 py-1"
            type="text"
            name="site"
            id="site"
          />

          <div className="flex flex-col md:flex-row w-full justify-between gap-8 ">
            <input
              value={form.username}
              onChange={handleChange}
              placeholder="Enter Username"
              className="rounded-full border-2 border-blue-500 w-full px-4 py-1"
              type="text"
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passref}
                value={form.password}
                onChange={handleChange}
                placeholder="Enter Password"
                className="rounded-full border-2 border-blue-500 w-full px-4 py-1"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute right-[5px] top-[5px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eye.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center gap-2 text-black items-center bg-blue-300 hover:bg-blue-500 rounded-full px-8 py-2.5 w-fit border border-blue-900"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords ">
          <h1 className="font bold text-xl text-white py-4">Your Passwords</h1>
          {passwordArray.length === 0 && (
            <div className="text-white">No Passwords to Show</div>
          )}
          {passwordArray.length != 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className="bg-blue-800 text-white">
                <tr>
                  <th className="py-2 border border-white">Site</th>
                  <th className="py-2 border border-white">Username</th>
                  <th className="py-2 border border-white">Password</th>
                  <th className="py-2 border border-white">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-blue-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="py-2 border border-white text-center">
                        <div className="flex items-center justify-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.site);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                                paddingTop: "3px",
                              }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex items-center justify-center">
                          <span>{item.username}</span>
                          <div
                            className="size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.username);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                                paddingTop: "3px",
                              }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className="py-2 border border-white text-center w-32">
                        <div className="flex items-center justify-center">
                          <span>{item.password}</span>
                          <div
                            className="lordiconcopy size-7 cursor-pointer"
                            onClick={() => {
                              copyText(item.password);
                            }}
                          >
                            <lord-icon
                              style={{
                                width: "25px",
                                height: "25px",
                                paddingLeft: "3px",
                                paddingTop: "3px",
                              }}
                              src="https://cdn.lordicon.com/xpgofwru.json"
                              trigger="hover"
                            ></lord-icon>
                          </div>
                        </div>
                      </td>
                      <td className=" justify-center py-2 border border-white text-center w-32">
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            editPassword(item.id);
                          }}
                        >
                          {" "}
                          <lord-icon
                            src="https://cdn.lordicon.com/wkvacbiw.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                        <span
                          className="cursor-pointer mx-1"
                          onClick={() => {
                            deletePassword(item.id);
                          }}
                        >
                          {" "}
                          <lord-icon
                            src="https://cdn.lordicon.com/skkahier.json"
                            trigger="hover"
                            style={{ width: "25px", height: "25px" }}
                          ></lord-icon>
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
