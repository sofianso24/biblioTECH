import mongoose from "mongoose"

export const categorieModel = ()=>{}

const Schema = mongoose.Schema

const categorieSchema = new Schema(
    {
       titre : {
        type : String,
        required : true,
        unique : true
       }
    }
)

export const Categorie = mongoose.model("categorie",categorieSchema)

