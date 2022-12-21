const asyncHandler = require('express-async-handler');

const User = require('../models/userModel');
const Entry = require('../models/entryModel');

// @desc   Get user entries
// @route  GET /api/entries
// @access Private
const getEntries = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const entries = await Entry.find({ user: req.user.id });

    res.status(200).json(entries);
});

// @desc   Create new entry
// @route  POST /api/entry
// @access Private
const createEntry = asyncHandler(async (req, res) => {
    const { coin, price, amount } = req.body;

    if (!coin || !price || !amount) {
        res.status(400);
        throw new Error('Please add a coin, price and amount');
    }

    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const entry = await Entry.create({
        coin,
        price,
        amount,
        user: req.user.id,
        status: 'buy',
    });

    res.status(201).json(entry);
});

// @desc   Get user entry
// @route  GET /api/entries/:id
// @access Private
const getEntry = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const entry = await Entry.findById(req.params.id);

    if (!entry) {
        res.status(404);
        throw new Error('Entry not found');
    }

    if (entry.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    res.status(200).json(entry);
});

// @desc   Delete entry
// @route  DELETE /api/entries/:id
// @access Private
const deleteEntry = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const entry = await Entry.findById(req.params.id);

    if (!entry) {
        res.status(404);
        throw new Error('Entry not found');
    }

    if (entry.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    await entry.remove();

    res.status(200).json({ success: true });
});

// @desc   Update entry
// @route  PUT /api/entries/:id
// @access Private
const updateEntry = asyncHandler(async (req, res) => {
    // Get user using the id in the JWT
    const user = await User.findById(req.user.id);

    if (!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const entry = await Entry.findById(req.params.id);

    if (!entry) {
        res.status(404);
        throw new Error('Entry not found');
    }

    if (entry.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    const updatedEntry = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true })

    res.status(200).json(updatedEntry);
});

module.exports = {
    getEntries,
    getEntry,
    createEntry,
    deleteEntry,
    updateEntry,
}