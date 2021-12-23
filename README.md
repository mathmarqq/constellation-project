# Constellation Web Developer Test

> Applicant: Matheus Marques


## Online demo

The app is available for preview at https://task-management-board-constellation.netlify.app/board

Storybook: https://agitated-neumann-c1f087.netlify.app

Backend-api: https://constellation-api-mock.herokuapp.com/

Invite to see chromatic dashboard: https://www.chromatic.com/builds?appId=61c493c9a3281c004a1a9eeb

### About the test

I didn't have time to implement all the features and make cypress tests, about the drag-and-drop feature I made the right implementation but it isn't working because the backend isn't prepared to reorder the lists and cards

## Architecture

### Tech Stack

- Backend
  - json-server to mock
- Frontend
  - React with Typescript
  - ESLint to avoid common problems
  - Prettier to enforce a consistent style
  - Husky to implement git-hooks (pre-commit/pre-push)
  - Testing library to make component tests
  - Chromatic to make visual regression tests
  - Storybook to document and helps to make visual regression tests


### Folder Structure

- **components:** Generic compoents 
- **contexts:** Generic contexts
- **domains:** Application domains (domain driven design approach )
- **infra:** Layer which communicate with external services
- **providers:** Generic contexts
- **app:** Core pages
- **styles:** General styles
- **utils:** Util functions

## Todo list

- Improve accessibility (I didn't have time to use a screen reader).
- Make more component tests.
- Improve storybook with more dynamic options.
- Make edit list accessible
- Fix the timeout to focus input
- Cover implementation details of api calls in tests
- Improve my theme scheme
- Create tests to board page with cypress (I did not have time)
- Improve mocks in storybook

## UI challenge
### Application steps:

- [x] Board
- [x] List Card
- [x] Board Card
  - [x] Generic Card
- [x] Add a card (feature)
  - [x] Add a card button
  - [x] Add a card form
- [x] Edit a card (feature)
  - [x] Generic Text Input
  - [x] Generic dialog
  - [x] Edit Card dialog
- [x] Implement drag and drop (feature)
  - [x] Install lib and use
- [x] Edit Column Name (feature)
  - [x] Generic Input
  - [x] Change Card List title
- [x] Confirmation Modal
- [x] Delete card (feature)
  - [x] Change Edit Card dialog
- [x] Delete column (feature)
  - [x] Change Card List
- Add label to card (feature)
  - Change Edit Card dialog
  - Change Create Form

### Project Specs and Requirements:

- [x] User should be able to add a Card to a column by clicking “Add another card”
- [x] When you add another card, you are able to add in Description Text
- [x] User can edit the text in a Card by hovering over the Card and clicking the Edit pencil icon (this can just be text)
- [x] When editing a card (Diag. 2, below) the background goes dark and you can edit, save, and delete the card.
- [x] User can rearrange the order of the Cards in a Column
- [x] User can also move a Card from one column to another
- [x] User can also edit the Names of the Columns by clicking on the Name
- [x] User can delete cards or entire columns (but not without confirmation first)
- [] User should be able to label the tickets with green-yellow-red priority flags/labels

### Bonus points if the following is implemented:

- [] User should be able to search and filter tickets by name
- [] User should be able to filter tickets based on priority label
- [x] Code has formatting and/or Linting configuration
- [x] App is deployed via heroku, netlify, etc.