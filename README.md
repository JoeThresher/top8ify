# Top8ify

## An infinately customizable top 8 graphic generator for Super Smash Bros. Melee

Top8ify is a top 8 graphic generator for Super Smash Bros. Melee, with the goal of being fast, user friendly, and extremely customizable. I wrote this program because I felt tournament organizers needed a better solution for generating custom top 8 graphics, especially if a graphic needs to be made every week for a weekly tournament.

## Features

- Sleek, modern, easy-to-use UI
- Import tournament details from StartGG
- Main, secondary and tertiary characters for each player
- Fully customizable graphic generation with user-updated CSS stylesheets
- Saving user preferences for faster repeated graphic generation
- Live updates as you enter data
- Decrease player count for smaller tournaments featuring less than 8 players
- Custom tournament logo support
- Removable branding text with a simple toggle

## Usage

If you have used a top 8 graphic generator before, the UI will be very familiar. Tournament name and player standings can be imported with a link to the event on StartGG. Characters and character colors can be entered for each player. When graphic is ready for export, simply press the export button and a file dialog will allow you to download it.

In the Advanced settings section, your StartGG token can be entered to allow use of importing from StartGG. Saving your settings will save the token for next time you open the program. Generate a StartGG token by following [these instructions](https://developer.start.gg/docs/authentication)

## FAQ

#### How do I create a custom CSS file for my graphic?

Download a copy of [graphicScreen.css](https://github.com/JoeThresher/top8ify/blob/main/src/assets/graphicScreen.css) from this repository (/src/assets/graphicScreen.css) and tweak the styles for each component you'd like to customize. I tried to make it as legible as possible for easier customization, without requiring familiarity with the code itself. Then just upload the customized file using the app's UI in the Advanced Options section.

#### Why is this an Electron app instead of a web app?

The original idea I had would've been hosting this as a web app with GitHub Pages. However I realized that the functionality I wanted to create would require backend functionality in some way. I didn't want to host a server for the app to keep costs to a minimum and to allow for offline use of the app. This also allows for independence from a centralized server, allowing for more potential for anyone who'd like to fork the app. I would have liked to use a more modern framework like [Tauri](https://github.com/tauri-apps/tauri) but I was having crashing issues when testing with it.

#### Why not build a native app?

Main thing is that I already knew how to make a web app, so the learning curve was much less steep than building a native desktop app. The functionality I wanted also relied on web technologies like CSS stylesheets and [html2canvas-pro](https://github.com/yorickshan/html2canvas-pro).

## Planned features

- Custom font handling, so users can use their own fonts uploaded through the UI
- Character graphic packs, either user-uploadable or multiple packs included in the standard application
- Maybe more games in the future?

## Build Instructions

### Requirements

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/en/)

### Build Steps

- Clone the repo via: `git clone https://github.com/JoeThresher/top8ify.git`
- Navigate into the directory and run: `npm install` to install all dependencies
- Use `npm run start` to run the app in develop mode
- Use `npm run package` to build a release
- Use `npm run make` to create distributable packages

### Build for Windows on a Linux machine

- Install [Wine](https://www.winehq.org/) and [Mono](https://www.mono-project.com/)
- On Ubuntu (may also be true for other distributions), wine32 may be missing. You can add it by running the following commands: `sudo dpkg --add-architecture i386` `sudo apt update` `sudo apt install wine32:i386` `sudo apt install --install-recommends wine`
- You may also need to symlink `wine64` to `wine` in `/usr/bin/`. Navigate to this directory and run `sudo ln -s wine wine64`
- Use `npm run make -- --platform=win32` to create a distributable .exe file for Windows
