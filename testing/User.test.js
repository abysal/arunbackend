const User = require('../Model/User');
const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/testing'; // use the new name of the database 

beforeAll(async () => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useCreateIndex: true
    });
});

afterAll(async () => {

    await mongoose.connection.close();
});

describe('User  Schema test', () => {
    var id='';
    it('Add User testing', () => {
        const user = {
            'Username': 'Abhi'
        };
        return User.create(user)
            .then((users) => {
                id=users._id;
                expect(users.Username).toEqual('Abhi');
            });
    });

    //update delete
    it('updateuser testing', () => {

        const userup = {

            Username: 'hello2'
        }
        console.log(id)
        return User.findByIdAndUpdate(id,userup, { new: true })
            .then((userupd) => {
                expect(userupd.Username).toEqual('he');
            });
    });
    it('to test the delete user is working or not', async () => { 
                const status = await User.deleteMany();        
                 expect(status.ok).toBe(1); });      
}) 