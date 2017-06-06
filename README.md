Plug this into a [Chewb](https://github.com/samradical/chewb) instance.

`example.js`

## Config

```
let Strategies = [{
  name: 'facebook',
  clientId: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  authUrl: '/login/facebook',
  redirectUrl: '/login/facebook/return',
  callbackUrl: `http://localhost:8080/login/facebook/success`
}]
```

`authUrl` From your app open a popup window at this address.

`redirectUrl` This is required by oAuth2

`callbackUrl` Have a timer watching the popup window url to read back the auth tokens.


## Use


```
let chewbPassport = new ChewbPassport(
  server.app, //chewb server
  Strategies,
   {
    host: `http://${server.host}:${server.port}/`,
    baseRoute: '', //this will prepend the 'Url' in the config.
    logOut: true //force logout
  })


```