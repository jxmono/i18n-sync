var Bind = require("github/jillix/bind");
var Events = require("github/jillix/events");

module.exports = function(config) {

    var self = this;
    Events.call(self, config);

    self.translate  = function (messageToTranslate, callback) {

        // if the message to translate is a valid json format string,
        // convert it into an object
        try {
            messageToTranslate = JSON.parse(messageToTranslate);
        } catch (e) {}

        // set default value for translations
        config.translations = config.translations || {};

        // received message
        var message;

        // if messageToTranlsate is an object, received message is
        // message key value from messageToTranslate
        if (messageToTranslate instanceof Object && messageToTranslate.message) {
            message = messageToTranslate.message;
        }

        // if messageToTranlsate is a string, received message is
        // messageToTranlsate. messageToTranlsate is converted into
        // an object
        if (typeof messageToTranslate === "string") {
            message = messageToTranslate;
            messageToTranslate = {};
        }

        // no message, throw error
        if (!message) { return console.error("The message is not in the i18n format."); }

        // overwrite the message with its translation
        var message = config.translations[message] || message;

        if (message instanceof Object) {
            message = message[config.lang || M.getLocale()];
        }

        // callback the translation
        messageToTranslate.message = message;
        callback(null, messageToTranslate);
    };

    // dinamically add a new miid to listen
    self.listenTo = function (listen) {

        // force listen to be an array
        if (typeof listen === "string") {
            listen = [listen];
        }

        // listen to crud events
        if (listen instanceof Array) {
            // every listen miid to listen
            for (var i = 0; i < listen.length; ++i) {
                // add message listen
                self.on("message", listen[i], self.translate);
            }
            return;
        }

        console.error("Invalid type of listen parameter.");
    };

    // call listen to
    self.listenTo(config.translates);

    // emit ready
    self.emit("ready", config);
};
