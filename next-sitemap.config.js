module.exports = {
    siteUrl: 'https://www.xocandles.com',
    generateRobotsTxt: true, // (optional)
    // ...other options
    // outDir: './out',
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                // disallow: [
                //     'https://demo.www.adncleaningservices.co.uk/',
                //     'https://demo.adncleaningservices.co.uk/',
                //     '/*https://adn-cleaning-1.vercel.app/',
                //     '/cache/',
                //     '/cgi-bin/',
                //     '/?label=',
                //     'https://www.adncleaningservices.co.uk/myProfile/*',
                // ],
            },
        ],
    }
}