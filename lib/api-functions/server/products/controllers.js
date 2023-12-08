import Product from "@/lib/api-functions/server/products/models";

//get products - all or single
const getProducts = async (req, res) => {
    console.log('REQ PARAMS', req.params.id)
  const { id } = req.params;

  if (process.env.NODE_ENV === "production") {
    res.setHeader("Cache-Control", "s-maxage=10", "stale-while-revalidate");
  }

  const query = {};

  if (id) {
    query._id = id;
  }

  try {
    const products = await Product.find(query);
    res.status(200).send(products);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const addProduct = async (req, res) => {
  const productData = { ...req.body };

  if (productData.image === "") {
    delete productData.image;
  }
  try {
    const product = new Product(productData);
    await product.save();
    res.status(201).send(product);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

const updateProduct = async (req, res) => {
    const {id} = req.params;

  if (!id) {
    return res.status(400).json({message: 'No id provided to update'})
  }

  const query = {
    _id: id
  }

  const productData = { ...req.body };

  if (productData.image === "") {
    delete productData.image;
  }

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      productData,
      { new: true, runValidators: true }
    );
    res.status(200).send(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
};

const removeProduct = async (req, res) => {
    const {id} = req.params;

  if (!id) {
    return res.status(400).json({message: 'No id provided to delete'})
  }

  const query = {
    _id: id
  }

  try {
    await Product.findByIdAndDelete(query)
    res.status(204).send()
  } catch (err) {
    console.error(err);
    res.status(500).send(err);

  }
};

export { getProducts, addProduct, updateProduct, removeProduct}