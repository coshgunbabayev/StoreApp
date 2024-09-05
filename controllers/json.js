import jsonData from '../json/data.json' assert { type: 'json'};

function getCategories(req, res) {
    res.status(200).json(jsonData.categories);
};

export {
    getCategories
};