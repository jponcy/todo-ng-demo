import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CaseConverterService {

  /**
   * To camel case of case converter service
   */
  toCamelCase = <T>(data: T) => Array.isArray(data)
      ? data.map(d => this.objToCamel(d)) as unknown as T
      : this.objToCamel(data)

  private objToCamel<T>(obj: T): T {
    return Object.keys(obj)
      .reduce((acc, key) => ({...acc, [this.strToCamel(key)]: obj[key]}), {}) as T;
  }

  private strToCamel(str: string): string {
    return str.replace(/([-_][a-z])/g, l => l[1].toUpperCase());
  }
}
