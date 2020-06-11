![](logo.svg)

# Test aggregator - Project specification
## Motivation
The Fluid Pay has a simulation tool over on it’s API. That's to simulate the users behaviour to test the correctness of the API and make sure the future development in the API doesn’t break anything. We would like to have an aggregator tool, what purpose would be to get the results of these tests, save them properly into a database (MySQL) and visualize on the front side. The result structure is strict, so you will get a JSON structure of what the payload of the API request should look like. Everything else can be your choices. There are phases where the #1 contains the main requirements, then we try to decompose it to more phases based on priorities of the feature. 

## Design

[Our designer created a UI design what should be followed.](https://xd.adobe.com/view/a7180f10-a3c2-468f-4547-5b2fd976871e-d129/)

## Phase 1 - Main requirements
- Two Restful endpoints (Initializer, Updater)
    - Authorization with API key (Admin created API key)
    - Save to database (MySQL, database layer should be changeable)
    - Initial POST to initialize the build with the necessary metadata
    - Update with the actual results of the build on a PUT request
- Login Username/Password (Later Google auth)
- Roles: User/Admin
- Restful GET endpoint to get all of the results (Restful means pagination and sorting)
- GET endpoint to get an individual result
- Basic frontend which uses the GET endpoint to visualize the results as list
- If the user clicks one of the element of the list, call the individual endpoint on a new page
- Admin should be able to create API keys
    - Endpoint to add API key
    - Endpoint to list API key
    - Frontend page to handle these
## Phase 2
- Google authentication
- Filters for the GET endpoint (time ranges, success/failed, triggered by, commit hash)
- Send email, based on the notification flag of the user, to the user if the test failed
- Extend Admin features
    - Add new users with email
    - Manage users
    - Manage test’s (invalidate)
## Phase 3
- Slack notifications
    - Admin should customize it
- On the index page, show the number of failures of the week
- Filter presets
    - User can save filters with a custom name
    - User can load or delete saved filters
    - Needs a separate table with all the flags stored
## Phase 4 - Theoritical
- Test statistics
    - column chart
    - filter by interval (date picker)
    - filter by branch, commit hash
    - statistics on the status of tests
- Benchmark statistics
    - Visualize pprof statistics - svg file
    - Compare with older ones
- Log viewer, get the logs as JSON and attach them to a build
    - Collect the logs of the build in a filterable set of logs
- Bitbucket changes on the commit triggered it

## Appendix

#### JSON structure
- id - Unique identifier (ex.: ce7da1ec-2784-4637-8288-628c385334a1)
- triggered_by - Developer who triggered the test
- branch_name - Name of the branch triggered the test
- start_timestamp - Timestamp when the test begins
- end_timestamp - Timestamp when the test ends
- commit_hash - Commit triggered the test
- status - success/failed/error
- error_message - Error message if the test invalid
- short_desciption - If the status failed, shot description about
- payload
    - data - The JSON representation of the simulation result
    - text - Summary of the simulation in text format (HTML)

#### MySQL layout
- users
    - id (UUID)
    - password
    - email
    - git_user - user ID/name the account belongs to
    - role - user/admin
    - notification - Send email (true/false)
    - google_auth ??

- simulation_result
    - id - varchar(50)
    - triggered_by - varchar(50)
    - branch_name - varchar(250)
    - start_timestamp - int
    - end_timestamp - int
    - commit_hash - varchar(50) (eg.: 63ec8de70edc16bafc8138ce27bf520754084fc9)
    - status - varchar(50)
    - error_message - varchar(255)
    - short_desciption - varchar(255)
    - payload_data - JSON
    - payload_text - text
    - sequence_number - int - auto incremented number
    - invalid - tinyint - settable by the admin
