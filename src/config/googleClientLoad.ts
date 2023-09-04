import { ApiKey, ClientId, Discovery_doc, Scopes } from "./config";

declare global {
    interface Window { gapi: any; }
  }
export function GoogleLoginstart() {
    // 2. Initialize the JavaScript client library.
    window.gapi.client.init({
      'apiKey': ApiKey,
      'discoveryDocs': [Discovery_doc],
    
      'clientId': ClientId,
      'scope': 'calendar',
    }).then(function() {
     
      return window.gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
      });
    console.log("connected")
    }).then(function(response :any) {
      console.log(response);
    }, function(Error :any) {
      console.log('Error: ' + Error);
    });
  };
  // 1. Load the JavaScript client library.
