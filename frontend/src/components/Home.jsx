import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { url, getToken } = useContext(AppContext);
  const [inputs, setInputs] = useState({
    email: "",
    feedback: "",
  });
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleInputs = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // get details
  const getDetails = async () => {
    const { email, feedback } = inputs;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    //
    if (!email) {
      setIsError(true);
      setMessage("Enter email address");
    } else if (!emailRegex.test(email)) {
      setIsError(true);
      setMessage("Enter a valid email address");
    } else if (!feedback) {
      setIsError(true);
      setMessage("Enter feedback");
    } else {
      try {
        setLoading(true);
        //
        const token = await getToken();
        //
        const res = await fetch(`${url}/getdetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: inputs.email,
            token,
          }),
        });
        if (res.status === 200) {
          const data = await res.json();
          console.log(data);
          await saveDetails(data.data.data[0].id, token);
        } else if (res.status === 204) {
          setIsError(true);
          setMessage("Invalid email address");
          setLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };

  // save details in ZOHO
  const saveDetails = async (id, token) => {
    try {
      const res2 = await fetch(`${url}/savedetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          link: `https://lead-activity.settlemyloan.in/leadactivity/${inputs.email}`,
          token,
        }),
      });
      if (res2.status === 200) {
        await submit();
      } else {
        setIsError(true);
        setMessage("Please refresh and try again");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // save details in database
  const submit = async () => {
    const { email, feedback } = inputs;
    try {
      const res = await fetch(`${url}/leadactivity`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          feedback,
        }),
      });
      const data = await res.json();
      //
      if (data.success === true) {
        setIsError(false);
        setMessage("Data saved");
        setInputs({
          email: "",
          feedback: "",
        });
        setTimeout(() => {
          setIsError(false);
          setMessage("");
        }, 3000);
        setLoading(false);
      } else if (data.success === false) {
        setIsError(true);
        setMessage(data.message);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="row align-items-center justify-content-center m-0">
        <div className="col-md-6 glass p-2">
          <div>
            <label>Email address</label>
            <input
              type="email"
              className="input mt-2"
              name="email"
              value={inputs.email}
              onChange={handleInputs}
              autoComplete="off"
            />
          </div>
          <div className="mt-4">
            <label>Feedback</label>
            <textarea
              className="input mt-2"
              name="feedback"
              value={inputs.feedback}
              onChange={handleInputs}
              autoComplete="off"
            ></textarea>
          </div>
          <div className="mt-2 text-end">
            {loading === true ? (
              <div className="d-flex align-items-center justify-content-center">
                <div className="spinner-border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
                {message && (
                  <p
                    className={`${
                      isError ? "bg-danger" : "bg-success"
                    } text-white p-2 rounded bg-gradient mb-2 text-center`}
                  >
                    {message}
                  </p>
                )}
              </>
            )}
            <button className="button" onClick={getDetails}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
