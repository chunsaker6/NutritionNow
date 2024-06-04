Vue.createApp({
    data: function (){
        return {
            showPage: 'D',
            logPage: 'B',
            // showPage: 'A',
            // logPage: 'A',
            ok: false,
            select: false,
            secondSelect: false,
            thirdSelect: false,
            showAllItems: true,
            secondShowAllItems: true,
            thirdShowAllItems: true,
            newFoodName: "",
            newFoodCalories: "",
            newFoodProtien: "",
            newFoodFats: "",
            newGoal: "",
            newGoalDescription: "",
            newFirstName: "",
            newLastName: "",
            newEmail: "",
            newPlainTextPassword: "",
            newAdmin: "",
            encryptedPassword: "",
            newLoginEmail: "",
            newLoginPassword: "",
            selectedItemIndex: 0,  
            secondSelectedItemIndex: 0,            
            thirdSelectedItemIndex: 0,
            calsCount: 0,
            protienCount: 0, 
            fatsCount: 0, 
            errorMessages: {}, 
            errorGoalMessages: {}, 
            errorUpdateMessages: {},   
            errorGoalUpdateMessages: {}, 
            errorSessionMessages: {},       
            foods: [],
            goals: [],
            isshowEditModal: false,
            isShowEditGoal: false,
            chartData: null, // added for storing chart data
            errorUserMessages: [],
            sessionData: "",
            jsonData: [],
            editIndex: null,
            editIndexMeal: null,
            newFoodNameUpdate: '',
            newFoodCaloriesUpdate: '',
            newFoodProtienUpdate: '',
            newFoodFatsUpdate: '',
            newGoalUpdate: '',
            newGoalDescriptionUpdate: ''
                 
        };
    },

    methods:{  
        updateGoalMode: function(){
            if (this.validateUpdateGoal()){
                this.isShowEditGoal = false
            }
        },
        updateMode: function(){
            if (this.validateUpdateFood()){
                this.isshowEditModal = false
            }
        },
        validateUpdateGoal: function(){
            this.errorGoalUpdateMessages = {};

            if (this.newGoalUpdate == ""){
                this.errorGoalUpdateMessages.newGoalUpdate = "Please enter a goal title.";
            }
            if (this.newGoalDescriptionUpdate == ""){
                this.errorGoalUpdateMessages.newGoalDescriptionUpdate = "Please enter a description of your goal.";   
            }
            return this.goalIsUpdateValid;
        },
        validateGoal: function(){
            this.errorGoalMessages = {};

            if (this.newGoal == ""){
                this.errorGoalMessages.newGoal = "Please enter a goal title.";
            }
            if (this.newGoalDescription == ""){
                this.errorGoalMessages.newGoalDescription = "Please enter a description of your goal.";   
            }
            return this.goalIsValid;
        },
        errorMessageGoalForField: function(field){
            return this.errorGoalMessages[field];
        },
        errorMessageUpdateGoalForField: function(field){
            return this.errorGoalUpdateMessages[field];
        },
        validateUpdateFood: function(){
            this.errorUpdateMessages = {};

            if (this.newFoodNameUpdate == ""){
                this.errorUpdateMessages.newFoodNameUpdate = "Please enter a food name.";
            }
            if (this.newFoodCaloriesUpdate == ""){
                this.errorUpdateMessages.newFoodCaloriesUpdate = "Please enter a calorie amount.";   
            }
            if (isNaN(this.newFoodCaloriesUpdate)){
                this.errorUpdateMessages.newFoodCaloriesUpdate = "Enter integers for calorie amount.";   
            }
            if (this.newFoodCaloriesUpdate > 1000){
                this.errorUpdateMessages.newFoodCaloriesUpdate = "Invalid calorie amount.";   
            }
            if (this.newFoodCaloriesUpdate < 0){
                this.errorUpdateMessages.newFoodCaloriesUpdate = "Can't do a negative calorie amount.";   
            }
            if (this.newFoodProtienUpdate == ""){
                this.errorUpdateMessages.newFoodProtienUpdate = "Please enter a food protien."; 
            }
            if (isNaN(this.newFoodProtienUpdate)){
                this.errorUpdateMessages.newFoodProtienUpdate = "Enter integers for protien amount.";   
            }
            if (this.newFoodProtienUpdate > 100){
                this.errorUpdateMessages.newFoodProtienUpdate = "Invalid protien amount.";   
            }
            if (this.newFoodProtienUpdate < 0){
                this.errorUpdateMessages.newFoodProtienUpdate = "Can't do negative numbers for protein.";   
            }
            if (this.newFoodFatsUpdate == ""){
                this.errorUpdateMessages.newFoodFatsUpdate = "Please enter a food fats.";
            }
            if (isNaN(this.newFoodFatsUpdate)){
                this.errorUpdateMessages.newFoodFatsUpdate = "Enter integers for fat amount.";   
            }
            if (this.newFoodFatsUpdate > 100){
                this.errorUpdateMessages.newFoodFatsUpdate = "Invalid fat amount.";   
            }
            if (this.newFoodFatsUpdate < 0){
                this.errorUpdateMessages.newFoodFatsUpdate = "Can't do negative numbers for fats.";   
            }
            return this.foodIsUpdateValid;
        },
        validateFood: function(){
            this.errorMessages = {};

            if (this.newFoodName == ""){
                this.errorMessages.newFoodName = "Please enter a food name.";
            }
            // if (this.newFoodName.length < 40){
            //     this.errorMessages.newFoodName = "Too long of an input.";
            // }
            if (this.newFoodCalories == ""){
                this.errorMessages.newFoodCalories = "Please enter a calorie amount.";   
            }
            if (isNaN(this.newFoodCalories)){
                this.errorMessages.newFoodCalories = "Enter integers for calorie amount.";   
            }
            if (this.newFoodCalories > 1000){
                this.errorMessages.newFoodCalories = "Invalid calorie amount.";   
            }
            if (this.newFoodCalories < 0){
                this.errorMessages.newFoodCalories = "Can't do a negative calorie amount.";   
            }
            if (this.newFoodProtien == ""){
                this.errorMessages.newFoodProtien = "Please enter a food protien."; 
            }
            if (isNaN(this.newFoodProtien)){
                this.errorMessages.newFoodProtien = "Enter integers for protien amount.";   
            }
            if (this.newFoodProtien > 100){
                this.errorMessages.newFoodProtien = "Invalid protien amount.";   
            }
            if (this.newFoodProtien < 0){
                this.errorMessages.newFoodProtien = "Can't do negative numbers for protein.";   
            }
            if (this.newFoodFats == ""){
                this.errorMessages.newFoodFats = "Please enter a food fats.";
            }
            if (isNaN(this.newFoodFats)){
                this.errorMessages.newFoodFats = "Enter integers for fat amount.";   
            }
            if (this.newFoodFats > 100){
                this.errorMessages.newFoodFats = "Invalid fat amount.";   
            }
            if (this.newFoodFats < 0){
                this.errorMessages.newFoodFats = "Can't do negative numbers for fats.";   
            }
            return this.foodIsValid;
        },
        errorMessageForField: function(field){
            return this.errorMessages[field];
        },
        errorMessageUpdateForField: function(field){
            return this.errorUpdateMessages[field];
        },
        validateUser: function(){
            this.errorUserMessages = {};

            if (this.newFirstName == ""){
                this.errorUserMessages.newFirstName = "Please enter your first name.";
            }
            if (this.newLastName == ""){
                this.errorUserMessages.newLastName = "Please enter your last name.";   
            }
            if (this.newEmail == ""){
                this.errorUserMessages.newEmail = "Please enter your email."; 
            }
            const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
            const isValid = emailPattern.test(this.newEmail);
            if (!isValid){
                this.errorUserMessages.newEmail = "Invalid Email Format."; 
            }
            if (this.newPlainTextPassword == ""){
                this.errorUserMessages.newPlainTextPassword = "Please enter a password.";
            }else if ((this.newPlainTextPassword).length < 8 ){
                this.errorUserMessages.newPlainTextPassword = "Enter a password of at least 8 characters in length.";
            }
            if (this.newAdmin == ""){
                this.errorUserMessages.newAdmin = "Please enter YES or NO.";
            }
            else if (this.newAdmin !== "YES" && this.newAdmin !== "NO"){
                this.errorUserMessages.newAdmin = "Please enter YES or NO.";
            }

            return this.userIsValid;
        },
        errorMessageForUser: function(field){
            return this.errorUserMessages[field];
        },
        validateSession: function(){
            this.errorSessionMessages = {};

            if (this.newLoginEmail == ""){
                this.errorSessionMessages.newLoginEmail = "Please enter an email.";
            }
            if (this.newLoginPassword == ""){
                this.errorSessionMessages.newLoginPassword = "Please enter a password.";   
            }
            return this.sessionIsValid;
        },
        errorMessageForSession: function(field){
            return this.errorSessionMessages[field];
        },
        addCalories: function(){
            var cals = this.foods[this.selectedItemIndex].calories;
            this.calsCount += cals;
            this.renderChart();
        },
        addProtien: function(){
            var prot = this.foods[this.selectedItemIndex].protien;
            this.protienCount += prot;
            this.renderProtienChart();
        },
        addFats: function(){
            var fats = this.foods[this.selectedItemIndex].fats;
            this.fatsCount += fats;
            this.renderFatsChart();
        },
        // session section
        addSession: function(){
            if (!this.validateSession()){
                return;
            }
            var data= "loginEmail=" + encodeURIComponent(this.newLoginEmail);
            data += "&loginPassword=" + encodeURIComponent(this.newLoginPassword);
            //can make the url the render or by doing public and deleting all the way to /foods
            fetch("http://localhost:8080/session", {
                body: data,
                method: "POST",
                credentials: "include",
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201){
                    this.newLoginEmail= "";
                    this.newLoginPassword= "";
                    this.loadSession()
                    this.showPage = 'A';
                    this.logPage = 'A';
                }else if (response.status == 401){
                    this.errorSessionMessages.newLoginEmail = "Invalid Email.";
                    this.errorSessionMessages.newLoginPassword = "Invalid Password.";   
                }

            });
        },
        loadSession: function (){
            fetch("http://localhost:8080/session",{ 
                method: "GET",
                // credentials: "include"
            }).then((response) => {
                if (response.status != 401){
                this.loadFoods();
                this.loadGoals();
                this.showPage = 'A';
                this.logPage = 'A';
                console.log("Session is authenticated");
                return response.json(); // Parse JSON data from response
            }
            }).then(data => {
                // Handle the JSON data returned from the server
                console.log('Session data:', data);
                // Now you can use the 'data' object in your Vue component
                // For example, set it to a component data property
                this.sessionData = data;
                // this.jsonData = JSON.parse(this.sessionData);
              })
              .catch(error => {
                console.error('Error fetching session data:', error);
                // Handle error
              });
        },
        deleteSession: function(){
            fetch("http://localhost:8080/session", {
                method: "DELETE",
                credentials: "include"

            }).then((response) => {
                if (response.status == 200){
                    //this.loadFoods();
                    this.showPage = 'D'; 
                    this.logPage = 'B';
                }

            });
        },
        addFoods: function(){
            if (!this.validateFood()){
                return;
            }
            var data= "name=" + encodeURIComponent(this.newFoodName);
            data += "&calories=" + encodeURIComponent(this.newFoodCalories);
            data += "&protien=" + encodeURIComponent(this.newFoodProtien);
            data += "&fats=" + encodeURIComponent(this.newFoodFats);
            //can make the url the render or by doing public and deleting all the way to /foods
            fetch("http://localhost:8080/foods", {
                body: data,
                method: "POST",
                credentials: "include",
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201){
                    this.newFoodName= "";
                    this.newFoodCalories= "";
                    this.newFoodProtien= "";
                    this.newFoodFats= "";
                    this.loadFoods();
                }

            });
        },
        // users section
        addUsers: function(){
            if (!this.validateUser()){
                return;
            }
            var data= "firstName=" + encodeURIComponent(this.newFirstName);
            data += "&lastName=" + encodeURIComponent(this.newLastName);
            data += "&email=" + encodeURIComponent(this.newEmail);
            data += "&plainPassword=" + encodeURIComponent(this.newPlainTextPassword);
            data += "&adminRights=" + encodeURIComponent(this.newAdmin);
            //can make the url the render or by doing public and deleting all the way to /foods
            fetch("http://localhost:8080/users", {
                body: data,
                method: "POST",
                credentials: "include",
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201){
                    this.loadSession();
                    this.newFirstName= "";
                    this.newLastName= "";
                    this.newEmail= "";
                    this.newPlainTextPassword= "";
                    this.newAdmin= "";
                    this.showPage = 'A';
                    this.logPage = 'A';
                }else if( response.status == 422){
                    return response.json(); // Parse JSON data from response
                }
            }).then(data => {
                // Handle the JSON data returned from the server
                console.log('Session data:', data);
                this.errorUserMessages.newEmail = "Email already in use."; 
              }).catch(error => {
                console.error('Error fetching session data:', error);
                // Handle error
              });
        },
        addGoals: function(){
            if (!this.validateGoal()){
                return;
            }
            var data= "goal=" + encodeURIComponent(this.newGoal);
            data += "&description=" + encodeURIComponent(this.newGoalDescription);
            //can make the url the render or by doing public and deleting all the way to /foods
            fetch("http://localhost:8080/goals", {
                body: data,
                method: "POST",
                credentials: "include",
                headers:{
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((response) => {
                if (response.status == 201){
                    this.newGoal= "";
                    this.newGoalDescription= "";
                    this.loadGoals();
                }

            });
        },
        loadFoods: function (){
            fetch("http://localhost:8080/foods", {
                method: "GET",
                credentials: "include",
            }).then((response) => {
                if (response.status == 200){
                    response.json().then((foodsFromServer) => {
                        //console.log("recieved foods from API:", foodsFromServer);
                        this.foods = foodsFromServer;
                        if (this.showPage != 'B'){
                            this.renderChart(); // Call renderChart after loading foods
                            this.renderProtienChart();
                            this.renderFatsChart();
                        }
                    });
                }
            });
        },
        loadGoals: function (){
            fetch("http://localhost:8080/goals", {
                method: "GET",
                credentials: "include",
            }).then((response) => {
                if (response.status == 200){
                    response.json().then((goalsFromServer) => {
                        //console.log("recieved foods from API:", foodsFromServer);
                        this.goals = goalsFromServer;
                    });
                }
            });
        },
        deleteFood: function(foodID){
            fetch("http://localhost:8080/foods/" + foodID, {
                method: "DELETE",
                credentials: "include"
            }).then((response) => {
                if (response.status == 200){
                    this.loadFoods();
                }

            });
        },
        deleteGoal: function(goalID){
            fetch("http://localhost:8080/goals/" + goalID, {
                method: "DELETE",
                credentials: "include"
            }).then((response) => {
                if (response.status == 200){
                    this.loadGoals();
                }

            });
        },
        renderChart: function() {
            const xValues = ["Total Calories: "+this.calsCount]; // Assuming food name is used for x-axis
            const yValues = [this.calsCount]; // Assuming calories for y-axis
            const barColors = ["red"]; // Example colors, you can modify as needed
            this.chartData = new Chart("myChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: {display: false},
                    title: {
                        display: true,
                        text: "Calorie Goal"
                    }
                }
            });
            this.chartData.options.scales.yAxes[0].ticks.min = 0; // Set minimum value for y-axis
            this.chartData.options.scales.yAxes[0].ticks.max = 1500; // Set maximum value for y-axis
            this.chartData.update();
        },
        renderProtienChart: function() {
            const xValues = ["Total Protein: " + this.protienCount]; // Assuming food name is used for x-axis
            const yValues = [this.protienCount]; // Assuming calories for y-axis
            const barColors = ["red"]; // Example colors, you can modify as needed
            this.chartData = new Chart("mySecondChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: {display: false},
                    title: {
                        display: true,
                        text: "Protein Goal"
                    }
                }
            });
            this.chartData.options.scales.yAxes[0].ticks.min = 0; // Set minimum value for y-axis
            this.chartData.options.scales.yAxes[0].ticks.max = 100; // Set maximum value for y-axis
            this.chartData.update();
        },
        renderFatsChart: function() {
            const xValues = ["Total Fats: "+this.fatsCount]; // Assuming food name is used for x-axis
            const yValues = [this.fatsCount]; // Assuming calories for y-axis
            const barColors = ["red"]; // Example colors, you can modify as needed
            this.chartData = new Chart("myThirdChart", {
                type: "bar",
                data: {
                    labels: xValues,
                    datasets: [{
                        backgroundColor: barColors,
                        data: yValues
                    }]
                },
                options: {
                    legend: {display: false},
                    title: {
                        display: true,
                        text: "Fats Goal"
                    }
                }
            });
            this.chartData.options.scales.yAxes[0].ticks.min = 0; // Set minimum value for y-axis
            this.chartData.options.scales.yAxes[0].ticks.max = 50; // Set maximum value for y-axis
            this.chartData.update();
        },
        async updateFood(foodId) {
            if (!this.validateUpdateFood()){
                return;
            };
            
            // Prepare the data to be sent in the request body
            const data = new URLSearchParams();
            data.append('name', this.newFoodNameUpdate);
            data.append('calories', this.newFoodCaloriesUpdate);
            data.append('protien', this.newFoodProtienUpdate);
            data.append('fats', this.newFoodFatsUpdate);
    
            // Send a PUT request to update the food item
            try {
                const response = await fetch('http://localhost:8080/foods/' + foodId, {
                    method: 'PUT',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data
                });
    
                if (response.status === 200) {
                    // Clear input fields
                    this.newFoodNameUpdate = "";
                    this.newFoodCaloriesUpdate = "";
                    this.newFoodProtienUpdate = "";
                    this.newFoodFatsUpdate = "";
    
                    // Reload foods
                    this.loadFoods();
                }
            } catch (error) {
                console.error('Failed to update food:', error);
            }
        },
        async updateGoal(goalId) {
            if (!this.validateUpdateGoal()){
                return;
            };
            
            // Prepare the data to be sent in the request body
            const data = new URLSearchParams();
            data.append('goal', this.newGoalUpdate);
            data.append('description', this.newGoalDescriptionUpdate);
    
            // Send a PUT request to update the food item
            try {
                const response = await fetch('http://localhost:8080/goals/' + goalId, {
                    method: 'PUT',
                    credentials: "include",
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: data
                });
    
                if (response.status === 200) {
                    // Clear input fields
                    this.newGoalUpdate = "";
                    this.newGoalDescriptionUpdate = "";
    
                    // Reload foods
                    this.loadGoals();
                }
            } catch (error) {
                console.error('Failed to update goal:', error);
            }
        }

    },
    

    computed:{
        foodIsValid: function(){
            return Object.keys(this.errorMessages).length == 0;
        },
        foodIsUpdateValid: function(){
            return Object.keys(this.errorUpdateMessages).length == 0;
        },
        goalIsUpdateValid: function(){
            return Object.keys(this.errorGoalUpdateMessages).length == 0;
        },
        goalIsValid: function(){
            return Object.keys(this.errorGoalMessages).length == 0;
        },
        userIsValid: function(){
            return Object.keys(this.errorUserMessages).length == 0;
        },
        sessionIsValid: function(){
            return Object.keys(this.errorSessionMessages).length == 0;
        }
    },

    created: function(){
        console.log("Hello Vue");
        this.loadSession();
    }


}).mount("#app");