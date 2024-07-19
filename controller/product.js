import { tempDir } from "../middleware/multerMidelWare.js";
import Product from "../models/productShema.js";

//CREATE
//  used for data base operations
const findAndUpdater = async () => {
    try {
        const result = await Product.updateMany({}, { $mul: { price: 85 } });
        console.log(`${result.nModified} products updated.`);
    } catch (error) {
        console.error('Error updating product prices:', error);
    }
};

//CREATE
export const createProduct = async (req, res) => {
    try {
        const product = req.body;
        let uploadedFiles = [];
        const files = req.files;

        // Validate thumbnail presence
        if (!product?.thumbnail && !files?.thumbnail) {
            return res.status(400).json({ success: false, message: 'Thumbnail is necessary!' });
        }

        // Check and set thumbnail file path
        if (files?.thumbnail && files.thumbnail[0]) {
            product.thumbnail = tempDir + files.thumbnail[0].filename;
        };


        // Handle images
        if ((files?.images?.length > 0) || (product?.images?.length > 0)) {
            if (files?.images?.length > 0) {
                uploadedFiles = files.images.map(file => tempDir + file.filename);
            }
            if (product?.images?.length > 0) {
                uploadedFiles = [...uploadedFiles, ...product.images];
            }
        } else {
            return res.status(400).json({ success: false, message: 'No files uploaded or invalid file type!' });
        }

        product.images = uploadedFiles;

        // Save product in the database
        const savedProduct = await new Product(product).save();

        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: savedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: error._message,
            error: error
        });
    }
}

//READ
export const readProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            res.status(404).json({ success: false, message: "Product not found." });
        } else {
            res.status(200).json({ success: true, message: "Product found.", data: product });
        }
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
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

        const totalItems = await Product.find(query).countDocuments();
        const totalPages = Math.ceil(totalItems / _limit);

        const sortedAndMatchedDocuments = await Product.find(query)
            .sort({ [_sort]: _order === 'asc' ? 1 : -1 })
            .skip(((_page - 1) * _limit))
            .limit(_limit);

        res.set('X-Total-Count', totalItems);

        res.status(200).json({
            success: true,
            data: sortedAndMatchedDocuments,
            totalItems,
            totalPages,
            currentPage: parseInt(_page),
            itemsPerPage: parseInt(_limit)
        });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
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
        let uploadedFiles = [];
        const files = req.files;

        // Validate thumbnail presence
        if (!product?.thumbnail && !files?.thumbnail) {
            return res.status(400).json({ success: false, message: 'Thumbnail is necessary!' });
        }

        // Check and set thumbnail file path
        if (files?.thumbnail && files.thumbnail[0]) {
            product.thumbnail = tempDir + files.thumbnail[0].filename;
        }

        // Handle images
        if ((files?.images?.length > 0) || (product?.images?.length > 0)) {
            if (files?.images?.length > 0) {
                uploadedFiles = files.images.map(file => tempDir + file.filename);
            }
            if (product?.images?.length > 0) {
                uploadedFiles = [...uploadedFiles, ...product.images];
            }
        } else {
            return res.status(400).json({ success: false, message: 'No files uploaded or invalid file type!' });
        }

        product.images = uploadedFiles;


        // Update product in the database
        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: 'Product not found.' });
        } else {
            return res.status(200).json({ success: true, message: 'Product updated successfully', data: updatedProduct });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: 'An error occurred', error: error.message });
    }
};


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

