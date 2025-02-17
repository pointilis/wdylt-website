import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthReducer } from './auth/state/reducers/auth/auth.reducer';
import { AuthEffects } from './auth/state/effects/auth/auth.effects';
import { provideNativeDateAdapter } from '@angular/material/core';
import { LearnReducer } from './learn/state/reducers/learn/learn.reducer';
import { LearnEffects } from './learn/state/effects/learn/learn.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
        projectId: "wdylt-website",
        appId: "1:928871794567:web:c9294dd68219e9214b7522",
        storageBucket: "wdylt-website.firebasestorage.app",
        apiKey: "AIzaSyDfg8iyDo-pnK1HK0-YIXn0gGckzERFkkk",
        authDomain: "wdylt.com",
        messagingSenderId: "928871794567",
    })),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    provideVertexAI(() => getVertexAI()),
    provideNativeDateAdapter(),
    provideStore({
      auth: AuthReducer,
      learn: LearnReducer,
    }),
    provideEffects([
      AuthEffects,
      LearnEffects,
    ])
  ],
};
