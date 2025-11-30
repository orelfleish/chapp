import {generateToken} from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import cloudinary from "../lib/cloudinary.js";

export const signup = async (req,res) => {
    const {fullName, email, password} = req.body;
    try {
        if (!fullName || !email || !password) {
            return res.status(400).json({message: "All fields must be provided"});
        }

        // {email address validation should be here}

        if ( password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters"});
        }
        const user = await User.findOne({email});
        if (user) return res.status(400).json({ message: "Email already exists"});

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            fullName: fullName,
            email: email,
            password: hashPassword
        });

        if (newUser){
            generateToken(newUser._id, res);
            await newUser.save();
            res.status(201).json({ 
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                profilePic: newUser.profilPic,
            });  
        } else {
            res.status(400).json({ message: "Invalid user data" });
            res.status(500).json({ message: "Server error"});
        }

    } catch (err) {
        console.log("Error in signup", err.message);
    }
};

export const login = async (req,res) => {
    const {email, password} = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields must be provide"});
        }
        const user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials"});
        }
        generateToken(user._id, res);
        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            profilPic: user.profilPic,
        });

    } catch (error) {
        console.log("Error in login controller",error);
        res.status(500).json({ message: "Server error"});
    }
};

export const logout = (req,res) => {
    try {
        res.cookie("jwt", "", {maxAge: 0});
        res.status(200).json({ message: "Logged out successfully"});
    } catch (err) {
        console.log("Error in logout controller", err);
        res.status(500).json({ message: "Server error"});
    }
};

export const updateProfile = async (req,res) => {
    try {
        const {profilePic} = req.body;
        const userId = req.user._id;
        if (!profilePic) {
            return res.status(400).json({ message: "Profile pic is required"});
        }
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        const updatedUser = await User.findByIdAndUpdate(userId,{profilePic: uploadResponse.secure_url}, {new: true});
        res.status(200).json(updatedUser);
    } catch (error) {
        console.log("Error in update profile", error);
        res.status(500).json({message: "Server error"});
    }
};

export const checkAuth = (req,res) => {
    try {
        res.status(200).json(req.user);
    } catch (error) {
        console.log("Error in checkAuth controller", error.message);
        res.status(500).json({message: "Server Error"});
    }
};