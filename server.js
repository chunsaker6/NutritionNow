const express = require('express')
const cors = require('cors');
const session = require('express-session')
// const MongoStore = require('connect-mongo');
// const MemoryStore = require('memorystore')(session)
const model = require('./model')
const app = express()
app.use(cors({
    credentials: true,
    origin:function(origin, callback){
        callback(null, origin)
    }
}));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: "6r6t8puie55689uihugfrw4jbuyyghj76655tt32wserted",
    saveUninitialized: true,
    resave: false,
    // store: MongoStore.create({ 
    //     mongoUrl: 'mongodb+srv://chunsaker-SE4200:tE5gDZ6YlZKZcnHg@cluster0.6txnlrl.mongodb.net/garage?retryWrites=true&w=majority'}),
    // store: new MemoryStore({
    //     checkPeriod: 86400000 // prune expired entries every 24h
    //   }),
    // cookie: {
    //     // secure true breaks postman and safari
    //     // secure: true, 
    //     sameSite: 'None'
    // }
}));
// app.use(express.json());
app.use(express.static("public"));

// MIDDLEWARE

function authorizeRequest(adminOnly){
    return function (request, response, next){    
        console.log("request_session:", request.session);
        console.log("request_session_userId:", request.session.userId);
        if (request.session && request.session.userId){
            model.User.findOne({ _id: request.session.userId}).then(function (user){
                // console.log("user admin", user.admin)
                if ( user && (!adminOnly || (user.admin === "YES"))){
                    request.user = user
                    next()
                }else{
                    response.status(401).send("Not authenticated")
                }
            })
        }else {
            response.status(401).send("Not authenticated")
        }
    }
}

app.get("/foods", authorizeRequest(false), function(request, response){
    model.Food.find().then((foods)=>{
        // response.set("Access-Control-Allow-Origin", "*")
        response.json(foods)

    });

});
app.post("/foods", authorizeRequest(true), function(request, response){
    console.log("request_body:", request.body);
    const newFood = new model.Food({
        name: request.body.name,
        calories: request.body.calories,
        protien: request.body.protien,
        fats: request.body.fats,
        // user: request.session.userId
    })
    newFood.save().then(()=>{
        // response.set("Access-Control-Allow-Origin", "*")
        response.status(201).send("Created")
    }).catch((error) => {
        if (error.errors){
            var errorMessages = {};
            for (var fieldName in error.errors){
                errorMessages[fieldName] = error.errors[fieldName].message;
            }
            response.status(422).json(errorMessages);

        }
        else{
            response.status(500).send("Unknown error creating food.")
        }

    });

});
// delete food member
app.delete("/foods/:foodId", authorizeRequest(true), function(request, response){
    // Access for Vue.js
    console.log("Deleting food with id:", request.params.foodId);

    // Use Mongoose's findOneAndDelete to find and delete the food item
    model.Food.findOneAndDelete({ _id: request.params.foodId })
        .then((deletedFood) => {
            if (deletedFood) {
                response.json({ message: 'Food deleted successfully' });
            } else {
                response.sendStatus(404); // If food item not found
            }
        })
        .catch((error) => {
            console.error("Failed to delete food with ID:", request.params.foodId);
            response.sendStatus(404);
        });
});

app.put("/foods/:foodId", /*authorizeRequest(true),*/ function(request, response){
    // Extract the updated data from the request body
    const updatedData = {
        name: request.body.name,
        calories: request.body.calories,
        protien: request.body.protien,
        fats: request.body.fats
    };
    console.log("Updating food with id:", request.params.foodId);
    // Use Mongoose's findOneAndUpdate to find and update the food item
    model.Food.findOneAndUpdate(
        { _id: request.params.foodId }, // Filter criteria
        updatedData, // Updated data
        { new: true } // Return the modified document rather than the original
    )
    .then((updatedFood) => {
        if (updatedFood) {
            //response.set("Access-Control-Allow-Origin", "*");
            response.json(updatedFood);
        } else {
            response.sendStatus(404); // If food item not found
        }
    })
    .catch((error) => {
        console.error("Failed to update food with ID:", request.params.foodId);
        response.sendStatus(500); // Internal server error
    });
});
/// GOALS SECTION

app.get("/goals", authorizeRequest(false), function(request, response){
    model.Goal.find().then((goals)=>{
        // response.set("Access-Control-Allow-Origin", "*")
        response.json(goals)

    });

});

