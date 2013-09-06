i18n
====

Translate messages emited by the other modules.

## How to Use?

### Configuration

`config.translations` is an array of objects in the following format:

Example:

```JSON
  [
      {
          "old": "I am.",
          "new": "Je suis."
      },
      {
          "old": "You are.",
          "new": {
              "fr": "Tu es.",
              "ro": "Tu ești."
          }
      },
      ...
  ]
```

`config.listen` is an array of miids that emit the `message` event.

## Changelog

### dev
 - Update to Events v0.1.3 and Bind v0.1.3
 - Renamed `main.js` into `i18n.js`

### v0.1.1
 - Fixed translating strings.

### v0.1.0
 - Initial release
