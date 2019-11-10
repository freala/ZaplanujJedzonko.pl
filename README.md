
# ZaplanujJedzonko.pl 
(under construction)

This project consists of landing page of ZaplanujJedzonko.pl and linked app that helps you storage your recipes and organize them into week schedules. 
It came as a result of *Scrum Lab* I was a part of in **CodersLab**. Within 5 days me and my two colleagues created a rich draft for this repository.

## Technologies used in the project

  - **HTML5** for pages index.html-landing page and pages og the app(*app.html*, *recipes.html*, *schedules.html*)
  - **SASS** for styling, devided into partials according to the function or location
  - **Gulp** for converting files from SCSS to CSS
  - **Node.js** and it's package manager - **npm** for installing gulp plugins
  - **JavaScript** for creating interactive elements of pages like slider in landing page, widgets in the app, etc.

### Applied solutions
- Switching display of different divs on the main app page as a result of an event set on widgets: add recipe and add plan, to create an impression of switching pages while you're still in one file *app.html*
- Using local storage for saving user's name, recipes and meal schedules