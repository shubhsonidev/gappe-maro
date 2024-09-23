import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class WebSocketService {
  private socket: WebSocket | null = null;
  private messagesSubject = new Subject<any>();
  private chatHistoryUpdatedSubject = new Subject<void>();

  messages$ = this.messagesSubject.asObservable();
  chatHistoryUpdated$ = this.chatHistoryUpdatedSubject.asObservable();
  constructor() {}

  getCookie(name: string): string | null {
    const cookieArr = document.cookie.split(";");

    for (let i = 0; i < cookieArr.length; i++) {
      const cookiePair = cookieArr[i].split("=");

      // Remove any leading spaces and compare cookie name
      if (name === cookiePair[0].trim()) {
        return decodeURIComponent(cookiePair[1]);
      }
    }

    return null;
  }

  connect(): void {
    const token = this.getCookie("token");
    console.log("JWT Token:", token);

    const url = `${environment.wsUrl}${token}`;
    this.socket = new WebSocket(url);

    this.socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Message received from server:", data);
      this.messagesSubject.next(data);
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onclose = () => {
      console.log("WebSocket connection closed");
    };
  }

  sendMessage(to: string, message: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const messagePayload = {
        type: "newMessage",
        to: to,
        message: message,
      };
      this.socket.send(JSON.stringify(messagePayload));
      setTimeout(() => {
        this.chatHistoryUpdatedSubject.next();
      }, 200);
    } else {
      console.error("WebSocket is not open. Unable to send message.");
    }
  }

  fetchChatHistory(recipientId: string): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const chatHistoryPayload = {
        type: "fetchChatHistory",
        to: recipientId,
      };
      this.socket.send(JSON.stringify(chatHistoryPayload));
    } else {
      console.error("WebSocket is not open. Unable to fetch chat history.");
    }
  }

  close(): void {
    if (this.socket) {
      this.socket.close();
    }
  }
}
