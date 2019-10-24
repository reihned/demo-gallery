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

### Back End API

The back end API is available at
```
api/
```
To retrieve image data, the path would be 
```
api/images
```
To provide pagination, the GET parameters are 
```
page // which page, starting at 1
perPage // how many results per page
```
so to retrieve the first ten results you'd need to hit
```
api/images?page=1&perPage=10
```

filtering


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