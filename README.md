# Midterm Generasi GIGIH (Backend)

This repository was created as proof that the midterm Generation Gigih 3.0 Full Stack Engineering by GoTo Impact Foundation has been completed

## Database Structure

<!-- ![Database Schema](./docs/database-schema.png) -->

<!--
From the schema above, we can see that there are 3 collections in the database:

- `videos`
- `products`
- `comments` -->

## API Architecture

belum diisi

## API Request and Response

### VideosList

```json
{
  "videoID": "string",
  "title": "string",
  "urlImg": "string"
}
```

### ProductList

```json
{
  "videoID": "string",
  "productID": "string",
  "linkProduct": "string",
  "title": "string",
  "price": "number"
}
```

### CommentList

```json
{
  "videoID": "string",
  "username": "string",
  "comment": "string",
  "timestamp": "date"
}
```

The `productList` and `commentList` collection have a field called `videoID` which is a reference to the `videoID` field of the `videosList` collection.

<!-- ## API Structure

![Database Schema](./docs/api-architecture.png) -->

<!-- As shown in the image above, the API structure is as follows:

- `User` is the user who will consume the API
- `Backend` is the backend server that will serve the API (Node JS and Express JS)
- `MongoDB` is the database that will store the data -->

inside the `Backend Arch` there are 2 layers:

- `routes` is the layer that will handle the request from the `User` and send the response back to the `User`
- `models` is the layer that will handle the data from the `MongoDB` and send the data back to the `routes`

<!-- I don't use `controllers` and `services` layers because the API is very simple and does not require a lot of business
logic. On top of that, `mongoose` already provides a lot of methods to interact with the database, including the
validation one. So I don't need to create another layer to handle the validation and business logic. -->

## List APIs

<!--
![Database Schema](./docs/List-APIs.png) -->

The list of APIs is as follows:

### GET api/videos

This endpoint allows users to get videos in videoList.

- URL Params:
  - None
- Data Params:
  - None
- Headers:
  - Content-Type: application/json
- Success Response

  - CODE: 200
    - Content:

  ````json
  [
    {
      "videoTitle": "Tas Sling Bag",
      "videoID": "vid001a",
      "urlImg": "https://images.tokopedia.net/img/cache/100-square/VqbcmM/2022/11/25/f7fbd8fa-0de1-4831-9e77-b9edcc005200.png.webp?ect=4g"
    }
  ]
  ```

  ````

- Error Response

  - CODE: 404
  - Content:

  ```json
  {
    "message": "Video not found"
  }
  ```

### POST api/videos/post-videos

This endpoint allows users to add videos in videoList

- URL Params:
  - None
- Data Params:
  - None
- Headers:
  - Content-Type: application/json
- Success Response

  - Code: 200
  - Content:

  ````json
  {
  "_id": {
    "$oid": "64c312428d1f3167dbf5c8e2"
  },
  "videoTitle": "Dompet CK Flip Wallet",
  "videoID": "vid001b",
  "urlImg": "https://images.tokopedia.net/img/cache/700/VqbcmM/2022/10/23/125a1748-5691-4a67-a789-6851422c2449.jpg.webp?ect=4g",
  "__v": 0
  }
  ```

  ````

- Error Response

  - Code: 400
  - Content:

  ```json
  {
    "message": "Invalid state"
  }
  ```

### GET api/product/:videoID

This endpoint allows users to get product from productList with videoID required

- URL Params:
  - required: `videoID=[string]`
- Data Params:
  - None
- Headers:
  - context-type: application/json
- Success Response

  - Code: 200
  - Content:

  ```json
  [
    {
      "videoID": "vid001a",
      "productID": "prod01a",
      "linkProduct": "https://www.tokopedia.com/antarestar/tas-sling-bag-tas-selempang-pria-wanita-arion-antarestar-hitam?extParam=src%3Dmultiloc%26whid%3D2539099&source=homepage.left_carousel.0.279454",
      "title": "Tas Sling Bag",
      "price": 35000
    }
  ]
  ```

