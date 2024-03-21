## File Structure in Nextjs
- Nextjs has inbuilt file based routing so login/page.tsx will have /login route 
- Nextjs has inbuilt feature to handle api so inside the app folder create api folder then inside do all the works and make sure to have a file `route.ts/js` to handle the routing of api

## Token and TokenExpiry
- By default, user is not `verified` so while the user has signed up, we will take `Token (verifyToken)` and `Expiry (verifyTokenExpiry)` as well which our App has generated
- Now as the Token and TokenExpiry was generated, they are saved in the database and also sent to the user email
- User gets a link and the data we got earlier (Token and TokenExpiry) will be sent back to our App and now our App queries to the database if the data is present in our db or not (Token and TokenExpiry) if it matches then just verify our user

Same works for ForgotPasswordToken and ForgotPasswordTokenExpiry as well

## Models in mongodb and nextjs
Sometimes Next.js do not know whether the model was already created/not and that becomes an issue so to handle that we define that `mongoose.models.model_name || mongoose.model("model_name", modelSchema)` to avoid any issue - If the model exists just access it otherwise just create the model

## Connection in Database
- As we know database is always on another continent so handle it inside try catch block and connectivity may take some time so use async await.

***Code Example***

<code>
    await mongoose.connect(process.env.MONGODB_URL!)
    const connection = mongoose.connection

    connection.on("connected", () => {
        console.log("MongoDB connected successfully !!!")
    })

    connection.on("error", (err) => {
        console.log("MongoDB connection error, please check for the connection", err)
        process.exit(1)
    })
</code>

## Feature of Nextjs
- Nextjs runs on Edge runtime which means that nextjs runs on your nearest location computing resource and doesn't runs on a standard server and that's why it is deployed on vercel as behind the scence lots of thing happens

- The DB connection function we wrote needs to be used for every routes as things work differently here in nextjs as behind the scenes functions are deployed and functions individually doesn't know that they are connected to the database/not so it's a issue and we need to call the function always
