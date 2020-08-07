Fitter

Why a fitness app?
    I decided to build an app focused on fitness because of the amazing effect it has on people. It can completely change and improve a persons mindset. I wanted to build something which had the potential to help people, so why not fitness.

Why a React Native App?
    I built fitter with react native as it is great framework which I love to use and have experience in. I used it a couple times and fell in love with the idea of writing code once and being able to use it in multiple devices. There are also a lot of pre-built components which help speed up development. I also chose react native as it uses JavaScript which ties in with CS50.

Why build with Expo?
    Expo is great to code RN apps as it simplifies the devs work. When using expo I don't have to worry about Xcode and Android studio. However expo also significantly increases the apps weight, since this was a project I didn't worry about the app weight.

Google Firebase:
    I chose to use Firebase as it is great for making a database and handling user authentication. Firebase simplifies user auth to simple fetch functions.

App.Js:
    In the App.js file we only import really import the MainNavigator file and return whatever it returns.

scale.js:
    The scale file gives us the ability to write responsive code. First we declare guideline width and height which are based on a 5 inch screen.
    Then we declare scale constants which return a scaled value.

Navigator.js:
    The navigator file uses react navigation which simplifies navigation in our app. First we have to import all of the screens used in the app. At the bottom we have the MainNavigator. This is what the user will see first as we passed it in to the App.js. We render the startup screen first. The purpose of Switch Navigator is that it only shows one screen at a time and doesn't show any back buttons or such. To the MainNavigator we pass the AppNavigator, which is a materialTopTabNavigator. I decided to use top tab and change the position to bottom as it was easier and more functional than just using a bottomTabBar. We pass in the Workout and Tips tabs to it. The workoutNavigator is a stack navigator which means it stacks screens onto each other as the user navigates. This means that the user can go back to screens and such. We pass it the categories, workoutsDisplay, workout and the settings screen to it. We also use headerBackground which allows us to customize the background of the header. We pass it a linearGradient which fits the theme of the app very well.

AuthScreen.js:
    In the authscreen I use a few components like linear gradient and styledInput and touchable opacity. These all help with functionality and looks.
    There is a saveDataToStorage function which stores user data in the cache when the user either logins or signs up. This also helps us achieve auto-login as if this data exists that means the user is logged in. Then there is a formReducer which sets up a reducer to keep up with the input value data and validity. In the signup function we try to post the user data on to the firebase auth. Firebase returns a response.ok field, which is true if the signup was succesful. If it was unsuccesful throw an error. If everything went fine we save the user data and navigate to the workout category screen. The login function is very similliar but the fetch adress has changed. Then we use useEffect, which runs every time the value after the function has changed. So every time there is an error we alert the user. In the login and signup buttons, we first check if the email and password is valid, if they are we run the login or signup function.

HealthTipsScreen.js:
    In the tips screen we have a getFitnessTips function, which fetches data from my firebase server. After we convert the fetch response to json we set the tips state as it. We also use useEffect, with no value after the function. This means that the useEffect function only runs once in the first frame which works perfectly for fetch functions. We also declare a renderHeader function which returns a header component. We also use FlatList, which is a great component for rendering lists as it has high performance. We give the flatlist the data stored in the tips state. In the renderItem prop we have code which is executed for every child in the data we gave to the flatlist. The keyextractor gives every item a certain key to differ them. In this one we use the index of the item as a key. The listHeaderComponent is shown before the first item, which is perfect for showing a header. We display the header by using the function we made earlier called renderHeader.

SettingsScreen.js:
    The settings screen is a bit empty as I only had a logout button to put in it. We make a custom button using touchable opacity as the pre-built component is very bland and has close to none style options. The onPress function runs whenever we press on the touchable opacity. To logout, we first delete the user data stored during the login and signup process so that auto-login no longer occurs. Then we navigate back to the Auth page where the user can sign up with a new account or log back in.

StartUpScreen.js:
    The startup screen will be the first to render, so it is perfect to either auto-login or navigate to the auth page. We check if the user data from the login and signup process is there, if not we navigate to the auth page. Then we do a final check to make sure that the token and userId is valid. If they are we navigate to the app page and auto-login is succesful. While all this is going on, we render an ActivityIndicator. This is basically a spinner to show that the app isn't frozen or stuck if the tryLogin function is taking too long.

WorkoutCategoryScreen.js:
    There is a getWorkouts function which fetches the workouts from my database. Then we check if hasLoaded is false, if it is we display a spinner. When the workouts have loaded, we use flatlist again to show the workout categories. We pass the keys of the workouts state to the flatlist data as it doesn't work with objects. We set the number of columns to 2 do that we can show 2 items per row. Then we use the CategoryButton I built for this screen to show each category. The category button component needs a few props, we pass the navigate function as a prop which navigates to the workoutsDisplay page. We also pass in params to the navigate function so that we won't have to fetch the workouts again.

WorkoutScreen.js:
    Firstly, setup 2 states which recieve the values of the parameters we passed in the navigate function on the previous page. The getColor function returns a color style based on the difficulty value of the workout. We also use scrollview which allows us to scroll. In the previous pages we didn't have to do this as Flatlist takes care of scrolling.Then we display the workout image, title difficulty, equipment and how to do the workout.

WorkoutsDisplayScreen.js:
    We set 2 states from the parameters we got from the categories screen. I could have used flatlist in this page but I wanted to show a bit more functionality instead of repeatedly using the same components. In this page we map the workout keys, and show a workoutButton component I built for each. We pass it a few props and navigate to it.

Card.js:
    This is a simple card component. There is a view and it displays the children passed in it. We apply the style to the view differently which allows flexibilty in the usage of this component. First it extracts the values of styles.card, and also extracts the style prop we can pass to it.

CategoryButton.js:
    The categoryButton is the ui for the categories page.

HeaderButton.js:
    This component is used when we display the settings icon.

Input.js:
    First we make a input reducer. In the textChangeHandler function we use regex and if checks to validate the input.

StyledInput.js:
    This is a component which relies on the input component but is styled for the authpage. It also displays a icon to the left of the input field.

WorkoutButton.js:
    This is a button made for the WorkoutDisplayScreen.
