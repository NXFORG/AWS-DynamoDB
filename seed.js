const axios = require('axios');
const { addBook } = require('./dynamo');
const api_key = process.env.API_KEY;

const seedData = async () => {
    const url = `https://www.googleapis.com/books/v1/volumes?q=a,the&maxResults=20&key=${api_key}`;
    try {
        const { data: books } = await axios.get(url);
        const bookPromises = books.items.map((book, i) => 
            addBook({ ...book.volumeInfo, id: i + '', reserved: false, reserved_by: 'N/A' })
            );
        await Promise.all(bookPromises);
    } catch (err) {
        console.error(err);
        console.log('something went wrong in fetching');
    }
};

seedData();
