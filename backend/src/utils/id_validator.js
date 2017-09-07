module.exports = _id =>  (_id ? /^[0-9a-fA-F]{24}$/.test(_id) : false);
