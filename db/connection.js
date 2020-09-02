const mongoose = require('mongoose');
class DBConnection {
    async connect(address) {
        try {
        await mongoose.connect(address,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
        console.log("DB Connected");
        } catch(err) {
            console.log(err);
        }
    } 
}

module.exports = new DBConnection();