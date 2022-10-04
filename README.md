<div align="center">
  <img width="150px" src="https://atlan.com/img/atlan-blue.svg"/>
    <h1>AtSQLan - SQL Editor</h1>

  <p>An online code playground for SQL.</p>
  <p><b>NOTE:- This app is not optimized for small viewports yet.</b></p>
</div>

# AtSQLan - SQL Editor

### The codebase of the AtSQLan project

## Overview

This is an frontend app for data users where they can use many listed functionality to execute sql queries to view required data easily.

## Framework used

- React with Nextjs

## Major plugins

- @monaco-editor/react
- papaparse
- react-full-screen
- react-table
- react-hot-toast
- allotment
- sql-formatter

## Features - (The ones which were asked)

- Area to write SQL queries
- Output of data
- Multiple query selection mechanism
- Basic design
- Layout

## Bonus features - (The ones which I added)

- Fullscreen for IDE
- Multi tab support for IDE
- Fullscreen for result table
- SQL syntax highlighting with basic support
- Beautify the SQL queries
- Save option - (fake saving)
- Row & Columns counts
- Sorting in table
- Limit toggle for initial 50 rows
- Sticky header in table for easy view of data
- Download CSV file
- Copy JSON data
- Awesome UX and UI
- Time it took to run the query

## Load time

![load time](https://user-images.githubusercontent.com/48408572/193761132-df2a0cfe-3c8a-426d-97e2-d4388bd06b89.png)

- Measured with lighthouse - 0.3 FCP ✨.
- Measured FPS for large number using FPS tool of chrome - It gave average FPS of **55** (for the table scrolls alone) ✨.

## Optimization

- I optimized this app by memoizing things where needed like for the result table which made my app to not crash for large number of rows.
- Limited rows to 50 by default to improve speed and avoid unnecessary rendering of rows which might not be needed.
- Purged all unused tailwind styles' classes in prod build.

## Author

# Afnan Shaikh
