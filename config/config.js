let config = {
    mongoDB: {
        dbURI: process.env.mongoDBURI,
        options: {
            useNewUrlParser: true,
            useCreateIndex: true
        }
    },
    cloudinary: {
        cloud_name: process.env.cloudinaryCloudName,
        api_key: process.env.cloudinaryApiKey,
        api_secret: process.env.cloudinaryApiSecret
    },
    sendGrid: {
        service: 'SendGrid',
        auth: {
            user: process.env.sendGridUser,
            pass: process.env.sendGridPass
        }
    }
};

module.exports = config;