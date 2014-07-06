module.exports = function(config) {

    var self = this;
    self._config = config;

    // set default value for translations
    config.translations = config.translations || {};

    /**
     * translate
     *
     * @name translate
     * @function
     * @param {String} messageToTranslate The message that should be translated.
     * @param {String (Optional)} locale The locale of translated string.
     * @return
     */
    self.translate  = function (messageToTranslate, locale, callback) {

        // set locale
        locale = locale || M.getLocale();

        // translate message
        var translatedMessage = config.translations[lang] || messageToTranslate;

        return translatedMessage;
    };
};
