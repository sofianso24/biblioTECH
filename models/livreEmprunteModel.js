import mongoose from "mongoose"

export const livreEmprunteModel = ()=>{}

const Schema = mongoose.Schema

const livreEmprunteSchema = new Schema (
    {
       utilisateur : {
          type : Schema.Types.ObjectId,
          ref : "utilisateur"
       },
       livre : {
        type : Schema.Types.ObjectId,
        ref : "livre"
       },
       date_emprunt :{
         type : Date,
         required : true
       },
       date_echeance : {
            type : Date,
            required : true
       },
       date_retour : {
        type : Date,
       }
    }
)

export const LivreEmprunte = mongoose.model("livreEmprunte",livreEmprunteSchema)