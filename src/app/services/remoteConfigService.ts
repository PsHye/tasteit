import { Injectable } from '@angular/core';
import { AngularFireRemoteConfig, Parameter } from '@angular/fire/compat/remote-config';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RemoteConfigService {
  private remoteConfigParameters = new Map<string, string>();
  private parametersLoaded = new BehaviorSubject<boolean>(false);

  constructor(private remoteConfig: AngularFireRemoteConfig) {
    this.fetchAndLoadParameters();
  }

  private async fetchAndLoadParameters() {
    try {
      await this.remoteConfig.fetch();
      const parameters = this.remoteConfig.parameters;
      parameters.subscribe((data: Parameter[]) => {
        data.forEach((item: Parameter) => {
          this.remoteConfigParameters.set(item.key, item._value);
        });

        this.parametersLoaded.next(true);
      });
    } catch (error) {
      console.error('Error fetching remote configuration:', error);
    }
  }

  getParameterValue(key: string): string | undefined {
    return this.remoteConfigParameters.get(key);
  }

  getAllParameters(): Map<string, string> {
    return this.remoteConfigParameters;
  }

  areParametersLoaded(): Observable<boolean> {
    return this.parametersLoaded.asObservable();
  }
}
