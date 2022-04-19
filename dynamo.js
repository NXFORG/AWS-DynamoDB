const AWS = require('aws-sdk');
require('dotenv').config();

const AWS_ACCESS_KEY_ID=process.env.AWS_ACCESS_KEY_ID;
const AWS_SECRET_ACCESS_KEY=process.env.AWS_SECRET_ACCESS_KEY
const AWS_DEFAULT_REGION=process.env.AWS_DEFAULT_REGION
AWS.config.update({
    region: AWS_DEFAULT_REGION,
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_ACCESS_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'BookList';
const USER_TABLE = 'Users';
const getBooks = async () => {
    const params = {
        TableName: TABLE_NAME,
    };
    const books = await dynamoClient.scan(params).promise();
    return books;
};

const getBookByTitle = async (name) => {
    const params = {
        TableName: TABLE_NAME,
        FilterExpression: 'begins_with(title, :title)',
        ExpressionAttributeValues: {
            ':title': `${name}`
        },
    };
    return await dynamoClient.scan(params).promise();
};

const getUserByEmail = async (email) => {
    const params = {
        TableName: USER_TABLE,
        FilterExpression: 'email = :email',
        ExpressionAttributeValues: {
            ':email': `${email}`
        },
    };
    return await dynamoClient.scan(params).promise();
};

const addBook = async (book) => {
    const params = {
        TableName: TABLE_NAME,
        Item: book,
    };
    return await dynamoClient.put(params).promise();
};

const addUser = async (user) => {
    const params = {
        TableName: USER_TABLE,
        Item: user,
    };
    return await dynamoClient.put(params).promise();
};

const updateBook = async (book,id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id: id,
        },
        UpdateExpression: 'set reserved = :r',
        ExpressionAttributeValues: {
            ':r': book.reserved,
        },
    };
    return await dynamoClient.update(params).promise();
};

const deleteBook = async (id) => {
    const params = {
        TableName: TABLE_NAME,
        Key: {
            id,
        },
    };
    return await dynamoClient.delete(params).promise();
};

module.exports = {
    dynamoClient,
    getBooks,
    getBookByTitle,
    getUserByEmail,
    addBook,
    addUser,
    updateBook,
    deleteBook,
};