import Brand from "../models/brandSchema.js";

//CREATE
export const createBrand = async (req, res) => {
    try {
        const brand = new Brand(req.body);
        const savedBrand = await brand.save();
        res.status(200).send(savedBrand);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

//READ
export const readBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const brand = await Brand.findById(id);
        if (!brand) {
            res.status(404).send("Brands not found.");
        } else {
            res.status(200).send(brand);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

export const readAllBrands = async (req, res) => {
    try {
        const brands = await Brand.find({});
        if (!brands) {
            res.status(404).send("Brands not found.");
        } else {
            res.status(200).send(brands);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}



//UPDATE
export const updateBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const brand = req.body;
        const updatedBrands = await Brand.findByIdAndUpdate(id, brand, { new: true });
        if (!updatedBrands) {
            res.status(404).send("Brands not found.");
        } else {
            res.status(200).send(updatedBrands);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//DELETE
export const deleteBrand = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedBrands = await Brand.findOneAndDelete(id);
        if (!deletedBrands) {
            res.status(404).send("Brands not found.");
        } else {
            res.status(200).send(deletedBrands);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

