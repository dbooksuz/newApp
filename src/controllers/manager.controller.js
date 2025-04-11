const ManagerModel = require("../models/manager.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { generateRefreshToken } = require("../utils/generateRefreshToken");






exports.createManager = async (req, res) => {
    try {
        const { username, password } = req.body;
        const superAdminId = req.use.id;
        const hashedPassword = await bcrypt.hash(password, 10);
        const refreshToken = generateRefreshToken({ username, superAdminId });
        const newManager = new ManagerModel({
            username,
            password: hashedPassword,
            superAdminId: ObjectId(superAdminId),
            refreshToken,
        });
        await newManager.save();
        res.status(201).json({
            success: true,
            message: "Manager created successfully",
            data: {
                username,
                superAdminId,
                refreshToken,
            },
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}
exports.getAllManagers = async (req, res) => {
    try {
        const managers = await ManagerModel.find({}).populate("superAdminId", "username");
        res.status(200).json({
            success: true,
            message: "Managers fetched successfully",
            data: managers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getManagerById = async (req, res) => {
    try {
        const { id } = req.params;
        const manager = await ManagerModel.findById(id).populate("superAdminId", "username");
        if (!manager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Manager fetched successfully",
            data: manager,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateManager = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedManager = await ManagerModel.findByIdAndUpdate(
            id,
            { username, password: hashedPassword },
            { new: true }
        ).populate("superAdminId", "username");
        if (!updatedManager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Manager updated successfully",
            data: updatedManager,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.deleteManager = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedManager = await ManagerModel.findByIdAndDelete(id);
        if (!deletedManager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Manager deleted successfully",
            data: deletedManager,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.updateManagerPassword = async (req, res) => {
    try {
        const { id } = req.params;
        const { password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedManager = await ManagerModel.findByIdAndUpdate(
            id,
            { password: hashedPassword },
            { new: true }
        );
        if (!updatedManager) {
            return res.status(404).json({
                success: false,
                message: "Manager not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Manager password updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};