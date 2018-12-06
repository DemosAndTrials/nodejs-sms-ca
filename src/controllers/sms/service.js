import {
    v4 as uuid
} from 'uuid';
import request from 'request';

class SmsService {

    /**
     * Create config.json file
     */
    getConfig(host) {
        var json = {
            workflowApiVersion: '1.1',
            metaData: {
                icon: host + "/images/inwi_400x400.png",
                iconSmall: host + "/images/inwi_100x100.png",
                category: "message",
                isConfigured: "false",
                configOnDrop: "true"
            },
            type: "REST",
            lang: {
                "en-US": {
                    "name": "Send SMS",
                    "description": "Sends SMS using INWI Gateway"
                }
            },
            arguments: {
                execute: {
                    inArguments: [],
                    url: host + "/sms/execute",
                    verb: "POST",
                    body: "",
                    header: "",
                    format: "json",
                    useJwt: "false",
                    timeout: 10000
                }
            },
            configurationArguments: {
                applicationExtensionKey: "722956e9-3c19-46e6-adab-365d98ca74a4",
                save: {
                    url: host + "/sms/save",
                    useJwt: "false"
                },
                publish: {
                    url: host + "/sms/publish",
                    useJwt: "false"
                },
                validate: {
                    url: host + "/sms/validate",
                    useJwt: "false"
                },
                stop: {
                    url: host + "/sms/stop",
                    useJwt: "false"
                }
            },
            wizardSteps: [{
                label: "Step 1",
                key: "step_1"
            }],
            userInterfaces: {
                configModal: {
                    height: "600",
                    width: "800",
                    url: host + "/sms/ui?numSteps=1"
                },
                runningModal: {
                    url: host + "/sms/ui/modal"
                },
                runningHover: {
                    url: host + "/sms/ui/hover"
                }
            },
            schema: {
                arguments: {
                    execute: {
                        inArguments: [],
                        outArguments: [{
                            sendResult: {
                                dataType: "Text",
                                isNullable: false,
                                direction: "out",
                                access: "visible"
                            },
                            sendName: {
                                dataType: "Text",
                                isNullable: false,
                                direction: "out",
                                access: "visible"
                            },
                            sendDate: {
                                dataType: "Date",
                                isNullable: "false",
                                direction: "out",
                                access: "visible"
                            },
                            sendContent: {
                                dataType: "Text",
                                isNullable: false,
                                direction: "out",
                                access: "visible"
                            },
                            sendComment: {
                                dataType: "Text",
                                isNullable: "false",
                                direction: "out",
                                access: "visible"
                            }
                        }]
                    }
                }
            }
        };
        return json;
    }

    /**
     * Send SMS
     */
    async send(args) {
        console.log(args.inArguments.length);
        // content
        var content = args.inArguments[0];
        var msgName = content.messageName;
        var msgContent = content.messageContent;
        //contact
        var contact = args.inArguments[1];
        var mobile = contact.Phone;

        var finalMessage = this.createMessage(contact, msgContent);
        console.log("--> finalMessage: " + finalMessage);

        var jsonBody = {
            CSSendSMSRequest: {
                CSSendSMSInteraction: {
                    reason: msgName,
                    id: uuid(),
                    CSSMS: {
                        id: uuid(),
                        creator: "SFMC",
                        from: "212",
                        to: mobile,
                        message: finalMessage,
                        priority: "1",
                        encoding: "fr",
                        effectiveDate: (new Date()).toLocaleString('en-GB', {
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit'
                        })
                    }
                },
                CSOperationInfo: {
                    channel: "SFMC",
                    user: "sfuser",
                    uuid: uuid()
                }
            }
        };
        console.log("--> Request: " + JSON.stringify(jsonBody));
        try {
            let res = await this.doRequest(jsonBody);
            console.log("--> Response: " + JSON.stringify(res));
        } catch (error) {
            return {
                sendResult: "KO",
                sendName: msgName,
                sendDate: (new Date()).toLocaleString('en-GB', {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                sendContent: finalMessage,
                sendComment: error
            };
        }

        return {
            sendResult: "OK",
            sendName: msgName,
            sendDate: (new Date()).toLocaleString('en-GB', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            }),
            sendContent: finalMessage,
            sendComment: ""
        };
    }

    /**
     * Create final message
     */
    createMessage(contact, messageContent) {
        if (messageContent.includes("%%PlaceholderTitle%%")) {
            var title = contact.Gender == "male" ? "Monsieur" : "Madame";
            messageContent = messageContent.replace("%%PlaceholderTitle%%", title);
        }
        messageContent = messageContent.replace("%%Placeholder1%%", contact.FirstName);
        messageContent = messageContent.replace("%%Placeholder2%%", contact.LastName);
        // dates
        messageContent = messageContent.replace("%%Placeholder3%%", this.parseDate(contact.SuspensionDate));
        messageContent = messageContent.replace("%%Placeholder4%%", this.parseDate(contact.TerminationDate));
        //
        messageContent = messageContent.replace("%%Placeholder5%%", contact.Other);

        return messageContent;
    }

    parseDate(stringDate) {
        var options = {
            weekday: 'long',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        };
        var dt = new Date(stringDate);
        return dt.toLocaleString('fr-FR', options);
    }

    /**
     * Post to SMS Gateway
     */
    doRequest(body) {
        return new Promise(function (resolve, reject) {

            var options = {
                uri: 'http://www.mocky.io/v2/5bd776c83500002c47fd80cc',
                method: 'POST',
                json: body
            };

            request(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    console.log("--> body: " + JSON.stringify(body));
                    resolve(body);
                } else {
                    console.log("--> res: " + JSON.stringify(res));
                    console.log("--> statusCode: " + res.statusCode);
                    console.log("--> error: " + error);
                    console.log("--> body: " + JSON.stringify(body));
                    reject(!error ? res.statusCode : error);
                }
            });

        });
    }
}

export default new SmsService();