var Bind = require("github/jillix/bind");
var Events = require("github/jillix/events");

module.exports = function(config) {

    var self = this;
    Events.call(self, config);

    /*
     *  Translates the messages emited by modules
     *  =========================================
     *
     *  config.translations is an array of objects
     *  in the following format:
     *
     *  [
     *      {
     *          "old": "I am.",
     *          "new": "Je suis."
     *      },
     *      {
     *          "old": "You are.",
     *          "new": {
     *              "fr": "Tu es.",
     *              "ro": "Tu ești."
     *          }
     *      },
     *      ...
     *  ]
     *
     * */
    self.translate  = function (messageToTranslate, callback) {

        try {
            messageToTranslate = JSON.parse(messageToTranslate);
        } catch (e) {}

        config.translations = config.translations || [];

        var message;

        if (messageToTranslate instanceof Object) {
            if (messageToTranslate.message) {
                message = messageToTranslate.message;
            }
        }

        if (!message) {
            return console.error("The message is not in the i18n format.");
        }

        for (var i = 0; i < config.translations.length; ++i) {
            var current = config.traslations[i];

            if (current["new"] instanceof Object) {
                current["new"] = current["new"][config.lang || M.getLocale()];
            }

            if (current["old"] === message) {
                message = current["new"];
                break;
            }
        }

        messageToTranslate.message = message;
        callback(null, messageToTranslate);
    };

    // listen to crud events
    if (config.listen instanceof Array) {
        for (var i = 0; i < config.listen.length; ++i) {
            self.on("message", config.listen[i], self.translate);
        }
    }


    self.emit("ready", config);
};
