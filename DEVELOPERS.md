# PressPass Documentation

## What is PressPass?

PressPass is a single sign-on service made for and by journalists. It allows journalists to create one account to access all of the tools they use to do their work. For developers, this means PressPass can serve as your user authentication backend. We’ve made that as simple as possible, with starters and examples for most popular languages and authentication libraries.

PressPass uses OpenID Connect, a protocol built on OAuth 2.0, to authenticate users. This is a popular protocol used by many authentication providers, including Google. To setup your application to use PressPass as a login provider, you need to register your application as a third-party client with us at presspass.it. Follow the instructions below.

## Setting up your PressPass client

1. Create a PressPass account at presspass.it.
2. Once logged in, navigate to the developer section via the navigation bar.
3. Create a new client.
4. Give your client the following settings:
    1. **Name**: the name of your application
    2. **Auth type**: public
    3. **Website**: the **login route** to your application. The PressPass dashboard will use this URL to log users in to your application automatically when they click on your application.
    4. **Terms of service**: If applicable, a URL to your terms of service.
    5. **Contact email**: An email address for someone we can contact about your application
    6. **Logo**: a logo for your application that users will see in their dashboard
    7. **Redirect links**: Where users should go in your application after they receive a token from PressPass. This will likely be a URL like `http://mywebsite.com/auth/complete/presspass`.
    8. **Post-logout redirects**: Where users should go in your application after they logout.
5. Copy your PressPass Client ID and store it somewhere accessible. You will need this for your application.

## Setting up your application

Now you’re ready to set up your own application to use PressPass login. To help you, we have a few libraries in popular languages to make this process as plug-and-play as possible. Find your language and supported plug-in for documentation on how to implement.

- Python: [social-auth-presspass]
- Node.js: [passport-presspass]
- Ruby: [devise-presspass]
- Go: [goth-presspass]

