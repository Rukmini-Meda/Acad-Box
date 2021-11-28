require('dotenv').config()
const {
    MONGODB_ATLAS_DATABASE,
    MONGODB_ATLAS_PASSWORD,
    MONGODB_ATLAS_USER,
    MONGODB_ATLAS_DOMAIN,
    SECRETORKEY
} = process.env;

module.exports = {
    mongoURI: `mongodb+srv://${MONGODB_ATLAS_USER}:${MONGODB_ATLAS_PASSWORD}@${MONGODB_ATLAS_DOMAIN}/${MONGODB_ATLAS_DATABASE}?retryWrites=true&w=majority`,
    secretOrKey: `${SECRETORKEY}`
}