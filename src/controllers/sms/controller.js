/**
 * Custom Activity Controller
 */


/**
 * Creation of config.json
 */
const getConfig = async (req, res) => {
    console.log("getConfig");
    try {
        var result = '{ name: "config", desc: "desc" }';//smsService.getConfig();
        console.log("config.json: " + result);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
    }
    return res.status(400).json({ result: "ERROR" });
}

/**
* Custom Activity UI
* Endpoint for the UI displayed to marketers while configuring this activity.
*/
const editModalPage = (req, res) => {
    res.render('pages/editModal');
}

/**
* running modal
*/
const runnungModalPage = (req, res) => {
    res.render('pages/runningModal');
}

/**
* running hover
*/
const runnungHoverPage = (req, res) => {
    res.render('pages/runningHover');
}

/**
* execute - The API calls this method for each contact processed by the journey.
* example of request's body:
* {
* "inArguments":
* [
* {"source_de": "ad59f02e-f93b-e711-af11-78e3b50b7f0c"},
* {"destination_de": "7c08723b-f93b-e711-af11-78e3b50b7f0c"},
* "activityObjectID": "5d88fd34-ba45-42ef-abda-d4a1f5830171",
* ],
* "journeyId": "8baa72eb-cc91-4c19-b053-e869a5bd5e42",
* "activityId": "5d88fd34-ba45-42ef-abda-d4a1f5830171",
* "definitionInstanceId": "45e3ec68-7b70-4e0d-9c13-218344f90fcb",
* "activityInstanceId": "b8f5640b-ecbe-411e-a143-29d21a89159a",
* "keyValue": "contact_emai@mail.com",
* "mode": 0
* }
 */
const execute = async (req, res) => {
    console.log("*** execute activity with payload: " + req.body);
    try {
        var result = '';//smsService.send(req.body);
        console.log("*** execute activity completed with result: " + result);
        return res.status(200).json({ result: "OK" });
    } catch (error) {
        console.log(error);
    }
    return res.status(400).json({ result: "ERROR" });
}

/**
* save - Notification is sent to this endpoint when a user saves the interaction (optional).
* called on journey activation
* example of request's body:
* {
* "activityObjectID": "770222dc-a0ca-4024-836a-9644dd26f848",
* "interactionId": "2fa18520-ec47-4db1-a5ec-6cbedae20762",
* "originalDefinitionId": "c0b22824-c4db-441b-a8e2-7aea9bfca439",
* "interactionKey": "6384e00d-a5cf-e993-e307-26079ad8554d",
* "interactionVersion": "2"
* } 
 */
const save = async (req, res) => {
    console.log("*** save activity: " + req.body);
    return res.status(200).json({ result: "OK" });
}
/**
* publish - Notification is sent to this endpoint when a user publishes the interaction.
* called on journey activation
* example of request's body:
* {
* "activityObjectID": "770222dc-a0ca-4024-836a-9644dd26f848",
* "interactionId": "2fa18520-ec47-4db1-a5ec-6cbedae20762",
* "originalDefinitionId": "c0b22824-c4db-441b-a8e2-7aea9bfca439",
* "interactionKey": "6384e00d-a5cf-e993-e307-26079ad8554d",
* "interactionVersion": "2",
* "isPublished": true
* }
 */
const publish = async (req, res) => {
    console.log("*** publish activity: " + req.body);
    return res.status(200).json({ result: "OK" });
}

/**
* validate - Notification is sent to this endpoint when a user performs some validation
* as part of the publishing process (optional).
* example of request's body:
* {
* "activityObjectID": "770222dc-a0ca-4024-836a-9644dd26f848",
* "interactionId": "2fa18520-ec47-4db1-a5ec-6cbedae20762",
* "originalDefinitionId": "c0b22824-c4db-441b-a8e2-7aea9bfca439",
* "interactionKey": "6384e00d-a5cf-e993-e307-26079ad8554d",
* "interactionVersion": "2"
* }
 */
const validate = async (req, res) => {
    console.log("*** validate activity: " + req.body);
    return res.status(200).json({ result: "OK" });
}

/**
* stop - Notification is sent to this endpoint when a user stops any active version of the interaction.
* The notification will be for that particular version’s activity (optional).
 */
const stop = async (req, res) => {
    console.log("*** stop activity: " + req.body);
    return res.status(200).json({ result: "OK" });
}

export {
    getConfig,
    editModalPage,
    runnungHoverPage,
    runnungModalPage,
    execute,
    save,
    publish,
    validate,
    stop
}