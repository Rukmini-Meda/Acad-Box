const {
    MONGODB_ATLAS_DATABASE,
    MONGODB_ATLAS_PASSWORD,
    MONGODB_ATLAS_USER
} = process.env;

module.exports = {
    mongoURI: `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@acadbox-cluster.bhnu6.mongodb.net/${MONGODB_ATLAS_DATABASE}?retryWrites=true&w=majority`,
    secretOrKey: "secret"
}