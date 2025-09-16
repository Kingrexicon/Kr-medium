KR Medium
A simple Node.js CRUD (Create, Read, Update, Delete) application using Express, MongoDB, EJS, and Multer for file uploads. Users can create, view, update, and delete stories with optional image uploads. access site on this link https://kr-medium.onrender.com/
<img width="1366" height="768" alt="Screenshot (85)" src="https://github.com/user-attachments/assets/963663bf-3d81-49a3-a254-ac9a72b3142c" />
<img width="1366" height="768" alt="Screenshot (84)" src="https://github.com/user-attachments/assets/03d9384a-cf58-4d93-af48-adbce9b92bc7" />

## Features

- Create stories with title, author, date, time, and content.
- Upload images for each story.
- View all stories on the homepage.
- Update and delete stories.
- Responsive UI styled with CSS.
- Uses MongoDB for data storage.

## Project Structure

```
.
├── .env
├── .gitignore
├── index.html
├── package.json
├── server.js
├── public/
│   ├── create_product.html
│   ├── main.js
│   ├── css/
│   │   └── style.css
│   └── uploads/
│       └── [uploaded images]
├── views/
│   └── index.ejs
└── .vscode/
    └── settings.json
```

## Setup

1. **Clone the repository**  
   ```sh
   git clone <repo-url>
   cd crud
   ```

2. **Install dependencies**  
   ```sh
   npm install
   ```

3. **Configure environment variables**  
   Create a [`.env`](.env ) file in the root directory with the following:
   ```
   PORT=4000
   DB_string=your_mongodb_connection_string
   ```

4. **Start the server**  
   ```sh
   npm start
   ```
   Or for development with auto-reload:
   ```sh
   npm run dev
   ```

5. **Access the app**  
   Open [http://localhost:4000](http://localhost:4000) in your browser.

## Usage

- **Homepage:** Lists all stories.  
- **Write Story:** Click "Write" in the header to add a new story.
- **Image Upload:** Images are saved in [`public/uploads`](public/uploads ).
- **Update/Delete:** Use the update and delete buttons (see public/main.js).

## Technologies Used

- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [EJS](https://ejs.co/)
- [Multer](https://github.com/expressjs/multer)
- [dotenv](https://github.com/motdotla/dotenv)
- [Nodemon](https://nodemon.io/) (dev)

## File Overview

- [`server.js`](server.js ): Main server file, sets up routes and database connection.
- [`views/index.ejs`](views/index.ejs ): EJS template for displaying stories.
- [`public/create_product.html`](public/create_product.html ): Form for creating new stories.
- [`public/main.js`](public/main.js ): Frontend JS for update/delete actions.
- [`public/css/style.css`](public/css/style.css ): Stylesheet.

## License

ISC

---

**Note:**  
- Ensure MongoDB is running and accessible via your connection string.
- Uploaded images are stored in [`public/uploads`](public/uploads ).
- For any issues, check the
