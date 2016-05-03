// YOUR CODE HERE:

var app = {};
var counter = 0;

app.currRoom = "All Rooms";

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function() {
  // listen for click on username
  $(".username").click(function (e) {
    e.preventDefault();
    var userName = $(this).html();
    console.log(app.addFriend);
    app.addFriend(userName);
  });

  //listen for submit button click
  $('#send .submit').click(function(event) {
    event.preventDefault();
    console.log('submittttting');
    counter++;
    var message = $('#message').val();
    app.handleSubmit(message);
  });  

  //listen for selection of room name
  $('#roomselect').on('change', function() {
    var rmName = $('#roomselect option:selected').text();
    app.currRoom = rmName;
    app.clearMessages();
    app.fetch();

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
      console.log("Message sent is", data);
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
      parseData(data);
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
      '<span class=username>' + '</span>' + ':\n' + 
      '<p class=msg>' + '</p>' + 
    '</div>');
  $chat.find('.username').text(user);
  $chat.find('.msg').text(text);
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
  var messageObject = {};
  messageObject.text = message;
  messageObject.roomname = roomname;
  messageObject.user = user;
  app.send(messageObject);

};

var parseData = function (data) {
  console.log("Data is",data);
  
  var filteredRoom = _.reject(data.results, function(element) {
    return element.roomname !== app.currRoom;
  });

  filteredRoom.forEach(function(value) {
    app.addMessage(value);
  });
}; 

$("#refresh").click(function () {
  app.clearMessages();
  app.fetch();
});


app.init();




