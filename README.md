<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** sopra-fs21-group-20, closet-server, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]

<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/sopra-fs21-group-20/closet-server">
    <img src="logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">MyOutfit Client</h3>

  <p align="center">
    The frontend powering MyOutfit
    <br />
    <a href="https://github.com/sopra-fs21-group-20/closet-server"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/sopra-fs21-group-20/closet-server">View Demo</a>
    ·
    <a href="https://github.com/sopra-fs21-group-20/closet-server/issues">Report Bug</a>
    ·
    <a href="https://github.com/sopra-fs21-group-20/closet-server/issues">Request Feature</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgements">Acknowledgements</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

MyOutfit's server is the magic that powers the MyOutfit mobile application. The server facilitates a wide variety of client applications and follows the standard client/server model.


### Built With

* [Spring Boot](https://github.com/spring-projects/spring-boot)
* [Postgresql](https://github.com/postgres/postgres)
* [Hibernate](https://github.com/hibernate/)
* [JPA](https://github.com/spring-projects/spring-data-jpa)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps:

### Prerequisites

First you need to ensure gradle is installed. You can install gradle in the following way:

* Linux based: `sdk install gradle 7.0.2` Note this relies on [SDKMan](http://sdkman.io)
* MacOS homebrew: `brew install gradle`
* Windows please see: https://gradle.org/install/

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/sopra-fs21-group-20/closet-server.git
   ```
2. Run build script
   ```sh
   ./gradlew build
   ```

Please note the appropriate platform prefix based upon your OS:

MAC OS X: `./gradlew`
Linux: `./gradlew`
Windows: `./gradlew.bat`

<!-- USAGE EXAMPLES -->
## Usage

Start the server with  
```sh
./gradelw bootRun
```

Gradle is also compatible with all mainstream IDE's, with run support baked in natively or via extensions.
The team recommends [IntelliJ](https://www.jetbrains.com/idea/download/#section=mac).

Make sure to set the following environment variables or the build will fail:

* `AWS_ACCESS_KEY`
* `AWS_SECRET_KEY`
* `DB_URL` of the form `jdbc:postgresql://{hostname}:{port}/{db_name}`. You need to have a database instance running locally or use the provided test database we provide you
* `DB_USERNAME`
* `DB_PASSWORD`
* `DUMMY_UPLOAD` set to `true` to preserve image upload bandwith during troubleshooting and local development
* `CLOUDINARY_CLOUD_NAME`
* `CLOUDINARY_ACCESS_KEY`
* `CLOUDINARY_SECRET_KEY`
* `CLOUDINARY_ACTIVE`
* `DB_INIT_BEHAVIOR` set to `create-drop` for local development or `none` for persistent storage. Do not use any other option besides `none` if you connect to the test database

You now have a local server process running. To verify your endpoints, see the official Postman.

### Component Heirarchy

The system is comprised of entities and their relationships. HTTP requests flow over the respective controllers which delegate their logical implementations to the service layer. The service layers then interact with the appropriate entities and return an appropriate model back to the controller, where an HTTP response is generated.

Users familiar with Spring should feel comfortable with our repository structure as it follows common idioms.

The application class itself can be reached [here](https://github.com/sopra-fs21-group-20/closet-server/blob/main/src/main/java/ch/uzh/ifi/hase/soprafs21/Application.java).

## Testing

```sh
./gradelw test
```

<!-- _For more examples, please refer to the [Documentation](https://example.com)_ -->

<!-- ROADMAP -->
## Roadmap

The current highest priority contributions are:

* Further testing and refinement of the core engine
* Integration of a proprietary background removal extension
* Extension of the community features

Please see the [open issues](https://github.com/sopra-fs21-group-20/closet-server/issues) for a further list of proposed features (and known issues).

<!-- CONTRIBUTING -->
## Contributing

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- LICENSE -->
## License

Distributed under the Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License. See `LICENSE` for more information.

<!-- CONTACT -->
## Contact

This implementation is the work of the entire MyOutfit team, specifically the backend team Corey Bothwell, Silvan Kübler, and Nicolas Peyer.
They can be reached via their respective GitHub accounts.

Project Link: [https://github.com/sopra-fs21-group-20/closet-server](https://github.com/sopra-fs21-group-20/closet-server)

<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements

* [University of Zurich Institut for Informatik S.E.A.L.](https://www.ifi.uzh.ch/en/seal.html)

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[stars-shield]: https://img.shields.io/github/stars/sopra-fs21-group-20/closet-server.svg?style=plastic
[stars-url]: https://github.com/sopra-fs21-group-20/closet-server/stargazers
[issues-shield]: https://img.shields.io/github/issues/sopra-fs21-group-20/closet-server.svg?style=plastic
[issues-url]: https://github.com/sopra-fs21-group-20/closet-server/issues
[license-shield]: https://img.shields.io/github/license/sopra-fs21-group-20/closet-server.svg?style=plastic
[license-url]: https://github.com/sopra-fs21-group-20/closet-server/blob/master/LICENSE.txt
