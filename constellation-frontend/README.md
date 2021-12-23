Application steps:

-   [x] Board
-   [x] List Card
-   [x] Board Card
    -   [x] Generic Card
-   [x] Add a card (feature)
    -   [x] Add a card button
    -   [x] Add a card form
-   [x] Edit a card (feature)
    -   [x] Generic Text Input
    -   [x] Generic dialog
    -   [x] Edit Card dialog
-   [x] Implement drag and drop (feature)
    -   [x] Install lib and use
-   [x] Edit Column Name (feature)
    -   [x] Generic Input
    -   [x] Change Card List title
-   [x] Confirmation Modal
-   [x] Delete card (feature)
    -   [x] Change Edit Card dialog
-   [x] Delete column (feature)
    -   [x] Change Card List
-   Add label to card (feature)
    -   Change Edit Card dialog
    -   Change Create Form

Project Specs and Requirements:

-   User should be able to add a Card to a column by clicking “Add another card”
-   When you add another card, you are able to add in Description Text
-   User can edit the text in a Card by hovering over the Card and clicking the Edit pencil
    icon (this can just be text)
-   When editing a card (Diag. 2, below) the background goes dark and you can edit,
    save, and delete the card.
-   User can rearrange the order of the Cards in a Column
-   User can also move a Card from one column to another
-   User can also edit the Names of the Columns by clicking on the Name
-   User can delete cards or entire columns (but not without confirmation first)
-   User should be able to label the tickets with green-yellow-red priority flags/labels

Bonus points if the following is implemented:

-   User should be able to search and filter tickets by name
-   User should be able to filter tickets based on priority label
-   Code has formatting and/or Linting configuration
-   App is deployed via heroku, netlify, etc.
-   README is well written and formatted

Todo list:

-   Make edit list accessible
-   Fix the timeout to focus input
-   Cover implemention details of api calls in tests
-   Improve my theme scheme
-   Create tests with cypress (I did not have time)
-   Improve mocks in storybook

Instructions to run api:

cd constellation-api-mock
npm start
