import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Facebook } from 'ionic-native';

@Injectable()
export class FacebookService {
	constructor(platform: Platform) {
		if (platform.is('core')) {
			Facebook.browserInit(1309220835785998);
			/*
			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) return;
				js = d.createElement(s); js.id = id;
				js.src = '//connect.facebook.net/en_US/sdk.js';
				fjs.parentNode.insertBefore(js, fjs);
			} (document, 'script', 'facebook-jssdk'));

			window.fbAsyncInit = function () {
				console.log('inited');
				FB.init({
					appId: '1309220835785998',
					cookie: true,  // enable cookies to allow the server to access the session 
					xfbml: true,  // parse social plugins on this page
					version: 'v2.8' // use graph api version 2.8
				});
			};
			*/
		}
	}
	Login() {

	}
}
