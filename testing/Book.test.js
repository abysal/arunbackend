const Book = require('../model/Book');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/testing';
beforeAll(async () => {
   await mongoose.connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true
   });
});
afterAll(async () => {
   await mongoose.connection.close();
});
describe('addbook testing', () => {
   var id='';
   // Adding book
   it('addbook testing', () => {
      const book = {
         Bookname: 'hello',
         Booktype: 'action',
         Bookauthor: 'Adele',
         Bookprice: '8888',
         BookImageName: 'asdf.jpg'
      };

      return Book.create(book)
         .then((book_res) => {
            id=book_res._id;
            expect(book_res.Bookname).toEqual('hello');
         });
   });

   //update delete
   it('updatebook testing', () => {
     
      const bookup = {
         
         Bookname: 'he'
      }
      console.log(id)
      return Book.findByIdAndUpdate(id,bookup,{ new: true })
         .then((bookupd) => {
            expect(bookupd.Bookname).toEqual('he');
         });
   });

   // // book delete testing
      it(' delete', async () => {
         const status = await Book.deleteMany({Booktype:'action'});
         expect(status.ok).toBe(1);
      });
    
   });
