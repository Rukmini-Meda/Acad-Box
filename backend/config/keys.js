const {
    MONGODB_ATLAS_DATABASE,
    MONGODB_ATLAS_PASSWORD,
    MONGODB_ATLAS_USER
} = process.env;

module.exports = {
    mongoURI: `mongodb+srv://acadboxuser:toolboxforacademics@acadbox-cluster.bhnu6.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    secretOrKey: "secret"
}