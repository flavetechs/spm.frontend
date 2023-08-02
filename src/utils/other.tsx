export class ServiceURLs {
    static GetAppUrl(): string {
        return process.env.NODE_ENV === "development" ? 'http://futureschools.flaveconsole.com' : window.location.origin;
    }
    static SmpDocumentation(): string {
        return 'http://flaveconsole.com/docs/smp-canvas?feature=';
    }
    static SmpDocumentation2(): string {    
        return 'http://flaveconsole.com/docs/smp?feature=';
    }
}
