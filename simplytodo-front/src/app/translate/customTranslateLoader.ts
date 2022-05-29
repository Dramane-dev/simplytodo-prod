import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { fr } from './fr';
export class CustomTranslateLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<Object> {
        return of(fr);
    }
}