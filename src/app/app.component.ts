import { Component, OnInit } from '@angular/core';
import { AngularFireRemoteConfig, Parameter } from '@angular/fire/compat/remote-config';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  remoteConfig$: Observable<any> = new Observable<any>();

  remoteConfigParameters = new Map<string, string>();

  constructor(private remoteConfig: AngularFireRemoteConfig) {}

  async ngOnInit() {
    try {
      await this.remoteConfig.fetch();
      const parameters = this.remoteConfig.parameters;
      parameters.subscribe((data: Parameter[]) => {
        data.forEach((item: Parameter) => {
          this.remoteConfigParameters.set(item.key, item._value);
        });

        console.log(this.remoteConfigParameters); // This will log the populated map
      });
    } catch (error) {
      console.error('Error fetching remote configuration:', error);
    }
  }
}
