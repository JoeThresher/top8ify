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
