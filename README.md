# 7Fit /sevenFit/  

<!-- ![](../fitness-tracking-app/fitness-tracking-app/src/assets/Logo.png) -->

## Description 

Fullstack single-page application, which enables users to create and track their daily activities and share meals and goals with friends. User can set personal redefined activity, goals /custom and suggested/ and their interval - daily/weekly/monthly , track their progress from status bar and earn badges. 
Users can  make profile and log in, track progress, make friends and share with them goals and custom meal recipes. 
They can view individual profile with avatar and shared goals, meals and log them in to add them to your profile.
The system also includes an administrative part where admins can manage users, delete meals and profiles, perform other administrative tasks and track the activity of the users. It includes also an owner who can give role to the admins.
Application has a responsive design to be conveniently used via phone.

This is a student project, part of the final assignment of the Telerik Alpha JavaScript track.

## Creators

- [Ivan Damyankin](https://gitlab.com/IvanDamyankin) <br/>
- [Ivanka Zlateva](https://gitlab.com/ipz06) <br/>
- [Momchil Mirov](https://gitlab.com/M0mchill) <br/>

## **Project information**

- Language and version: **React**
- Platform and version: **Node 14.0+**
- UI library: **Chakra UI**

## Getting started

To run the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate into the directory with name: fitness-tracking-app
3. Install the required dependencies by running: npm install.
4. Configure the Firebase Realtime Database by adding your Firebase credentials to the project.
5. Start the application by running: npm run dev.
6. Open your browser and visit: http://localhost:3000


## **Features**

#### Public

 - Landing page with usage statistics and register buttons
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_01_landing.png)
 - Register form
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_02_register.png)
 - Login form
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_03_login.png)

#### Private

 - Dashboard - add and log activity, set weight, add water consumption
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_04_dashboard.png)
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_05_dashboard2.png)

 - Goals - add goals - custom and suggested, edit, delete and share
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_06_goals.png)
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_06_2_goals.png)

 - Stats - track duration of workouts, calories - burnt and consumed, water consumption and daily meals
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_07_stats.png)
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_08_stats2.png)

 - Friends - friend requests, sent requests, my friends and search users of the application
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_09_friends.png)

 - User information - shared goals and meals
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_10_user.png)


 - Meals - add recipe, log meal and share with friends
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_11_meals.png)

 - Profile information - change avatar, names, phone, birth day, weight, height, gender , country and statistics
 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_12_profile.png)


#### Administrative Part
The administrative part is accessible to users with administrative privileges:

- User Search: Admins can search for a user by their name.
- Admins can block or unblock individual users.
- Meal Deletion and Picture Deletion: Admins can delete any meal on the application.
- Only the owner give and change admin rights.

 ![](../fitness-tracking-app/fitness-tracking-app/src/assets/scr_readme/scr_13_admin.png)


### Project Development Process

The project utilizes Git for version control and collaboration. The GitLab repository contains the complete application source code, including any necessary scripts (e.g., database scripts). The commit history provides an overview of the project's development, highlighting the features created and the contributions from team members.

URL to GitLab: https://gitlab.com/ipz06/fitness-tracking-app









