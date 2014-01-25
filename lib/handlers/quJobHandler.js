
module.exports = function (job) {

  var bot = this;
  var log = bot.log;
  var config = bot.config;
  var friendsList = bot.friends;
  var tradeJob = JSON.parse(job);
  var isFriend = (friendsList[tradeJob.client] === 3);
  var friendRequestTimeout = config.qu.friendRequestTimeout;

  // Save job
  bot._tradeJob = job;

  // Client is not on the bot's friendsList
  if (!isFriend) {

    log.warn('Friend request sent to:', tradeJob.client);

    // Send friend request
    bot.addFriend(tradeJob.client);

    // Initiate timer
    bot._friendRequestTimer = setTimeout(function () {
    
      log.warn('Client did not accept friend request in time..');
      bot.emit('quReady');
      return;

    }, friendRequestTimeout);

    return;

  }

  // Send trade to client
  bot.trade(job.client);

};