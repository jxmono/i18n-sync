module.exports = function(config) {

    var self = this;

    self.translate  = function (messageToTranslate, callback) {

        // if the message to translate is a valid json format string,
        // convert it into an object
        try {
            var parsedValue = JSON.parse(messageToTranslate);
            if (parsedValue && parsedValue.constructor === Object) {
                messageToTranslate = parsedValue;
            }
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
};
