const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./src/models/User');
const ReturnMods = require('./src/models/ReturnMods')

const MONGODB_URI = 'mongodb://localhost:27017/shkr_db';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        Promise.all([seedUserDatabase(), seedModDatabase()])
            .then(() => {
                console.log('Database seeded successfully');
                mongoose.connection.close();
            })
            .catch(error => {
                console.error('Error seeding database', error);
                mongoose.connection.close();
            });
    })
    .catch(error => console.error('Error connecting to MongoDB', error));

async function seedUserDatabase() {
    try {
        // delete any existing users
        await User.deleteMany({});

        // create some new users
        const users = [
            {
                email: 'patrick@nomail.com',
                username: 'Patrick',
                password: await bcrypt.hash('password', 10)
            },
            {
                email: 'nassy@nomail.com',
                username: 'Nassy',
                password: await bcrypt.hash('bananas', 10)
            },
        ];

        // save the new users to the database
        await User.insertMany(users);

    } catch (error) {
        console.error('Error seeding User database', error);
        throw error;
    }
}

async function seedModDatabase() {
    try {
        // delete any existing return mods
        await ReturnMods.deleteMany({});
    
        // create some new return mods
        const returnMods = [
          {
            vodka: 'Grey Goose',
            rum: 'Mount Gay Eclipse',
            scotch: "Ballentine's",
            bourbon: 'Woodford Reserve',
            tequila: 'El Jimador',
            gin: 'Beefeater',
            forbidden: ['martini', 'margarita']
          }
        ];
    
        // save the new return mods to the database
        await ReturnMods.insertMany(returnMods);
        
      } catch (error) {
        console.error('Error seeding ReturnMods database', error);
        throw error;
     }
}
