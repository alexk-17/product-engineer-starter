## Overview

The structure of this README is as follows:

- [Overview](#overview)
- [Setup - Backend](#setup---backend)
- [Setup - Frontend](#setup---frontend)
- [Task 1](#task-1)

Answers to any open ended questions will be in the corresponding numbered task section.

## Setup - Backend

Navigate to the backend directory and run the following command to install the dependencies:

```bash
pip install -r requirements.txt
```

Run the following command to start the backend server:

```bash
python main.py
```

## Setup - Frontend

Navigate to the frontend directory and run the following command to install the dependencies:

```bash
npm install
```

Run the following command to start the frontend server in development mode:

```bash
npm run dev
```

Navigate to `http://localhost:3000` to view the application.

Run the following command to start the frontend server in production mode:

```bash
npm run build
npm run start
```

Navigate to `http://localhost:3000` to view the application.

Run the following to lint the frontend code:

```bash
npm run lint
```

## Task 1

Questions:

- Just a quick clarification, 1b is asking to add a green tick to the success message, but there was already a FontAwesome check icon added. Is there a different type of tick you would like me to add?
- Noticed an error when trying to use the Dashboard context in the dashboard page file, it was due to the async of the DashboardRoot, removal of the async allowed me to use the context without an error. Wanted to just call this out that in this context I think it's okay to remove the async.
- For the toast notification, I know in the doc its mentioned to use the "react-toast" library, but didn't find the exact matching library name, so I used "react-hot-toast". Of course this is a small call out, but wanted to make it nonetheless.

My thoughts on the buttons and loading states:

- The color scheme for a loading stat I think should match between the two buttons
  - Have two different colors of a loading state could be confusing, especially on the same page
- I think if we have a guided process here anyways, and since we don't allow the user to upload a Guidelines files until the medical record is uploaded, the two uploads should be on separate steps/pages. It would reduce state checks and also make the process clearer.
  - The user can just be automatically redirected to the next step after uploading the medical record, if we don't want the user to have to click on the continue button.
  - Just to play devil's advocate the user may want to change their medical record after uploading it, so we should have a way to go back to the previous step.
