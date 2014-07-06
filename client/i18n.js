/**
 * i18n-sync
 * The sync version of i18n module.
 *
 * @name exports
 * @function
 * @param {Object} config The module config
 */
module.exports = function(config) {

    var self = this;
    self._config = config;

    // set default value for translations
    config.translations = config.translations || {};

    /**
     * translate
     * Translates the message passed in the first parameter.
     *
     * @name translate
     * @function
     * @param {String} messageToTranslate The message that should be translated.
     * @param {String (Optional)} locale The locale of translated string.
     * @return
     */
    self.translate = self.t = function(messageToTranslate, locale, callback) {

        // set locale
        locale = locale || M.getLocale();

        // translate message
        var translatedMessage = (
            config.translations[messageToTranslate] || {}
        )[locale] || messageToTranslate;

        return translatedMessage;
    };

    // Emit "ready" event
    self.emit("ready", config);
};