app.post("/goals", authorizeRequest(true), function(request, response){
    console.log("request_body:", request.body);
    const newGoal = new model.Goal({
        goal: request.body.goal,
        description: request.body.description
    })
    newGoal.save().then(()=>{
        // response.set("Access-Control-Allow-Origin", "*")
        response.status(201).send("Created")
    }).catch((error) => {
        if (error.errors){
            var errorMessages = {};
            for (var fieldName in error.errors){
                errorMessages[fieldName] = error.errors[fieldName].message;
            }
            response.status(422).json(errorMessages);

        }
        else{
            response.status(500).send("Unknown error creating goal.")
        }

    });

});
// delete goal member
app.delete("/goals/:goalId", authorizeRequest(true), function(request, response){
    // Access for Vue.js
    console.log("Deleting goal with id:", request.params.goalId);

    // Use Mongoose's findOneAndDelete to find and delete the food item
    model.Goal.findOneAndDelete({ _id: request.params.goalId })
        .then((deletedGoal) => {
            if (deletedGoal) {
                // response.set("Access-Control-Allow-Origin", "*");
                response.json({ message: 'Goal deleted successfully' });
            } else {
                response.sendStatus(404); // If food item not found
            }
        })
        .catch((error) => {
            console.error("Failed to delete food with ID:", request.params.goalId);
            response.sendStatus(404);
        });
});

app.put("/goals/:goalId", authorizeRequest(true), function(request, response){
    // Extract the updated data from the request body
    const updatedData = {
        goal: request.body.goal,
        description: request.body.description
    };
    console.log("Updating goal with id:", request.params.goalId);
    // Use Mongoose's findOneAndUpdate to find and update the food item
    model.Goal.findOneAndUpdate(
        { _id: request.params.goalId }, // Filter criteria
        updatedData, // Updated data
        { new: true } // Return the modified document rather than the original
    )
    .then((updatedGoal) => {
        if (updatedGoal) {
            //response.set("Access-Control-Allow-Origin", "*");
            response.json(updatedGoal);
        } else {
            response.sendStatus(404); // If food item not found
        }
    })
    .catch((error) => {
        console.error("Failed to update food with ID:", request.params.goalId);
        response.sendStatus(500); // Internal server error
    });
});


// create new user member
app.post("/users", function(request, response){
    //access for vue.js
    console.log("request_body:", request.body);
    const newUser = new model.User({
         firstName: request.body.firstName,
         lastName: request.body.lastName,
         email: request.body.email,
         admin: request.body.adminRights

    })
    newUser.setEncryptedPassword(request.body.plainPassword).then(function(){
        // at this time the password has been encrypted and set on the user
        newUser.save().then(() => {
            response.status(201).send("Created")
    
        }).catch((error) => {
            if (error.code == 11000){
                response.status(422).json({email: "User with email already exists."});
            }else if (error.errors){
                var errorMessages = {};
                for (var fieldName in error.errors){
                    errorMessages[fieldName] = error.errors[fieldName].message;
                }
    
                response.status(422).json(errorMessages);
    
            }
            else{
                console.error("Unknown error")
                response.status(500).send("Unknown error creating food.")
            }
    
        });

    })   
    //status code 201   
})

// delete session
app.delete("/session", function(request, response){
    request.session.userId = null;
    console.log("session user id", request.session.userId)
    response.status(200).send("Logged Out.")
})

//retrieve session
app.get("/session",  authorizeRequest(false), (request, response) =>{
    // console.log("session:", request.session)
    // console.log("session user id", request.session.userId)
    // if (request.session && request.session.userId){
    //     // logged in
    //     response.status(201).send("Autheticated")
    // }else{
    //     response.status(401).send("Not Autheticated")
    // }
    console.log("user get session info", request.user)
    response.json(request.user)
    // response.status(201).send("Autheticated")
})
// authentification: create session
app.post("/session", function(request, response){
    // 1. get user credentials: request.body.email & request.body.plainPassword
    // 2. find user database using given email.
    model.User.findOne({email: request.body.loginEmail}).then(function(user){
        if (user){
            user.verifyEncryptedPassword(request.body.loginPassword).then(function (match){
                if(match){
                    request.session.userId = user._id
                    console.log("post session user id", request.session.userId)
                    console.log("post session", request.session)
                    // TODO: save user ID into session data
                    response.status(201).send("Authenticated")
                    //respond with 201
                }else {
                    response.status(401).send("Not Authenticated")
                }
            });
        }else{
            response.status(401).send("Not Authenticated")
        }
    });
    // 3. if found: verify given password against encryptedPassword from DB
    //   4. if the password is verified respond with 201
            //else: respond with 404
    //  else: respond with 401
});
app.listen(8080, function(){
    console.log("Server is running.. ")
})