# BLOG

### 4.1 Blog list, step1

User can add blogs to the list

### 4.2 Blog list, step2

User can see that the code for the app is refactored

### 4.3: helper functions and unit tests, step1

User can run test one test dummy using npm test

### 4.4: helper functions and unit tests, step2

User can run test for getting the number of total likes using npm test

### 4.5*: helper functions and unit tests, step3

User can run test for getting the blog with the most likes using npm test

### 4.6*: helper functions and unit tests, step4

User can run test for getting the author with most blogs

### 4.7*: helper functions and unit tests, step5

User can run test for getting the author with largest amounts of likes

### 4.8: Blog list tests, step1

User can run test that was made using superpackage

### 4.9*: Blog list tests, step2

User can run test that verifies that the unique identifier property of the blog posts is named id

### 4.10: Blog list tests, step3

User can run test that verifies that making an HTTP POST request to the /api/blogs url successfully creates a new blog post

### 4.11*: Blog list tests, step4

User can run test that verifies that if the likes property is missing from the request, it will default to the value 0

### 4.12*: Blog list tests, step5

User can run test that verifies if the title and url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request

### 4.13 Blog list expansions, step1

User can delete a single blog and test it using npm test

### 4.14 Blog list expansions, step2

User can update a blog (mostly number of likes) and test it using npm test

### 4.15: bloglist expansion, step4

We can create new users and save them to the database

### 4.16*: bloglist expansion, step5

Both username(unique) and password must be given when creating users, and they must be atleast 3 characters long

### 4.17: bloglist expansion, step6

Every blog is assigned to a creator

### 4.18: bloglist expansion, step7

Token based authentication is implemented

### 4.19: bloglist expansion, step8

Adding new blogs is possible only if a valid token is sent

### 4.20*: bloglist expansion, step9

App uses tokenExtractor middleware to extract the token from the header

### 4.21*: bloglist expansion, step10

Only user that created the blog can delete that blog