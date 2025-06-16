/* eslint-disable no-prototype-builtins */
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private getHeaders(customHeaders?: { [key: string]: string }, body?: unknown): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    if (body instanceof FormData) {
      headers = new HttpHeaders();
    } else {
      headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });
    }

    // jwt
    const token = localStorage.getItem('jwt');
    if (token) {
      headers = headers.set('authorization', `Bearer ${token}`);
    }

    if (customHeaders) {
      for (const key in customHeaders) {
        if (customHeaders.hasOwnProperty(key)) {
          headers = headers.set(key, customHeaders[key]);
        }
      }
    }

    return headers;
  }

  get<T>(url: string, params?: HttpParams, customHeaders?: { [key: string]: string }): Observable<T> {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('jwt');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    if (customHeaders) {
      for (const key in customHeaders) {
        if (customHeaders.hasOwnProperty(key)) {
          headers = headers.set(key, customHeaders[key]);
        }
      }
    }
    return this.http.get<T>(url, { headers, params });
  }

  post<T>(url: string, body?: unknown, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.post<T>(url, body, {
      headers: this.getHeaders(customHeaders, body)
    });
  }

  put<T>(url: string, body?: unknown, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.put<T>(url, body, {
      headers: this.getHeaders(customHeaders, body)
    });
  }

  delete<T>(url: string, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.delete<T>(url, {
      headers: this.getHeaders(customHeaders)
    });
  }
}