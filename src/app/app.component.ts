import { Component, OnInit } from '@angular/core';
import { AngularFireRemoteConfig, Parameter } from '@angular/fire/compat/remote-config';
import { Observable } from 'rxjs';
import { RemoteConfigService } from './services/remoteConfigService';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = "App"
  allParameters: Map<string, string> = new Map<string, string>();

  homeSectionEnabled: boolean = false;
  postsEnabled: boolean = false;
  categoriesSection: boolean = false;
  postRequestsEnabled: boolean = false;

  websiteIsDown: boolean = false;
  newsUpdateEnabled: boolean = false;
  appVersion: string | undefined = "";
  aboutSection: boolean = false;

  constructor(
    private remoteConfigService: RemoteConfigService,
    private analytics: AngularFireAnalytics
    ) {}

  ngOnInit() {
    //this.analytics.logEvent('app_started', { version: '1.0.0' });
    this.remoteConfigService.areParametersLoaded().subscribe(loaded => {
      if (loaded) {
        this.allParameters = this.remoteConfigService.getAllParameters();
        const homeSectionEnabled = this.remoteConfigService.getParameterValue('home_section');
        const postsEnabled = this.remoteConfigService.getParameterValue('post_section');
        const categoriesSection = this.remoteConfigService.getParameterValue('categories_section');
        const postRequestsValue = this.remoteConfigService.getParameterValue('post_requests');
        const aboutSection = this.remoteConfigService.getParameterValue('about_section');
        const websiteIsDown = this.remoteConfigService.getParameterValue('website_down');
        const newsUpdateEnabled = this.remoteConfigService.getParameterValue('news_update');
        const AppVersion = this.remoteConfigService.getParameterValue('app_version');

        this.homeSectionEnabled = postRequestsValue === 'true';
        this.postsEnabled = postRequestsValue === 'true';
        this.categoriesSection = postRequestsValue === 'true';
        this.postRequestsEnabled = postRequestsValue === 'true';
        this.aboutSection = postRequestsValue === 'true';

        this.appVersion = AppVersion
      }
    });
  }
}

