# TEDective UI
> Interactive visualization tool for exploring graph data from the TEDective API.

[![License](https://img.shields.io/badge/License-AGPL--3.0--or--later-blue.svg)](https://www.gnu.org/licenses/agpl-3.0.html)

This project houses the TypeScript code that powers the TEDective UI, an interactive visualization tool for exploring graph data fetched from the [TEDective API](https://git.fsfe.org/TEDective/api/). The UI leverages the capabilities of various libraries to create a compelling user experience. Part of [TEDective Project](https://tedective.org).

This project is implemented using [Next.js](https://github.com/vercel/next.js), [react-force-graph](https://github.com/vasturiano/react-force-graph), [d3-force](https://github.com/d3/d3-force), [Leva GUI](https://github.com/pmndrs/leva), and [Chart.js](https://github.com/chartjs/Chart.js).

## Table of Contents

- [Features](#features)
- [Background](#background)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Install with Docker](#install-with-docker)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Features
The TEDective UI boasts the following features:

- Fetches graph data from the [TEDective API](https://git.fsfe.org/TEDective/api/)
- Displays an interactive 2D force graph using [react-force-graph](https://github.com/vasturiano/react-force-graph#input-json-syntax) and [d3-force](https://github.com/d3/d3-force)
- Utilizes [Next.js](https://github.com/vercel/next.js) for server-side rendering and enhanced performance
- Integrates [Leva GUI](https://github.com/pmndrs/leva) for a user-friendly graphical user interface to tweak parameters
- Incorporates [Chart.js](https://github.com/chartjs/Chart.js) for generating data-driven charts

## Background
The TEDective project aims to make European public procurement data from
Tenders Electronic Daily (TED) explorable for non-experts. This repository
contains the TypeScript code powering the TEDective UI.

Part of [TEDective Project](https://tedective.org)

## Getting Started

### Installation

To get started with the TEDective UI locally, follow these steps:

1. Clone this repository
2. Navigate to the project directory
3. Install the dependencies: `npm install`
4. Start the development server: `npm run dev`
5. Access the UI in your browser at `http://localhost:3000`

### Install with Docker

To run the TEDective UI using Docker, use the following commands:

1. Build the Docker image: `docker build -t tedectiveui .`
2. Run the Docker container: `docker run -p 3000:3000 tedectiveui`

For detailed instructions please refer to the [TEDective documentation](https://docs.tedective.org/ui/quickstart.mdx).

## Usage
:construction: TODO: (probably put the reference to documentation)

## Maintainers
@siemer

## Contributing
PRs are accepted.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme)
specification.

## License
The TEDective UI is open-source and released under the [AGPL-3.0-or-later](https://www.gnu.org/licenses/agpl-3.0.html) license, © 2023 Free Software Foundation Europe e.V.

