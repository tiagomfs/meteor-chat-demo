/* 
	Meteor Chat Example
	tiagomfs.net <> talk.tiagomfs.net
	https://github.com/tiagomfs/meteor-chat-demo
*/

Meteor.publish("bannedUsers", function(name){
	return Meteor.users.find({ "banned": true });
});

Meteor.publish("messages", function(){
	return Messages.find({}, {sort:{time: -1}, limit: 50});
});

Meteor.publish("userStatus", function() {
  return Meteor.users.find({ "status.online": true });
});

Meteor.publish("users", function() {
  return Meteor.users.find({});
});

Accounts.validateNewUser(function (user) {

	var isAlreadyRegistered = Meteor.users.findOne({ "username": { $regex : new RegExp(user.username, "i") }} );

	if(isAlreadyRegistered) {
		throw new Meteor.Error(403, "User already exists!");
	}
	else {
		return true;
	}

});