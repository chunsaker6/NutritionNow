const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://chunsaker-SE4200:tE5gDZ6YlZKZcnHg@cluster0.6txnlrl.mongodb.net/garage?retryWrites=true&w=majority');


const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Food name is required."]
    },
    calories: { 
        type: Number,
        required: [true, "Calorie amount is required."]
        
    },
    protien: { 
        type: Number,
        required: [true, "Protein is required."]
    },
    fats: { 
        type: Number,
        required: [true, "Rating is required."]
    },
    // user: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: [true, "Food must belong to a user."],
    // }
});
const Food = mongoose.model('Food', foodSchema);


const goalSchema = new mongoose.Schema({
    goal: {
        type: String,
        required: [true, "Goal is required."]
    },
    description: { 
        type: String,
        required: [true, "Description is required."]
        
    },
    
});
const Goal = mongoose.model('Goal', goalSchema);

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required."]
    },
    lastName: { 
        type: String,
        required: [true, "Last name is required."]
        
    },
    email: { 
        type: String,
        required: [true, "Email is required."],
        unique: true // database constraint; not a normal mongoose validator
    },
    encryptedPassword: { 
        type: String,
        required: [true, "Password is required."],
    },
    admin: { 
        type: String,
        required: [true, "Admin is required."],
    }
}, {
    toJSON: {
        versionKey:false,
        transform: function (doc, ret){
            delete ret.email
            delete ret.encryptedPassword
        }
    }

});

userSchema.methods.setEncryptedPassword = function(plainPassword){
    // encrypt given plain password and store in model instance

    var promise = new Promise((resolve, reject) => {
        // resolve is then()
        // reject is catch()
        bcrypt.hash(plainPassword, 12).then(hash => {
            // Store hash in your password DB.
            this.encryptedPassword = hash
            // Resolve the promise..
            resolve() // this invokes the callers then function
        });
    })
    return promise;
}
userSchema.methods.verifyEncryptedPassword = function(plainPassword){
    // verify an attempted password compared to stored password or encrypted password
    var promise = new Promise((resolve, reject) => {
        bcrypt.compare(plainPassword, this.encryptedPassword).then(result => {
            resolve(result) 
        });
    })
    return promise;
}

const User = mongoose.model('User', userSchema);


module.exports = {
    Goal: Goal,
    Food: Food,
    User: User
}