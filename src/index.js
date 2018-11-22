const Data = require('data-bite');
const {Language, Template} = require('hightech');
const randomItem = require('random-item');
const info = require('./info.json');

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
            case 'news':
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
            let pathOptions = {cwd: './../..', skillDir: 'skillsets/basic-skill'};
            let lang = new Language(locale, locales, langs, pathOptions);

            lang.loadTranslations().then(() => {
              let templater = new Template(pathOptions, lang.gt);
              switch (request.intent.name) {
                  case 'greeting': // Greeting
                    service.get('salutation', {
                      filter: {tags: 'ArrivalSalutation'}
                    }).then( (res) => {
                      let arrivalSalutation = randomItem(res.data).name;
                      return templater.tpl('salute', {arrivalSalutation}).compile()
                        .then(content => resolve(content.body));
                    }).catch(reject);
                  break;
                  case 'farewell': // Farewell
                    service.get('salutation', {
                      filter: {tags: 'DepartureSalutation'}
                    }).then( (res) => {
                      let departureSalutation = randomItem(res.data).name;
                      return templater.tpl('salute', {departureSalutation}).compile()
                        .then(content => resolve(content.body));
                    }).catch(reject);
                  break;
                  /**
                    * Date and time
                    */
                  // case 'time': // Current time
                  //   let time = null;
                  //   resolve( dateTpl({time}) );
                  // break;
                  // case 'day': // Current day
                  //   let day = null;
                  //   resolve( dateTpl({day}) );
                  // break;
                  /**
                    * Status
                    */
                  // case 'status': // Well-being
                  //   let status = null;
                  //   resolve( statusTpl({status}) );
                  // break;
                  // case 'sleep':
                  //   let status = null;
                  //   resolve( statusTpl({status}) );
                  // break;
              }
            });

        });
    }
};

module.exports = Basic;
