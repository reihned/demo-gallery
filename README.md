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

To run in production
```
npm start
```

From there the front end should be available at http://localhost:3000/


Please note that for production ideally the javascript files in `public/` should be served by nginx or similar

### Front End

The front end currently utilizes vue compiled via webpack.

The webpack config is
```
wepack.config.js
```

All source files are within the `src` folder  and are compiled to `public/build.js`  

To rebuild `public/build.js` please run the following command
```bash
npm run build
```



### Back End API

To retrieve image data, the path would be 
```
api/images
```
To provide pagination, the GET parameters are 
```
offset // which image to start after
limit // how many results to retrieve
```
They should be added as standard GET search params  
For example to retrieve the first ten results you'd need to hit
```
api/images?offset=0&limit=10
```
Note that there is a default offset of 0 and limit of 5

Filtering params for images are as follows
```
minWidth // minimum width
maxWidth // maximum width
minHeight // minimum height
maxHeight // maximum height
```

They should be added as standard GET search params  
for example:
```
api/images?minWidth=200&maxWidth=400
```


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
to create your own custom image seeder.
```
npx sequelize-cli seed:generate --name images2
```
where images2 is the name of the seeder.