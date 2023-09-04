export class ServiceURLs {
    static GetAppUrl(): string {
        return process.env.NODE_ENV === "development" ? 'https://futureschools.flaveconsole.com' : window.location.origin;
    }
    static SmpDocumentation(): string {
        return 'https://flaveconsole.com/docs/smp-canvas?feature=';
    }
    static SmpDocumentation2(): string {    
        return 'https://flaveconsole.com/docs/smp?feature=';
    }
}
