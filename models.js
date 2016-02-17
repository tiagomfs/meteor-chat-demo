/* 
	Meteor Chat Example
	tiagomfs.net <> talk.tiagomfs.net
	https://github.com/tiagomfs/meteor-chat-demo
*/

Messages = new Meteor.Collection('messages');

function adminUser(userId) {

	var admins = ['AdminUserName'];
	
    var adminUser = Meteor.users.findOne({ username: "AdminUserName" });
    return (userId && adminUser && userId === adminUser._id);
}

function checkUser(userId) {
    var user = Meteor.users.findOne(userId);
    return user.username;
}

Meteor.users.allow({  
	update: function(userId, doc){
        return adminUser(userId) || doc._id === userId;
	}
});

Messages.allow({  
	insert: function(userId, doc){
		return !! userId;  
	},
	remove: function(userId, doc){
        return adminUser(userId) || doc.name === checkUser(userId);
	},
	fetch: ['name']
});