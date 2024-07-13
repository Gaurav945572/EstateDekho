import bcrypt from "bcryptjs";
import User from "../model/user_model.js";
export const test  = (req,res)=>{
    res.json({
        "message":"User API is working!"
    })
};


export const updateUser = async (req, res) => {
    if (req.user.id !== req.params.id) {
        return res.status(407).json({ message: "You can update your own account only." });
    }

    try {
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 12);
        }

        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                avatar: req.body.avatar,
                password: req.body.password
            }
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password, ...rest } = updatedUser._doc;
        res.status(200).json(rest);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred while updating the user" });
    }
};
