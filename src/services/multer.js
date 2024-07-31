import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function(req, file, cb){
    cb(null, "uploads/");
  },
  filename: function(req, file, cb){
    cb(null, Date.now() + path.extname(file.originalname));
  }
}); 

const upload = multer({storage});

export default upload;

export const deleteImage = (oldPath) => {
  fs.unlink(`uploads//${oldPath}`, (err) => {
    if (err) {
      return console.error("Erro ao excluir arquivo: ", err);
    }
  });
};

