// YOUR CODE HERE:

var app = {};

app.currRoom = "All Rooms";
app.userName = 'Anonymous';
app.friendsList = {};
app.Rooms = {};

app.server = 'https://api.parse.com/1/classes/messages';

app.init = function() {
  // listen for click on username
  $(".username").unbind().click(function (e) {
    e.preventDefault();
    var userName = $(this).html();
    app.addFriend(userName);
  });

  //listen for submit button click
  $('#send .submit').unbind().click(function(event) {
    event.preventDefault();
    console.log('submittttting');
    var message = $('#message').val();
    $('.chooseName').trigger('click');
    $('.chooseRoom').trigger('click');
    app.handleSubmit(message);
    $('#message').val("");
    $('#name').val("");
  });  

  //listen for selection of room name
  $('#roomselect').unbind().on('change', function() {
    var rmName = $('#roomselect option:selected').text();
    app.currRoom = rmName;
    $('#currentRoom').text(app.currRoom);

    app.clearMessages();
    app.clearRooms();
    app.fetch();
    $('#roomselect').blur();

  });

  $('.chooseName').unbind().click(function(event) {
    event.preventDefault();
    var name = $('#name').val();
    app.userName = name.length === 0 ? app.userName : name;
    $('#currentUser').text(app.userName);
  });

  $('.chooseRoom').unbind().click(function (event) {
    event.preventDefault();
    var room = $('#joinRoom').val();
    app.currRoom = room;
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
  var rmName = $('#roomselect');
  var $rmName = $('<option> </option>');
  $rmName.text(roomName).appendTo(rmName);
};



app.addFriend = function (friendName) {
  app.friendsList[friendName] = true;
  var $friend = $('<div class = username>' + '</div>');
  $friend.text(friendName);
  $friend.appendTo('#main');
  app.boldFriend(friendName);
  // $('#main').append('<div class = username>'+ friendName + '</div>');
  //$('#main > .username').html(friendName); /// class = username
};

app.boldFriend = function (friendName) {
  $('#chats .message').each( function() {
    if ( $(this).find('.username').text() === friendName ) {
      $(this).css('font-weight', 'bold');
    }
  });
};

app.handleSubmit = function( message ) {
  var messageObject = {};
  messageObject.text = message;
  messageObject.roomname = app.currRoom;
  messageObject.username = app.userName;
  app.send(messageObject);
  app.refresh();
};

var parseData = function (data) {
  console.log("Data is",data);
  
  getRooms(data);

  for ( var rmName in app.Rooms) {
    app.addRoom(rmName);
  }

  if ( app.currRoom !== 'All Rooms') {
    var filteredRoom = _.reject(data.results, function(element) {
      return element.roomname !== app.currRoom;
    });

    filteredRoom.forEach(function(value) {
      app.addMessage(value);
    });
  } else {
    data.results.forEach(function(value) {
      app.addMessage(value);
    });
  }
}; 

var getRooms = function(data) {
  data.results.forEach( function(value) {
    if (!app.Rooms[value.roomname]) {
      app.Rooms[value.roomname] = 1;
    }
  });
};

app.clearRooms = function() {
  $('#roomselect').html('');
};

app.refresh = function () {
  app.clearMessages();
  app.clearRooms();
  app.fetch();
  setTimeout( function() {
    app.init();
    _.each(app.friendsList, function(value, name) {
      app.boldFriend(name);
    });
  }, 1000);
  
};

$("#refresh").click(app.refresh);


app.init();




