const express = require('express');
const router = express.Router();
const { getEntries, getEntry, createEntry, deleteEntry, updateEntry } = require('../controllers/entryController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getEntries).post(protect, createEntry);

router.route('/:id').get(protect, getEntry).delete(protect, deleteEntry).put(protect, updateEntry);

module.exports = router;