
module.exports = function(steamID, rawMessage, messageType, clientSteamID) {

  var Stem        = this,
      log         = this.log,
      bot         = this.bot,
      botTrade    = this.botTrade,
      config      = this.config,
      isWebReady  = this.webReady,
      message     = rawMessage.toLowerCase(),
      isMessage   = (messageType === 1),
      commands    = rawMessage.toLowerCase().split(' '),
      username    = (bot.users[steamID]) ? bot.users[steamID].playerName : clientSteamID,
      isAdmin     = (messageType === 1 && config.admins.indexOf(steamID) > -1),
      Cmd         = (messageType === 1) ? require('./commands')(Stem, clientSteamID || steamID) : null;

  // Handle admin commands
  if (isAdmin) {

    // Log all messages from admins
    log.info('[Admin] %s (%s): %s', username, steamID, rawMessage);

    /**
     * Command: help
     */
    if (message === 'help') {

      bot.emit('debug', 'Executing ' + message + ' command');
      Cmd.adminHelp();

    }

    /**
     * Command: qu <length / size>
     */
    else if (message === 'qu length' || message === 'qu size') {

      bot.emit('debug', 'Executing ' + message + ' command');
      Cmd.quLength();

    }

    /**
     * Command: version
     */
    else if (message === 'version') {

      bot.emit('debug', 'Executing ' + message + ' command');
      Cmd.sendVersion();

    }

    /**
     * Command: clear
     */
    else if (message === 'clear') {

      bot.emit('debug', 'Executing ' + message + ' command');
      Cmd.clearChat();

    }

    /**
     * Command: log off
     */
    else if (message === 'log off') {

      bot.emit('debug', 'Executing ' + message + ' command');
      Cmd.logOff();

    }

    /**
     * Disabled commands as most are irrelevent to the purpose of Stockbot.
     */

    // // Command: help
    // if (message === 'help') {

    //   Cmd.help();

    // }

    // // Command: version
    // else if (message === 'version') {

    //   Cmd.sendVersion(config.version);

    // }

    // // Command: log off
    // else if (message === 'log off') {

    //   Cmd.logOff();

    // }

    // // Command: add friend <steamID>
    // else if (commands[0] === 'add' && commands[1] === 'friend') {

    //   var friendToAdd = commands[2];

    //   Cmd.addFriend(friendToAdd);

    // }

    // // Command: remove friend <steamID>
    // else if (commands[0] === 'remove' && commands[1] === 'friend') {

    //   var friendToRemove = commands[2];

    //   Cmd.removeFriend(friendToRemove);

    // }

    // // Command: idle on
    // else if (message === 'idle on') {

    //   Cmd.idleOn();

    // }

    // // Command: idle off
    // else if (message === 'idle off') {

    //   Cmd.idleOff();

    // }

    // // Command: set status <status>
    // else if (commands[0] === 'set' && commands[1] === 'status') {

    //   var botStatus = commands[2];

    //   Cmd.setStatus(botStatus);

    // }

    // // Command: set botname "<botname>"
    // else if (commands[0] === 'set' && commands[1] === 'botname') {

    //   var botName = rawMessage.split('"');

    //   Cmd.setBotname(botName);

    // }

    // // Command: enable autoaccept
    // else if (commands[0] === 'enable' && commands[1] === 'autoaccept') {

    //   Cmd.autoAcceptStatus(true);

    // }

    // // Command: disable autoaccept
    // else if (commands[0] === 'disable' && commands[1] === 'autoaccept') {

    //   Cmd.autoAcceptStatus(false);

    // }

    // // Command: items
    // else if (message === 'items' && isWebReady) {

    //   Cmd.items();

    // }

    // // Command: items list
    // else if (message === 'items list' && isWebReady) {

    //   Cmd.listItems();

    // }

    // // Command: items metal
    // else if (message === 'items metal' && isWebReady) {

    //   Cmd.listMetal();

    // }

    // // Command: enable autoaccept
    // else if (message === 'enable trade') {

    //   Cmd.tradeStatus(true);

    // }

    // // Command: disable autoaccept
    // else if (message === 'disable trade') {

    //   Cmd.tradeStatus(false);

    // }

    // // Command: items reload
    // else if (message === 'items reload') {

    //   Cmd.invReload();

    // }

    // // Command: offers list
    // else if (commands[0] === 'offers' && commands[1] === 'list' && isWebReady) {

    //   var offersType = commands[2];

    //   Cmd.listOffers(offersType);

    // }

    // // Command: offers items <offerID>
    // else if (commands[0] === 'offers' && commands[1] === 'items' && isWebReady) {

    //   var offerItemsID = commands[2];

    //   Cmd.offerItems(offerItemsID);

    // }

    // // Command: clear
    // else if (message === 'clear') {

    //   Cmd.clearChat();

    // }

  }

  // Log everything else
  else if (message) {

    log.info('%s (%s): %s', username, steamID, rawMessage);

  }

  // Custom replies
  if (message in config.messages) {

    bot.sendMessage(steamID, config.messages[message], 1);

  }

};