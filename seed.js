// const mongoose = require('mongoose');
const User = require('./models/user');

const users = [
    {
        name: 'Anuj',
        email: 'anuj@ac.com',
        phone: '12343434',
        cinh: 1,
        cinm: 30,
        couth: 19,
        coutm: 30,
        inOffice: 'false'
    },
    {
        name: 'amit',
        email: 'amit@ac.com',
        phone: '12376767',
        cinh: 18,
        cinm: 30,
        inOffice: 'true'
    },
    {
        name: 'isha',
        email: 'isha@ac.com',
        phone: '129979880',
        cinh: 9,
        cinm: 00,
        inOffice: 'true'
    },
    {
        name: 'mina',
        email: 'mina@ac.com',
        phone: '5643356865',
        cinh: 8,
        cinm: 54,
        inOffice: 'true'
    }
];

const seedDB = async() => {

    await User.deleteMany({});


    await User.insertMany(users);
    console.log('DB seeded');

}

module.exports = seedDB;