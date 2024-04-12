## Folder and File structure in nextjs
- Inside the `src/app` folder we will have `api` folder which will contain all the routes for api and we have to make them folder wise as nextjs follows `file based routing` so `api/users/signup/route.ts` means `http:localhost:5000/api/users/signup`

- Every route in frontend will be inside `src/app` directory so we got to make folder like this `src/app/signup/page.tsx` so signup page will be created and can be accessed by going to the route `/signup`


## Verification and Forgot Password of User
- Two things are important here => `Token and TokenExpiry`

- First App generates an token and time and sends it to the database (entry) and to the user (mail) in the form of link

- User will click on the link and now the App will get the information from the user and now App will do validation of the data (token) => token and db token matches or not and has token expired or not

- Once validation is done, now do the task if not then don't do the task

- The verification and forgot password both works on this same logic !!!


## Nextjs features
- Nextjs works on `Edge Runtime` or edge computing.

- Nextjs does not knows if they are connected to the MongoDB for the first time or they already made connection or not so it is solved in a way.

- `mongoose.models.users || mongoose.model("users", userSchema)` means that it will check if there is already any model named users present in the db or not if yes then access it if not then just create it

- Nextjs runs on the nearest computing resources and does not runs on a standard server and that's why it is deployed on vercel (Too much behind the scenes) so for each api route we always have to connect to Database  seperately.

## Things to remember in Nextjs for Backend
- Always make sure to connect to MongoDB first (Nextjs does not knows if they are connected to MongoDB for the first time or not) and then define a function with the request name (POST/GET/PUT/DELETE) that we are gonna make on a specific route (POST request on signup route) and inside that function, the controller logic is written.

- NextRequest and NextResponse are used for request and response here and request.json() works as request.body