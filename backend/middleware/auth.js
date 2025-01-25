import jwt from "jsonwebtoken"

const authMiddleware = (req, res, next) => {

    try {

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.json({ success:false, message:"Not authorized" })
        }

        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.userId = decoded.id;

        next();

    } catch (error) {
        console.log(error);
        return res.json({ success:false, message:"Invalid token" })
    }
}

export default authMiddleware;