- Error Response

  - Code: 500
  - Content:

  ```json
  {
    "message": "Invalid state"
  }
  ```

### POST api/product/post-product

This endpoint allows users to add product list in productList

- URL Params:
  - None
- Data Params:
  - None
- Headers:
  - Context-Type: application/json
- Success Response

  - Code: 200
  - Content:

  ```json
  [
    {
      "videoID": "vid001b",
      "productID": "prod01b",
      "linkProduct": "https://www.tokopedia.com/sopaybags/tas-wanita-cewe-supplier-branded-murah-import-batam-ck-flip-wallet-hitam?extParam=ivf%3Dfalse&src=topads",
      "title": "Dompet CK Flip Wallet",
      "price": 90000
    }
  ]
  ```

- Error Response

  - Code: 500
  - Content:

  ```json
  {
    "message": "Invalid server error"
  }
  ```

### PUT api/product/update/:productID

This endpoint allows users to update product list in productList

- URL Params:
  - required: `productID=[string]`
- Data Params:
  - None
- Headers:
  - Context-text: application/json
- Success Response

  - Code: 201
  - Content:

  ```json
  {
    "videoID": "vid001a",
    "productID": "prod01a",
    "linkProduct": "https://www.tokopedia.com/antarestar/tas-sling-bag-tas-selempang-pria-wanita-arion-antarestar-hitam?extParam=src%3Dmultiloc%26whid%3D2539099&source=homepage.left_carousel.0.279454",
    "title": "Tas Sling Bag",
    "price": 40000
  }
  ```

- Error Response

  - Code: 500
  - Content:

  ```json
  {
    "message": "Internal server error"
  }
  ```

### DELETE api/product/update/:productID

This endpoint allows users to delete the product list in productList

- URL Params:
  - required: `productID=[string]`
- Data Params:
  - None
- Headers:
  - Context-text: application/json
- Success Response

  - Code: 200
  - Content:

  ```json
  {
    "message": "Product List has been deleted"
  }
  ```

- Error Response

  - Code: 500
  - Content:

  ```json
  {
    "message": "Internal server error"
  }
  ```

### GET api/comment/:videoID

This endpoint returns all comments of a video by its videoID

- URL Params:
  - required: `videoID=[string]`
- Data Params:
  - None
- Headers:
  - Context-text: application/json
- Success Response

  - Code: 200
  - Content:

  ````json
  {
    "videoID": "vid001a",
    "username": "@tonom",
    "comment": "ah masa sih bisa?",
    "timestamp": "2023-07-27T13:16:52.937Z",
  }
  ```

  ````

- Error Response

  - Code: 500
  - Content:

  ```json
  {
    "message": "Internal server error"
  }
  ```

### POST api/comment/submit-comment

This endpoint add comment from user and store it to commentList

- URL Params:
  - None
- Data Params:
  - None
- Headers:
  - Content-Type: application/json
- Success Response

  - Code: 200
  - Content:

  ```json
  {
    "username": "@suzuki",
    "comment": "kerenn bangett?!",
    "timestamp": "2023-07-28T02:21:48.619Z"
  }
  ```

- Error Response

  - Code: 500
  - Content:

  ```json
  {
    "response": "Fail",
    "message": "Internal server error"
  }
  ```

## How to run it locally

1. Clone this repository -->

   ```bash
   git clone
   ```

2. Install dependencies

bash

- npm install

3. Copy `.env.example` to `.env`

   ```bash
   # for linux and mac users
   cp .env.example .env

   # for windows users
   copy .env.example .env
   ```

4. Open `.env` file and put your database connection url as follows:

   ```bash
   DATABASE_URL = mongodb://127.0.0.1:27017/final_project
   ```

5. Run the server

   ```bash
   npm start
   ```

6. Now the server is running on port 3000. So you can access it via `http://127.0.0.1:3001` or `http://localhost:3001` -->
