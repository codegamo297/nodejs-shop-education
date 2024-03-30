
module.exports = {
    mutipleMongooseToObject: function (mongooses) {
        return mongooses.map( monogoose => monogoose.toObject() )
    },
    mongooseToObject: function (mongoose) {
        return mongoose ? mongoose.toObject() : mongoose;
    }
};