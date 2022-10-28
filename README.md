# Sheldon's game

Sheldon's game is a website aimed at anyone who wants to play a fun variation of rock, paper, and scissors.
The game is based on the Big Bang theory show where this variation was first mentioned. The website's name was taken from one of the show's characters, Sheldon.
The first to win 10 rounds, wins the game, and a Leaderboard shows the top 10 winners around the globe.
The opponent is Sheldon(computer) and the computer's choices are completely random which makes the game quite hard!

Developed by Martin Fortuna.

![Am I Responsive Website Mockup](/readme/wireframes/amIresponsive.png)

[Sheldon's game - Live Webpage](https://martinfortuna.github.io/portfolio-2-project/) (Right-click to open in a new tab)

## Contents

1. [Project Goals](#project-goals)
1. [Target Audience](#target-audience)
1. [User Experience (UX)](#user-experience-ux)
   - [User stories](#user-stories)
   - [Design](#design)
   - [Wireframes](#wireframes)
1. [Features](#features)
1. [Technologies Used](#technologies-used)
   - [Languages Used](#languages-used)
   - [Frameworks and Tools Used](#frameworks-and-tools-used)
1. [Testing](#testing)
   - [Validators](Validators)
   - [Accessibility and Performance](#accessibility-and-performance)
   - [Further Testing](#further-testing)
   - [Testing User Stories from the User Experience (UX) Section](#testing-user-stories-from-the-user-experience-ux-section)
   - [Bugs and Fixes](#bugs-and-fixes)
1. [Future Updates](#future-updates)
1. [Deployment](#deployment)
1. [Credits](#credits)
1. [Acknowledgements](#acknowledgements)

## Project Goals

I wanted to create a fun game based on Sheldon's version of rock, paper, and scissors televised via the Big Bang Theory show, this version adds difficulty as 2 more options, lizard and spock are added to the options. The game aims to have the user play repeatedly to rank in the top 10 winners worldwide, the users can compete with friends to get the highest score.
To achieve a live leaderboard and username register, I used a Rest API key to link the data to my Restdb.io database.

## Target Audience

The target audience for this site is anyone who enjoys chance games, and competition with friends and family.

## User Experience (UX)

- ### User stories

  - #### First Time Visitor Goals

    - As a First Time Visitor, I want to quickly understand the main purpose of the site.
    - As a First Time Visitor, I want to be able to view the site on multiple devices.
    - As a First Time Visitor, I want to enter my nickname.
    - As a First Time Visitor, I want to understand the rules of the game.
    - As a First Time Visitor, I want to quickly understand the scoring system.
    - As a First Time Visitor, I would like to see descriptive images of the choices I will make.
    - As a First Time Visitor, I would like to see the rules at any time while playing the game.
    - As a First Time Visitor, I would like to see the scoreboard at any time while playing the game.
    - As a First Time Visitor, I would like to see a pop-up that shows the round winner for each round played.
    - As a First Time Visitor, I would like to see a pop-up that shows the game-winner.
    - As a First Time Visitor, I would like to see an option to play a new game after the game is over.

  - #### Returning Visitor Goals

    - As a Returning Visitor, I want to play side-by-side with friends and family.
    - As a Returning Visitor, I want to have the option to change the player.

  - #### Frequent User Goals

    - As a Returning Visitor, I want to see my rank in the top ten leaderboard and how many games I won versus Sheldon.
    - As a Frequent User, I want to check to see if there are any new sections added to the site.

- ### Design

  - #### Imagery

    - I have used The Big Bang Theory logo as the background and preloader image, the colors are also inspired by the show.

  - #### Colour Scheme

    - The two main colors used are orange and black.

  - #### Typography

    - The Oswald font is the main font used throughout the whole website with Sans Serif as the fallback font in a case where for any reason the font isn't being imported into the site correctly. Oswald is a clean font used frequently in programming, so it is both attractive and appropriate.

* ### Wireframes

This is the prototype of the project that may change during its development.

<details><summary>Desktop</summary>

![Tablet Desktop Part 1](/readme/wireframes/usernname-landing-page-desktop.png)
![Tablet Desktop Part 2](/readme/wireframes/landing-page-desktop.png)
![Tablet Desktop Part 3](/readme/wireframes/round-winner-modal.png)
![Tablet Desktop Part 4](/readme/wireframes/scoreboard.png)
![Tablet Desktop Part 5](/readme/wireframes/rules.png)

</details>
<details><summary>Tablet</summary>

![Tablet Wireframe Part 1](/readme/wireframes/usernname-landing-page-tablet.png)
![Tablet Wireframe Part 2](/readme/wireframes/landing-page-tablet.png)

</details>
<details><summary>Mobile</summary>

![Mobile Wireframe Part 1](/readme/wireframes/usernname-landing-page-mobile.png)
![Mobile Wireframe Part 2](/readme/wireframes/landing-page-mobile.png)

</details>

[Back to top &uarr;](#contents)

## Features

### Preloader Modal

The user will see a preloader spinning as the website loads the game, this same preloader will be used when get and post actions are taken and take some seconds to complete.
![Preloader](/readme/feature-screenshots/preloader.png)

### Username Modal

The user is greeted with a welcoming challenge sentence, he has an overview of what the landing page looks like. The user's nickname will later be
used to compute the user's score in the leaderboard.
![Username Modal](/readme/feature-screenshots/username-landing-page.png)

### Landing Page

The user can see the website's name, the game name, and descriptive icons that he will use to play the game. He can also see buttons for opening at anytime the leaderboard, game rules, and change player modals. The scoreboard is well placed above the playground, visible, and easy to understand.

![Landing Page](/readme/feature-screenshots/landing-page.png)

### Round result modal

The round result modal appears after the user has made the selection, it will outline the round winner, provide the user's and Sheldon's choice, and also the round rule.
The user will be given the button to move forward to the next round.
![Round result modal](/readme/feature-screenshots/round-modal.png)

### Game winner modal

The game-winner modal appears after either the user or Sheldon has reached 10 rounds won, it will outline the game-winner, and provide the user with a motivational sentence in case of the game lost and a congratulations sentence in case of a win. The user will be given the button to play the game again.
![Game winner modal](/readme/feature-screenshots/winner-modal.png)

### Leaderboard modal

The leaderboard modal appears once the user clicks the leaderboard button, it shows the top 10 players' placement around the world, and it also provides the users with how many games Sheldon has won against them. It can be accessed at any time by the user.
![Leaderboard modal](/readme/feature-screenshots/leaderboard-modal.png)

### Game rules modal

The rules modal appears once the user clicks the rules button, it shows the game rules, the user has the option to close the modal by either clicking on the X sign or anywhere in the window for easy access back to the game.
![Game rules modal](/readme/feature-screenshots/rules-modal.png)

### Change player modal

If the user is playing with a friend and wishes to pass the turn, he can click on the change player button which will open the username modal.
![Change player modal](/readme/feature-screenshots/change-player-modal.png)

### Footer

The footer has 2 icons, one that directs the user to the website's social media account and the other to the developer's GitHub profile.
![Footer](/readme/feature-screenshots/social-media-links.png)

## Technologies Used

### Languages Used

- [HTML5](https://en.wikipedia.org/wiki/HTML5)
- [CSS3](https://en.wikipedia.org/wiki/Cascading_Style_Sheets)
- [Javascript](https://en.wikipedia.org/wiki/JavaScript)

### Frameworks and Tools Used

1. [Google Fonts:](https://fonts.google.com/)
1. [Font Awesome:](https://fontawesome.com/)
1. [Balsamiq:](https://balsamiq.com/)
1. [Stackoverflow](https://stackoverflow.com/).
1. [W3schools](https://www.w3schools.com/)
1. [W3C HTML Validator](https://validator.w3.org/)
1. [W3C JigSaw Validator](https://jigsaw.w3.org/css-validator/)
1. [JSHint](https://jshint.com/)
1. [Grammarly](https://www.grammarly.com/)
1. [favicon.io](https://favicon.io/)

[Back to top &uarr;](#contents)

## Testing

### Validators

<details><summary>W3C Markup Validator</summary>

- No errors were returned when passing through the official [W3C validator](https://validator.w3.org/nu/?doc=https%3A%2F%2Fmartinfortuna.github.io%2Fportfolio-2-project%2F)

</details>
<details><summary>W3C CSS Validator</summary>

- No errors were found when passing through the official [(Jigsaw) validator](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fmartinfortuna.github.io%2Fportfolio-2-project%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en)

</details>

<details><summary>JSHint</summary>

![JSHint Results](/readme/validators/jshint.png)

</details>

### Accessibility and Performance

<details><summary>WAVE Web Accessibility Evaluation Tool</summary>

- No errors were returned when passing through WAVE Web Accessibility Evaluation Tool
  ![WAVE Web Accessibility Evaluation Tool Results](/readme/validators/wave-accessibility.png)

</details>

For performance and more accessibility testing, I used Google Lighthouse throughout:

#### Lighthouse Results

<details><summary>Desktop</summary>

Landing page

![Lighthouse Desktop Score](/readme/validators/desktop-lighthouse.png)

</details>

<details><summary>Mobile</summary>

Landing page

![Lighthouse Mobile Score](/readme/validators/mobile-lighthouse.png)

</details>

### Further Testing

<details><summary>Manual Testing</summary>

| Location     | Feature Tested      | Expected Result                                                               | Actual Result | Pass/Fail |
| ------------ | ------------------- | ----------------------------------------------------------------------------- | ------------- | --------- |
| Preloader    | Preloader           | Is centered in relation to VH and VW.                                         | As Expected   | Pass      |
|              | Preloader           | Appears while push and get data requests are made to the database.            | As Expected   | Pass      |
| Landing page | Username modal      | Appears as soon as window loads                                               | As Expected   | Pass      |
|              | Username modal      | Does not let the user start when trying to validate empty data                | As Expected   | Pass      |
|              | Username modal      | Does not let the user close the modal without inputting the username.         | As Expected   | Pass      |
|              | User choice buttons | Buttons scale when hovered                                                    | As Expected   | Pass      |
|              | Round modal         | Appears as soon as the user makes the choice                                  | As Expected   | Pass      |
|              | Round modal         | Closes once the user clicks on next round                                     | As Expected   | Pass      |
|              | Scoreboard          | computes match results and resets once the game is over.                      | As Expected   | Pass      |
|              | Game winner modal   | Appears as soon as the user either the user or the CPU reaches 10 rounds won. | As Expected   | Pass      |
|              | Leaderboard modal   | Appears as soon as the user makes the choice                                  | As Expected   | Pass      |
|              |                     | Correctly shows the top 10 winners and displays games won by CPU              | As Expected   | Pass      |
|              | Change player modal | Appears as soon as the user makes the choice                                  | As Expected   | Pass      |
|              | Game rules modal    | Appears as soon as the user makes the choice                                  | As Expected   | Pass      |
|              | Game rules modal    | Closes outside of modal click                                                 | As Expected   | Pass      |
|              | Scoreboard          | computes match result and resets once game is over.                           | As Expected   | Pass      |
|              | Social Media Icons  | Clicking the individual Social Media Icons opens their site in a blank tab    | As Expected   | Pass      |

</details>

<details><summary>Browser Testing</summary>

| **Browser Tested** | **Actual Result** | **Pass/Fail** |
| ------------------ | ----------------- | ------------- |
| Chrome             | As Expected       | Pass          |
| Firefox            | As Expected       | Pass          |
| Edge               | As Expected       | Pass          |
| Mac OS Safari      | As Expected       | Pass          |

</details>

<details><summary>Browserstack.com</summary>

![Browserstack Image](/readme/validators/devicerange.png)

</details>

## Unfixed Bugs

- No known bugs left unfixed.

## Future Updates

I would like to add the following updates in the future:

1. Online player vs player.
2. Add CPU level of difficulty.

## Deployment

### GitHub Pages

- The site was deployed to GitHub pages. The steps to deploy are as follows:
- In the GitHub repository, navigate to the Settings tab
- From the source section drop-down menu, select the Master Branch
- Once the master branch has been selected, click on save and the page will be automatically refreshed with a detailed ribbon display to indicate the successful deployment.

The live link can be found here - https://martinfortuna.github.io/portfolio-2-project/

## Credits

### Content

- Credit to King Subash [King Subash](https://www.kingsubash.com/simple-page-preloader-with-css-and-javascript) for the preloader code which I initially copied and then modified.
- Credit to [W3schools](https://www.w3schools.com/howto/howto_css_modals.asp) for the modals code.
- For coding questions: [W3schools](https://www.w3schools.com/)
- For coding questions: [Stackoverflow](https://stackoverflow.com/)
- For coding questions: [Slack](https://slack.com/intl/en-ie/)

### Media

- Background image taken from [Wikimedia Commons](<https://commons.wikimedia.org/wiki/File:Atom_symbol_as_used_in_the_logo_of_the_television_series_The_Big_Bang_Theory_(black).svg>)
- Icons taken from [Freeicons.io](https://freeicons.io/) and [Iconfinder.com]https://www.iconfinder.com/

## Acknowledgements

- To my friend Guillerme for helping me along the project and to my wife who has taken care of our baby while I code.

[Back to top &uarr;](#contents)