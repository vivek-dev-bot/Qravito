import mongoose  from "mongoose";

export const connectDB = async() => {
    await mongoose.connect('mongodb+srv://vivekchaurasia2113_db_user:oMcFbqRLQ8lEfDS2@fooddelive.signrig.mongodb.net/?appName=fooddelive')
    .then(() => console.log("DB connected"));
}