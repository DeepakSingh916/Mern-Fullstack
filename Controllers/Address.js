import { Address } from "../Models/Address.js";


// get address
export const getAddress = async (req, res) => {
    const userId = req.user;

    try {
        // Find the latest address document for the user based on createdAt
        const latestAddress = await Address.findOne({ userId }).sort({ createdAt: -1 });

        if (!latestAddress) {
            return res.json({ message: "No addresses found for the user", success: false });
        }

        res.json({ address: latestAddress, success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// add address
export const addAddress = async (req, res) => {
    const userId = req.user._id; // Ensure you get the user ID correctly
    const { fullName, address, city, state, pincode, phoneNumber } = req.body;

    try {
        // Create and save the new address
        let newUserAddress = await Address.create({
            userId,
            fullName,
            address,
            city,
            state,
            pincode,
            phoneNumber
        });

        // Respond with success message and the newly created address
        res.json({
            message: "User's address added successfully",
            success: true,
            address: newUserAddress
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
