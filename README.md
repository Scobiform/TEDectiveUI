# TEDective UI

> Interactive visualization tool for exploring graph data from the TEDective API.

[![License](https://img.shields.io/badge/License-AGPL--3.0--or--later-blue.svg)](https://www.gnu.org/licenses/agpl-3.0.html)
[![Build Status](https://drone.fsfe.org/api/badges/TEDective/ui/status.svg)](https://drone.fsfe.org/TEDective/ui)

This project houses the TypeScript code that powers the TEDective UI, an
interactive visualization tool for exploring graph data fetched from the
[TEDective API](https://git.fsfe.org/TEDective/api/). The UI leverages the
capabilities of various libraries to create a compelling user experience. Part
of [TEDective Project](https://tedective.org).

This project is implemented using [Next.js](https://github.com/vercel/next.js),
[react-force-graph](https://github.com/vasturiano/react-force-graph),
[d3-force](https://github.com/d3/d3-force), [Leva GUI](https://github.com/pmndrs/leva),
[Chart.js](https://github.com/chartjs/Chart.js), and [Leaflet](https://leafletjs.com/).

## Table of Contents

- [TEDective UI](#tedective-ui)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Background](#background)
  - [Getting Started](#getting-started)
    - [Installation](#installation)
    - [Install with Docker](#install-with-docker)
    - [Environment configuration](#environment-configuration)
    - [Component configuration](#component-configuration)
    - [Component Overview](#component-overview)
  - [Usage](#usage)
  - [Maintainers](#maintainers)
  - [Contributing](#contributing)
  - [License](#license)

## Features

The TEDective UI boasts the following features:

- Fetches graph data from the [TEDective
  API](https://git.fsfe.org/TEDective/api/)
- Displays an interactive 2D force graph using
  [react-force-graph](https://github.com/vasturiano/react-force-graph#input-json-syntax)
  and [d3-force](https://github.com/d3/d3-force)
- Utilizes [Next.js](https://github.com/vercel/next.js) for server-side rendering and enhanced performance
- Integrates [Leva GUI](https://github.com/pmndrs/leva) for a user-friendly
  graphical user interface to tweak parameters
- Incorporates [Chart.js](https://github.com/chartjs/Chart.js) for generating
  data-driven charts
- Includes [Leaflet](https://leafletjs.com/) for interactive maps
- Is guided by a [Intro.js](https://introjs.com/) tour
- Test-driven by jest [Jest.js](https://jestjs.io)

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
3. Install the dependencies: `pnpm install`
4. Start the development server: `pnpm run dev`
5. Access the UI in your browser at `http://localhost:3000`

### Install with Docker

To run the TEDective UI using Docker, use the following commands:

1. Build the Docker image: `docker build -t tedective-ui .`
2. Run the Docker container: `docker run -p 3000:3000 tedective-ui`

For detailed installation instructions please refer to the [TEDective
documentation](https://docs.tedective.org/self-host/ui/).

### Environment configuration

The .env file is commonly used to store environment variables for your application. Environment variables are key-value pairs that configure how your application behaves in different environments. You will find this file in the root directory of the project.

### Component configuration

Inside the dedicated components folder, you'll discover a config.ts file serving as a hub for essential constants. These constants, once imported, become readily accessible across the entire TEDective UI codebase. Acting as default values, they seamlessly synchronize with the application settings. Should the need arise, feel free to dynamically adjust these values while navigating through the app, ensuring a tailored and personalized experience.

### Component Overview

To enhance your understanding of the system's components, interfaces, and data-flow, take a look at the accompanying component diagram below:

[Component Diagram](https://app.tedective.org/docs/Components.drawio.html)

This diagram provides a visual representation of how various components interact with each other, the interfaces they utilize, and the flow of data within the system. Examining the diagram can offer valuable insights into the overall architecture and relationships between different elements in the TEDective UI.

## Usage

You can find more information in [the user documentation](https://docs.tedective.org/).

## Maintainers

@siemer

## Contributing

PRs are accepted and very much welcomed.

Small note: If editing the README, please conform to the
[standard-readme](https://github.com/RichardLitt/standard-readme)
specification.

## License

The TEDective UI is open-source and released under the
[AGPL-3.0-or-later](https://www.gnu.org/licenses/agpl-3.0.html) license, © 2023
Free Software Foundation Europe e.V.
