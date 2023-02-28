import mongoose from "mongoose";

export const livreModel =()=>{}

const Schema = mongoose.Schema

const livreSchema = new Schema(
    {
     
       categorie : {
             type : Schema.Types.ObjectId,
             ref : "categorie" 
       },               

        titre : {
            type : String,
            required :true
        },
        auteur :{
            type : String,
            required :true
        },
        copies_disponibles:{
            type: String,
            required : true
        }
    }
)

export const Livre = mongoose.model("livre",livreSchema)



