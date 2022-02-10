<div align="center">
  <img src="https://user-images.githubusercontent.com/84752451/153381339-5d5a3a2f-d86b-4d65-8513-d84b68cd7145.png" height="300">
  
  # ExamClock
  
</div>

Simple HTML application for schools to display a customised timer on projectors.

##  Installation
1. This project can either be ran on a web server, or directly by opening the index.html file in a web broswer. 
2. Place the School crest/logo in the root directory, named "logo.jpg". 
3. In the src/styles/variablestyles.css, the following edits can be made.

``` 
    --primary-color: {change to your school's primary color};
    --secondary-color: {change to your school's secondary color};
    --left-panel-color: {the color of the entire left panel};
    --exam-event-bgcolor: {the background color of the exam events};
    --exam-event-textcolor: {the text color of the exam events};
    --aclock-bordercolor: {the border color of the analogue clock};
    --dclock-textcolor: {the text color of the digital time and date};
```

##  Troubleshooting
In the settings modal there is a reset button, clicking that will remove all the localstorage used by the site. This will most likely fix any issues you encounter, if any. If it doesn't submit an issue.

##  Purpose / My Motivation
I wanted to improve the exam timer that my old High School used.
