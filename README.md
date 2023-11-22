# Tanstack Query Playground

This project is a playground for practicing and learning Tanstack Query / React Query and Devtools associated with it. It focuses on concepts such as server state, pagination, caching, infinite fetching and scrolling... All API calls are handled by Tanstack Query using [axios](https://github.com/axios/axios). The project is based on the [Tanstack Query documentation](https://react-query.tanstack.com/).

## Data Sources

The project uses the following data sources:

- [json-server](https://github.com/typicode/json-server) for the 'todos' part. It uses a local `db.json` file located in the `data` folder.
- [reqres.in](https://reqres.in/) for the 'users' part.
- [jsonplaceholder](https://jsonplaceholder.typicode.com/) for the 'posts' part.


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm or yarn or pnpm

### Installation

1. Clone the repo
````
git clone https://github.com/Yann-GitHub/tanstack-query-playground.git
````
2. Install NPM packages
```
npm install
```

3. Start the development server (runs on port 5175)
```
npm run dev
```

4. Start the json-server (runs on port 3500)
```
npm run server
```


## Built With

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)