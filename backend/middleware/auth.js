import jwt from "jsonwebtoken"

const authMiddleware = async (req, res, next) => {

    const token = req.headers.token;

    if (!token) {
        return res.json({ success:false, message:"Not authorized, login again" })
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;   // ✅ FIX HERE

        next();

    } catch (error) {

        console.log(error);

        return res.json({ success:false, message:"Invalid token" })
    }
}

export default authMiddleware;