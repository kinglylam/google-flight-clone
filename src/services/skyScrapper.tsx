import axios from "axios";

// Environment variables
const API_KEY = process.env.REACT_APP_RAPIDAPI_KEY;
const API_HOST = "sky-scrapper.p.rapidapi.com";

// Ensure API key exists
if (!API_KEY) {
  throw new Error(
    "Missing VITE_RAPIDAPI_KEY. Restart the dev server after adding it."
  );
}

// Axios instance for RapidAPI
const apiClient = axios.create({
  baseURL: `https://${API_HOST}/api/v1/flights`,
  headers: {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": API_HOST,
  },
});

export interface Flight {
  id?: string;
  airline: string;
  departure: string;
  arrival: string;
  price: string;
}

export interface Place {
  skyId: string;
  entityId: string;
  title: string;
  suggestionTitle: string;
  subtitle: string;
}

/**
 * Fetch available flights between two locations.
 */
export async function fetchFlights(
  originSkyId: string,
  destinationSkyId: string,
  originEntityId: string,
  destinationEntityId: string,
  date: string,
  returnDate?: string
): Promise<Flight[]> {
  try {
    const response = await apiClient.get("/searchFlights", {
      params: {
        originSkyId,
        destinationSkyId,
        originEntityId,
        destinationEntityId,
        date,
        returnDate,
        market: "US",
        countryCode: "US",
        currency: "USD",
      },
    });

    return response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch flights:", error);
    return [];
  }
}

/**
 * Search airports by query string.
 */
export async function searchAirports(query: string): Promise<Place[]> {
  try {
    const response = await apiClient.get("/searchAirport", {
      params: { query },
    });

    return response.data.data.map((item: any) => ({
      skyId: item.skyId,
      entityId: item.entityId,
      title: item.presentation.title,
      suggestionTitle: item.presentation.suggestionTitle,
      subtitle: item.presentation.subtitle,
    }));
  } catch (error) {
    console.error("Failed to search airports:", error);
    return [];
  }
}
