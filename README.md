# CineZone

CineZone is an Angular web application that allows users to browse, manage and interact with a movie catalog. Users can view movie details, add new movies, edit existing ones, and manage their profile.

## Features

- Browse movie catalog
- Filter movies by category
- Rate movies
- Create and edit movies
- User authentication
- Responsive design

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v18 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Angular CLI](https://angular.dev/) (v20.1.6)

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/B-Ethan07/cinezone_front_angular.git>
cd cinezone_front_angular
```

2. Install dependencies:
```bash
npm install
```

3. Follow the instruction in the Readme of cinezone_back_express :

```bash
git clone <https://github.com/B-Ethan07/cinezone_back_express.git>
npm install 
create the DB with MySql
```
4. Initialize Express API backend server (in a separate terminal) :
```bash
# Navigate to your API directory and run:
npm start
```
5. Start the Angular development server:
```bash
ng serve
```

6. Open your browser and navigate to `http://localhost:4200`

## Environment Setup

The application expects a backend API running at `http://localhost:3000`. Make sure your Express API is running and accessible at this URL.

## Running Tests

To run the unit tests:
```bash
ng test
```

## Project Structure

- `/src/app/components` - Angular components
- `/src/app/models` - TypeScript interfaces
- `/src/app/common` - Shared services and guards
- `/src/assets` - Static assets like images

## Built With

- [Angular](https://angular.dev/) - Frontend framework
- [Bootstrap](https://getbootstrap.com/) - CSS framework
- [NgxToastr](https://www.npmjs.com/package/ngx-toastr) - Toast notifications
- [Font Awesome](https://fontawesome.com/) - Icons

## Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
