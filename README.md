# PressPass Frontend

This repository contains the frontend code for [PressPass](http://presspass.it) by [News Catalyst](https://newscatalyst.org). It uses [Squarelet](https://github.com/MuckRock/squarelet) as its backend.

## File Structure

Inside `src/`, each 'logical component' of the app (like `account/`, `auth/`, etc.) has its own folder. React TypeScript files that are in title case (e.g. `EntitlementsList.tsx`) are components whose default export is that component. If the filename is not in title case, it is not a component. 

## Development Environment

When developing the app, you will need to run this frontend app in tandem with Squarelet. Ensuring that cookies and data is properly shared can be challenging—if you follow this guide, however, you should run into minimal issues.

1. Install Squarelet according to its [installation instructions](https://github.com/MuckRock/squarelet/blob/master/README.md).
2. On *nix systems, edit your `/etc/hosts` file to point `dev.presspass.com` to `127.0.0.1` (the loopback address).
3. Ensure that your Squarelet environment has its url set to `dev.presspass.com` in its environment settings. (Refer to the Squarelet documentation for more information.)
4. Run Squarelet using `COMPOSE_FILE=local.yml inv runserver` from within the Squarlet directory. (Alternatively, you can set the environment variable `COMPOSE_FILE` to be set to `local.yml` in your bash profile and omit it from the command.)
5. Launch the frontend using `npm start` from within this directory.
6. Visit the frontend at `http://dev.presspass.com:3000`, preferably in incognito mode. (Developing in incognito mode can help avoid issues in which existing Squarelet cookies allow `GET` requests but block CSRF-required `POST`s.)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## TODO

- [x] File upload for logo
- [x] Add Bulma/form library/field abstractions
- [x] Add notification system for when Squarelet isn't available/network requests fail
- [ ] Account registration
- [x] Password management
- [x] Password reset