export class ServiceURLs {
    // static Development(): string {
    //     return 'http://queencollege.flavetechs.com';
    // }
    static GetAppUrl(): string {
        return process.env.NODE_ENV === "development" ? 'http://queencollege.flavetechs.com' : window.location.origin;
    }
    static SmpDocumentation(): string {
        return 'http://fws.flavetechs.com/docs/smp-canvas?feature=';
    }
    static SmpDocumentation2(): string {
        return 'http://fws.flavetechs.com/docs/smp?feature=';
    }
}
