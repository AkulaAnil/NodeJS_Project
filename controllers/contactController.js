const asyncHandler = require('express-async-handler');
const Contact = require('../models/contact_model');

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getAllContacts = asyncHandler( async (req, res) => {
    const contact = await Contact.find({ user_id: req.user.id });
    res.status(200).json({
        message: 'All Contacts Data',
        data: contact
    });
});

// @desc Get all contacts
// @route GET /api/contacts
// @access Private
const getContactById = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found, Pls try another ID")
    } else {
        res.status(200).json(contact);
    }
});

// @desc Post create new contact
// @route POST /api/contacts
// @access Private
const createContact = asyncHandler( async (req, res) => {
    console.log('Create Body ', req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        res.status(400).json({ message: `Please Fill All mandatory Fields `});
    } else {
        const contact = await Contact.create({
            name, email, phone,
            user_id: req.user.id
        });
        res.status(200).json({
            message: 'New Contact Created Sucessfully',
            item: contact
        })
    }
});

// @desc Put update specific contact
// @route PUT /api/contacts
// @access Private
const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found, Pls try another ID")
    }
    if(contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User Don't have permission to update other user contacts!");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.status(200).json({
        message: `Contact Updated Sucessfully for ${req.params.id}`,
        updatedData: updatedContact
    })
});

// @desc Delete specific contact
// @route DELETE /api/contacts
// @access Private
const deleteContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact Not Found, Pls try another ID")
    }
    if(contact.user_id.toString() != req.user.id) {
        res.status(403);
        throw new Error("User Don't have permission to update other user contacts!");
    }
    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json({message: `Contact Deleted SucessFully ${req.params.id}`})
});
module.exports = { getAllContacts, getContactById, createContact, updateContact, deleteContact };