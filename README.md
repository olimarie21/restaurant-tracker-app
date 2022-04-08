## Live Link: https://wmdd4936-ounderdah00.herokuapp.com/ 

**To Run the Project:**
- run **npm install** to install project dependencies on your local machine
- run **npm run watch** to launch webpack and bundle src code
- run **npm run dev** to launch the development server
- Open **http://localhost:8080** to view Restaurant Tracker in your browser.

**What is Restaurant Tracker?**
- Restaurant tracker allows users to upload restaurants they have visisted, or want to visit, to create an accessible listing of local options. Each restaurant card provides a link to the restaurant's website and clickable hyperlink to get directions.

**Features:**
- Typo tolerant MongoDB Atlas search
- Category filteration
- Interactivity with restaurant website links and links to directions from the UI
- Custom designed UI icons and interface

**How to use Restaurant Tracker:**
1. Click add restaurant
2. Enter restaurant details, including name, address, website, category, and indication if there is a happy hour.
3. Click submit
4. View saved restaurants to browse previously added options
    - From here user's can use a text search or filter by category or happy hour availability

# API Documentation:
*- Endpoints:*
    - **api/v1/restaurants:** GET & POST Endpoint for users to access all restaurants and add additional restaurants
        - The required format for post requests is an object with the following properties:
            - {restaurant: 'string', website: 'string', address: 'string', category: 'string' (with enum values), visited: boolean, happyHour: boolean}
        - Use case: GET all restaurants with type 'Japanese' by attaching the 'type=' query to the request URL
        - Use case: POST a new restaurant by entering the required fields in the request body, and sending to the URL
    - **api/v1/search:** Search endpoint for users to request text search results
        - Use case: GET restaurants by text input by adding the term to the URL '/search?term=abc' - search is performed on the MongoDB index of 'restaurant' names.
    - **api/v1/restaurants/:id:** Delete endpoint to remove restaurants from the database
        - When user clicks the delete button the id of the object is matched and added to the get request from the front-end, the request is sent and the object is deleted.
        - Use case: Delete unneeded restaurant by adding its unique id to the URL request.
- ***All responses from the API are formatted as JSON objects containing relevant information about the request as well as it's status.***
