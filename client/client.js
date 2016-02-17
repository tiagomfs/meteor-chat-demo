/* 
  Meteor Chat Example
  tiagomfs.net <> talk.tiagomfs.net
  https://github.com/tiagomfs/meteor-chat-demo
*/

var admins = ['AdminUserName'];

Template.messages.onCreated(function(){
  this.subscribe("messages");
});

Template.messages.helpers({
    messages: function(){
        return Messages.find({},{ sort: { time: -1 }, limit: 50 });
    }
});

Template.body.events = {
  'click .emoticons' : function (event)
  {
      $(event.target).next('dialog').show();
  },
  'click .emoticons img' : function (event)
  {
      var rep = $(event.target).data("rep");
      var message = document.getElementById('message');

      message.value += ' ' + rep + ' ';
  },
  'click .color' : function (event)
  {
      $(event.target).next('dialog').show();
  },
  'click .color p span' : function (event)
  {
      var _color = $(event.target).css('background-color');

      Meteor.users.update({ _id: Meteor.user()._id }, { $set: { 'color': _color }} );
  },  
  'click' : function (event)
  {
      $('.emoticons dialog,.color dialog').hide();
  },
  'click .onlineshow' : function (event)
  {
      $(".usersonline ul").fadeToggle();
  },
  'click .delete' : function (event)
  {
      var id = $(event.target).data("id"),
          msg = Messages.findOne(id);

      if (admins.indexOf(Meteor.user().username) != -1 || msg.name == Meteor.user().username) Messages.remove(id);
  },
  'click .ban' : function (event)
  {
      var uname = $(event.target).data("id");
      if (admins.indexOf(Meteor.user().username) != -1){

        var user = Meteor.users.findOne({ username: uname });

        Meteor.users.update({ _id: user._id }, { $set: { 'banned': true }} );

        alert('User Banned!')
      } 
  },
  'keydown input#message' : function (event) 
  {
    if (event.which == 13) { // 13 is the enter key event
      if (Meteor.user())
        var name = Meteor.user().username;
      else
        var name = 'Anonymous';
      var message = document.getElementById('message');

      if (message.value != '') {
        Messages.insert({
          name: name,
          message: message.value,
          time: Date.now(),
        });

        document.getElementById('message').value = '';
        message.value = '';
      }
    }
  }
};

Meteor.Spinner.options = {
    color: '#7B8796'
};

Meteor.subscribe('users');

Template.usersonline.helpers({
    usersOnline: function(){
        return Meteor.users.find({ "status.online": true })
    },
    usersBanned: function(){
        return Meteor.users.find({ "banned": true })
    },
    labelClass: function(){
        if (this.status.idle)
          return "warning"
        else if (this.status.online)
          return "success"
        else
          return "default"      
    }
});

Template.registerHelper('equals', function (a, b) {
  return a === b;
});

Template.registerHelper('amIbanned', function(a){
  if(Meteor.user() && Meteor.user().banned) return true;
});

Template.registerHelper('nameColor', function(a){
    
    var u = Meteor.users.findOne({ username: a });
    return u.color || '#ccc';

});

Template.registerHelper('checkBan', function(a){

    var u = Meteor.users.findOne({ username: a });
    
    if(u.banned) 
      return true;
    else
      return false;
});

Template.registerHelper('admin', function(a){
  if (admins.indexOf(Meteor.user().username) != -1) return true;
});

Template.registerHelper('is_admin', function(a){
  if (admins.indexOf(a) != -1) return true;
});

Template.registerHelper('adminButNoMe', function(a){
  if (admins.indexOf(Meteor.user().username) != -1 && Meteor.user().username != a)
    return true;
});

Template.registerHelper('adminOrAuthor', function(a){
  if (admins.indexOf(Meteor.user().username) != -1 || Meteor.user().username == a) 
    return true;
});

var emoticons = [
      {
        image: '/assets/images/emoticons/caritas_03.png',
        replacements: ['o_o', 'O_O']
      }, {
        image: '/assets/images/emoticons/caritas_05.png',
        replacements: [':D', ':-D']
      }, {
        image: '/assets/images/emoticons/caritas_07.png',
        replacements: [':)', ':-)', '=)', '=-)']
      }, {
        image: '/assets/images/emoticons/caritas_09.png',
        replacements: [':(', ':-(']
      }, {
        image: '/assets/images/emoticons/caritas_15.png',
        replacements: ['-_-']
      }, {
        image: '/assets/images/emoticons/caritas_16.png',
        replacements: [':P', ':-P']
      }, {
        image: '/assets/images/emoticons/caritas_17.png',
        replacements: [':O', ':-O', ':o']
      }, {
        image: '/assets/images/emoticons/caritas_18.png',
        replacements: [':smirk:']
      }, {
        image: '/assets/images/emoticons/caritas_23.png',
        replacements: ['>:(', ':[']
      }, {
        image: '/assets/images/emoticons/caritas_24.png',
        replacements: [':ninja:']
      }, {
        image: '/assets/images/emoticons/caritas_25.png',
        replacements: [':nerd:']
      }, {
        image: '/assets/images/emoticons/caritas_26.png',
        replacements: [':S', ':-S']
      }, {
        image: '/assets/images/emoticons/caritas_31.png',
        replacements: [':bashful:']
      }, {
        image: '/assets/images/emoticons/caritas_32.png',
        replacements: [':crying:']
      }, {
        image: '/assets/images/emoticons/caritas_33.png',
        replacements: [':puke:']
      }, {
        image: '/assets/images/emoticons/caritas_34.png',
        replacements: [':love:']
      }, {
        image: '/assets/images/emoticons/caritas_39.png',
        replacements: [':devil:']
      }, {
        image: '/assets/images/emoticons/caritas_40.png',
        replacements: [':angel:']
      }, {
        image: '/assets/images/emoticons/caritas_41.png',
        replacements: ['8)', '8-)', '(H)']
      }, {
        image: '/assets/images/emoticons/caritas_42.png',
        replacements: [':wtf:']
      }, {
        image: '/assets/images/emoticons/caritas_47.png',
        replacements: [':sweating:']
      }, {
        image: '/assets/images/emoticons/caritas_48.png',
        replacements: ['>:D']
      }, {
        image: '/assets/images/emoticons/caritas_49.png',
        replacements: [':spooked:']
      }, {
        image: '/assets/images/emoticons/caritas_50.png',
        replacements: [':embarrassed:']
      }, {
        image: '/assets/images/emoticons/caritas_55.png',
        replacements: ['O.o']
      }, {
        image: '/assets/images/emoticons/caritas_56.png',
        replacements: ['x-D']
      }, {
        image: '/assets/images/emoticons/caritas_57.png',
        replacements: [';)', ';-)']
      }, {
        image: '/assets/images/emoticons/caritas_58.png',
        replacements: [':\\', ':-\\']
      }
];

var escapeCharacters = [')', '(', '*', '[', ']', '{', '}', '|', '^', '<', '>', '\\', '?', '+', '=', '.'];
var specialRegex = new RegExp('(\\' + escapeCharacters.join('|\\') + ')', 'g');
var preMatch = '(^|[\\s\\0])';

Template.registerHelper('parseEmoticons', function(text) {
  _.each(emoticons, function(emoticon) {
    return _.each(emoticon.replacements, function(replaceStr) {
      var match;
      replaceStr = replaceStr.replace(specialRegex, '\\$1');
      match = new RegExp(preMatch + '(' + replaceStr + ')', 'gi');
      return text = text.replace(match, ' <img src="' + emoticon.image + '" height="18"> ');
    });
  });
  return text;
});