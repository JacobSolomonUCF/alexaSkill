/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/
/**
 * This sample demonstrates a simple skill built with the Amazon Alexa Skills
 * nodejs skill development kit.
 * This sample supports multiple lauguages. (en-US, en-GB, de-DE).
 * The Intent Schema, Custom Slots and Sample Utterances for this skill, as well
 * as testing instructions are located at https://github.com/alexa/skill-sample-nodejs-fact
 **/

'use strict';

const Alexa = require('alexa-sdk');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const languageStrings = {
    'en-US': {
        translation: {
            FACTS: [
              'is a dog',
              'loves to sleep',
              'loves to eat',
              'loves to cuddle',
              'is not a cat',
              'is the coolest kid in town',
              'is sometime an asshole',
              'loves to bark at other dogs',
              'loves to eat cheese',
              'misses his mommy',
            ],
            FAVORITE_THINGS_TODO:[
              'sleep',
              'eat cheese',
              'fart then run away',
              'bar at other dogs',
              'act like he is the king',
              'get the zoomies',
              'eat treats',
              'get his belly rubbed',
            ],
            WHY_IS_HE_SORRY:[
              'pees on the carpet',
              'chews on the window',
              'wakes you up early to go potty',
              'trys to pee on every bush',
            ],
            SORRY_MESSAGE: 'Louie is sorry sometime he:',
            SKILL_NAME: 'Louie Facts',
            GET_NAME:[
              'Did you know, Louie: ',
              'Louie: ',
              'The little buggy',
            ],
            HELP_MESSAGE: 'Oh no, this is not good.',
            HELP_REPROMPT: 'Oh no, this is not good.',
            STOP_MESSAGE: 'Oh no, this is not good.',
        },
    },
};

const handlers = {
    'LaunchRequest': function(){
      this.emit(':tell', 'Hello from the cloud!');
    },
    'SorryIntent': function(){
      const sorryMessage = this.t('SORRY_MESSAGE');
      const reasons = this.t('WHY_IS_HE_SORRY');
      const randomIndex = Math.floor(Math.random() * reasons.length);

      const message = `${sorryMessage} ${reasons[randomIndex]}`
      this.emit(':tellWithCard', message, 'Why Louie sorry', message);
    },
    'WhoIsIntent': function (){
      // Get a random space fact from the space facts list
      // Use this.t() to get corresponding language data

      const favs = this.t('FAVORITE_THINGS_TODO');
      const randomIndex1 = Math.floor(Math.random() * favs.length);
      let randomIndex2 = randomIndex1;
      while(randomIndex2 === randomIndex1){
        randomIndex2 = Math.floor(Math.random() * favs.length);
      }
      const randomFact1 = favs[randomIndex1];
      const randomFact2 = favs[randomIndex2];
      const randomWeight = Math.floor(Math.random()*1000)/1000+10;


      // Create speech output
      const speechOutput = `Louie is a ${randomWeight}lb Yorkshire Terrier, two of his favorite things to do is ${randomFact1} and ${randomFact2}`;
      // const speechOutput = "I'm a teapot";
      this.emit(':tellWithCard', speechOutput, 'Who is the bug', speechOutput);
    },
    'GetNewFactIntent': function () {
        // Get a random space fact from the space facts list
        // Use this.t() to get corresponding language data
        const factArr = this.t('FACTS');
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const nameArr = this.t('GET_NAME');
        const nameIndex = Math.floor(Math.random() * nameArr.length);
        const randomName = nameArr[nameIndex];

        // Create speech output
        const speechOutput = randomName + randomFact;
        this.emit(':tellWithCard', speechOutput, 'Facts about the bug', speechOutput);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = function (event, context) {
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
