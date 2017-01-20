import { Injectable, Optional } from '@angular/core';
import { Level } from './level';
import { LoggerI } from './interface';
import { Platform } from 'ionic-angular';

/**
 * Logger options.
 * See {@link Logger}.
 *
 * level - How much detail you want to see in the logs. Defaults to WARN.
 * global - logger object exposed in the global scope. Defaults: true.
 * globalAs - Window's property name where the logger object is created. Defaults: 'logger'.
 * store - Level config to be saved in the local storage. Defaults to false.
 * storeAs - Local storage key used to save the level. Defaults to 'angular2.logger.level'.
 *
 * Created by Langley on 3/23/2016.
 *
 */
export class Options {
	level: Level;
	global: boolean;
	globalAs: string;
	store: boolean;
	storeAs: string;
}

// For browsers that don't implement the debug method, log will be used instead. Fixes #62.
const CONSOLE_DEBUG_METHOD = console['debug'] ? 'debug' : 'log';

const DEFAULT_OPTIONS: Options = {
	level: Level.INFO,
	global: true,
	globalAs: 'logger',
	store: false,
	storeAs: 'angular2.logger.level',
};

@Injectable()
export class Logger implements LoggerI {

	private _level: Level;
	private _globalAs: string;
	private _store: boolean;
	private _storeAs: string;

	constructor( public platform: Platform, @Optional() options?: Options ) {

		let {
			level, global, globalAs, store, storeAs,
		} = Object.assign( {}, DEFAULT_OPTIONS, options );

		this._level = level;
		this._globalAs = globalAs;
		this._storeAs = storeAs;

		if (global) {
			this.global();
		}

		if ( store || this._loadLevel() ) this.store();

	}

	stringify(args: IArguments) {

		if (!this.platform.is('cordova')) {
			return args;
		}

		return Array.prototype.slice.call(args).map(arg => {
			if (typeof arg !== 'object') return arg;
			return JSON.stringify(arg);
		});
	}

	error(message?: any, ...optionalParams: any[]) {
		if (this.isErrorEnabled()) {
			console.error.apply( console, this.stringify(arguments) );
		}
	}

	warn(message?: any, ...optionalParams: any[]) {
		if (this.isWarnEnabled()) {
			console.warn.apply( console, this.stringify(arguments) );
		}
	}

	info(message?: any, ...optionalParams: any[]) {
		if (this.isInfoEnabled()) {
			console.info.apply( console, this.stringify(arguments) );
		}
	}

	debug(message?: any, ...optionalParams: any[]) {
		if (this.isDebugEnabled()) {
			( <any> console )[ CONSOLE_DEBUG_METHOD ].apply( console, this.stringify(arguments) );
		}
	}

	log(message?: any, ...optionalParams: any[]) {
		if (this.isLogEnabled()) {
			console.log.apply( console, this.stringify(arguments) );
		}
	}

	global = () => ( <any> window )[this._globalAs] = this;

	store(): Logger {

		this._store = true;
		let storedLevel = this._loadLevel();
		if ( storedLevel ) {
			this._level = storedLevel;
		} else {
			this._storeLevel( this.level );
		}

		return this;
	}

	unstore(): Logger {
		this._store = false;
		localStorage.removeItem( this._storeAs );
		return this;
	}

	isErrorEnabled = (): boolean => this.level >= Level.ERROR;
	isWarnEnabled = (): boolean => this.level >= Level.WARN;
	isInfoEnabled = (): boolean => this.level >= Level.INFO;
	isDebugEnabled = (): boolean => this.level >= Level.DEBUG;
	isLogEnabled = (): boolean => this.level >= Level.LOG;

	get level(): Level { return this._level; }

	set level(level: Level) {
		if (this._store) {
			this._storeLevel(level);
		}
		this._level = level;
	}

	private _loadLevel = (): Level => Number(localStorage.getItem( this._storeAs ));

	private _storeLevel(level: Level) { localStorage[ this._storeAs ] = level; }
}
