import Product from "../models/productShema.js";

//CREATE
export const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        const savedProduct = await product.save();
        res.status(200).send(savedProduct);
    } catch (error) {
        res.status(400).send(error);
    }
}

//READ
export const readProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).send("Product not found.");
        } else {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

export const readAllProductsByFilter = async (req, res) => {
    try {
        const {
            category = [], // Default to an empty array if not provided
            brand = [],    // Default to an empty array if not provided
            _sort = '_id',
            _order = 'asc',
            _page = 1,
            _limit = 9,
        } = req.query;

        // Create a function to build the query based on provided parameters
        const buildQuery = () => {
            const query = {};

            if (brand.length > 0) {
                query.brand = { $in: brand };
            }

            if (category.length > 0) {
                query.category = { $in: category };
            }

            return query;
        };

        const query = buildQuery();

        const sortedAndMatchedDocuments = await Product.find(query)
            .sort({ [_sort]: _order })
            .skip(((_page - 1) * _limit))
            .limit(_limit);

        const totalItems = await Product.find(query).countDocuments();
        res.set('X-Total-Count', totalItems);
        res.status(200).send(sortedAndMatchedDocuments);
    } catch (error) {
        res.status(400).send(error);
    }
};

export const readAllProducts = async (req, res) => {
    try {
        const product = await Product.find({});
        if (!product) {
            res.status(404).send("Product not found.");
        } else {
            res.status(200).send(product);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}



//UPDATE
export const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            res.status(404).send("Product not found.");
        } else {
            res.status(200).send(updatedProduct);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//DELETE
export const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedProduct = await Product.findOneAndDelete(id);
        if (!deletedProduct) {
            res.status(404).send("Product not found.");
        } else {
            res.status(200).send({ message: 'user deleted' });
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

