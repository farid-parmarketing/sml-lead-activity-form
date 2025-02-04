import fetch from "node-fetch";

const getDetails = async (req, res) => {
  try {
    const { email, token } = req.body;
    const response = await fetch(
      `https://www.zohoapis.in/crm/v2/Settlement/search?criteria=((Email:equals:${email}))`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );
    if (response.status === 200) {
      const data = await response.json();
      return res.status(200).json({ success: true, data });
    } else if (response.status === 204) {
      return res
        .status(204)
        .json({ success: false, code: 204, message: "Invalid email address" });
    } else {
      return res.status(response.status).json({ error: "Error occurred" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const saveDetails = async (req, res) => {
  const { id, link, token } = req.body;
  try {
    const response = await fetch(`https://www.zohoapis.in/crm/v2/Settlement`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Zoho-oauthtoken ${token}`,
      },
      body: JSON.stringify({
        data: [
          {
            id: id,
            Lead_Activity_Link: link,
          },
        ],
      }),
    });
    if (response.status === 200 || response.status === 201) {
      const data = await response.json();
      return res.status(200).json({ success: true, code: 200, data });
    } else {
      const data = await response.json();
      return res
        .status(response.status)
        .json({ data, error: "Error occurred" });
    }
  } catch (error) {
    console.log(error);
  }
};

export { getDetails, saveDetails };
