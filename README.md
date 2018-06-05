# Fauna-multitenancy-js
In this tutorial, we will:
[x] Create three top level databases, namely: _**production**_, _**staging**_ and _**internal**_. You can modify the number of the databases as well as their names and to values of your choice by editting the value of the _top_db_ array on [line 4 ](https://github.com/FlevianK/Fauna-multitenancy-js/blob/master/index.js#L4) in index.js.
[x] Create three child databases (_people_department_, _it_department_, _markerting_department_) within _**staging**_. Similarily, you can modify the number of child databases as well as their names and to values of your choice by editting the  the _child_db_ array on [line 6](https://github.com/FlevianK/Fauna-multitenancy-js/blob/master/index.js#L6) in index.js. If you would rather have the child databases created in another top level database other than _staging_, change the value of parent_db on [line 5](https://github.com/FlevianK/Fauna-multitenancy-js/blob/master/index.js#L5) to the name of that top level database of your choice
## Getting started
1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repo
```$ git clone https://github.com/FlevianK/Fauna-multitenancy-js.git```
3. Change directory to the tutorial's  root directory
```$ cd Fauna-multitenancy-js```
4. Install all the dependencies
```$ npm install```
## Creating the databases
1. Create a new cloud key via [this link](https://fauna.com/account/keys)
2. Replace the _'YOUR_FAUNADB_ADMIN_SECRET'_ value on [line 3 ](https://github.com/FlevianK/Fauna-multitenancy-js/blob/master/index.js#L3) in index.js with your generated key.
3. Run the queries
`$ npm start`
4. If successful the output below , will be displayed to your console
>---------------Top database secrets-----------
{ production: 'fnACywr7hXACDTSMWE-LVYHSbTxRMlWaGpJU5_o2',
  staging: 'fnACywr7hXAGDUmacaUKJ0x8OJ0QfW2zks6nvMvu',
  internal: 'fnACywr7hXAKDbKJlZMwQt_f8U8zxQeiZsUkVpLI' }
----------------------------------------------\
>-------------Child database secrets-----------
{ people_department: 'fnACywr7zFACDaIVhbnugDtH4WuYbavHqJNRU2u5',
 it_department: 'fnACywr7zFAGDVvhXEsGPQax8kp8uxUG78MibbqI' }
----------------------------------------------\

You will also be able to see the created top level databases as well as the child databases nested within the parent on your [Fauna Dashboard](https://dashboard.fauna.com/db)