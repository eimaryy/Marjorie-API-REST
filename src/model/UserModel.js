import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {type: mongoose.Schema.Types.ObjectId},
    name: {
      type: String,
      required: [true, "É necessário informar seu nome."],
      lowercase:true
    },
    lastName: {
      type: String,
      required: [true, "É necessário informar seu sobrenome."],
      lowercase:true
    },
    CPF: {
      type: String,
      required: [true, "É necessário informar seu CPF."],
      lowercase:true, 
      unique: true,
      immutable: true 
    },
    aniversario: {
      type: Date,
      required: [true, "É necessário informar a sua data de aniversário."],
      immutable: true 
    },
    email:{
      type: String,
      required: [true, "É necessário informar o seu endereço de email."],
      unique: true,
    },
    password:{
      type: String,
      required: [true, "É necessário criar uma senha."],
    },
    dateCreation: {
      type: Date,
      default: Date.now 
    },
    role:{
      type: String,
      default: "Cliente",
      immutable: true 
    }
  },
  {
    versionKey: false
  }
);

userSchema.methods.toJSON = function() {
  const user = this.toObject();
  delete user.password; 
  return user;
};

const User = mongoose.models["Users"] || mongoose.model("Users", userSchema);

export default User;