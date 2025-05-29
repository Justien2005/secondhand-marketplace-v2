import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}

  private getHeaders(customHeaders?: { [key: string]: string }): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // jwt
    const token = localStorage.getItem('jwt');
    if (token) {
      headers = headers.set('authorization', `Bearer ${token}`);
    }

    if (customHeaders) {
      Object.keys(customHeaders).forEach(key => {
        headers = headers.set(key, customHeaders[key]);
      });
    }

    return headers;
  }

  get<T>(url: string, params?: HttpParams, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.get<T>(url, {
      headers: this.getHeaders(customHeaders),
      params
    });
  }

  post<T>(url: string, body?: unknown, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.post<T>(url, body, {
      headers: this.getHeaders(customHeaders)
    });
  }

  put<T>(url: string, body?: unknown, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.put<T>(url, body, {
      headers: this.getHeaders(customHeaders)
    });
  }

  delete<T>(url: string, customHeaders?: { [key: string]: string }): Observable<T> {
    return this.http.delete<T>(url, {
      headers: this.getHeaders(customHeaders)
    });
  }
}