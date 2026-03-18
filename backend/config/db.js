import mongoose from "mongoose";

export const connectDB=async () => {
await mongoose.connect('mongodb+srv://khyati_db_user:invoice1234@cluster0.to70dav.mongodb.net/InvoiceAI')
     .then(()=>{
        console.log('DB CONNECTED');
        
     })
}