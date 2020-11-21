var mongoose =require("mongoose");

var notificationSchema=new mongoose.Schema({
    username:String,
    isRead:{type:Boolean,default:false}
});

module.exports=mongoose.model("Notifications",notificationSchema);