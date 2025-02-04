import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const ViewLeadActivity = () => {
  const { url } = useContext(AppContext);
  const { id } = useParams();
  const [leadActivity, setLeadActivity] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getLeadActivity = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${url}/leadactivity/${id}`);
        const data = await res.json();
        if (data.success === true) {
          setLeadActivity(data.result);
          setLoading(false);
        } else if (data.success === false) {
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getLeadActivity();
  }, []);
  return (
    <>
      <div className="row align-items-center justify-content-center m-0">
        <div className="col-md-6">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : (
            <>
              {leadActivity === null ? (
                <p className="text-center">No data found</p>
              ) : (
                <div className="glass p-2">
                  <p className="fw-bold">{leadActivity.email}</p>
                  <ol className="mt-2">
                    {leadActivity.feedbacks.map((item, index2) => {
                      console.log(item.createdAt.split(",")[0].split("/")[1]);
                      return (
                        <li key={index2} className="mb-2">
                          <p>{item.feedback}</p>
                          <p className="secondary-text">{`${
                            item.createdAt.split(",")[0].split("/")[1]
                          }/${item.createdAt.split(",")[0].split("/")[0]}/${
                            item.createdAt.split(",")[0].split("/")[2]
                          } at ${item.createdAt.split(",")[1]}`}</p>
                        </li>
                      );
                    })}
                  </ol>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewLeadActivity;
