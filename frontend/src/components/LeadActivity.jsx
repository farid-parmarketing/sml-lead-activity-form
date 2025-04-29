import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link } from "react-router-dom";

const LeadActivity = () => {
  const { url } = useContext(AppContext);
  const [leadActivity1, setLeadActivity1] = useState([]);
  const [leadActivity2, setLeadActivity2] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    const getLeadActivities = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${url}/leadactivity`);
        const data = await res.json();
        //
        if (data.success === true) {
          setLeadActivity1(data.result);
          setLeadActivity2(data.result);
          setLoading(false);
        } else if (data.success === false) {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLeadActivities();
  }, []);
  //
  useEffect(() => {
    if (searchInput === "") {
      setLeadActivity2(leadActivity1);
    } else {
      const filtered = leadActivity1.filter((item) => {
        return item.email.toLowerCase().includes(searchInput.toLowerCase());
      });
      setLeadActivity2(filtered);
    }
  }, [searchInput]);
  return (
    <>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <div className="row align-items-center justify-content-center m-0">
            <div className="col-md-6 p-0">
              <div className="mb-2">
                <input
                  type="text"
                  className="input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
              {leadActivity2.length === 0 ? (
                <p className="text-center">No data found</p>
              ) : (
                <>
                  {leadActivity2.map((item, index) => {
                    return (
                      <Link
                        to={`/leadactivity/${item.email}`}
                        className="glass lead-activity-link mb-2 p-2"
                        key={index}
                      >
                        <p className="fw-bold">{item.email}</p>
                        <ol className="mt-2">
                          {item.feedbacks.map((item2, index2) => {
                            return (
                              <li
                                key={index2}
                                className={
                                  index2 === item.feedbacks.length - 1
                                    ? ""
                                    : "mb-2"
                                }
                              >
                                {item2.feedback}
                              </li>
                            );
                          })}
                        </ol>
                      </Link>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LeadActivity;
