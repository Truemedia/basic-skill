const Data = require('data-bite');
const {Language, Template} = require('hightech');
const info = require('./info.json');
// Resolvers
const resolver = {
  arrival: require('./resolvers/salutation/arrival'),
  departure: require('./resolvers/salutation/departure'),
  currentDay: require('./resolvers/date/day'),
  currentTime: require('./resolvers/date/time'),
  health: require('./resolvers/status/health'),
  sleep: require('./resolvers/status/sleep'),
};

const Basic = {
    info,

    /**
      * Check if skill is compatable with current intent
      */
    canHandle(handlerInput)
    {
        let request = handlerInput.requestEnvelope.request;

        let capable = false;
        switch (request.intent.name) {
            case 'greeting':
            case 'farewell':
            case 'day':
            case 'time':
            case 'health':
            case 'sleep':
                capable = true;
            break;
        }

        return capable;
    },

    /**
      * Handle input from intent
      */
    handle(handlerInput)
    {
        // TODO: Load from config
        let locale = 'en_GB';
        let locales = ['en_GB', 'ja_JP'];
        let langs = ['eng', 'jpn'];

        return new Promise( (resolve, reject) => {
          let {request} = handlerInput.requestEnvelope;
          let service = new Data().service();
          let pathOptions = {cwd: __dirname};
          let lang = new Language(locale, locales, langs, pathOptions);
          let pod = { // TODO: Implement as full consumable service
            tz: 'Europe/London'
          };

          lang.loadTranslations().then(() => {
            let templater = new Template(pathOptions, lang.gt);
            switch (request.intent.name) {
              /**
                * Salutations
                */
              case 'greeting': resolve( resolver.arrival(service, templater) ); break; // Greeting
              case 'farewell': resolve( resolver.departure(service, templater) ); break; // Farewell
              /**
                * Date and time
                */
              case 'time': resolve( resolver.currentTime(pod, templater) ); break; // Current time
              case 'day': resolve( resolver.currentDay(pod, templater) ); break; // Current day
              /**
                * Status
                */
              case 'health': resolve( resolver.health(templater) ); break; // Well-being
              case 'sleep': resolve( resolver.sleep(templater) ); break; // Sleep
            }
          });
        });
    }
};

module.exports = Basic;
