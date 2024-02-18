import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import Routes from "./routes/AppRoutes.js";
import { connectDB } from "./db/connection.js";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";

const PORT = process.env.PORT || 5000;

// https://gopatrickstore.netlify.app
// "https://www.global.megashop.ng",
// "https://global.megashop.ng",
// "https://megashopmart.netlify.app"
// https://gopatrickstore.netlify.app

app.use(
  cors({
    origin: [
      "https://megashopmart.netlify.app",
      "https://www.megashopmart.netlify.app",
    ],
    methods: ["GET", "POST", "PUT"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization", "x-csrf-token"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    exposedHeaders: ["*", "Authorization"],
  })
);

// hello

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/ebay-search", async (req, res) => {
  try {
    const { search_term } = req.body;
    const params = {
      api_key: process.env.EBAY_SECRET_KEY,
      type: "search",
      ebay_domain: "ebay.com",
      search_term,
    };

    const response = await axios.get("https://api.countdownapi.com/request", {
      params,
    });
    res.json(response.data);

    // const data = {
    //   request_info: {
    //     success: true,
    //     credits_used: 1,
    //     credits_remaining: 999,
    //   },
    //   request_metadata: {
    //     id: "f78c211030e249334f2741f37cc7f3a884392054",
    //     created_at: "2020-01-01T00:00:00.000Z",
    //     processed_at: "2020-01-01T00:00:00.001Z",
    //     total_time_taken: 0.1,
    //     ebay_url: "https://ebay.com/sch/i.html?_nkw=memory+cards&_sacat=0",
    //   },
    //   request_parameters: {
    //     type: "search",
    //     search_term: "memory cards",
    //     ebay_domain: "ebay.com",
    //   },
    //   search_information: {
    //     did_you_mean: "memory memory",
    //     did_you_mean_results_count: 650,
    //     spelling_correction: "memory memory",
    //     original_search_term: "memory cards",
    //   },
    //   search_results: [
    //     {
    //       position: 1,
    //       title:
    //         "SanDisk Ultra 32GB 64GB 128GB 256GB Micro SD C10 SDHC SDXC Flash Memory TF Card",
    //       epid: "264141604548",
    //       link: "https://www.ebay.com/itm/SanDisk-Ultra-32GB-64GB-128GB-256GB-Micro-SD-C10-SDHC-SDXC-Flash-Memory-TF-Card/264141604548",
    //       image: "https://i.ebayimg.com/images/g/qqUAAOSw4IxixuyR/s-l960.jpg",
    //       hotness: "518+ Sold",
    //       condition: "Brand New",
    //       is_auction: false,
    //       buy_it_now: false,
    //       free_returns: false,
    //       shipping_cost: 3.99,
    //       ended: {
    //         type: "sold",
    //         date: {
    //           raw: "Aug 27, 2021",
    //         },
    //       },
    //       sponsored: true,
    //       best_offer_accepted: true,
    //       prices: [
    //         {
    //           symbol: "$",
    //           value: 7.85,
    //           currency: "USD",
    //           raw: "$7.85",
    //           name: "low",
    //         },
    //         {
    //           symbol: "$",
    //           value: 28.85,
    //           currency: "USD",
    //           raw: "$28.85",
    //           name: "high",
    //         },
    //       ],
    //       price: {
    //         symbol: "$",
    //         value: 7.85,
    //         currency: "USD",
    //         raw: "$7.85",
    //         name: "low",
    //       },
    //     },
    //     {
    //       position: 2,
    //       title:
    //         "SanDisk Micro SD Card 8GB 16GB 32GB Memory Class 4 Android Nintendo Cell Phone",
    //       epid: "264141604548",
    //       link: "https://www.ebay.com/itm/SanDisk-Ultra-32GB-64GB-128GB-256GB-Micro-SD-C10-SDHC-SDXC-Flash-Memory-TF-Card/264141604548",
    //       image: "https://i.ebayimg.com/images/g/a-4AAOSw3jtlr7Do/s-l960.jpg",
    //       hotness: "3,025+ Sold",
    //       condition: "Brand New",
    //       is_auction: false,
    //       buy_it_now: false,
    //       free_returns: true,
    //       shipping_cost: 2.5,
    //       sponsored: true,
    //       ended: {
    //         type: "sold",
    //         date: {
    //           raw: "Jan 1, 2020",
    //         },
    //       },
    //       prices: [
    //         {
    //           symbol: "$",
    //           value: 6.99,
    //           currency: "USD",
    //           raw: "$6.99",
    //           name: "low",
    //         },
    //         {
    //           symbol: "$",
    //           value: 9.99,
    //           currency: "USD",
    //           raw: "$9.99",
    //           name: "high",
    //         },
    //       ],
    //       price: {
    //         symbol: "$",
    //         value: 6.99,
    //         currency: "USD",
    //         raw: "$6.99",
    //         name: "low",
    //       },
    //     },
    //   ],
    //   facets: [
    //     {
    //       display_name: "Storage Capacity",
    //       values: [
    //         {
    //           name: "64 GB",
    //           param_value: "facets=Storage%2520Capacity=64+GB",
    //           count: 9689,
    //         },
    //         {
    //           name: "32 GB",
    //           param_value: "facets=Storage%2520Capacity=32+GB",
    //           count: 8057,
    //         },
    //         {
    //           name: "128 GB",
    //           param_value: "facets=Storage%2520Capacity=128+GB",
    //           count: 7782,
    //         },
    //         {
    //           name: "256 GB",
    //           param_value: "facets=Storage%2520Capacity=256+GB",
    //           count: 6703,
    //         },
    //         {
    //           name: "1TB",
    //           param_value: "facets=Storage%2520Capacity=1TB",
    //           count: 662,
    //         },
    //         {
    //           name: "512 GB",
    //           param_value: "facets=Storage%2520Capacity=512+GB",
    //           count: 1732,
    //         },
    //         {
    //           name: "16 GB",
    //           param_value: "facets=Storage%2520Capacity=16+GB",
    //           count: 3924,
    //         },
    //         {
    //           name: "8 GB",
    //           param_value: "facets=Storage%2520Capacity=8+GB",
    //           count: 1291,
    //         },
    //       ],
    //       name: "Storage%2520Capacity",
    //     },
    //     {
    //       display_name: "Speed Class",
    //       values: [
    //         {
    //           name: "Class 10",
    //           param_value: "facets=Speed%2520Class=Class+10",
    //           count: 31047,
    //         },
    //         {
    //           name: "Class 4",
    //           param_value: "facets=Speed%2520Class=Class+4",
    //           count: 1148,
    //         },
    //         {
    //           name: "A1",
    //           param_value: "facets=Speed%2520Class=A1",
    //           count: 1490,
    //         },
    //         {
    //           name: "UHS Speed Class 1",
    //           param_value: "facets=Speed%2520Class=UHS+Speed+Class+1",
    //           count: 1782,
    //         },
    //         {
    //           name: "Class 1",
    //           param_value: "facets=Speed%2520Class=Class+1",
    //           count: 430,
    //         },
    //         {
    //           name: "UHS Speed Class 3",
    //           param_value: "facets=Speed%2520Class=UHS+Speed+Class+3",
    //           count: 297,
    //         },
    //         {
    //           name: "Class 2",
    //           param_value: "facets=Speed%2520Class=Class+2",
    //           count: 72,
    //         },
    //         {
    //           name: "Class 6",
    //           param_value: "facets=Speed%2520Class=Class+6",
    //           count: 52,
    //         },
    //       ],
    //       name: "Speed%2520Class",
    //     },
    //     {
    //       display_name: "Brand",
    //       values: [
    //         {
    //           name: "SanDisk",
    //           param_value: "facets=Brand=SanDisk",
    //           count: 10116,
    //         },
    //         {
    //           name: "Samsung",
    //           param_value: "facets=Brand=Samsung",
    //           count: 3289,
    //         },
    //         {
    //           name: "Unbranded",
    //           param_value: "facets=Brand=Unbranded",
    //           count: 5558,
    //         },
    //         {
    //           name: "Kingston",
    //           param_value: "facets=Brand=Kingston",
    //           count: 3306,
    //         },
    //         {
    //           name: "Sony",
    //           param_value: "facets=Brand=Sony",
    //           count: 54,
    //         },
    //         {
    //           name: "Vida IT",
    //           param_value: "facets=Brand=Vida+IT",
    //           count: 2045,
    //         },
    //         {
    //           name: "PNY",
    //           param_value: "facets=Brand=PNY",
    //           count: 218,
    //         },
    //         {
    //           name: "Lexar",
    //           param_value: "facets=Brand=Lexar",
    //           count: 436,
    //         },
    //       ],
    //       name: "Brand",
    //     },
    //     {
    //       display_name: "Compatible Model",
    //       values: [
    //         {
    //           name: "Universal",
    //           param_value: "facets=Compatible%2520Model=Universal",
    //           count: 19988,
    //         },
    //         {
    //           name: "For Samsung Galaxy Note8",
    //           param_value:
    //             "facets=Compatible%2520Model=For+Samsung+Galaxy+Note8",
    //           count: 594,
    //         },
    //         {
    //           name: "For Sony Xperia Z5",
    //           param_value: "facets=Compatible%2520Model=For+Sony+Xperia+Z5",
    //           count: 428,
    //         },
    //         {
    //           name: "For HTC One M8",
    //           param_value: "facets=Compatible%2520Model=For+HTC+One+M8",
    //           count: 426,
    //         },
    //         {
    //           name: "For Sony Xperia Z",
    //           param_value: "facets=Compatible%2520Model=For+Sony+Xperia+Z",
    //           count: 397,
    //         },
    //         {
    //           name: "For Samsung Galaxy Note",
    //           param_value:
    //             "facets=Compatible%2520Model=For+Samsung+Galaxy+Note",
    //           count: 343,
    //         },
    //         {
    //           name: "For Alcatel Fierce XL",
    //           param_value: "facets=Compatible%2520Model=For+Alcatel+Fierce+XL",
    //           count: 332,
    //         },
    //         {
    //           name: "For HTC One",
    //           param_value: "facets=Compatible%2520Model=For+HTC+One",
    //           count: 328,
    //         },
    //       ],
    //       name: "Compatible%2520Model",
    //     },
    //     {
    //       display_name: "Format",
    //       values: [
    //         {
    //           name: "microSDXC",
    //           param_value: "facets=Format=microSDXC",
    //           count: 4461,
    //         },
    //         {
    //           name: "MicroSD",
    //           param_value: "facets=Format=MicroSD",
    //           count: 21155,
    //         },
    //         {
    //           name: "SD",
    //           param_value: "facets=Format=SD",
    //           count: 1141,
    //         },
    //         {
    //           name: "MicroSDHC",
    //           param_value: "facets=Format=MicroSDHC",
    //           count: 5859,
    //         },
    //         {
    //           name: "TF",
    //           param_value: "facets=Format=TF",
    //           count: 711,
    //         },
    //         {
    //           name: "microSDXC UHS-I",
    //           param_value: "facets=Format=microSDXC+UHS-I",
    //           count: 2290,
    //         },
    //         {
    //           name: "SDXC",
    //           param_value: "facets=Format=SDXC",
    //           count: 953,
    //         },
    //         {
    //           name: "SDHC",
    //           param_value: "facets=Format=SDHC",
    //           count: 851,
    //         },
    //       ],
    //       name: "Format",
    //     },
    //     {
    //       display_name: "Features",
    //       values: [
    //         {
    //           name: "High Speed",
    //           param_value: "facets=Features=High+Speed",
    //           count: 30844,
    //         },
    //         {
    //           name: "High Capacity",
    //           param_value: "facets=Features=High+Capacity",
    //           count: 21407,
    //         },
    //         {
    //           name: "Waterproof",
    //           param_value: "facets=Features=Waterproof",
    //           count: 16113,
    //         },
    //         {
    //           name: "Wi-Fi",
    //           param_value: "facets=Features=Wi-Fi",
    //           count: 4209,
    //         },
    //         {
    //           name: "Not Specified",
    //           param_value: "facets=Features=Not+Specified",
    //           count: 11813,
    //         },
    //       ],
    //       name: "Features",
    //     },
    //     {
    //       display_name: "Compatible Brand",
    //       values: [
    //         {
    //           name: "Universal",
    //           param_value: "facets=Compatible%2520Brand=Universal",
    //           count: 22478,
    //         },
    //         {
    //           name: "For Samsung",
    //           param_value: "facets=Compatible%2520Brand=For+Samsung",
    //           count: 5537,
    //         },
    //         {
    //           name: "For Sony",
    //           param_value: "facets=Compatible%2520Brand=For+Sony",
    //           count: 2653,
    //         },
    //         {
    //           name: "For LG",
    //           param_value: "facets=Compatible%2520Brand=For+LG",
    //           count: 2534,
    //         },
    //         {
    //           name: "For Huawei",
    //           param_value: "facets=Compatible%2520Brand=For+Huawei",
    //           count: 1913,
    //         },
    //         {
    //           name: "For Amazon",
    //           param_value: "facets=Compatible%2520Brand=For+Amazon",
    //           count: 1887,
    //         },
    //         {
    //           name: "For Motorola",
    //           param_value: "facets=Compatible%2520Brand=For+Motorola",
    //           count: 1836,
    //         },
    //         {
    //           name: "For Nokia",
    //           param_value: "facets=Compatible%2520Brand=For+Nokia",
    //           count: 1665,
    //         },
    //       ],
    //       name: "Compatible%2520Brand",
    //     },
    //     {
    //       display_name: "Manufacturer Warranty",
    //       values: [
    //         {
    //           name: "3 Months",
    //           param_value: "facets=Manufacturer%2520Warranty=3+Months",
    //           count: 9601,
    //         },
    //         {
    //           name: "Lifetime",
    //           param_value: "facets=Manufacturer%2520Warranty=Lifetime",
    //           count: 2785,
    //         },
    //         {
    //           name: "Yes",
    //           param_value: "facets=Manufacturer%2520Warranty=Yes",
    //           count: 1048,
    //         },
    //         {
    //           name: "1 Month",
    //           param_value: "facets=Manufacturer%2520Warranty=1+Month",
    //           count: 986,
    //         },
    //         {
    //           name: "10 Years",
    //           param_value: "facets=Manufacturer%2520Warranty=10+Years",
    //           count: 517,
    //         },
    //         {
    //           name: "1 Year",
    //           param_value: "facets=Manufacturer%2520Warranty=1+Year",
    //           count: 364,
    //         },
    //         {
    //           name: "5 Years",
    //           param_value: "facets=Manufacturer%2520Warranty=5+Years",
    //           count: 288,
    //         },
    //         {
    //           name: "No",
    //           param_value: "facets=Manufacturer%2520Warranty=No",
    //           count: 144,
    //         },
    //       ],
    //       name: "Manufacturer%2520Warranty",
    //     },
    //     {
    //       display_name: "Country/Region of Manufacture",
    //       values: [
    //         {
    //           name: "United States",
    //           param_value:
    //             "facets=Country%252FRegion%2520of%2520Manufacture=United+States",
    //           count: 9168,
    //         },
    //         {
    //           name: "China",
    //           param_value:
    //             "facets=Country%252FRegion%2520of%2520Manufacture=China",
    //           count: 2473,
    //         },
    //         {
    //           name: "Taiwan",
    //           param_value:
    //             "facets=Country%252FRegion%2520of%2520Manufacture=Taiwan",
    //           count: 2327,
    //         },
    //         {
    //           name: "Unknown",
    //           param_value:
    //             "facets=Country%252FRegion%2520of%2520Manufacture=Unknown",
    //           count: 208,
    //         },
    //         {
    //           name: "Malaysia",
    //           param_value:
    //             "facets=Country%252FRegion%2520of%2520Manufacture=Malaysia",
    //           count: 150,
    //         },
    //         {
    //           name: "Philippines",
    //           param_value:
    //             "facets=Country%252FRegion%2520of%2520Manufacture=Philippines",
    //           count: 131,
    //         },
    //         {
    //           name: "Korea, Republic of",
    //           param_value:
    //             "facets=Country%252FRegion%2520of%2520Manufacture=Korea,+Republic+of",
    //           count: 80,
    //         },
    //         {
    //           name: "Japan",
    //           param_value:
    //             "facets=Country%252FRegion%2520of%2520Manufacture=Japan",
    //           count: 61,
    //         },
    //       ],
    //       name: "Country%252FRegion%2520of%2520Manufacture",
    //     },
    //     {
    //       display_name: "Condition",
    //       values: [],
    //     },
    //     {
    //       display_name: "Price",
    //       values: [],
    //     },
    //     {
    //       display_name: "Buying Format",
    //       values: [],
    //     },
    //     {
    //       display_name: "Item Location",
    //       values: [
    //         {
    //           name: "Default",
    //           param_value: "facets=LH_PrefLoc=Default",
    //         },
    //         {
    //           name: "US Only",
    //           param_value: "facets=LH_PrefLoc=US+Only",
    //         },
    //         {
    //           name: "North America",
    //           param_value: "facets=LH_PrefLoc=North+America",
    //         },
    //         {
    //           name: "Worldwide",
    //           param_value: "facets=LH_PrefLoc=Worldwide",
    //         },
    //       ],
    //       name: "LH_PrefLoc",
    //     },
    //     {
    //       display_name: "Shipping Options",
    //       values: [
    //         {
    //           name: "Free Shipping",
    //           param_value: "facets=LH_FS=Free+Shipping",
    //         },
    //       ],
    //       name: "LH_FS",
    //     },
    //     {
    //       display_name: "Local Pickup",
    //       values: [
    //         {
    //           name: "Free In-store Pickup",
    //           param_value: "facets=LH_BOPIS=Free+In-store+Pickup",
    //         },
    //         {
    //           name: "Free Local Pickup",
    //           param_value: "facets=LH_BOPIS=Free+Local+Pickup",
    //         },
    //         {
    //           name: "Zip code",
    //           param_value: "facets=LH_BOPIS=Zip+code",
    //         },
    //       ],
    //       name: "LH_BOPIS",
    //     },
    //     {
    //       display_name: "Show only",
    //       values: [
    //         {
    //           name: "Free Returns",
    //           param_value: "facets=LH_FR=Free+Returns",
    //         },
    //         {
    //           name: "Returns Accepted",
    //           param_value: "facets=LH_FR=Returns+Accepted",
    //         },
    //         {
    //           name: "Authorized Seller",
    //           param_value: "facets=LH_FR=Authorized+Seller",
    //         },
    //         {
    //           name: "Completed Items",
    //           param_value: "facets=LH_FR=Completed+Items",
    //         },
    //         {
    //           name: "Sold Items",
    //           param_value: "facets=LH_FR=Sold+Items",
    //         },
    //         {
    //           name: "Deals & Savings",
    //           param_value: "facets=LH_FR=Deals+&+Savings",
    //         },
    //         {
    //           name: "Authenticity Guarantee",
    //           param_value: "facets=LH_FR=Authenticity+Guarantee",
    //         },
    //       ],
    //       name: "LH_FR",
    //     },
    //   ],
    //   pagination: {
    //     current_page: 1,
    //     total_results: "9893",
    //     has_next_page: true,
    //     next_page: 2,
    //   },
    // };
    // res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/amazon-search", async (req, res) => {
  try {
    const { search_term } = req.body;
    const params = {
      api_key: process.env.AMAZON_SECRET_KEY,
      type: "search",
      amazon_domain: "amazon.com",
      search_term,
    };

    const response = await axios.get("https://api.rainforestapi.com/request", {
      params,
    });
    res.json(response.data);

    // const data = {
    //   request_info: {
    //     success: true,
    //     credits_used: 1,
    //     credits_remaining: 999,
    //   },
    //   request_metadata: {
    //     id: "130fc2e6a878ee40070c093a678b135b4a3eee7b",
    //     created_at: "2020-01-01T00:00:00.000Z",
    //     processed_at: "2020-01-01T00:00:00.001Z",
    //     total_time_taken: 0.1,
    //     amazon_url: "https://amazon.com/s/?k=memory+cards",
    //   },
    //   request_parameters: {
    //     amazon_domain: "amazon.com",
    //     search_term: "memory cards",
    //     sort_by: "price_high_to_low",
    //     type: "search",
    //   },
    //   search_results: [
    //     {
    //       position: 1,
    //       title:
    //         "SanDisk Ultra 32GB Class 10 SDHC UHS-I Memory Card up to 80MB/s (SDSDUNC-032G-GN6IN)",
    //       asin: "B0143RT8OY",
    //       link: "https://amazon.com/dp/B0143RT8OY",
    //       image:
    //         "https://m.media-amazon.com/images/I/61RLNh5Af2L._AC_UY218_ML3_.jpg",
    //       is_prime: true,
    //       rating: 4.6,
    //       ratings_total: 18355,
    //       sponsored: false,
    //       availability: {
    //         raw: "In stock on April 3, 2020.",
    //       },
    //       categories: [
    //         {
    //           name: "Memory Cards",
    //         },
    //       ],
    //       is_small_business: true,
    //       is_amazon_brand: true,
    //       is_exclusive_to_amazon: true,
    //       climate_pledge_friendly: {
    //         text: "Compact by Design (Certified by Amazon)",
    //         image:
    //           "https://m.media-amazon.com/images/I/41Y2L-DZWfL._SS160_.png",
    //         link: "https://www.amazon.co.uk/Colgate-White-Seductive-Mint-Toothpaste/dp/B073V1M851/ref=cpf_sp_dsk_srpo_cfar?keywords=toothpaste+colgate+max+white+sparkle&qid=1645121822&sr=8-3#climatePledgeFriendly",
    //       },
    //       prices: [
    //         {
    //           symbol: "$",
    //           value: 13.99,
    //           currency: "USD",
    //           raw: "$13.99",
    //           name: "Kindle",
    //         },
    //         {
    //           symbol: "$",
    //           value: 18.99,
    //           currency: "USD",
    //           raw: "$16.99",
    //           name: "Hardcover",
    //         },
    //         {
    //           symbol: "$",
    //           value: 0,
    //           currency: "USD",
    //           raw: "$0.00",
    //           name: "Audible Audiobook",
    //         },
    //       ],
    //       price: {
    //         symbol: "$",
    //         value: 18.99,
    //         currency: "USD",
    //         raw: "$13.99",
    //       },
    //       delivery: {
    //         tagline: "Get it as soon as Sat, Oct 3",
    //         price: {
    //           symbol: "$",
    //           currency: "USD",
    //           value: 0,
    //           raw: "FREE Shipping by Amazon",
    //           is_free: true,
    //         },
    //       },
    //     },
    //     {
    //       position: 2,
    //       title:
    //         "Samsung 128GB 100MB/s (U3) MicroSDXC EVO Select Memory Card with Full-Size Adapter (MB-ME128GA/AM)",
    //       asin: "B073JYC4XM",
    //       link: "https://amazon.com/dp/B073JYC4XM",
    //       image:
    //         "https://m.media-amazon.com/images/I/817wkPGulTL._AC_UY218_ML3_.jpg",
    //       is_prime: true,
    //       rating: 4.7,
    //       ratings_total: 44526,
    //       sponsored: false,
    //       availability: {
    //         raw: "In stock on April 3, 2020.",
    //       },
    //       categories: [
    //         {
    //           name: "Memory Cards",
    //         },
    //       ],
    //       prices: [
    //         {
    //           symbol: "$",
    //           value: 13.99,
    //           currency: "USD",
    //           raw: "$13.99",
    //           name: "Kindle",
    //         },
    //         {
    //           symbol: "$",
    //           value: 16.99,
    //           currency: "USD",
    //           raw: "$16.99",
    //           name: "Hardcover",
    //         },
    //         {
    //           symbol: "$",
    //           value: 0,
    //           currency: "USD",
    //           raw: "$0.00",
    //           name: "Audible Audiobook",
    //         },
    //       ],
    //       price: {
    //         symbol: "$",
    //         value: 13.99,
    //         currency: "USD",
    //         raw: "$13.99",
    //       },
    //       delivery: {
    //         tagline: "Get it as soon as Sat, Oct 3",
    //         price: {
    //           symbol: "$",
    //           currency: "USD",
    //           value: 0,
    //           raw: "FREE Shipping by Amazon",
    //           is_free: true,
    //         },
    //       },
    //     },
    //     {
    //       position: 3,
    //       title:
    //         "SanDisk 64GB Extreme PRO SDXC UHS-I Card - C10, U3, V30, 4K UHD, SD Card - SDSDXXY-064G-GN4IN",
    //       asin: "B07H9J1YXN",
    //       link: "https://amazon.com/dp/B07H9J1YXN",
    //       image:
    //         "https://m.media-amazon.com/images/I/61GzuP0aGcL._AC_UY218_ML3_.jpg",
    //       is_prime: true,
    //       rating: 4.6,
    //       ratings_total: 6038,
    //       sponsored: false,
    //       availability: {
    //         raw: "In stock on April 3, 2020.",
    //       },
    //       categories: [
    //         {
    //           name: "Memory Cards",
    //         },
    //       ],
    //       prices: [
    //         {
    //           symbol: "$",
    //           value: 13.99,
    //           currency: "USD",
    //           raw: "$13.99",
    //           name: "Kindle",
    //         },
    //         {
    //           symbol: "$",
    //           value: 16.99,
    //           currency: "USD",
    //           raw: "$16.99",
    //           name: "Hardcover",
    //         },
    //         {
    //           symbol: "$",
    //           value: 0,
    //           currency: "USD",
    //           raw: "$0.00",
    //           name: "Audible Audiobook",
    //         },
    //       ],
    //       price: {
    //         symbol: "$",
    //         value: 13.99,
    //         currency: "USD",
    //         raw: "$13.99",
    //       },
    //       delivery: {
    //         tagline: "Get it as soon as Sat, Oct 3",
    //         price: {
    //           symbol: "$",
    //           currency: "USD",
    //           value: 0,
    //           raw: "FREE Shipping by Amazon",
    //           is_free: true,
    //         },
    //       },
    //     },
    //     {
    //       position: 4,
    //       title:
    //         "SanDisk 128GB Extreme SDXC UHS-I Card - C10, U3, V30, 4K UHD, SD Card - SDSDXV5-128G-GNCIN",
    //       asin: "B07H48412Q",
    //       link: "https://amazon.com/dp/B07H48412Q",
    //       image:
    //         "https://m.media-amazon.com/images/I/81canjh+sTL._AC_UY218_ML3_.jpg",
    //       is_prime: true,
    //       rating: 4.7,
    //       ratings_total: 3769,
    //       sponsored: false,
    //       availability: {
    //         raw: "In stock on April 3, 2020.",
    //       },
    //       categories: [
    //         {
    //           name: "Memory Cards",
    //         },
    //       ],
    //       prices: [
    //         {
    //           symbol: "$",
    //           value: 13.99,
    //           currency: "USD",
    //           raw: "$13.99",
    //           name: "Kindle",
    //         },
    //         {
    //           symbol: "$",
    //           value: 16.99,
    //           currency: "USD",
    //           raw: "$16.99",
    //           name: "Hardcover",
    //         },
    //         {
    //           symbol: "$",
    //           value: 0,
    //           currency: "USD",
    //           raw: "$0.00",
    //           name: "Audible Audiobook",
    //         },
    //       ],
    //       price: {
    //         symbol: "$",
    //         value: 13.99,
    //         currency: "USD",
    //         raw: "$13.99",
    //       },
    //       delivery: {
    //         tagline: "Get it as soon as Sat, Oct 3",
    //         price: {
    //           symbol: "$",
    //           currency: "USD",
    //           value: 0,
    //           raw: "FREE Shipping by Amazon",
    //           is_free: true,
    //         },
    //       },
    //     },
    //   ],
    //   related_searches: [
    //     {
    //       query: "memory cards for kids",
    //       link: "https://www.amazon.com/s/?k=memory+cards+for+kids&ref=sugsr_0_2&pd_rd_w=Vdd01&pf_rd_p=4fa0e97a-13a4-491b-a127-133a554b4da3&pf_rd_r=V7NFB34RSES2YFKA91YF&pd_rd_r=8ad14735-cf1c-48fc-b8be-6fbdd274568c&pd_rd_wg=9p2VA&qid=1621229221",
    //     },
    //     {
    //       query: "memory cards for funeral",
    //       link: "https://www.amazon.com/s/?k=memory+cards+for+funeral&ref=sugsr_3_1&pd_rd_w=Vdd01&pf_rd_p=4fa0e97a-13a4-491b-a127-133a554b4da3&pf_rd_r=V7NFB34RSES2YFKA91YF&pd_rd_r=8ad14735-cf1c-48fc-b8be-6fbdd274568c&pd_rd_wg=9p2VA&qid=1621229221",
    //     },
    //     {
    //       query: "computer input devices",
    //       link: "https://www.amazon.com/s/?k=computer+input+devices&ref=sugsr_1_2&pd_rd_w=Vdd01&pf_rd_p=4fa0e97a-13a4-491b-a127-133a554b4da3&pf_rd_r=V7NFB34RSES2YFKA91YF&pd_rd_r=8ad14735-cf1c-48fc-b8be-6fbdd274568c&pd_rd_wg=9p2VA&qid=1621229221",
    //     },
    //     {
    //       query: "usb gadgets",
    //       link: "https://www.amazon.com/s/?k=usb+gadgets&ref=sugsr_4_1&pd_rd_w=Vdd01&pf_rd_p=4fa0e97a-13a4-491b-a127-133a554b4da3&pf_rd_r=V7NFB34RSES2YFKA91YF&pd_rd_r=8ad14735-cf1c-48fc-b8be-6fbdd274568c&pd_rd_wg=9p2VA&qid=1621229221",
    //     },
    //     {
    //       query: "micro sd memory card",
    //       link: "https://www.amazon.com/s/?k=micro+sd+memory+card&ref=sugsr_2_1&pd_rd_w=Vdd01&pf_rd_p=4fa0e97a-13a4-491b-a127-133a554b4da3&pf_rd_r=V7NFB34RSES2YFKA91YF&pd_rd_r=8ad14735-cf1c-48fc-b8be-6fbdd274568c&pd_rd_wg=9p2VA&qid=1621229221",
    //     },
    //     {
    //       query: "memory card for phone",
    //       link: "https://www.amazon.com/s/?k=memory+card+for+phone&ref=sugsr_5_1&pd_rd_w=Vdd01&pf_rd_p=4fa0e97a-13a4-491b-a127-133a554b4da3&pf_rd_r=V7NFB34RSES2YFKA91YF&pd_rd_r=8ad14735-cf1c-48fc-b8be-6fbdd274568c&pd_rd_wg=9p2VA&qid=1621229221",
    //     },
    //   ],
    //   pagination: {
    //     total_results: 200000,
    //     current_page: 1,
    //     total_pages: 20,
    //   },
    //   refinements: {
    //     prime: [
    //       {
    //         name: "Prime Eligible",
    //         value: "p_85/2470955011",
    //       },
    //     ],
    //     delivery: [
    //       {
    //         name: "Free Shipping by Amazon",
    //         value: "p_76/1249137011",
    //       },
    //     ],
    //     departments: [
    //       {
    //         name: "Computers & Tablets",
    //         value: "n/13896617011",
    //       },
    //       {
    //         name: "Traditional Laptop Computers",
    //         value: "n/13896615011",
    //       },
    //       {
    //         name: "2 in 1 Laptop Computers",
    //         value: "n/13896609011",
    //       },
    //       {
    //         name: "Electronics",
    //         value: "n/172282",
    //       },
    //       {
    //         name: "Cell Phones & Accessories",
    //         value: "n/2335752011",
    //       },
    //       {
    //         name: "Home & Business Services",
    //         value: "n/8098158011",
    //       },
    //     ],
    //     price: [
    //       {
    //         name: "Under $500",
    //         value: "p_36/2421886011",
    //       },
    //       {
    //         name: "$500 to $600",
    //         value: "p_36/2421887011",
    //       },
    //       {
    //         name: "$600 to $700",
    //         value: "p_36/2421888011",
    //       },
    //       {
    //         name: "$700 to $800",
    //         value: "p_36/2421889011",
    //       },
    //       {
    //         name: "$800 to $1000",
    //         value: "p_36/2421890011",
    //       },
    //       {
    //         name: "$1000 & Above",
    //         value: "p_36/2421891011",
    //       },
    //     ],
    //     computer_operating_system: [
    //       {
    //         name: "Windows",
    //         value: "p_n_operating_system_browse-bin/17702486011",
    //       },
    //       {
    //         name: "Chrome OS",
    //         value: "p_n_operating_system_browse-bin/6401981011",
    //       },
    //     ],
    //     computer_activity_type: [
    //       {
    //         name: "Gaming",
    //         value: "p_n_intended_use_browse-bin/9647497011",
    //       },
    //       {
    //         name: "Business",
    //         value: "p_n_intended_use_browse-bin/9647498011",
    //       },
    //       {
    //         name: "Personal",
    //         value: "p_n_intended_use_browse-bin/9647499011",
    //       },
    //     ],
    //     laptop_display_size: [
    //       {
    //         name: "17 Inches & Above",
    //         value: "p_n_size_browse-bin/7817234011",
    //       },
    //       {
    //         name: "16 to 16.9 Inches",
    //         value: "p_n_size_browse-bin/2242801011",
    //       },
    //       {
    //         name: "15 to 15.9 Inches",
    //         value: "p_n_size_browse-bin/2423841011",
    //       },
    //       {
    //         name: "14 to 14.9 Inches",
    //         value: "p_n_size_browse-bin/2423840011",
    //       },
    //       {
    //         name: "13 to 13.9 Inches",
    //         value: "p_n_size_browse-bin/3545275011",
    //       },
    //       {
    //         name: "12 to 12.9 Inches",
    //         value: "p_n_size_browse-bin/13580784011",
    //       },
    //       {
    //         name: "11 to 11.9 Inches",
    //         value: "p_n_size_browse-bin/13580785011",
    //       },
    //       {
    //         name: "11 Inches & Under",
    //         value: "p_n_size_browse-bin/13580786011",
    //       },
    //     ],
    //     laptop_display: [
    //       {
    //         name: "Backlit",
    //         value: "p_n_feature_keywords_five_browse-bin/8105772011",
    //       },
    //       {
    //         name: "LCD",
    //         value: "p_n_feature_keywords_five_browse-bin/8080216011",
    //       },
    //       {
    //         name: "LED",
    //         value: "p_n_feature_keywords_five_browse-bin/8105774011",
    //       },
    //       {
    //         name: "Multi-Touch",
    //         value: "p_n_feature_keywords_five_browse-bin/8080212011",
    //       },
    //       {
    //         name: "Touchscreen Enabled",
    //         value: "p_n_feature_keywords_five_browse-bin/8080213011",
    //       },
    //     ],
    //     computer_processor_type: [
    //       {
    //         name: "AMD A-Series",
    //         value: "p_n_feature_four_browse-bin/3081486011",
    //       },
    //       {
    //         name: "AMD A4",
    //         value: "p_n_feature_four_browse-bin/9697947011",
    //       },
    //       {
    //         name: "AMD A6",
    //         value: "p_n_feature_four_browse-bin/9697948011",
    //       },
    //       {
    //         name: "AMD A8",
    //         value: "p_n_feature_four_browse-bin/9697949011",
    //       },
    //       {
    //         name: "AMD Athlon",
    //         value: "p_n_feature_four_browse-bin/1264728011",
    //       },
    //       {
    //         name: "AMD E-Series",
    //         value: "p_n_feature_four_browse-bin/2676750011",
    //       },
    //       {
    //         name: "AMD FX",
    //         value: "p_n_feature_four_browse-bin/6789588011",
    //       },
    //       {
    //         name: "AMD Ryzen 3",
    //         value: "p_n_feature_four_browse-bin/18107800011",
    //       },
    //       {
    //         name: "AMD Ryzen 5",
    //         value: "p_n_feature_four_browse-bin/18107801011",
    //       },
    //       {
    //         name: "AMD Ryzen 7",
    //         value: "p_n_feature_four_browse-bin/18107802011",
    //       },
    //       {
    //         name: "AMD Sempron",
    //         value: "p_n_feature_four_browse-bin/1264727011",
    //       },
    //       {
    //         name: "AMD Turion",
    //         value: "p_n_feature_four_browse-bin/1264729011",
    //       },
    //       {
    //         name: "Intel Atom",
    //         value: "p_n_feature_four_browse-bin/2444556011",
    //       },
    //       {
    //         name: "Intel Celeron",
    //         value: "p_n_feature_four_browse-bin/1264444011",
    //       },
    //       {
    //         name: "Intel Core 2 Duo",
    //         value: "p_n_feature_four_browse-bin/18107804011",
    //       },
    //       {
    //         name: "Intel Core 2 Quad",
    //         value: "p_n_feature_four_browse-bin/18107805011",
    //       },
    //       {
    //         name: "Intel Core M",
    //         value: "p_n_feature_four_browse-bin/18107806011",
    //       },
    //       {
    //         name: "Intel Core i3",
    //         value: "p_n_feature_four_browse-bin/2289794011",
    //       },
    //       {
    //         name: "Intel Core i5",
    //         value: "p_n_feature_four_browse-bin/2289793011",
    //       },
    //       {
    //         name: "Intel Core i7",
    //         value: "p_n_feature_four_browse-bin/2289792011",
    //       },
    //       {
    //         name: "Intel Core i9",
    //         value: "p_n_feature_four_browse-bin/17927742011",
    //       },
    //       {
    //         name: "Intel Pentium",
    //         value: "p_n_feature_four_browse-bin/1264420011",
    //       },
    //       {
    //         name: "Intel Xeon",
    //         value: "p_n_feature_four_browse-bin/1264445011",
    //       },
    //     ],
    //     computer_ram_capacity: [
    //       {
    //         name: "64 GB & Above",
    //         value: "p_n_feature_five_browse-bin/13580787011",
    //       },
    //       {
    //         name: "32 GB",
    //         value: "p_n_feature_five_browse-bin/13580788011",
    //       },
    //       {
    //         name: "24 GB",
    //         value: "p_n_feature_five_browse-bin/13580789011",
    //       },
    //       {
    //         name: "16 GB",
    //         value: "p_n_feature_five_browse-bin/13580790011",
    //       },
    //       {
    //         name: "12 GB",
    //         value: "p_n_feature_five_browse-bin/13580791011",
    //       },
    //       {
    //         name: "8 GB",
    //         value: "p_n_feature_five_browse-bin/7817224011",
    //       },
    //       {
    //         name: "6 GB",
    //         value: "p_n_feature_five_browse-bin/7817223011",
    //       },
    //       {
    //         name: "4 GB",
    //         value: "p_n_feature_five_browse-bin/7817222011",
    //       },
    //       {
    //         name: "3 GB",
    //         value: "p_n_feature_five_browse-bin/13580792011",
    //       },
    //       {
    //         name: "2 GB",
    //         value: "p_n_feature_five_browse-bin/13580793011",
    //       },
    //       {
    //         name: "Up to 2 GB",
    //         value: "p_n_feature_five_browse-bin/13580794011",
    //       },
    //     ],
    //     number_of_cpu_cores: [
    //       {
    //         name: "Single Core",
    //         value: "p_n_feature_fourteen_browse-bin/2057439011",
    //       },
    //       {
    //         name: "Dual Core",
    //         value: "p_n_feature_fourteen_browse-bin/2057440011",
    //       },
    //       {
    //         name: "Quad Core",
    //         value: "p_n_feature_fourteen_browse-bin/2057441011",
    //       },
    //     ],
    //     hard_disk_size: [
    //       {
    //         name: "4 TB & Above",
    //         value: "p_n_feature_two_browse-bin/5446816011",
    //       },
    //       {
    //         name: "3 TB",
    //         value: "p_n_feature_two_browse-bin/5446815011",
    //       },
    //       {
    //         name: "2 TB",
    //         value: "p_n_feature_two_browse-bin/7817230011",
    //       },
    //       {
    //         name: "1.5 TB",
    //         value: "p_n_feature_two_browse-bin/5446813011",
    //       },
    //       {
    //         name: "1 TB",
    //         value: "p_n_feature_two_browse-bin/5446812011",
    //       },
    //       {
    //         name: "501 to 999 GB",
    //         value: "p_n_feature_two_browse-bin/562241011",
    //       },
    //       {
    //         name: "321 to 500 GB",
    //         value: "p_n_feature_two_browse-bin/562240011",
    //       },
    //       {
    //         name: "121 to 320 GB",
    //         value: "p_n_feature_two_browse-bin/610553011",
    //       },
    //       {
    //         name: "81 to 120 GB",
    //         value: "p_n_feature_two_browse-bin/562237011",
    //       },
    //       {
    //         name: "Up to 80 GB",
    //         value: "p_n_feature_two_browse-bin/610552011",
    //       },
    //     ],
    //     laptop_computer_weight: [
    //       {
    //         name: "Up to 3 Pounds",
    //         value: "p_n_feature_eleven_browse-bin/9521903011",
    //       },
    //       {
    //         name: "3 to 3.9 Pounds",
    //         value: "p_n_feature_eleven_browse-bin/13580795011",
    //       },
    //       {
    //         name: "4 to 4.9 Pounds",
    //         value: "p_n_feature_eleven_browse-bin/13580796011",
    //       },
    //       {
    //         name: "5 to 5.9 Pounds",
    //         value: "p_n_feature_eleven_browse-bin/13580797011",
    //       },
    //       {
    //         name: "6 to 6.9 Pounds",
    //         value: "p_n_feature_eleven_browse-bin/13580798011",
    //       },
    //       {
    //         name: "7 to 7.9 Pounds",
    //         value: "p_n_feature_eleven_browse-bin/13580799011",
    //       },
    //       {
    //         name: "8 Pounds & Above",
    //         value: "p_n_feature_eleven_browse-bin/9521906011",
    //       },
    //     ],
    //     laptop_hard_drive_type: [
    //       {
    //         name: "Solid State Drive",
    //         value: "p_n_feature_twelve_browse-bin/9521908011",
    //       },
    //       {
    //         name: "Mechanical Hard Drive",
    //         value: "p_n_feature_twelve_browse-bin/9521909011",
    //       },
    //       {
    //         name: "Hybrid Drive",
    //         value: "p_n_feature_twelve_browse-bin/9521910011",
    //       },
    //     ],
    //     number_of_laptop_usb_30_ports: [
    //       {
    //         name: "5 or More",
    //         value: "p_n_feature_thirteen_browse-bin/9521917011",
    //       },
    //       {
    //         name: "4",
    //         value: "p_n_feature_thirteen_browse-bin/9521916011",
    //       },
    //       {
    //         name: "3",
    //         value: "p_n_feature_thirteen_browse-bin/9521915011",
    //       },
    //       {
    //         name: "2",
    //         value: "p_n_feature_thirteen_browse-bin/9521914011",
    //       },
    //       {
    //         name: "1",
    //         value: "p_n_feature_thirteen_browse-bin/9521913011",
    //       },
    //       {
    //         name: "None",
    //         value: "p_n_feature_thirteen_browse-bin/9521912011",
    //       },
    //     ],
    //     laptop_wlan: [
    //       {
    //         name: "802.11a/b/g/n",
    //         value: "p_n_feature_fifteen_browse-bin/9521924011",
    //       },
    //       {
    //         name: "802.11ac",
    //         value: "p_n_feature_fifteen_browse-bin/9521925011",
    //       },
    //       {
    //         name: "802.11b/g/n",
    //         value: "p_n_feature_fifteen_browse-bin/9521923011",
    //       },
    //     ],
    //     laptop_computer_video_output: [
    //       {
    //         name: "DisplayPort",
    //         value: "p_n_feature_seventeen_browse-bin/9521937011",
    //       },
    //       {
    //         name: "DVI",
    //         value: "p_n_feature_seventeen_browse-bin/9521933011",
    //       },
    //       {
    //         name: "HDMI",
    //         value: "p_n_feature_seventeen_browse-bin/9521936011",
    //       },
    //       {
    //         name: "Micro-DVI",
    //         value: "p_n_feature_seventeen_browse-bin/9521935011",
    //       },
    //       {
    //         name: "Mini-DisplayPort",
    //         value: "p_n_feature_seventeen_browse-bin/9521938011",
    //       },
    //       {
    //         name: "Mini-DVI",
    //         value: "p_n_feature_seventeen_browse-bin/9521934011",
    //       },
    //       {
    //         name: "Mini-VGA",
    //         value: "p_n_feature_seventeen_browse-bin/9521932011",
    //       },
    //       {
    //         name: "VGA",
    //         value: "p_n_feature_seventeen_browse-bin/9521931011",
    //       },
    //     ],
    //     computer_graphics_card_type: [
    //       {
    //         name: "Dedicated",
    //         value: "p_n_graphics_type_browse-bin/14292273011",
    //       },
    //       {
    //         name: "Integrated",
    //         value: "p_n_graphics_type_browse-bin/14292274011",
    //       },
    //     ],
    //     computer_graphics_processor: [
    //       {
    //         name: "AMD FirePro",
    //         value: "p_n_feature_seven_browse-bin/9659357011",
    //       },
    //       {
    //         name: "AMD Radeon HD",
    //         value: "p_n_feature_seven_browse-bin/18107807011",
    //       },
    //       {
    //         name: "AMD Radeon Pro",
    //         value: "p_n_feature_seven_browse-bin/18107808011",
    //       },
    //       {
    //         name: "AMD Radeon R5",
    //         value: "p_n_feature_seven_browse-bin/18107809011",
    //       },
    //       {
    //         name: "AMD Radeon R7",
    //         value: "p_n_feature_seven_browse-bin/18107810011",
    //       },
    //       {
    //         name: "AMD Radeon RX 400",
    //         value: "p_n_feature_seven_browse-bin/18107812011",
    //       },
    //       {
    //         name: "AMD Radeon RX 500",
    //         value: "p_n_feature_seven_browse-bin/18107813011",
    //       },
    //       {
    //         name: "AMD Radeon RX Vega",
    //         value: "p_n_feature_seven_browse-bin/18107814011",
    //       },
    //       {
    //         name: "Intel HD Graphics",
    //         value: "p_n_feature_seven_browse-bin/18107815011",
    //       },
    //       {
    //         name: "Intel Iris Graphics",
    //         value: "p_n_feature_seven_browse-bin/18107816011",
    //       },
    //       {
    //         name: "Intel Iris Plus Graphics",
    //         value: "p_n_feature_seven_browse-bin/18107817011",
    //       },
    //       {
    //         name: "Intel UHD Graphics",
    //         value: "p_n_feature_seven_browse-bin/18107819011",
    //       },
    //       {
    //         name: "NVIDIA GeForce",
    //         value: "p_n_feature_seven_browse-bin/3012497011",
    //       },
    //       {
    //         name: "NVIDIA GeForce GT",
    //         value: "p_n_feature_seven_browse-bin/18107820011",
    //       },
    //       {
    //         name: "NVIDIA GeForce GTX",
    //         value: "p_n_feature_seven_browse-bin/18107821011",
    //       },
    //       {
    //         name: "NVIDIA GeForce RTX",
    //         value: "p_n_feature_seven_browse-bin/18107822011",
    //       },
    //       {
    //         name: "NVIDIA Quadro FX",
    //         value: "p_n_feature_seven_browse-bin/18107823011",
    //       },
    //       {
    //         name: "NVIDIA Quadro K",
    //         value: "p_n_feature_seven_browse-bin/18107824011",
    //       },
    //       {
    //         name: "NVIDIA Quadro M",
    //         value: "p_n_feature_seven_browse-bin/18107825011",
    //       },
    //       {
    //         name: "NVIDIA Quadro NVS",
    //         value: "p_n_feature_seven_browse-bin/18107826011",
    //       },
    //     ],
    //     computer_optical_storage_option: [
    //       {
    //         name: "Includes Optical Storage Device",
    //         value: "p_n_feature_sixteen_browse-bin/3093652011",
    //       },
    //     ],
    //     laptop_flash_memory_capacity: [
    //       {
    //         name: "500 GB & Above",
    //         value: "p_n_feature_nine_browse-bin/9659363011",
    //       },
    //       {
    //         name: "250 to 499 GB",
    //         value: "p_n_feature_nine_browse-bin/9659361011",
    //       },
    //       {
    //         name: "120 to 249 GB",
    //         value: "p_n_feature_nine_browse-bin/9659360011",
    //       },
    //       {
    //         name: "64 to 119 GB",
    //         value: "p_n_feature_nine_browse-bin/3071910011",
    //       },
    //       {
    //         name: "32 to 63 GB",
    //         value: "p_n_feature_nine_browse-bin/3071909011",
    //       },
    //       {
    //         name: "17 to 31 GB",
    //         value: "p_n_feature_nine_browse-bin/3071908011",
    //       },
    //       {
    //         name: "8 to 16 GB",
    //         value: "p_n_feature_nine_browse-bin/3071912011",
    //       },
    //       {
    //         name: "7 GB & Under",
    //         value: "p_n_feature_nine_browse-bin/3071911011",
    //       },
    //     ],
    //     from_our_brands: [
    //       {
    //         name: "Our Brands",
    //         value: "p_n_feature_forty-seven_browse-bin/21180942011",
    //       },
    //     ],
    //     packaging_option: [
    //       {
    //         name: "Frustration-Free Packaging",
    //         value: "p_n_is_ffp/7252855011",
    //       },
    //     ],
    //     laptop_display_resolution: [
    //       {
    //         name: "3840x2160 & Above",
    //         value: "p_n_feature_three_browse-bin/13580800011",
    //       },
    //       {
    //         name: "3200x1800",
    //         value: "p_n_feature_three_browse-bin/13580801011",
    //       },
    //       {
    //         name: "2560x1440",
    //         value: "p_n_feature_three_browse-bin/13580803011",
    //       },
    //       {
    //         name: "1920x1080",
    //         value: "p_n_feature_three_browse-bin/9647486011",
    //       },
    //       {
    //         name: "1600x900",
    //         value: "p_n_feature_three_browse-bin/9647485011",
    //       },
    //       {
    //         name: "1440x900",
    //         value: "p_n_feature_three_browse-bin/13580804011",
    //       },
    //       {
    //         name: "1366x768",
    //         value: "p_n_feature_three_browse-bin/9647484011",
    //       },
    //       {
    //         name: "1200x800",
    //         value: "p_n_feature_three_browse-bin/9647483011",
    //       },
    //     ],
    //     new_and_upcoming: [
    //       {
    //         name: "New Arrivals",
    //         value: "p_n_date/1249033011",
    //       },
    //       {
    //         name: "Coming Soon",
    //         value: "p_n_date/1249034011",
    //       },
    //     ],
    //     certification: [
    //       {
    //         name: "Energy Star",
    //         value: "p_n_special_merchandising_browse-bin/544495011",
    //       },
    //     ],
    //     international_shipping: [
    //       {
    //         name: "Free Shipping by Amazon",
    //         value: "p_n_shipping_option-bin/3242350011",
    //       },
    //     ],
    //     condition: [
    //       {
    //         name: "New",
    //         value: "p_n_condition-type/2224371011",
    //       },
    //       {
    //         name: "Used",
    //         value: "p_n_condition-type/2224373011",
    //       },
    //     ],
    //   },
    //   shopping_advisors: [
    //     {
    //       title: "Editorial recommendations",
    //       profile: {
    //         name: "Review Geek",
    //         link: "https://www.amazon.com/gp/profile/amzn1.account.AF4EB4FGSQR6QWP5IJDR4ZUCA6AA/ref=sxin_10?cv_ct_id=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&cv_ct_pg=search&cv_ct_wn=osp-single-source-gl-ranking&cv_ct_we=contributor-profile&pd_rd_w=ximf1&pf_rd_p=a731ca96-f731-4b16-b32d-9bb548e9542b&pf_rd_r=VHRRSQGZEMJWZKN10Y43&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_wg=ynL5X&qid=1605813011&cv_ct_cx=memory+cards",
    //         id: "AF4EB4FGSQR6QWP5IJDR4ZUCA6AA",
    //       },
    //       article: {
    //         title: "The Best CompactFlash Cards You Can Buy",
    //         body: "The CompactFlash card, a decidedly earlier model of memory card for cameras, is still a wholly dependable means of storage for a variety of digital photo and video devices. It remains one of the most in-demand memory cards on the market, utilized by the likes of Nikon and Canon cameras. While stiff competition may rear its head, what makes the CompactFlash card so useful over two decades is its ability to adapt to the market while maintaining reasonable prices for its top-quality perks. If you’re a newly minted photographer or a seasoned videographer in need of a new memory card, here are some we recommend.",
    //         link: "https://www.amazon.com/ospublishing/story/bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be/ref=sxin_10?cv_ct_we=article-page&pd_rd_w=ximf1&pf_rd_p=a731ca96-f731-4b16-b32d-9bb548e9542b&pf_rd_r=VHRRSQGZEMJWZKN10Y43&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_wg=ynL5X&qid=1605813011&cv_ct_pg=search&cv_ct_wn=osp-single-source-gl-ranking&ascsubtag=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&linkCode=oas&cv_ct_id=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&tag=rgonsite-20&cv_ct_cx=memory+cards",
    //         date: "Sep 30, 2020",
    //         total: 4,
    //       },
    //       recommendations: [
    //         {
    //           position: 1,
    //           title: "Best Value",
    //           sub_title: "Good Bang for Your Buck",
    //           body: "This cost-efficient memory card offers users fast photo processing and a durable shell.",
    //           product: {
    //             title:
    //               "SanDisk Extreme 64GB CompactFlash Memory Card (SDCFXSB-064G-G46)",
    //             asin: "B00NUB2RPW",
    //             link: "https://www.amazon.com/SanDisk-Extreme-CompactFlash-Memory-SDCFXSB-064G-G46/dp/B00NUB2RPW/ref=sxin_10?ascsubtag=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&creativeASIN=B00NUB2RPW&cv_ct_cx=memory+cards&cv_ct_id=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-gl-ranking&dchild=1&keywords=memory+cards&linkCode=oas&pd_rd_i=B00NUB2RPW&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_w=ximf1&pd_rd_wg=ynL5X&pf_rd_p=a731ca96-f731-4b16-b32d-9bb548e9542b&pf_rd_r=VHRRSQGZEMJWZKN10Y43&qid=1605813011&sr=1-1-d9dc7690-f7e1-44eb-ad06-aebbef559a37&tag=rgonsite-20",
    //             image:
    //               "https://m.media-amazon.com/images/I/71KhIfWRH2L._AC_UL320_.jpg",
    //             is_prime: true,
    //             rating: 4.8,
    //             ratings_total: 4565,
    //             price: {
    //               value: 44.9,
    //               currency: "USD",
    //               raw: "44.9",
    //             },
    //           },
    //         },
    //         {
    //           position: 2,
    //           title: "Fastest Upload Speed",
    //           sub_title: "Durable Design",
    //           body: "Combining great photo capabilities with even faster transfer speeds, this memory card really perf...",
    //           product: {
    //             title:
    //               "SanDisk Extreme PRO 64GB Compact Flash Memory Card UDMA 7 Speed Up To 160MB/s - SDCFXPS-064G-X46",
    //             asin: "B00ECEVFFO",
    //             link: "https://www.amazon.com/SanDisk-Extreme-Compact-Memory-SDCFXPS-064G-X46/dp/B00ECEVFFO/ref=sxin_10?ascsubtag=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&creativeASIN=B00ECEVFFO&cv_ct_cx=memory+cards&cv_ct_id=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-gl-ranking&dchild=1&keywords=memory+cards&linkCode=oas&pd_rd_i=B00ECEVFFO&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_w=ximf1&pd_rd_wg=ynL5X&pf_rd_p=a731ca96-f731-4b16-b32d-9bb548e9542b&pf_rd_r=VHRRSQGZEMJWZKN10Y43&qid=1605813011&sr=1-2-d9dc7690-f7e1-44eb-ad06-aebbef559a37&tag=rgonsite-20",
    //             image:
    //               "https://m.media-amazon.com/images/I/71mmWmu9P4L._AC_UL320_.jpg",
    //             is_prime: true,
    //             rating: 4.8,
    //             ratings_total: 4516,
    //             price: {
    //               value: 69.69,
    //               currency: "USD",
    //               raw: "69.69",
    //             },
    //           },
    //         },
    //         {
    //           position: 3,
    //           title: "Most Memory Space",
    //           sub_title: "Speedy With Spacious Storage",
    //           body: "With double the storage than most traditional CompactFlash cards, this one offers users 128 GB of...",
    //           product: {
    //             title:
    //               "Lexar Professional 1066x 128GB VPG-65 CompactFlash card (Up to 160MB/s Read) LCF128CRBNA1066",
    //             asin: "B00IAYFDJG",
    //             link: "https://www.amazon.com/Lexar-Professional-VPG-65-CompactFlash-LCF128CRBNA1066/dp/B00IAYFDJG/ref=sxin_10?ascsubtag=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&creativeASIN=B00IAYFDJG&cv_ct_cx=memory+cards&cv_ct_id=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-gl-ranking&dchild=1&keywords=memory+cards&linkCode=oas&pd_rd_i=B00IAYFDJG&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_w=ximf1&pd_rd_wg=ynL5X&pf_rd_p=a731ca96-f731-4b16-b32d-9bb548e9542b&pf_rd_r=VHRRSQGZEMJWZKN10Y43&qid=1605813011&sr=1-3-d9dc7690-f7e1-44eb-ad06-aebbef559a37&tag=rgonsite-20",
    //             image:
    //               "https://m.media-amazon.com/images/I/81dOWvMEaeL._AC_UL320_.jpg",
    //             is_prime: true,
    //             rating: 4.6,
    //             ratings_total: 2590,
    //             price: {
    //               value: 109,
    //               currency: "USD",
    //               raw: "109",
    //             },
    //           },
    //         },
    //         {
    //           position: 4,
    //           title: "Also Consider",
    //           sub_title: "Another Good Option",
    //           body: "A great CF option for beginners, this one offers users ample file storage and efficient transfer ...",
    //           product: {
    //             title:
    //               "Transcend 32GB CompactFlash Memory Card 133x (TS32GCF133)",
    //             asin: "B0012Q2PD6",
    //             link: "https://www.amazon.com/Transcend-32GB-CompactFlash-Memory-TS32GCF133/dp/B0012Q2PD6/ref=sxin_10?ascsubtag=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&creativeASIN=B0012Q2PD6&cv_ct_cx=memory+cards&cv_ct_id=amzn1.osa.bb8d30b5-aa7d-4a4c-a5e3-6602eb1645be.ATVPDKIKX0DER.en_US&cv_ct_pg=search&cv_ct_we=asin&cv_ct_wn=osp-single-source-gl-ranking&dchild=1&keywords=memory+cards&linkCode=oas&pd_rd_i=B0012Q2PD6&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_w=ximf1&pd_rd_wg=ynL5X&pf_rd_p=a731ca96-f731-4b16-b32d-9bb548e9542b&pf_rd_r=VHRRSQGZEMJWZKN10Y43&qid=1605813011&sr=1-4-d9dc7690-f7e1-44eb-ad06-aebbef559a37&tag=rgonsite-20",
    //             image:
    //               "https://m.media-amazon.com/images/I/51KW6FfPkvL._AC_UL320_.jpg",
    //             is_prime: true,
    //             rating: 4.6,
    //             ratings_total: 3861,
    //             price: {
    //               value: 27.99,
    //               currency: "USD",
    //               raw: "27.99",
    //             },
    //           },
    //         },
    //       ],
    //     },
    //     {
    //       title: "Amazon's Choice Highly rated and well-priced products",
    //       recommendations: [
    //         {
    //           position: 1,
    //           title: "Between $25 and $50",
    //           product: {
    //             title:
    //               "SanDisk 256GB Ultra microSDXC UHS-I Memory Card with Adapter - 100MB/s, C10, U1, Full HD, A1, Micro SD Card - SDSQUAR-256G-GN6MA",
    //             asin: "B0758NHWS8",
    //             link: "https://www.amazon.com/SanDisk-256GB-microSDXC-Memory-Adapter/dp/B0758NHWS8/ref=sxin_11_ac_d_pm?ac_md=3-1-QmV0d2VlbiAkMjUgYW5kICQ1MA%3D%3D-ac_d_pm&cv_ct_cx=memory+cards&dchild=1&keywords=memory+cards&pd_rd_i=B0758NHWS8&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_w=6R0XL&pd_rd_wg=ynL5X&pf_rd_p=11a709f6-3880-4a03-93e2-b92974faa0a6&pf_rd_r=VHRRSQGZEMJWZKN10Y43&psc=1&qid=1605813011&sr=1-2-22d05c05-1231-4126-b7c4-3e7a9c0027d0",
    //             image:
    //               "https://m.media-amazon.com/images/I/619jta1rF4L._AC_UL320_.jpg",
    //             is_prime: true,
    //             rating: 4.7,
    //             ratings_total: 500245,
    //             price: {
    //               value: 32.99,
    //               currency: "USD",
    //               raw: "32.99",
    //             },
    //           },
    //         },
    //         {
    //           position: 2,
    //           title: "Between $50 and $100",
    //           product: {
    //             title:
    //               "SanDisk 256GB Extreme PRO SDXC UHS-I Card - C10, U3, V30, 4K UHD, SD Card - SDSDXXY-256G-GN4IN",
    //             asin: "B07H9VX76D",
    //             link: "https://www.amazon.com/SanDisk-256GB-Extreme-UHS-I-SDSDXXY-256G-GN4IN/dp/B07H9VX76D/ref=sxin_11_ac_d_pm?ac_md=4-2-QmV0d2VlbiAkNTAgYW5kICQxMDA%3D-ac_d_pm&cv_ct_cx=memory+cards&dchild=1&keywords=memory+cards&pd_rd_i=B07H9VX76D&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_w=6R0XL&pd_rd_wg=ynL5X&pf_rd_p=11a709f6-3880-4a03-93e2-b92974faa0a6&pf_rd_r=VHRRSQGZEMJWZKN10Y43&psc=1&qid=1605813011&sr=1-3-22d05c05-1231-4126-b7c4-3e7a9c0027d0",
    //             image:
    //               "https://m.media-amazon.com/images/I/81U7bqZ-TtL._AC_UL320_.jpg",
    //             is_prime: true,
    //             rating: 4.8,
    //             ratings_total: 57916,
    //             price: {
    //               value: 66.49,
    //               currency: "USD",
    //               raw: "66.49",
    //             },
    //           },
    //         },
    //         {
    //           position: 3,
    //           title: "Above $100",
    //           product: {
    //             title:
    //               "SanDisk Extreme PRO 128GB CompactFlash Memory Card UDMA 7 Speed Up To 160MB/s- SDCFXPS-128G-X46",
    //             asin: "B00ECEVGN0",
    //             link: "https://www.amazon.com/SanDisk-Extreme-CompactFlash-Memory-SDCFXPS-128G-X46/dp/B00ECEVGN0/ref=sxin_11_ac_d_pm?ac_md=5-3-QWJvdmUgJDEwMA%3D%3D-ac_d_pm&cv_ct_cx=memory+cards&dchild=1&keywords=memory+cards&pd_rd_i=B00ECEVGN0&pd_rd_r=495cd27c-9536-4fb3-a64d-d6d710d58e6b&pd_rd_w=6R0XL&pd_rd_wg=ynL5X&pf_rd_p=11a709f6-3880-4a03-93e2-b92974faa0a6&pf_rd_r=VHRRSQGZEMJWZKN10Y43&psc=1&qid=1605813011&sr=1-4-22d05c05-1231-4126-b7c4-3e7a9c0027d0",
    //             image:
    //               "https://m.media-amazon.com/images/I/71NGGmq0Y7L._AC_UL320_.jpg",
    //             is_prime: true,
    //             rating: 4.8,
    //             ratings_total: 4516,
    //             price: {
    //               value: 119.99,
    //               currency: "USD",
    //               raw: "119.99",
    //             },
    //           },
    //         },
    //       ],
    //     },
    //   ],
    //   ad_blocks: [
    //     {
    //       creative_id: "8825040750402",
    //       ad_id: "9475029340202",
    //       creative_type: "TetrisSoftlinesCreativeDesktop",
    //       date: {
    //         raw: 1608968082312,
    //         utc: "2020-12-26T07:34:42.312Z",
    //       },
    //       link: "https://aax-eu.amazon.es/x/c/Qr_WNnhe0AH7zkL81w5DMy8AAAF27KV4RAMAAAH2AWPQnxM/https://www.amazon.es/stores/page/558CFED8-91FB-41F0-8C43-6F8A37714A45?store_ref=SB_A01124452LP1O47IO0PAS&pd_rd_w=FVwsW&pf_rd_p=ec62ce26-a5bb-460c-8e81-2b249d4e2d9a&pd_rd_wg=1N2nO&pf_rd_r=ZXK3G409G6KAX9CZQ387&pd_rd_r=47cf70a8-37cf-4dc4-be0e-1cd23e922a36&aaxitk=6r.6t4g7l8.2A5yKm3Y0TQ&hsa_cr_id=8825040750402&lp_asins=B07ZVQ97F9,B07ZVQM9NZ,B07ZVPPCRW&lp_mat_key=camiseta&lp_query=camiseta&lp_slot=auto-sparkle-hsa-tetris&ref_=sbx_be_s_sparkle_tsld_bkgd",
    //       title: "Levi's®: Encuentra tu estilo en esta colección",
    //       sub_title: "Levis®",
    //       products: [
    //         {
    //           asin: "B07ZVQ97F9",
    //           image:
    //             "https://m.media-amazon.com/images/I/71w4BOsZK0L._AC_SX200_SY161_QL70_.jpg",
    //           title: "Levi's SS Relaxed Fit tee Camiseta para Hombre",
    //           price: {
    //             symbol: "€",
    //             currency: "EUR",
    //             value: 11.02,
    //             raw: "€11,02",
    //           },
    //         },
    //         {
    //           asin: "B07ZVQM9NZ",
    //           image:
    //             "https://m.media-amazon.com/images/I/816OH55Jq6L._AC_SX200_SY161_QL70_.jpg",
    //           title: "Levi's Housemark Graphic tee Camiseta para Hombre",
    //           price: {
    //             symbol: "€",
    //             currency: "EUR",
    //             value: 16.42,
    //             raw: "€16,42",
    //           },
    //         },
    //         {
    //           asin: "B07ZVPPCRW",
    //           image:
    //             "https://m.media-amazon.com/images/I/71qApncBP5L._AC_SX200_SY161_QL70_.jpg",
    //           title: "Levi's SS Relaxed Fit tee Camiseta para Hombre",
    //           price: {
    //             symbol: "€",
    //             currency: "EUR",
    //             value: 16.49,
    //             raw: "€16,49",
    //           },
    //         },
    //       ],
    //     },
    //   ],
    // };

    // res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/top-selling-products", async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res
        .status(400)
        .json({ success: false, error: "Category is required" });
    }

    const response = await axios.get("https://api.rainforestapi.com/request", {
      params: {
        api_key: process.env.AMAZON_SECRET_KEY,
        type: "bestsellers",
        amazon_domain: "amazon.com",
        category_id: category,
      },
    });

    const topSellingProducts = response.data.bestsellers;

    // const topSellingProducts = [
    //   {
    //     rank: 1,
    //     position: 1,
    //     title:
    //       "Samsung 128GB 100MB/s (U3) MicroSDXC EVO Select Memory Card with Full-Size Adapter (MB-ME128GA/AM)",
    //     sub_title: {
    //       text: "AKASO",
    //       link: "https://www.amazon.com/AKASO/b/ref=bl_dp_s_web_7188749011?ie=UTF8&node=7188749011&field-lbr_brands_browse-bin=AKASO",
    //     },
    //     asin: "B073JYC4XM",
    //     link: "https://www.amazon.com/Samsung-MicroSDXC-Adapter-MB-ME128GA-AM/dp/B073JYC4XM/ref=zg_bs_516866_1/133-5420936-7189629?_encoding=UTF8&psc=1&refRID=8V9X0Q7P2DRN4TW5TDNB",
    //     image:
    //       "https://images-na.ssl-images-amazon.com/images/I/817wkPGulTL._AC_UL200_SR200,200_.jpg",
    //     rating: 4.7,
    //     ratings_total: 44828,
    //     price: {
    //       symbol: "$",
    //       value: 19.49,
    //       currency: "USD",
    //       raw: "$19.49",
    //     },
    //   },
    //   {
    //     rank: 2,
    //     position: 2,
    //     title:
    //       "SanDisk Ultra 32GB microSDHC UHS-I card with Adapter - 98MB/s U1 A1 - SDSQUAR-032G-GN6MA",
    //     sub_title: {
    //       text: "AKASO",
    //       link: "https://www.amazon.com/AKASO/b/ref=bl_dp_s_web_7188749011?ie=UTF8&node=7188749011&field-lbr_brands_browse-bin=AKASO",
    //     },
    //     asin: "B073JWXGNT",
    //     link: "https://www.amazon.com/SanDisk-Ultra-microSDXC-Memory-Adapter/dp/B073JWXGNT/ref=zg_bs_516866_2/133-5420936-7189629?_encoding=UTF8&psc=1&refRID=8V9X0Q7P2DRN4TW5TDNB",
    //     image:
    //       "https://images-na.ssl-images-amazon.com/images/I/61wtfkbzUIL._AC_UL200_SR200,200_.jpg",
    //     rating: 4.6,
    //     ratings_total: 42742,
    //     price: {
    //       symbol: "$",
    //       value: 8.14,
    //       currency: "USD",
    //       raw: "$8.14",
    //     },
    //   },
    //   {
    //     rank: 3,
    //     position: 3,
    //     title:
    //       "SanDisk Ultra 32GB Class 10 SDHC UHS-I Memory Card up to 80MB/s (SDSDUNC-032G-GN6IN)",
    //     sub_title: {
    //       text: "AKASO",
    //       link: "https://www.amazon.com/AKASO/b/ref=bl_dp_s_web_7188749011?ie=UTF8&node=7188749011&field-lbr_brands_browse-bin=AKASO",
    //     },
    //     asin: "B0143RT8OY",
    //     link: "https://www.amazon.com/SanDisk-Ultra-Class-Memory-SDSDUNC-032G-GN6IN/dp/B0143RT8OY/ref=zg_bs_516866_3/133-5420936-7189629?_encoding=UTF8&psc=1&refRID=8V9X0Q7P2DRN4TW5TDNB",
    //     image:
    //       "https://images-na.ssl-images-amazon.com/images/I/61RLNh5Af2L._AC_UL200_SR200,200_.jpg",
    //     rating: 4.6,
    //     ratings_total: 18440,
    //     price: {
    //       symbol: "$",
    //       value: 6.99,
    //       currency: "USD",
    //       raw: "$6.99",
    //     },
    //   },
    //   {
    //     rank: 4,
    //     position: 4,
    //     title:
    //       "SanDisk 64GB Ultra MicroSDXC UHS-I Memory Card with Adapter - 100MB/s, C10, U1, Full HD, A1, Micro SD Card - SDSQUAR-064G-GN6MA",
    //     sub_title: {
    //       text: "AKASO",
    //       link: "https://www.amazon.com/AKASO/b/ref=bl_dp_s_web_7188749011?ie=UTF8&node=7188749011&field-lbr_brands_browse-bin=AKASO",
    //     },
    //     asin: "B073JYVKNX",
    //     link: "https://www.amazon.com/SanDisk-Ultra-microSDXC-Memory-Adapter/dp/B073JYVKNX/ref=zg_bs_516866_4/133-5420936-7189629?_encoding=UTF8&psc=1&refRID=8V9X0Q7P2DRN4TW5TDNB",
    //     image:
    //       "https://images-na.ssl-images-amazon.com/images/I/51IEVgCe89L._AC_UL200_SR200,200_.jpg",
    //     rating: 4.6,
    //     ratings_total: 42742,
    //     price: {
    //       symbol: "$",
    //       value: 11.99,
    //       currency: "USD",
    //       raw: "$11.99",
    //     },
    //   },
    // ];

    res.json({ success: true, topSellingProducts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

app.use(Routes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("listening for requests...");
  });
});
