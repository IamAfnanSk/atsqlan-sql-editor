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

<img width="887" alt="Load time" src="https://user-images.githubusercontent.com/48408572/193141409-5f572f54-4997-4a50-9c8c-b12db243f1c9.png">

- Measured with lighthouse
- Measured FPS for large number of rows I used FPS measuring tool of chrome - It gave average FPS of **55** (for the table scrolls alone) ✨.

## Optimization

- I optimized this app by memoizing things where needed like for the result table which made my app to not crash for large number of rows.
- Limited rows to 50 by default to improve speed and avoid unnecessary rendering of rows which might not be needed.
- Purged all unused tailwind styles' classes in prod build.

## Author

# Afnan Shaikh
