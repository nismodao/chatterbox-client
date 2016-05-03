// YOUR CODE HERE:

var app = {};
var counter = 0;


app.server = 'https://api.parse.com/1/classes/messages';

app.init = function() {
  $(".username").click(function () { 
    var userName = $(this).html();
    console.log(app.addFriend);
    app.addFriend(userName);
  });

  $('#send .submit').submit(function(event) {
    event.preventDefault();
    console.log('submittttting');
    counter++;
    var message = $('#message').val();
    app.handleSubmit(message);
  });  


};

app.send = function(message) {

  console.log('attempt to send');
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'https://api.parse.com/1/classes/messages',
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Data received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to get messages', data);
    }
  });
};

app.clearMessages = function() {
  $("#chats").html("");
};

app.addMessage = function(message) {
  var text = message.text;
  var user = message.username;
  var room = message.roomname;

  var $chat = $('<div class=message>' + 
      '<span class=username>' + user + '</span>' + ':\n' + 
      '<p class=msg>' + text + '</p>' + 
    '</div>');
  $chat.appendTo('#chats');
  // $('#chats').append('<span></span>');
};

app.addRoom = function(roomName) {
  $('#roomSelect').append('<span></span>');
};

app.friendsList = {};

app.addFriend = function (friendName) {
  app.friendsList[friendName] = true;
  $('#main').append('<div class = username>'+ friendName + '</div>');
  //$('#main > .username').html(friendName); /// class = username
};

app.handleSubmit = function( message ) {

  app.send(message);
};

app.init();




