import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FbdataService {

  // Create url to facebook graph
  graphURL = "https://graph.facebook.com/6421646334526516?access_token=EAALMNoF8Q0QBACmvuw9tOiaKvDiy2FedVmw8qNZAAyo8Y02OXZCYZBmq6l75uQTgHYBT6c26hyVZC3ndOhKDVeURZC7oyx4NDZBmE2LABMesqbKffDNtwoVQWv2WQrYpcUW7dcXohLcLZCgzZAB7GjWzVNmdecq7eMR56GZByxvD5HCEFhbLnMPe9bLhNpqIX0lzR9nvWJ6KNmgZDZD";


  // Inject HttpClient module into Constructor
  constructor(private http: HttpClient) { }

  // Create getData() function thats makes http request
  getFBData() {
    // Make http request using Http Client;
    return this.http.get(this.graphURL);
  }
}

