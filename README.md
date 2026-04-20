<a id="readme-top"></a>
<div align="center">

[![Contributors](https://img.shields.io/github/contributors/blakemontiegel/cis4914-senior-design.svg?style=for-the-badge)](https://github.com/blakemontiegel/cis4914-senior-design/graphs/contributors)
[![Forks](https://img.shields.io/github/forks/blakemontiegel/cis4914-senior-design.svg?style=for-the-badge)](https://github.com/blakemontiegel/cis4914-senior-design/network/members)
[![Stargazers](https://img.shields.io/github/stars/blakemontiegel/cis4914-senior-design.svg?style=for-the-badge)](https://github.com/blakemontiegel/cis4914-senior-design/stargazers)
[![Issues](https://img.shields.io/github/issues/blakemontiegel/cis4914-senior-design.svg?style=for-the-badge)](https://github.com/blakemontiegel/cis4914-senior-design/issues)

</div>

<br />
<div align="center">
  <a href="https://github.com/blakemontiegel/cis4914-senior-design">
    <img src="frontend/src/logo.svg" alt="Sideline Logo" width="140" height="140">
  </a>

  <h1 align="center"><a href="https://jettnguyen.github.io/Sideline">Sideline</a></h1>

  <p align="center">
    Team and game management platform with secure media uploads for youth sports communities.
    <br />
    <em>Built for coaches, parents, and players to stay connected around every match.</em>
    <br />
    <a href="https://github.com/blakemontiegel/cis4914-senior-design"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://jettnguyen.github.io/Sideline">View Demo</a>
    &middot;
    <a href="https://github.com/blakemontiegel/cis4914-senior-design/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/blakemontiegel/cis4914-senior-design/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#screenshots">Screenshots</a></li>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#environment-variables">Environment Variables</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#jira-workflow">Jira Workflow</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

## About The Project

Sideline is a full-stack web application for organizing sports teams, coordinating matches, and sharing game footage with team members.

<div align="center">

| Core Area | What It Handles |
|---|---|
| Auth | Registration, login, email verification, password reset |
| Team Management | Team creation, invites, role-based membership |
| Match Tracking | Upcoming/recent games and team feeds |
| Media | S3 uploads, secure playback URLs, timestamp tags |

</div>

### Screenshots

<table align="center">
  <tr>
    <th>Login</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/login.png" alt="Login Screen" width="320" /></td>
  </tr>
  <tr>
    <th>Dashboard</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/dashboard.png" alt="Dashboard Screen" width="320" /></td>
  </tr>
  <tr>
    <th>Team Page</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/team.png" alt="Team Screen" width="320" /></td>
  </tr>
  <tr>
    <th>Game Details</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/game.png" alt="Game Details Screen" width="320" /></td>
  </tr>
  <tr>
    <th>Video Upload</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/upload.png" alt="Video Upload Screen" width="320" /></td>
  </tr>
  <tr>
    <th>Profile</th>
  </tr>
  <tr>
    <td><img src="docs/screenshots/profile.png" alt="Profile Screen" width="320" /></td>
  </tr>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Built With

<div align="center">

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=reactrouter&logoColor=white)](https://reactrouter.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-13AA52?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)](https://mongoosejs.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)
[![AWS S3](https://img.shields.io/badge/AWS_S3-569A31?style=for-the-badge&logo=amazons3&logoColor=white)](https://aws.amazon.com/s3/)
[![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)](https://axios-http.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-0F9D58?style=for-the-badge&logo=gmail&logoColor=white)](https://nodemailer.com/)

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Getting Started (Developers)

  Follow these steps to run Sideline locally.

### Prerequisites

  * Node.js 18+
  * npm
  * MongoDB instance (Atlas or local)
  * AWS S3 bucket and credentials (required for image/video uploads)

### Installation

  1. Clone the repo
  ```sh
    git clone https://github.com/blakemontiegel/cis4914-senior-design.git
  ```
  2. Install backend dependencies (terminal 1)
  ```sh
    cd backend
    npm install
  ```
  3. Install frontend dependencies (terminal 2)
  ```sh
    cd frontend
    npm install
  ```

  4. Start the backend (terminal 1)
  ```sh
    cd backend
    npm run dev
  ```

  5. Start the frontend (terminal 2)
  ```sh
    cd frontend
    npm start
  ```

  ### Environment Variables

  Create a `.env` file in the repository root (the backend loads `../.env` relative to `backend/server.js`):

  ```env
  MONGO_URI=mongodb+srv://...
  JWT_SECRET=your_jwt_secret
  CLIENT_ORIGIN=http://localhost:3000
  CLIENT_APP_URL=http://localhost:3000
  PORT=5001

  AWS_REGION=us-east-1
  AWS_ACCESS_KEY_ID=...
  AWS_SECRET_ACCESS_KEY=...
  AWS_BUCKET_NAME=...

  EMAIL_ENABLED=true
  EMAIL_FROM=Sideline <noreply@example.com>

  # Option A: Brevo API
  BREVO_API_KEY=...

  # Option B: SMTP
  EMAIL_HOST=smtp.example.com
  EMAIL_PORT=587
  EMAIL_SECURE=false
  EMAIL_USER=...
  EMAIL_PASS=...
  ```

  Create a `.env` file in `frontend/`:

  ```env
  REACT_APP_API_URL=http://localhost:5001/api
  ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

<div align="center">

| Step | Action | Result |
|---|---|---|
| 1 | Register and verify email | Account is activated |
| 2 | Create team or join via invite code | You become a team member |
| 3 | Add matches to your team schedule | Games appear in team feed |
| 4 | Upload videos and add timestamp tags | Clips become searchable/reviewable |
| 5 | Use dashboard feeds and team pages | Track recent and upcoming activity |

</div>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Jira Workflow

Our team tracked work in Jira using a simple development lifecycle:

1. Backlog grooming and ticket creation
2. Sprint planning and assignment
3. In-progress development with regular status updates
4. Review/testing and movement to done

<table align="center">
  <tr>
    <th>Planning Board</th>
  </tr>
  <tr>
    <td><img src="docs/jirascreenshots/jira%20ss%201.png" alt="Jira planning board screenshot" width="500" /></td>
  </tr>
  <tr>
    <th>Backlog</th>
  </tr>
  <tr>
    <td><img src="docs/jirascreenshots/jira%20ss%202.png" alt="Jira active sprint screenshot" width="500" /></td>
  </tr>
</table>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Roadmap

  Planned improvements:
  * [ ] Add end-to-end tests for core auth/team/video flows
  * [ ] Add CI for backend and frontend checks
  * [ ] Expand role and permissions management
  * [ ] Improve team and match discovery/search

  See the [open issues](https://github.com/blakemontiegel/cis4914-senior-design/issues) for updates and planned features.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contributing

  Contributions are welcome.

  1. Fork the project
  2. Create your feature branch (`git checkout -b feature/my-change`)
  3. Commit your changes (`git commit -m 'Add my change'`)
  4. Push to the branch (`git push origin feature/my-change`)
  5. Open a pull request

### Top contributors:

  <a href="https://github.com/blakemontiegel/cis4914-senior-design/graphs/contributors">
    <img src="https://contrib.rocks/image?repo=blakemontiegel/cis4914-senior-design" alt="contrib.rocks image" />
</a>

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE` for details.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Contact

  Repository Creators:

  * [Dominic Ghizzoni](https://github.com/dominicghizzoni) - Scrum Master & Full Stack
  * [Frank Malatesta](https://github.com/frankiemalatesta) - Full Stack
  * [Blake Montiegel](https://github.com/blakemontiegel) - Backend
  * [Jett Nguyen](https://github.com/jettnguyen) - Frontend & UI/UX

  Advisor:

  * Christina Boucher - cboucher@cise.ufl.edu

  Project Link: [https://github.com/blakemontiegel/cis4914-senior-design](https://github.com/blakemontiegel/cis4914-senior-design)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Acknowledgments

  * [React Documentation](https://react.dev)
  * [Express Documentation](https://expressjs.com)
  * [Mongoose Documentation](https://mongoosejs.com)
  * [AWS SDK for JavaScript v3](https://docs.aws.amazon.com/sdk-for-javascript)
  * [GitHub Pages](https://pages.github.com)

<p align="right">(<a href="#readme-top">back to top</a>)</p>
