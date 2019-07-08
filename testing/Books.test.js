const User = require('../Model/User');
 const mongoose = require('mongoose');
 const url = 'mongodb://localhost:27017/testing'; // use the new name of the database 
 
beforeAll(async () => {  
       await mongoose.connect(url, {         
           useNewUrlParser: true, 
        useCreateIndex: true     }); }); 
 
afterAll(async () => { 
 
    await mongoose.connection.close(); }); 
 
describe('User  Schema test', () => {    
     it('Add User testing', () => {         
         const user = {             
             'Username': 'Abhi'      
             };                  
             return User.create(user)             
             .then((users) => {                 
                 expect(users.Username).toEqual('Abhi');            
                 });
                     }); 
 
    // it('to test the delete user is working or not', async () => { 
    //             const status = await User.deleteMany();        
    //              expect(status.ok).toBe(1); });      
}) 