const mongoose = require('mongoose');
const Product = require('./models/Product');

const mongoURI = 'mongodb://localhost:27017/ecommerce';

const sampleProducts = [
  {
    name: 'Sample Product 1',
    description: 'This is a sample product 1',
    price: 19.99,
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    name: 'Sample Product 2',
    description: 'This is a sample product 2',
    price: 29.99,
    imageUrl: 'https://via.placeholder.com/150'
  },
  {
    name: 'Sample Product 3',
    description: 'This is a sample product 3',
    price: 39.99,
    imageUrl: 'https://via.placeholder.com/150'
  }
];

async function seed() {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB for seeding');

    await Product.deleteMany({});
    console.log('Cleared existing products');

    await Product.insertMany(sampleProducts);
    console.log('Inserted sample products');

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}

seed();
