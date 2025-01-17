const axios = require('axios');
const { addOrUpdateBook } = require('./dynamo');
const api_key= "AIzaSyCjwhSIgdkYdpqZN7a26Z2CRPKSGylNGxE";

const seedData = async () => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=the&maxResults=20&key=${api_key}`;
    try {
        const { data: books } = await axios.get(url);
        const bookPromises = books.items.map((book, i) => 
            addOrUpdateBook({ ...book.volumeInfo, id: i + '' })
            );
        await Promise.all(bookPromises);
    } catch (err) {
        console.error(err);
        console.log('something went wrong in fetching');
    }
};

seedData();
