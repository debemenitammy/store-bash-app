const Product = require('../models/Product');

exports.suggestItem = async(req, res) => {
    try {
        const { item_name, item_description, item_category, reason } = req.body; //gets products data
        if( item_name && item_description && item_category && reason ) {
            const newItem = new Product({
                item_name,
                item_description,
                item_category,
                reason
            });
            const itemInfo = await newItem.save();
            itemInfo.success = true;
            res.status(201).json(itemInfo);
        } else {
            res.status(400).json({
                success: false,
                message: "new item could not be suggested"
            });
        }
    } catch(error) {
        res.status(500).json(error);
    }
};

exports.getSuggestions = async(req, res) => {
    try {
        const category = req.params.category;
        const allItems = (category) ? await Product.find({ item_category: category }) : await Product.find();
        if(allItems) {
            res.status(200).json(allItems);
        } else {
            res.status(404).json({
                success: false,
                message: "item(s) not found"
            });
        }

    } catch(error) {
        res.status(400).json(error);
    }
}