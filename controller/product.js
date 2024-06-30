import Product from "../models/productShema.js";

//CREATE
export const createProduct = async (req, res) => {
    try {

        const imagesResponse = [];
        if (req.files && req.files.length > 0) {
            const uploadedFiles = req.files.map(file => `uploads/${file.filename}`);

            const Tempres = {
                success: true,
                message: 'Files uploaded!',
                files: uploadedFiles,
                formData: req.body // Include other form data in the response
            }
            imagesResponse.push(Tempres);
            res.status(200).json(imagesResponse);
        } else {
            res.status(400).json({ success: false, message: 'No files uploaded or invalid file type!' });
        }

        // temp not
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
    /*  NOTE:-
            1) use can send the all the data new 
            2) user can send the thumbnail new and the other images as same path
            3) when some thing is updating then we will get that image as the file object 
            4) or else we get the images in the request body 
            5) how can we know that which image is updated and which is not 

            we have to fix this issue in the future
            6) we have to delet the images also


    */
    try {
        const id = req.params.id;
        const product = req.body;
        let uploadedFiles = []
        const imagesResponse = [];
        console.log(req.files);
        console.log(req.body)
        if (req.files.images && req.files.images.length > 0) {
            uploadedFiles = req.files.images.map(file => `uploads/${file.filename}`);
        } else {
            res.status(400).json({ success: false, message: 'No files uploaded or invalid file type!' });
            return;
        }
        product.thumbnail = req.files.thumbnail.map(file => `uploads/${file.filename}`)[0];
        product.images = uploadedFiles;



        const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
        if (!updatedProduct) {
            res.status(404).send("Product not found.");
        } else {
            res.status(200).send(updatedProduct);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "error occure", error: error });
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

