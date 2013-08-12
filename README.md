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

### v0.1.1
 - Fixed translating strings.
