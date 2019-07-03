const mongoose=require("mongoose");

const bookSchema = mongoose.Schema({
    Bookname:{
        type:String
    },
    Booktype:{
        type:String
    },
    Bookauthor:{
        type:String
    },
    Bookprice:{
        type:String
    },
    BookImageName:{
        type:String
    }
});
const Book=mongoose.model("Book",bookSchema);
module.exports=Book;
