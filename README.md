## Overview

The structure of this README is as follows:

- [Overview](#overview)
- [Setup - Backend](#setup---backend)
- [Setup - Frontend](#setup---frontend)
- [Task 1](#task-1)
- [Task 2](#task-2)
- [Task 3](#task-3)
- [Task 4](#task-4)
- [Conclusion](#conclusion)

Answers to any open ended questions will be in the corresponding numbered task section. Additionally, I provided small callouts to the code that I think is relevant to the task.

The commit message style is as follows:

```
task # - commit message
```

Commits will list all the tasks that they affect.

## Setup - Backend

Create a virtual environment:

```bash
python3 -m venv .venv
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Run the following command to install the dependencies:

```bash
pip install -r requirements.txt
```

Run the following command to start the backend server:

```bash
uvicorn backend.main:app --reload
```

Run the following command to run the tests:

```bash
pytest
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

Run to format the frontend code:

```bash
npm run format
```

## Task 1

Assumptions:

- 1b asks to add a green tick to the success message, but a FontAwesome check icon was already added. I made the assumption that the FontAwesome icon will suffice.
- For the toast notification, I know the doc mentions using the "react-toast" library, but I didn't find the exact matching library name, so I used "react-hot-toast." Of course, this is a small call-out, but I wanted to make it nonetheless.

The current design considerations for buttons and loading states are as follows:

- **Guided Process:**
  - Separate the uploads into distinct steps/pages. This approach reduces state checks and clarifies the process.
  - Automatically redirect users to the next step after uploading the medical record to streamline the workflow.
  - We would have to allow the user to go back to the previous step, so they can change their medical record if they need to.

## Task 2

Assumptions:

- For the background task simulation, I set it up to commit updates for each case right after it updates. I was thinking of potentially making it so it would commit updates for all cases at the end of the loop, but I figured this would be more realistic if we were to update the records right after the "task" would be completed for that one case.

The overall backend architecture is as follows:

- FastAPI is used to create the API endpoints
- SQLAlchemy for the ORM
  - I chose this as its a easy and lightweight ORM
- The database is a SQLite database that is stored in a file called `test.db`
  - I wanted to use a SQLite database as opposed to doing an in-memory simulated DB (python dictionaries) just to make it slightly more realistic

To scale this application for production I would consider the following improvements:

- **Database Upgrade:**

  - This is a mostly a given since SQLite is much more suited to a prototyping environment. I would likely transition to something like Postgres or MySQL
  - I would also consider adding an S3 bucket for storing the medical records and guidelines files.

- **Task Queue Implementation:**

  - Use a task queue like RabbitMQ to manage background tasks. This would be if I were to handle the processing of the medical records and guidelines that we were simulating in the backend.

- **Load Balancing:**

  - Implement a load balancer (e.g., AWS Elastic Load Balancing, NGINX). This is pretty standard practice, but this would depend on how much traffic the application would receive.

- **Caching Strategy:**

  - Add caching with something like Redis. I am sure this is a necessity, given the use case where I am sure UM nurses would be jumping back and forth between different instances of records and guidelines.

- **Monitoring and Logging:**

  - Set up something like Prometheus for monitoring and logging. It would be a good idea as the LLM pipeline has a lot of moving parts I assume.

- **Horizontal Scaling:**

  - Prepare for horizontal scaling with Docker for containerization and Kubernetes for orchestration.

- **Data Backup and Recovery:**

  - Add a robust backup and recovery strategy to protect against data loss. Medical records and data are important, and losing them would be costly.

Below is a high-level architecture diagram of the application:

![High Level Architecture Diagram](anterior-diagram.png)

## Task 3

I wanted to mention here that I took inspiration from the demo video on the document and utilized `@headlessui/react` to try and replicate the look and feel of the demo. Also want to call out that the main commit for task 3 also includes some changes to the work for task 1 and task 2.

Assumptions:

- The doc specifically calls out to display at least 2 of the CPT codes, so I made functionality in the list component to initially show 2 of the codes and then show a "Show All" button to show all of the codes. Since the list is short, it seems unnecessary in this context, but I imagine that, in more realistic scenarios, this would be a good feature if there were a lot of codes.

## Task 4

Below is a list of some of the bonus features I implemented:

- Added auto-refreshing for the case results page
  - This was a naive implementation here. I think a better implementation would be to use a websocket to stream the updates to the client.
  - It will stop refreshing once the case status is complete
- Created a generic file upload component

## Conclusion

If I had more time, I would have liked to implement the following:

- Improved UI/UX of the file upload process, I think there was room for improvement there
- Implement a case list view to allow the user to jump between cases
- Implement a websocket implementation for the case results page for polling
