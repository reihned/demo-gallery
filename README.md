# demo-gallery
basic demo gallery app

## Setup

1. First install dependencies 
```bash
npm install
```
2. Migrate the db (note no creation due to sqlite3)
```bash
npx sequelize db:migrate
```
3. Seed data into the database
```bash
npx sequelize db:seed:all
```

## Starting the app

To run in development
```
npm run dev
```

To monitor front end changes as well
```
npm run watch
```

### Front End

show images  
response  
paginate  
filter  

### Back End

parse csv  
paginate  
filter  

### Seed data
The current seeder reads a csv file located below
```
sample_data/test.csv
```

If you plan to import your own data, please see the Image model at 
```
models/image.js
```
and seeder at 
```
seeders/20191022184705-test.js
```
to create your own custom seeder.