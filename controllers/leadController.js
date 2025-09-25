    const Lead = require("../models/leadModel")

    // create lead
const createLead = async (req, res) => {
  try {
    const { name, phone, email, city, passout, status, source, qualification, interests, message, state } = req.body;

    
    if (!email || !name || !phone) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and phone number',
        errors: {
          name: !name ? 'Name is required' : null,
          email: !email ? 'Email is required' : null,
          phone: !phone ? 'Phone number is required' : null,
        }
      });
    }
    
    const existingLead = await Lead.findOne({
      $or: [{ name }, { email }, { phone }]
    });

    if (existingLead) {
      return res.status(400).json({
        success: false,
        message: "Lead with same name, email, or phone already exists",
        errors: {
          name: existingLead.name === name ? 'Name already exists' : null,
          email: existingLead.email === email ? 'Email already exists' : null,
          phone: existingLead.phone === phone ? 'Phone already exists' : null
        }
      });
    }

    const newLead = new Lead({
      name,
      phone,
      email,
      city,
      passout,
      status: status || "New",
      source: source || "Website",
      qualification,
      interests,
      message,
      state
    });

    await newLead.save();

    res.status(201).json({
      success: true,
      message: "Lead created successfully",
      lead: newLead
    });

  } catch (error) {
    console.error("Error creating lead:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// getLeads
    const getLeads = async (req, res) => {
      try {
        const leads = await Lead.find();
        res.status(200).json({ leads });
      } catch (error) {
        console.error("Error fetching leads:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };

// updateLead
    const updateLead = async (req, res) => {
      try {
        const { id } = req.params;
        const updates = req.body;
        const updatedLead = await Lead.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedLead) {
          return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json({ message: "Lead updated successfully", lead: updatedLead });
      } catch (error) {
        console.error("Error updating lead:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };
// deleteLead
    const deleteLead = async (req, res) => {
      try {
        const { id } = req.params;
        const deletedLead = await Lead.findByIdAndDelete(id);
        if (!deletedLead) {
          return res.status(404).json({ message: "Lead not found" });
        }
        res.status(200).json({ message: "Lead deleted successfully", lead: deletedLead });
      } catch (error) {
        console.error("Error deleting lead:", error);
        res.status(500).json({ message: "Internal server error" });
      }
    };

    module.exports = { createLead, getLeads, updateLead, deleteLead  };