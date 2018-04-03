# Train-Scheduler
Week 7 Homework - Basic

In this assignment, the user is entering in data for a train schedule. This includes the train's name, destination, the time of it's first arrival, and the frequency in which the train runs.

The data that the user enters will appear in the table on the page, but rather than being simple HTML and JS, this assignment utilizes Firebase. This allows you to access the data even after refreshing the page and/or exiting the browser (data persistence).

You may also notice that some conversion is necessary - we don't use the time of the train's first arrival in the table; instead, we need to figure out when the next train is. To do this, we need to compare the current time with the train's first arrival time and the frequency in which it runs (using moment.JS).