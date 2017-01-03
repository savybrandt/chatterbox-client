
// YOUR CODE HERE:
var app = {};
var friends = [];
var messages = [];

$(document).ready(function() {
  $('.username').on('click', function() { 
    console.log($(this).attr('nodename'));
    console.log('inside onlick');  
    console.log($(this).attr('nodeName'));
    //friends.push($(this.attr('nodeName'));
    app.handleUsernameClick($(this).attr('nodename'));
  });
  
  $('#send .submit').on('submit', function() {
  //debugger;
    console.log($('#message').val());
    app.handleSubmit($('#message').val());  
  });
});

app.server = 'https://api.parse.com/1/classes/messages';


app.send = function(message) {
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
    data: '', // filter by 
    dataFilter: function(data) {
      //console.log('inside dataFilter', data);
      //fetch message only if message is newer than our most recent chached message. 
      //if message is older than our most recent message delete message
      var parsedData = JSON.parse(data);
       //console.log('array?', Array.isArray(parsedData.results));
      for (var i = 0; i < parsedData.results.length; i++) {
        //send each message object into renderMessage
        debugger;
        if (messages.indexOf(JSON.stringify(parsedData.results[i])) !== -1) {
          parsedData.results.splice(i, 1);
        }
      }
      return JSON.stringify(parsedData);
    },
    success: function (data) {

      console.log('data in success', data);
      // split up data object to get each message object
      // data.results =[{message}, {message}..]
      //iterate over data.results
      for (var i = 0; i < data.results.length; i++) {
        app.renderMessage(data.results[i]);  
      }

      console.log('chatterbox: Message received');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message', data);
    }
  });
};

app.clearMessages = function() {

  // $.ajax({
  //   // This is the url you should use to communicate with the parse API server.
  //   url: undefined,
  //   type: 'DELETE',
  //   data: $('#chats'),
  //   contentType: 'application/json',
  //   success: function (data) {
  //     console.log('chatterbox: Message sent');
  //   },
  //   error: function (data) {
  //     // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
  //     console.error('chatterbox: Failed to send message', data);
  //   }
  // });
  messages = [];
  $('#chats').html('');
};

app.renderMessage = function(message) {
  var stringifiedMessage = JSON.stringify(message);
  //message list
  messages.push(stringifiedMessage);  

  var $username = $(message.username);
  var messageNode = $('#chats').append('<p>' + '<a href=# class=username' + ' nodename = ' + $username.selector + '>' + $username.selector + '</a>' + ': ' + message.text + '</p>');
  // think about using html handlers
  $('.username').on('click', function() { 
    console.log($(this).attr('nodename'));
    console.log('inside onlick');  
    console.log($(this).attr('nodeName'));
    //friends.push($(this.attr('nodeName'));
    app.handleUsernameClick($(this).attr('nodename'));
  });
};

app.renderRoom = function(roomName) {
  $('#roomSelect').append('<div>' + roomName + '</div>');        
};


app.init = function() {
  // should populate our timeline with messages from server
  app.fetch();
  // setTimeout(function() {
  //   app.init();
  // }, 1000);
};

app.init();

app.handleUsernameClick = function(username) {
  //this needs to run once a usernmae is clicked
  if (friends.indexOf(username) === -1) {
    friends.push(username);   
  }
  console.log(friends);
};

  
app.handleSubmit = function(message) {
  console.log('inside handleSubmit');
  app.send(message);  
};


// check if new messages are on server
//use fetch to access messages on server
  //fetch access all messages -
  //use setTimeout to run fetch periodically

  //we're not getting new messages from server.
  //how access new messages?
  
  //we want to prescreen data from server before we fetch/pull it.  
    //goal: only pull new data
    //possibly use datafilter a-la:
// jQuery.ajaxSetup({
//   dataFilter: function(data) {
//     var data = JSON.parse(data);
//     //fetch message only if message is newer than our most recent chached message. 
//       //if message is older than our most rcent message delete message
//     if (data.results[i].createdAt < messages[0].createdAt) {
//     delete data.redirect;
//     return JSON.stringify(data);
//   }
// });

  // each message has a created at property
// if so post them to chat wall



//problem we:re not getting all data fro mserver
 // either server limited to sending 100 messages and is sending first 100 messages. 
 // or we're only requesting/receiveing 100 messages
   // seems tio only give us 100 messages because we have no evidence of client-side changing server to give us 100 messages.

 // or we're not requesting new messages  

 // DELETE

 // We are communicating with the server.
   //The server is giving us the first 100 messages.
   // We need to be communicating with server to get correct messages. 










