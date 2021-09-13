// viet ham phu cho mongoose

module.exports = {
    mutiMongoosetoObject: function (mgarray) {
        return mgarray.map((mgarray) => mgarray.toObject());
    },
    MongoosetoObject: function (mg) {
        return mg ? mg.toObject() : mg;
    },
};
