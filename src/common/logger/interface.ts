export interface LoggerI {
	error: (message?: any, ...optionalParams: any[]) => void;
	warn: (message?: any, ...optionalParams: any[]) => void;
	info: (message?: any, ...optionalParams: any[]) => void;
	debug: (message?: any, ...optionalParams: any[]) => void;
	log: (message?: any, ...optionalParams: any[]) => void;
	store: () => void;
	unstore: () => void;
}
