import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { firstValueFrom } from 'rxjs';

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: 'civilian' | 'volunteer' | 'admin' | 'responder' | 'dispatcher';
    phoneNumber?: string;
    profileImage?: string;
}

export interface AuthResponse {
    success: boolean;
    token: string;
    user: User;
    message?: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private router = inject(Router);
    private storage = inject(Storage);

    private currentUserSignal = signal<User | null>(null);
    private isAuthenticatedSignal = signal<boolean>(false);

    readonly currentUser = this.currentUserSignal.asReadonly();
    readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();

    private apiUrl = 'http://localhost:5000/api/auth';

    constructor() {
        this.initStorage();
    }

    private async initStorage() {
        await this.storage.create();
        await this.loadUserFromStorage();
    }

    private async loadUserFromStorage() {
        try {
            const token = await this.storage.get('token');
            const userData = await this.storage.get('user');

            if (token && userData) {
                this.currentUserSignal.set(userData);
                this.isAuthenticatedSignal.set(true);
            }
        } catch (error) {
            console.error('Error loading user from storage:', error);
        }
    }

    async signup(userData: any): Promise<AuthResponse> {
        try {
            const response = await firstValueFrom(
                this.http.post<AuthResponse>(`${this.apiUrl}/register`, userData)
            );

            if (response.success) {
                await this.storage.set('token', response.token);
                await this.storage.set('user', response.user);
                this.currentUserSignal.set(response.user);
                this.isAuthenticatedSignal.set(true);
            }

            return response;
        } catch (error: any) {
            throw error.error || { success: false, message: 'Signup failed' };
        }
    }

    async login(credentials: { email: string; password: string }): Promise<AuthResponse> {
        try {
            const response = await firstValueFrom(
                this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
            );

            if (response.success) {
                await this.storage.set('token', response.token);
                await this.storage.set('user', response.user);
                this.currentUserSignal.set(response.user);
                this.isAuthenticatedSignal.set(true);
            }

            return response;
        } catch (error: any) {
            throw error.error || { success: false, message: 'Login failed' };
        }
    }

    async logout(): Promise<void> {
        await this.storage.remove('token');
        await this.storage.remove('user');
        this.currentUserSignal.set(null);
        this.isAuthenticatedSignal.set(false);
        this.router.navigate(['/login']);
    }

    getToken(): Promise<string | null> {
        return this.storage.get('token');
    }

    async getCurrentUser(): Promise<User | null> {
        return this.storage.get('user');
    }
}