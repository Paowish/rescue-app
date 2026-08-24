import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth';
import { firstValueFrom } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private http = inject(HttpClient);
    private auth = inject(AuthService);

    private apiUrl = 'http://localhost:5000/api';

    async get<T>(endpoint: string): Promise<T> {
        const token = await this.auth.getToken();
        return firstValueFrom(
            this.http.get<T>(`${this.apiUrl}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        );
    }

    async post<T>(endpoint: string, data: any): Promise<T> {
        const token = await this.auth.getToken();
        return firstValueFrom(
            this.http.post<T>(`${this.apiUrl}${endpoint}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        );
    }

    async put<T>(endpoint: string, data: any): Promise<T> {
        const token = await this.auth.getToken();
        return firstValueFrom(
            this.http.put<T>(`${this.apiUrl}${endpoint}`, data, {
                headers: { Authorization: `Bearer ${token}` }
            })
        );
    }

    async delete<T>(endpoint: string): Promise<T> {
        const token = await this.auth.getToken();
        return firstValueFrom(
            this.http.delete<T>(`${this.apiUrl}${endpoint}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
        );
    }
}