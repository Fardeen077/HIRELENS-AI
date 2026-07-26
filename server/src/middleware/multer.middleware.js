import multer from "multer";
// import public from "../../public/temp"

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./public/temp");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const fileFilter = (req, file, cb)=> {
    if(file.mimetype === "application/pdf") {
        cb(null, true)
    } else {
        cb(new Error("Only PDF files are allowed"), false);
    }  
}

const imageFilter = (req, file, cb)=> {
    if(file.mimetype === "application/png") {
        cb(null, true)
    } else {
        cb(new Error("Only png image are allowed"))
    }
}
// pdf upload only
export const upload = multer({
    storage,
    fileFilter,
});
// image upload only
export const uploadImage = multer({
    storage,
    imageFilter
})
