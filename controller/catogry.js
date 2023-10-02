import Catogry from "../models/catogrySchema.js";

//CREATE
export const createCatogry = async (req, res) => {
    try {
        const catogry = new Catogry(req.body);
        const savedCatogry = await catogry.save();
        res.status(200).send(savedCatogry);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
}

//READ
export const readCatogry = async (req, res) => {
    try {
        const id = req.params.id;
        const catogry = await Catogry.findById(id);
        if (!catogry) {
            res.status(404).send("catory not found.");
        } else {
            res.status(200).send(catogry);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

export const readAllCatogries = async (req, res) => {
    try {
        const catogry = await Catogry.find({});
        if (!catogry) {
            res.status(404).send("Brands not found.");
        } else {
            res.status(200).send(catogry);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}



//UPDATE
export const updateCatogry = async (req, res) => {
    try {
        const id = req.params.id;
        const catogry = req.body;
        const updatedCatogry = await Catogry.findByIdAndUpdate(id, catogry, { new: true });
        if (!updatedCatogry) {
            res.status(404).send("Brands not found.");
        } else {
            res.status(200).send(updatedCatogry);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//DELETE
export const deleteCatogry = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedCatogry = await Catogry.findOneAndDelete(id);
        if (!deletedCatogry) {
            res.status(404).send("Brands not found.");
        } else {
            res.status(200).send(deletedCatogry);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

