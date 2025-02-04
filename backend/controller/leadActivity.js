import LeadActivity from "../model/leadActivity.js";

const addLeadActivity = async (req, res) => {
  try {
    const { email, feedback } = req.body;
    if (!email || !feedback) {
      return res.status(200).json({
        success: false,
        code: 400,
        message: "Enter email and feedback",
      });
    } else {
      const findEmail = await LeadActivity.findOne({ email });
      if (!findEmail) {
        const newEmail = new LeadActivity({
          email,
          feedbacks: [
            {
              feedback,
              createdAt: new Date().toLocaleString("en-US", {
                timeZone: "Asia/Kolkata",
              }),
            },
          ],
        });
        await newEmail.save();
        return res.status(200).json({
          success: true,
          code: 200,
          message: "New lead activity created",
        });
      } else {
        await LeadActivity.updateOne(
          { email },
          {
            $push: {
              feedbacks: {
                feedback,
                createdAt: new Date().toLocaleString("en-US", {
                  timeZone: "Asia/Kolkata",
                }),
              },
            },
          }
        );
        return res.status(200).json({
          success: true,
          code: 200,
          message: "Lead activity updated",
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
    });
  }
};

const getAllLeadActivity = async (req, res) => {
  try {
    const leadActivities = await LeadActivity.find();
    if (!leadActivities) {
      return res.status(200).json({
        success: false,
        code: 400,
        message: "Cannot fetch lead activities",
      });
    } else {
      return res.status(200).json({
        success: true,
        code: 200,
        result: leadActivities,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
    });
  }
};

const getSingleLeadActivity = async (req, res) => {
  try {
    const { email } = req.params;
    const leadActivity = await LeadActivity.findOne({ email });
    if (!leadActivity) {
      return res.status(200).json({
        success: false,
        code: 400,
        message: "Cannot fetch lead activity",
      });
    } else {
      return res.status(200).json({
        success: true,
        code: 200,
        result: leadActivity,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
    });
  }
};

const deleteLeadActivity = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await LeadActivity.findByIdAndDelete(id);
    if (deleted) {
      return res
        .status(200)
        .json({ success: true, code: 200, message: "Lead activity deleted" });
    } else {
      return res.status(200).json({
        success: false,
        code: 200,
        message: "Failed to delete lead activity",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      code: 500,
      message: "Internal server error",
    });
  }
};

export {
  addLeadActivity,
  getAllLeadActivity,
  getSingleLeadActivity,
  deleteLeadActivity,
};
