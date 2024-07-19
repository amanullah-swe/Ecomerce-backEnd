import User from "../models/user.js";

//CREATE

//READ
export const readUser = async (req, res) => {
    try {
        const id = req.userId;
        const user = await User.findById(id);
        const { email, name, addresses, _id, role, profileImage } = user
        if (!user) {
            res.status(404).send("user not found.");
        } else {
            delete user.password;
            res.status(200).send({ email, name, addresses, id: _id, role, profileImage });
        }
    } catch (error) {
        res.status(400).send(error);
    }
}


//UPDATE
export const updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = req.body;
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        if (!updatedUser) {
            res.status(404).send("user not updated.");
        } else {
            res.status(200).send(updatedUser);
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

//DELETE
export const deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deletedUser = await User.findOneAndDelete(id);
        if (!deletedUser) {
            res.status(404).send("user not found.");
        } else {
            res.status(200).send('user deleted');
        }
    } catch (error) {
        res.status(400).send(error);
    }
}

