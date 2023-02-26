const Product = require('../models/product');

const getAllProducts = async (req, res) => {
  const { company, name, featured, sort, select } = req.query;
  const queryObject = {};

  if (company) {
    queryObject.company = company;
  }

  if (featured) {
    queryObject.company = featured;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  let apiData = Product.find(queryObject);

  if (sort) {
    let sortFix = sort.replace(',', ' ');
    apiData = apiData.sort(sortFix);
  }

  if (select) {
    // let selectFix = sort.replace(',', ' ');
    let selectFix = select.split(',').join(' ');
    apiData = apiData.select(selectFix);
  }

  let page = req.query.page || 1;
  let limit = re.query.limit || 3;
  let skip = (page - 1) * limit;

  console.log(queryObject);

  const myData = await apiData;
  res.status(200).json({ myData, nbHits: myData.length });
};

const getAllProductsTesting = async (req, res) => {
  const myData = await Product.find(req.query);
  res.status(200).json({ myData });
};

module.exports = { getAllProducts, getAllProductsTesting };
