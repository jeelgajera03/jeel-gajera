const router = require('express').Router();
const Item = require('../models/Item');

// GET all items
router.route('/').get(async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: 'Error retrieving items', error: err.message });
    }
});

// POST add a new item
router.route('/add').post(async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }

    const newItem = new Item({ name, description });

    try {
        await newItem.save();
        res.status(201).json({ message: 'Item added!' });
    } catch (err) {
        res.status(400).json({ message: 'Error adding item', error: err.message });
    }
});

// DELETE an item by ID
router.route('/delete/:id').delete(async (req, res) => {
    const id = req.params.id;

    if (!id) {
        return res.status(400).json({ message: 'ID parameter is required' });
    }

    try {
        const result = await Item.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json({ message: 'Item successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting item', error: err.message });
    }
});


// PUT update an item by ID
router.route('/update/:id').put(async (req, res) => {
    const id = req.params.id;
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ message: 'Name and description are required' });
    }

    try {
        const updatedItem = await Item.findByIdAndUpdate(id, { name, description }, { new: true });

        if (!updatedItem) {
            return res.status(404).json({ message: 'Item not found' });
        }

        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(500).json({ message: 'Error updating item', error: err.message });
    }
});

module.exports = router;
