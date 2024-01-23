import axios from 'axios';
import { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import { getAirQuality } from '../data/air-quality.ts';
import {
  monitoringSites,
  siteTypeDescriptions,
  pollutantTypes,
} from '../data/monitoring-sites.ts';
import * as airQualityData from '../data/air-quality.ts';

const apiKey = 'vvR3FiaNjSWCnFzSKBst23TX6efl0oL9'; //process.env.OS_API_KEY;

declare module 'express-session' {
  export interface SessionData {
    locationData: { [key: string]: any };
  }
}

async function getLocationData(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalUserLocation = req.body.location.trim();
  try {
    let userLocation = originalUserLocation.toUpperCase(); // Use 'let' to allow reassignment
    // Regex patterns to check for full and partial postcodes
    const fullPostcodePattern = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/;
    const partialPostcodePattern = /^([A-Z]{1,2}\d[A-Z\d]?)$/;

    // Insert a space for full postcodes without a space
    if (fullPostcodePattern.test(userLocation) && !userLocation.includes(' ')) {
      const spaceIndex = userLocation.length - 3;
      userLocation = `${userLocation.slice(0, spaceIndex)} ${userLocation.slice(
        spaceIndex
      )}`;
    }

    const aqValue = req.body.aq;
    const airQuality = getAirQuality(aqValue);

    if (!userLocation) {
      //res.status(400).render('enter-location.njk');
      res.render('search-location.njk', {
        errors: {
          titleText: 'There is a problem',
          errorList: [
            {
              text: 'Enter a location or postcode',
              href: 'enter-location.html#location',
            },
          ],
        },
        searchParams: {
          label: {
            text: 'Where do you want to check?',
            classes: 'govuk-label--l govuk-!-margin-bottom-6',
            isPageHeading: true,
          },
          hint: {
            text: 'Enter a location or postcode',
          },
          id: 'location',
          name: 'location',
          errorMessage: {
            text: 'Enter a location or postcode',
          },
        },
      });
      return;
    }

    let filters = [
      'LOCAL_TYPE:City',
      'LOCAL_TYPE:Town',
      'LOCAL_TYPE:Village',
      'LOCAL_TYPE:Suburban_Area',
      'LOCAL_TYPE:Postcode',
      'LOCAL_TYPE:Airport',
    ].join('+');

    const apiUrl = `https://api.os.uk/search/names/v1/find?query=${encodeURIComponent(
      userLocation
    )}&fq=${encodeURIComponent(filters)}&key=${apiKey}`;

    const response = await axios.get(apiUrl);

    const { results } = response.data;

    if (!results || results.length === 0) {
      res.render('location-not-found.njk', {
        userLocation: originalUserLocation,
      });
      return;
    }

    let matches = results.filter((item: any) => {
      const name = item.GAZETTEER_ENTRY.NAME1.toUpperCase();
      return name.includes(userLocation) || userLocation.includes(name);
    });

    // If it's a partial postcode and there are matches, use the first match and adjust the title
    if (matches.length > 0 && originalUserLocation.length >= 2) {
      matches[0].GAZETTEER_ENTRY.NAME1 = originalUserLocation.toUpperCase(); // Set the name to the partial postcode
      matches = [matches[0]];
    }

    req.session.locationData = matches; // Store the data in session

    if (matches.length === 1) {
      res.render('location', {
        result: matches[0],
        airQuality: airQuality,
        airQualityData: airQualityData.commonMessages,
        monitoringSites: monitoringSites,
        siteTypeDescriptions: siteTypeDescriptions,
        pollutantTypes: pollutantTypes,
        locationType: 'single location',
        serviceName: 'Check local air quality',
      });
    } else if (matches.length > 1 && originalUserLocation.length > 3) {
      res.render('multiple-locations.njk', {
        results: matches,
        userLocation: originalUserLocation,
        airQuality: airQuality,
        airQualityData: airQualityData.commonMessages,
        monitoringSites: monitoringSites,
        siteTypeDescriptions: siteTypeDescriptions,
        pollutantTypes: pollutantTypes,
        serviceName: 'Check local air quality',
      });
    } else {
      res.render('location-not-found.njk', {
        userLocation: originalUserLocation,
      });
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(400).render('error.njk', {
      error: 'An error occurred while fetching location data.',
      userLocation: originalUserLocation,
    });
  }
}
function searchLocation(req: Request, res: Response, next: NextFunction) {
  res.render('search-location.njk', {
    serviceName: 'Check local air quality',
    searchParams: {
      label: {
        text: 'Where do you want to check?',
        classes: 'govuk-label--l govuk-!-margin-bottom-6',
        isPageHeading: true,
      },
      hint: {
        text: 'Enter a location or postcode',
      },
      id: 'location',
      name: 'location',
    },
  });
}

function getLocationDetails(req: Request, res: Response, next: NextFunction) {
  try {
    const locationId = req.baseUrl.split('/')[2]; //req.params.id;
    const locationData = req.session.locationData || [];
    const locationDetails = locationData.find(
      (item: any) => item.GAZETTEER_ENTRY.ID === locationId
    );

    if (locationDetails) {
      const airQuality =
        getAirQuality(/* Retrieved from session or another source */);
      res.render('location', {
        result: locationDetails,
        airQuality: airQuality,
        airQualityData: airQualityData.commonMessages,
        monitoringSites: monitoringSites,
        siteTypeDescriptions: siteTypeDescriptions,
        pollutantTypes: pollutantTypes,
        locationType: 'single location',
        serviceName: 'Check local air quality',
      });
    } else {
      res.render('location-not-found');
    }
  } catch (error) {
    console.error('Error retrieving location details:', error);
    res.status(500).render('error', {
      error: 'An error occurred while retrieving location details.',
    });
  }
}

export default { getLocationData, searchLocation, getLocationDetails };
