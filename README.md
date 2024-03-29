## How to run

Before anything else, you must have node installed on your machine.

### Running Dev Server

Run on your terminal `npm run watch:dev`, the server will restart everytime you make a change in your code.

### Running Production Server

For stuff like heroku deployment, aws elasticbeanstalk, run `npm run start`

### Other scripts

* `transpile` - convert es6 and beyond code to es5 to a folder named `dist-server`
* `clean` - delete transpiled folder
* `build` - clean and transpile

### Data model schemas

DROP TABLE IF EXISTS unitOfMeasure;
   
CREATE TABLE unitOfMeasure(   
unitOfMeasureID SMALLINT NOT NULL AUTO_INCREMENT, 
unitOfMeasureName VARCHAR(50) NOT NULL, 
unitValue VARCHAR(20) NOT NULL,
PRIMARY KEY (unitOfMeasureID))
ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS measurementType;

CREATE TABLE measurementType(   
measurementTypeID INT NOT NULL AUTO_INCREMENT, 
measurementTypeName VARCHAR(50) NOT NULL, 
measurementTypeDesc VARCHAR(200) NOT NULL,
unitOfMeasureID SMALLINT NOT NULL,
PRIMARY KEY (measurementTypeID))
ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS geographicAreaType;

CREATE TABLE geographicAreaType(   
geographicAreaTypeID INT NOT NULL AUTO_INCREMENT, 
geographicAreaTypeName VARCHAR(50) NOT NULL, 
geographicAreaTypeDesc VARCHAR(200) NOT NULL,
PRIMARY KEY (geographicAreaTypeID))
ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS geographicArea;

CREATE TABLE geographicArea(
geographicAreaID INT NOT NULL AUTO_INCREMENT, 
geographicAreaName VARCHAR(50) NOT NULL, 
geographicAreaDesc VARCHAR(200) NOT NULL,
geographicAreaTypeID INT NOT NULL, 
PRIMARY KEY (geographicAreaID))
ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS measurementLocation;

CREATE TABLE measurementLocation(   
measurementLocationID INT NOT NULL AUTO_INCREMENT, 
measurementLocationName VARCHAR(100) NOT NULL, 
latitude DECIMAL(10,5) NOT NULL,
longitude DECIMAL(10,5) NOT NULL,
geographicAreaID INT NOT NULL, 
PRIMARY KEY (measurementLocationID))
ENGINE=InnoDB DEFAULT CHARSET=latin1;

DROP TABLE IF EXISTS measurement;

CREATE TABLE measurement(   
measurementID BIGINT NOT NULL AUTO_INCREMENT, 
measurementTime TIMESTAMP NOT NULL, 
measurementValue DECIMAL(10,5),
nullDataReason varchar(15),
measurementLocationID INT,
measurementTypeID INT NOT NULL, 
geographicAreaID INT, 
PRIMARY KEY (measurementID))
ENGINE=InnoDB DEFAULT CHARSET=latin1;

export type unitOfMeasure = {
  unitOfMeasureID: number; // number for site pollutant
  unitOfMeasureName: string; // index or mg cubit meters
  unitValue: string; //  (µgm-3)
};
export type measurementType = {
  measurementTypeID: number; // key
  measurementTypeName: string; // Pollutant names SOS API ( Gases: Ozone, Nitrogen dioxide (NO2), Sulphur dioxide (SO₂) Particules: Particulate matter (PM2.5),Particulate matter (PM10) )
  measurementTypeDesc: string; // We write the description adding frecuency of measurement (daily-hourly)
  unitOfMeasureID: number; // foreign key
};
export type measurementLocation = {
  latitude: number; // item.content.lat
  longitude: number; // item.content.long
  measurementLocationID: number; // key
  measurementLocationName: string; // item.title
  geographicAreaID: number; // foreign key (UK)
};
export type measurement = {
  measurementID: number; // key
  measurementTime: Date; // item.pubDate
  measurementValue?: number; // pollutan value
  nullDataReason?: string; // blank  - NM (not measured) or NA (not available) give user reason why there is not reading
  measurementLocationID: number; // site where the box is from SOS API and rss feed (region is example london county)
  measurementTypeID: number; // foreign key from measurementType
  geographicAreaID?: number; //foreign key from geographical area, currently Uk
};

#   d e f r a - a q i e 
 
 
