var mongoose =require("mongoose");

var notificationSchema=new mongoose.Schema({
    content : {
        type: String
    },
    link : {
        type:String
    },
    isRead:{type:Boolean,default:false}
});

module.exports=mongoose.model("Notifications",notificationSchema);