const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address)=>{
    if(!address){
        throw new Error('address is required');
    }
    address = address.split(' ').join('+');
    const options = {
        method: 'GET',
        url: 'https://api.distancematrix.ai/maps/api/geocode/json',
        params: {
            address:`${address}`,
          key:'S8r6WmYZhxMeim0uON9mX4wuAzy89C3nfYREYuS7rEnNpCujlAUcsjX5rjzOTBHZ'
        }, 
      };
      
      try {
          const response = await axios.request(options);
          if(response.status === 200 && response.data){
            //console.log(response.data.result[0].geometry.location);
            return{
                ltd: response.data.result[0].geometry.location['lat'],
                lng: response.data.result[0].geometry.location['lng']
            }
            }
            else{
                throw new Error("unable to fetch data");
            }
      } catch (error) {
          console.error(error);
          throw error;
      }
    }

 module.exports.getDistanceTime = async (origin,destination)=>{
    if(!origin || !destination){
        throw new Error('origin and destination are required');
    }

        const options = {
        method: 'GET',
        url: 'https://api.distancematrix.ai/maps/api/distancematrix/json',
        params: {
            origins: `${origin}`,
            destinations: `${destination}`,
            key:'MeFNllRh8G7N1LmrmFbZik4c9Z1zJhuRdhoHsQlA0v2hMRV6QBi5tXTV4Zo5D21g'

        }
        
        };

        try {
            const response = await axios.request(options);
            if (response.data.status === 'OK') {

                if (!response.data.rows[0].elements[0]) {
                    throw new Error('No routes found');
                }
                // console.log(response.data.rows[0].elements[0])
    
                return response.data.rows[0].elements[0];
            } else {
                throw new Error('Unable to fetch distance and time');
            }
        } catch (error) {
            console.error(error);
        }
        }

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

        const options = {
        method: 'GET',
        url: 'https://place-autocomplete1.p.rapidapi.com/autocomplete/json',
        params: {
        input: `${input}`,
        radius: '500'
        },
        headers: {
        'x-rapidapi-key': '5567105182msh853a2efaa541837p1f5efejsn29da5af207d8',
        'x-rapidapi-host': 'place-autocomplete1.p.rapidapi.com'
        }
    };
    
    try {
        const response = await axios.request(options);
      //  console.log(response.data);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            throw new Error('Unable to fetch suggestions');
        }
    } catch (error) {
        console.error(error);
    }
    
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // Check if latitude and longitude are within valid range
    // if (ltd < -90 || ltd > 90 || lng < -180 || lng > 180) {
    //     throw new Error('Longitude/latitude is out of bounds');
    // }

    // radius in km
     const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });
   
    return captains;
}
//this.getDistanceTime("iit guwahati","patna");
// this.getAddressCoordinate("nehru park guwahati");
 //this.getAutoCompleteSuggestions('iit');
//this.getCaptainsInTheRadius(25.609,85.1343, 10);


