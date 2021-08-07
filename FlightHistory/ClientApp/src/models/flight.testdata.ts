import type { Flight } from "./flight";
import { stubAirportList, stubAirport, stubAirport2 } from "./airport.testdata";
import { stubAirlineList, stubAirline } from "./airline.testdata";
import { stubAircraft, stubAircraftList } from "./aircraft.testdata";

export const stubFlight: Flight = {
    id: 1,
    source: stubAirport,
    destination: stubAirport2,
    airline: stubAirline,
    aircraft: stubAircraft,
    date: "07-08-2021",
};

// Sample data generated by https://www.mockaroo.com/
const stubData = [
    {
        id: 1,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "12/05/1965",
    },
    {
        id: 2,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "09/08/2010",
    },
    {
        id: 3,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "10/11/2020",
    },
    {
        id: 4,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "09/04/2014",
    },
    {
        id: 5,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 2,
        date: "12/09/2014",
    },
    {
        id: 6,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 2,
        date: "30/08/1962",
    },
    {
        id: 7,
        source: 2,
        destination: 2,
        airline: 1,
        aircraft: 1,
        date: "11/09/2011",
    },
    {
        id: 8,
        source: 2,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "03/01/2004",
    },
    {
        id: 9,
        source: 2,
        destination: 2,
        airline: 1,
        aircraft: 1,
        date: "04/12/2009",
    },
    {
        id: 10,
        source: 1,
        destination: 2,
        airline: 1,
        aircraft: 1,
        date: "13/03/2013",
    },
    {
        id: 11,
        source: 2,
        destination: 1,
        airline: 2,
        aircraft: 2,
        date: "01/09/1964",
    },
    {
        id: 12,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 2,
        date: "23/09/2001",
    },
    {
        id: 13,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "27/01/2016",
    },
    {
        id: 14,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "15/01/1990",
    },
    {
        id: 15,
        source: 2,
        destination: 2,
        airline: 1,
        aircraft: 2,
        date: "25/11/2012",
    },
    {
        id: 16,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "02/10/1997",
    },
    {
        id: 17,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 1,
        date: "29/04/1978",
    },
    {
        id: 18,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "06/06/1974",
    },
    {
        id: 19,
        source: 1,
        destination: 2,
        airline: 1,
        aircraft: 2,
        date: "29/04/1972",
    },
    {
        id: 20,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 1,
        date: "25/07/2001",
    },
    {
        id: 21,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "04/12/1973",
    },
    {
        id: 22,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "16/11/1985",
    },
    {
        id: 23,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "19/09/2012",
    },
    {
        id: 24,
        source: 2,
        destination: 2,
        airline: 1,
        aircraft: 1,
        date: "05/09/1985",
    },
    {
        id: 25,
        source: 1,
        destination: 2,
        airline: 1,
        aircraft: 2,
        date: "09/11/1975",
    },
    {
        id: 26,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "05/03/1973",
    },
    {
        id: 27,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "06/10/1980",
    },
    {
        id: 28,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "29/05/1969",
    },
    {
        id: 29,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 1,
        date: "28/02/1990",
    },
    {
        id: 30,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "14/05/2016",
    },
    {
        id: 31,
        source: 2,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "08/03/2007",
    },
    {
        id: 32,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "21/09/2013",
    },
    {
        id: 33,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 2,
        date: "04/03/1988",
    },
    {
        id: 34,
        source: 1,
        destination: 2,
        airline: 1,
        aircraft: 2,
        date: "14/05/2009",
    },
    {
        id: 35,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 1,
        date: "08/10/1977",
    },
    {
        id: 36,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "22/08/1995",
    },
    {
        id: 37,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 1,
        date: "30/08/2018",
    },
    {
        id: 38,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 2,
        date: "28/06/1980",
    },
    {
        id: 39,
        source: 2,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "21/10/1974",
    },
    {
        id: 40,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 2,
        date: "20/04/1990",
    },
    {
        id: 41,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "10/12/1988",
    },
    {
        id: 42,
        source: 1,
        destination: 2,
        airline: 2,
        aircraft: 2,
        date: "10/11/1963",
    },
    {
        id: 43,
        source: 1,
        destination: 2,
        airline: 1,
        aircraft: 2,
        date: "20/09/2013",
    },
    {
        id: 44,
        source: 2,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "08/11/1964",
    },
    {
        id: 45,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 2,
        date: "30/07/1991",
    },
    {
        id: 46,
        source: 2,
        destination: 1,
        airline: 2,
        aircraft: 1,
        date: "08/02/1961",
    },
    {
        id: 47,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "11/11/2016",
    },
    {
        id: 48,
        source: 1,
        destination: 2,
        airline: 1,
        aircraft: 2,
        date: "26/03/1989",
    },
    {
        id: 49,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "01/01/1997",
    },
    {
        id: 50,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "04/07/2012",
    },
    {
        id: 51,
        source: 2,
        destination: 2,
        airline: 2,
        aircraft: 2,
        date: "08/09/1987",
    },
    {
        id: 52,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 2,
        date: "06/09/1976",
    },
    {
        id: 53,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "07/05/2004",
    },
    {
        id: 54,
        source: 2,
        destination: 2,
        airline: 2,
        aircraft: 2,
        date: "15/11/1972",
    },
    {
        id: 55,
        source: 2,
        destination: 1,
        airline: 2,
        aircraft: 2,
        date: "14/06/1994",
    },
    {
        id: 56,
        source: 1,
        destination: 2,
        airline: 1,
        aircraft: 2,
        date: "20/01/1971",
    },
    {
        id: 57,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "20/12/1984",
    },
    {
        id: 58,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "15/08/2005",
    },
    {
        id: 59,
        source: 1,
        destination: 1,
        airline: 2,
        aircraft: 2,
        date: "20/09/1989",
    },
    {
        id: 60,
        source: 2,
        destination: 1,
        airline: 1,
        aircraft: 1,
        date: "03/06/1973",
    },
    {
        id: 61,
        source: 1,
        destination: 2,
        airline: 1,
        aircraft: 2,
        date: "11/03/2009",
    },
    {
        id: 62,
        source: 1,
        destination: 1,
        airline: 1,
        aircraft: 2,
        date: "11/06/1964",
    },
    {
        id: 63,
        source: 2,
        destination: 2,
        airline: 1,
        aircraft: 1,
        date: "22/08/2009",
    },
];

export const stubFlightList = stubData.map((stub) => {
    return {
        id: stub.id,
        source: stubAirportList[stub.source],
        destination: stubAirportList[stub.destination],
        airline: stubAirlineList[stub.airline],
        aircraft: stubAircraftList[stub.aircraft],
        date: stub.date,
    };
});
