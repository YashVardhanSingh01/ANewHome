const Alexa = require('ask-sdk-core');
const Util = require('./util.js');
const api = require('./api.js');
const logic = require('./logic.js');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    async handle(handlerInput) {
        try {
            // call the progressive response service
            await Util.callDirectiveService(handlerInput, "let me fetch");
        } catch (error) {
            // if it fails we can continue, but the user will wait without progressive response
            console.log("Progressive response directive error : " + error);
        }
        const dialogues = await api.getDialogueLinks();
        const speakOutput = logic.audioTag(dialogues.intent[19]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LaunchTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "headlineTemplateData": {
                            "type": "object",
                            "objectId": "headlineSample",
                            "properties": {
                                "backgroundImage": {
                                    "contentDescription": null,
                                    "smallSourceUrl": null,
                                    "largeSourceUrl": null,
                                    "sources": [
                                        {
                                            "url": "https://th-thumbnailer.cdn-si-edu.com/pUMjqpRXGguG4cbp-FERDeH5kKI=/1000x750/filters:no_upscale()/https://tf-cmsv2-smithsonianmag-media.s3.amazonaws.com/filer/be/d4/bed4dfa3-55db-45ca-a7cd-18bf96028180/15n_fm2015_plutocrescentviajhuapl_live-cr.jpg",
                                            "size": "large"
                                        }
                                    ]
                                },
                                "textContent": {
                                    "primaryText": {
                                        "type": "PlainText",
                                        "text": "Welcome to the game! Are you ready to play 'A New Home' ?"
                                    }
                                },
                                "logoUrl": "",
                                "hintText": "Say, \"I am ready!\""
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const IntroIntentHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'IntroIntent')
            ||(Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'restart'));
    },
    async handle(handlerInput) {
        
        // const speakOutput = constant.story[0] + logic.switchVoice(constant.protagonist[0] , "Joey") + logic.switchVoice(constant.professor[0] , "Matthew") + constant.story[1] + logic.switchVoiceLang("en-GB",constant.zack[7] , "Brian") + constant.story[45];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[20]);
         let responseBuilder = handlerInput.responseBuilder;  
        return responseBuilder
            .speak(speakOutput)
            .reprompt('Make a decision: The Hillary Mountains\n or\n The Olympus Crater')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/introTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Choose Landing Spot",
                                "listItems": [
                                    {
                                        "primaryText": "Mountain Valley",
                                        "secondaryText": "MountainValley",
                                        "thumbnailImage": "https://th.bing.com/th/id/OIP.fTuqmdrGcFRHV2k0tATBeAHaEK?pid=ImgDet&rs=1"
                                    },
                                    {
                                        "primaryText": "The Crater",
                                        "secondaryText": "crater",
                                        "thumbnailImage": "https://cdn.zmescience.com/wp-content/uploads/2016/01/91951-004-D8086FB6.jpg"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const LandingSpot_ValleyHandler = {
    canHandle(handlerInput) {
        return  (
      (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'LandingSpot_Valley') ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'MountainValley')
    );
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[1] , "Joey")+ constant.story[2] + logic.switchVoice(constant.protagonist[2] , "Joey") + constant.story[3] + logic.switchVoice(constant.professor[1] , "Matthew") + logic.switchVoice(constant.protagonist[3] , "Joey") + constant.story[4]; 
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[4]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Take a choice: Take the crystal back to the spaceship for research\n or\n Follow the Professor’s advice and continue exploration.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Take the crystal back to the spaceship or Follow the Professor’s advice",
                                "listItems": [
                                    {
                                        "primaryText": "Take crystal",
                                        "secondaryText": "take_crystal",
                                        "thumbnailImage": "https://media.istockphoto.com/photos/underground-river-picture-id493981406?k=20&m=493981406&s=612x612&w=0&h=rnV2pV3rZxexYeLm3WtxeENmXkoUpPjtTbBo9ef02E4="
                                    },
                                    {
                                        "primaryText": "Explore",
                                        "thumbnailImage": "https://www.frommers.com/system/media_items/attachments/000/863/336/s980/BlackwaterRaftingCompany_NZ.jpg?1541005283",
                                        "secondaryText": "continue_explore"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const SquareOne_RelocateHandler = {
    canHandle(handlerInput) {
        return (
      (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'SquareOne_Relocate') ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'SandyDunes')
    );
    },
    async handle(handlerInput) {
        //const speakOutput = constant.story[16] + logic.switchVoice(constant.protagonist[14] , "Joey") + constant.story[33] + logic.switchVoice(constant.professor[4] , "Matthew") + constant.story[17];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[21]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('It’s your call whether to try and complete the shelter before the sandstorm hits or abandon the shelter and return to the ship.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: try and complete the shelter or abandon the shelter and return to the ship",
                                "listItems": [
                                    {
                                        "primaryText": "Complete shelter",
                                        "secondaryText": "complete_shelter",
                                        "thumbnailImage": "https://i.insider.com/5979023e552be51c008b6b64?width=1000&format=jpeg&auto=webp"
                                    },
                                    {
                                        "primaryText": "Abandon",
                                        "thumbnailImage": "https://static.timesofisrael.com/www/uploads/2021/10/000_9PG3CZ.jpg",
                                        "secondaryText": "ship_dunes"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const LandingSpot_CraterHandler = {
    canHandle(handlerInput) {
        return (
      (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'LandingSpot_Crater') ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'crater')
    );
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[30] , "Joey")+ constant.story[36] + logic.switchVoice(constant.protagonist[31] , "Joey") + logic.switchVoiceLang("en-GB",constant.zack[6] , "Brian") + logic.switchVoice(constant.protagonist[32] , "Joey") + constant.story[37] + logic.switchVoice(constant.protagonist[33] , "Joey") + logic.switchVoice(constant.sara[3] , "Salli") + constant.story[38]; 
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[10]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a choice: Relocate to the Sandy Dunes or Stay back at the Crater')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Relocate to the Dune Fields or Stay back at the Crater",
                                "listItems": [
                                    {
                                        "primaryText": "Relocate",
                                        "secondaryText": "SandyDunes",
                                        "thumbnailImage": "https://earthsky.org/upl/2019/05/Bagnold-Dune-Field-Mars-Curiosity-12-18-2015-2-800x450.jpg"
                                    },
                                    {
                                        "primaryText": "Stay back",
                                        "thumbnailImage": "https://cdn.zmescience.com/wp-content/uploads/2016/01/91951-004-D8086FB6.jpg",
                                        "secondaryText": "StayBack"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};



const OldLife_ReincarnateHandler = {
    canHandle(handlerInput) {
        return (
            (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OldLife_Reincarnate')
            ||(Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'Alien')
            );
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[38] , "Joey")+ constant.story[43] + logic.switchVoice(constant.alien[0] , "Ivy") + logic.switchVoice(constant.protagonist[39] , "Joey") + logic.switchVoice(constant.alien[1] , "Ivy") + logic.switchVoice(constant.protagonist[40] , "Joey") + logic.switchVoice(constant.alien[2] , "Ivy") + constant.story[44] ; 
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[11]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a choice: Reincarnate the alien life form or Find alternate ways to farm the land for food and resources.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Always follow your gut feeling and take leaps of faith!",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};
const OldLife_AlternateHandler = {
    canHandle(handlerInput) {
        return(
            ( Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'OldLife_Alternate')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'Farm')
            );
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[37] , "Joey")+ constant.story[42]; 
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[12]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a choice: Reincarnate the alien life form or Find alternate ways to farm the land for food and resources.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Always be open to new experiences. You never know what's coming your way, till you explore! ",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};
const SquareOne_StayBackHandler = {
    canHandle(handlerInput) {
        return (
            (Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest' &&
        Alexa.getIntentName(handlerInput.requestEnvelope) ===
          'SquareOne_StayBack') ||
      (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'StayBack')
    );
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[34] , "Joey")+ logic.switchVoice(constant.professor[9] , "Matthew") + logic.switchVoice(constant.protagonist[35] , "Joey") + constant.story[39] + logic.switchVoice(constant.protagonist[36] , "Joey") + logic.switchVoice(constant.professor[10] , "Matthew") + constant.story[40] + logic.switchVoice(constant.professor[11] , "Matthew") + constant.story[41] ; 
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[16]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a choice: Reincarnate the alien life form or Find alternate ways to farm the land for food and resources.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Reincarnate the alien life form or Find alternate ways to farm",
                                "listItems": [
                                    {
                                        "primaryText": "Reincarnate Alien",
                                        "secondaryText": "Alien",
                                        "thumbnailImage": "https://1075914428.rsc.cdn77.org/data/images/full/44632/aliens.jpg?w=617&h=359"
                                    },
                                    {
                                        "primaryText": "A way to farm",
                                        "thumbnailImage": "https://www.popsci.com/uploads/2019/01/29/FZD6JLWMCZDYNSD4VFWNO3777Y.jpg?auto=webp",
                                        "secondaryText": "Farm"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const ExplorationOfCaves_TakeCrystalHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExplorationOfCaves_TakeCrystal')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'take_crystal'));
    },
    async handle(handlerInput) {
        //const speakOutput = constant.story[5] + logic.switchVoice(constant.protagonist[4] , "Matthew") + " You Scream. " + logic.switchVoice(constant.sara[0] , "Salli") + constant.story[6];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[2]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a decision: Try making it back to the ship before the frostbite spreads or Amputate your hand to prevent the frostbite from spreading.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Try making it back to the ship or Amputate your hand to prevent frostbite",
                                "listItems": [
                                    {
                                        "primaryText": "Back to the ship",
                                        "secondaryText": "ship_frostbite",
                                        "thumbnailImage": "https://img.redbull.com/images/c_crop,w_4000,h_2000,x_0,y_463,f_auto,q_auto/c_scale,w_1200/redbullcom/2019/11/13/3991fcf6-00d9-4df3-bd7a-b581bbf18bcf/analog-astronauts"
                                    },
                                    {
                                        "primaryText": "Amputate hand",
                                        "thumbnailImage": "https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/Frostbite-Stages/Deep_frostbite-1296x728-slide3.jpg?w=1155&h=1528",
                                        "secondaryText": "amputate_frostbite"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const LifeOrDeath_AmputateHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LifeOrDeath_Amputate')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'amputate_frostbite'));
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[5] , "Joey") + constant.story[7] + logic.switchVoice(constant.professor[2], "Matthew") + logic.switchVoice(constant.protagonist[6] , "Joey") + logic.switchVoice(constant.professor[3], "Matthew") + constant.story[8];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[5]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the possible endings !')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Don't let fear cloud your judgement and make meaningful sacrifices! No one can stop you from achieving your goals",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}

const LifeOrDeath_ReachShipHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LifeOrDeath_ReachShip')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'ship_frostbite'));
    },
    async handle(handlerInput) {
        // const speakOutput = logic.switchVoice(constant.protagonist[7] , "Joey") + constant.story[9];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[6]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the possible endings !')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Don't be afraid to take tough decisions. A mission is successful only after a lot of sacrifices!",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}

const ExplorationOfCaves_FollowAdviceHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ExplorationOfCaves_FollowAdvice')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'continue_explore'));
    },
    async handle(handlerInput) {
       // const speakOutput = constant.story[10] + logic.switchVoiceLang("en-AU",constant.john[0] , "Russell") + " says John. " + logic.switchVoice(constant.protagonist[8] , "Joey") + constant.story[11];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[1]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Make a decision: Replenish yourself and the team right now and plan it out later\n or\n Think long-term and ration resources for later use.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Eat right now and plan it later or Think long-term and ration resources",
                                "listItems": [
                                    {
                                        "primaryText": "Plan it later",
                                        "secondaryText": "plan_later",
                                        "thumbnailImage": "https://assets-natgeotv.fnghub.com/POD/12957.jpg"
                                    },
                                    {
                                        "primaryText": "Ration resources",
                                        "thumbnailImage": "https://www.automacaoindustrial.info/wp-content/uploads/2022/02/checklist-scaled.jpg",
                                        "secondaryText": "ration_resources"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
};

const Survival_LongTermHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Survival_LongTerm')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'ration_resources'));
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[9] , "Joey") + logic.switchVoiceLang("en-GB",constant.zack[0] , "Brian") + logic.switchVoice(constant.protagonist[10] , "Joey") + constant.story[12] + logic.switchVoice(constant.protagonist[11] , "Joey") + "You remember about the old nuclear-powered engine in your ship. " + logic.switchVoice(constant.protagonist[12] , "Joey") + logic.switchVoiceLang("en-GB",constant.zack[1] , "Brian") + constant.story[13];  
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[8]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the possible endings !')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Every small decision counts. A good leader always makes long-term decisions!",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}

const Survival_PlanLaterHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Survival_PlanLater')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'plan_later'));
    },
    async handle(handlerInput) {
        //const speakOutput = constant.story[14] + logic.switchVoice(constant.protagonist[13] , "Joey") + constant.story[15];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[9]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! You have completed one of the possible endings !')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "Avoid making rash and sudden decisions. A calm and calculated decision can be crucial for success.",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const Sandstorm_buildHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Sandstorm_build')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'complete_shelter'));
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[15] , "Joey") + constant.story[18] + logic.switchVoice(constant.professor[5] , "Matthew") + logic.switchVoice(constant.protagonist[27] , "Joey") + constant.story[19] + logic.switchVoice(constant.protagonist[16] , "Joey") + constant.story[20];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[7]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Decide whether to use the leftover harness to get back to the ship abandon the team and bring the necessary equipment from the ship to help them get back, or coordinate with your team to get them back up one by one knowing that the harness is already in a bad condition and time is crucial.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Bring the necessary equipment from the ship or Coordinate and help the team first",
                                "listItems": [
                                    {
                                        "primaryText": "Bring harness",
                                        "secondaryText": "ship_harness",
                                        "thumbnailImage": "https://media.istockphoto.com/photos/astronaut-man-walks-in-the-desert-with-mountains-in-mars-journey-to-picture-id846499682?k=20&m=846499682&s=170667a&w=0&h=YEKTZ1luUlrttor4UTZ_V-xuA-vsb2nlldwSvbod6X0="
                                    },
                                    {
                                        "primaryText": "Rescue team",
                                        "thumbnailImage": "https://ichef.bbci.co.uk/news/999/cpsprodpb/432F/production/_121499171_lgrescue3.jpg",
                                        "secondaryText": "rescue_team"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const RescueMission_rescueHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RescueMission_rescue')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'rescue_team'));
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[17] , "Joey") + constant.story[34] + logic.switchVoice(constant.sara[2] , "Salli") + constant.story[21] + logic.switchVoiceLang("en-GB",constant.zack[2] , "Brian") + logic.switchVoice(constant.professor[8] , "Matthew") + logic.switchVoice(constant.protagonist[28] , "Joey") + "chuckled the Captain. " + constant.story[22];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[14]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! you have completed one of the endings.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "The team always comes first no matter what and a true leader is nothing without their team.",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}

const RescueMission_abandonHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'RescueMission_abandon')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'ship_harness'));
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[18] , "Joey") + constant.story[23];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[13]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! you have completed one of the endings.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "It's the job of the captain to ensure the safety of their team. Leaving no one behind should be your first priority.",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const Sandstorm_AbandonBuildHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'Sandstorm_AbandonBuild')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'ship_dunes'));
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[19] , "Joey")  + logic.switchVoice(constant.professor[6] , "Matthew") + logic.switchVoice(constant.protagonist[29] , "Joey") + constant.story[24] + logic.switchVoice(constant.protagonist[20] , "Joey") + logic.switchVoice(constant.professor[7] , "Matthew") + logic.switchVoiceLang("en-GB",constant.zack[3] , "Brian") + constant.story[35] + logic.switchVoiceLang("en-AU", constant.john[1] , "Russell") + constant.story[25];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[15]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Decide whether to salvage something from the debris of the destroyed shelter and the spaceship or send a search party to salvage some resources from the debris of a nearby crash landing site of some old mission.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/LandingSpot_CraterTemplate",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://mediaproxy.salon.com/width/1200/https://media.salon.com/2022/04/planet-pluto-0405221.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "primaryText": "Make a choice: Salvage something from the debris or Send a search party",
                                "listItems": [
                                    {
                                        "primaryText": "Salvage debris",
                                        "secondaryText": "debris",
                                        "thumbnailImage": "https://i2-prod.mirror.co.uk/incoming/article26823878.ece/ALTERNATES/s615/0_NASA.jpg"
                                    },
                                    {
                                        "primaryText": "Search party",
                                        "thumbnailImage": "https://www.cnet.com/a/img/resize/ffa8d9620426359385ec85a78ee4cdc204550cb5/2022/04/28/c058a94c-1a52-4ce2-8419-dc4eba06131e/surface-1200x675.jpg?auto=webp&fit=crop&height=630&width=1200",
                                        "secondaryText": "search_party"
                                    }
                                ]
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const WayBack_ShelterDebrisHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WayBack_ShelterDebris')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'debris'));
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[21] , "Joey")+ constant.story[26] + logic.switchVoice(constant.protagonist[22] , "Joey") + constant.story[27] + logic.switchVoice(constant.protagonist[23] , "Joey") + logic.switchVoiceLang("en-GB",constant.zack[4] , "Brian") + constant.story[28] + logic.switchVoice(constant.protagonist[24] , "Joey") + constant.story[29];  
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[17]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! you have completed one of the endings.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "You may end up being wrong sometimes, but you should use it as motivation to improve, to try again and do better!",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const WayBack_OldLandingSiteHandler = {
    canHandle(handlerInput) {
        return ((Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'WayBack_OldLandingSite')
            || (Alexa.getRequestType(handlerInput.requestEnvelope) ===
        'Alexa.Presentation.APL.UserEvent' &&
        handlerInput.requestEnvelope.request.source.id === 'search_party'));
    },
    async handle(handlerInput) {
        //const speakOutput = logic.switchVoice(constant.protagonist[25] , "Joey")  + constant.story[30] + logic.switchVoice(constant.protagonist[26] , "Joey") +constant.story[31]+logic.switchVoiceLang("en-GB",constant.zack[5] , "Brian") + "Sara speaks up suddenly. " + logic.switchVoice(constant.sara[1] , "Salli")+ constant.story[32];
        const dialogues = await api.getDialogueLinks();
        const speakOutput =logic.audioTag(dialogues.intent[18]);
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('Hurray ! you have completed one of the endings.')
            .addDirective(
                {
                    "type": "Alexa.Presentation.APL.RenderDocument",
                    "token": "documentToken",
                    "document": {
                        "src": "doc://alexa/apl/documents/PositiveEnd",
                        "type": "Link"
                    },
                    "datasources": {
                        "cardsLayoutTemplateData": {
                            "type": "object",
                            "properties": {
                                "backgroundImage": "https://static01.nyt.com/images/2022/04/05/science/02sci-exoplanets7/02sci-exoplanets7-superJumbo.jpg",
                                "headerTitle": "",
                                "headerSubtitle": "",
                                "headerAttributionImage": "",
                                "primaryText": "Congratulations! You have completed one of the possible endings!"
                            }
                        },
                        "additionalData": {
                            "type": "object",
                            "properties": {
                                "hintText": "A mission is a team effort. Small failures shouldn't dishearten you, but motivate you to try again.",
                                "buttonText": "Restart the game",
                                "buttonId": "restart"
                            }
                        }
                    }
                }
            )
            .getResponse();
    }
}
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'You can say hello to me! How can I help?';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Goodbye!';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'Sorry, I don\'t know about that. Please try again.';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'Sorry, I had trouble doing what you asked. Please try again.';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        IntroIntentHandler,
        LandingSpot_ValleyHandler,
        SquareOne_RelocateHandler,
        LandingSpot_CraterHandler,
        SquareOne_StayBackHandler,
        OldLife_ReincarnateHandler,
        OldLife_AlternateHandler,
        ExplorationOfCaves_TakeCrystalHandler,
        LifeOrDeath_AmputateHandler,
        LifeOrDeath_ReachShipHandler,
        ExplorationOfCaves_FollowAdviceHandler,
        Survival_LongTermHandler,
        Survival_PlanLaterHandler,
        Sandstorm_buildHandler,
        RescueMission_rescueHandler,
        RescueMission_abandonHandler,
        Sandstorm_AbandonBuildHandler,
        WayBack_ShelterDebrisHandler,
        WayBack_OldLandingSiteHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();