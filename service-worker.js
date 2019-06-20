// /**
//  * Copyright 2016 Google Inc. All rights reserved.
//  *
//  * Licensed under the Apache License, Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// // This generated service worker JavaScript will precache your site's resources.
// // The code needs to be saved in a .js file at the top-level of your site, and registered
// // from your pages in order to be used. See
// // https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// // for an example of how you can register this script and handle various service worker events.

// /* eslint-env worker, serviceworker */
// /* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
// 'use strict';


importScripts("sw-toolbox.js", "runtime-caching.js", "js/idb.js");

//importScripts("js/idb.js");


// /* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [
        ["images/icons/icon-128x128.png", "nSjCUHiXpAjQD2bcjmLoa4RERjpQB7FN"],
        ["images/icons/icon-144x144.png", "jYwuyWsuEhL5TMkSkbLCFLBI30nW84EJ"],
        ["images/icons/icon-152x152.png", "ppc9Lo4rJ1zZrRbORh0mkKAKl4mmhcoi"],
        ["images/icons/icon-192x192.png", "awc4JLxOtGmSunbYakOYCfPbocdw9OS6"],
        ["images/icons/icon-384x384.png", "geRI2YY7TBhIV4ZGhk2tb18UouXZg83N"],
        ["images/icons/icon-512x512.png", "x0Z0yyqRd3rg7mwO4a2QVKDP9kEdYPI5"],
        ["images/icons/icon-72x72.png", "ugB5LpXO3ItNxuzMykPrkaXbUdIW29Jt"],
        ["images/icons/icon-96x96.png", "GmOl1JLWgIEvGuw1SwZmiSSrCTWHTseD"],
        ["images/splash/launch-1125x2436.png", "yNzwelsRyn9Aa1AtyM9Pp9NFScMKYZsS"],
        ["images/splash/launch-1242x2148.png", "XhnabUH4GKCG4rxlVPDvRm6DEJPVQahb"],
        ["images/splash/launch-1536x2048.png", "PNI0Oed4TcK203AVat5rXSaPEuoR7xXJ"],
        ["images/splash/launch-1668x2224.png", "Rpa5KxKCX0SqUTlXRI0o7wfSP5ToPNJj"],
        ["images/splash/launch-2048x2732.png", "BSa9LsHOcUQCNQn7uOb1RFdKjkeZUDsh"],
        ["images/splash/launch-640x1136.png", "m1y0NN5LOlgV8pF93vjPwlyeSLnS0O2t"],
        ["images/splash/launch-750x1294.png", "1fZfzmtyu4bkT1t5nDXxNLPyvTM80D3j"],
        ["/", "xMW1TWucbdAVeDPGUB0Eda1YWZX8lwxN"],
        ["home", "xMW1TWpcXU6b9WRWB9KwGZX8lwxN"],
        ["register", "xM9WRWB9KwGbqdky0lqVfWZX8lwxN"],
        ["login", "xMW1TWpcXU6bqdk9WRWB9KwGX8lwxN"],
        ["forgot", "xMW19WRWB9KwG0lqVfWZX8lwxN"],
        ["programDetail", "xMW1TWp2GU5NWUjYpRkWZX8lwxN"],
        ["registeredPgm", "xMW1TWp2GU50lqVfWZpRkWZX8lwxN"],
        ["ticket", "xMW1TWp9WRWB9KwGVfWZX8lwxN"],
        ["about", "xMW1TWp9W2GU5NWUjYpRkZX8lwxN"],
        ["contactDetails", "xMW2GU5NWUjYp2G2GU5NWUjYpRklwxN"],
        ["profile", "xMW1TWp9WRWB2GU5NWUjYpRkfWZX8lwxN"],
        ["app.js", "jdahpcXU6bqdky0lqVfQfqn3EckhQ43U"],
        ["index.html", "V6H69WRWB9KwGA9uj52RGov58F3Ziti8"],
        ["favicon.ico", "IVdFkY697iEPVW5XYH2gshnbraWrkg6d"],
        ["main.js", "Hz6KXmPaqAHSBwCZRQdwfZgJRlKurjXz"],
        ["manifest.json", "LdBYvj87YfUo4BjvFK67J6jfqf2QAqiq"],
        ["service-worker.js", "fFF6QJxiSqjeo7UcWNDDUBLyw98tUiK5"],
        ["services/appConstants.js", "dK5F8UgaRaCbmKRJzFp4EnYF8Nw46bj0"],
        ["services/CoreService.js", "tfM2LucobRYOEClVXDnS4KZ3f2BTA8GR"],
        ["services/flash.service.js", "Tsjgjn2sONaFbAlLu2dlvimX4XegOzO4"],
        ["services/HttpRequest.js", "hjs1xgrBoj1AFHvFWLBsCvriGnhc8pKb"],
        ["services/user.service.js", "BwzO9fSMaUyu8YVmHhqyi8qshun8arky"],
        ["components/general/busSchedule.html", "I2EIypzh9YriCWg6srpZXmBcPs4UiKSJ"],
        ["components/general/general.controller.js", "CeZJJyGu52EMrDSmE5wvuaLWkQS0Woqc"],
        ["components/general/ticketInfo.html", "VJadEVsXUd418qzVHfntFdczuoo6F7Ij"],
        ["components/header/header.controller.js", "2A7TjnxF0nfQmXRbJOBpVgl52mDWgt56"],
        ["components/header/header.html", "lBbMqbfnPDNHFhvS5RCoMnkZ9OUgCFtl"],
        ["components/home/home.controller.js", "PhJ5eje69fmyPCNjjzXsZyvHcF3CtmGE"],
        ["components/home/home.html", "FVWxcwdwZLq4IN8pJTYt6M0ffWGuLg1f"],
        ["components/program/programDetail.controller.js", "SnInSg9tqTCHjoPUU8a2tGAtkW3lEX9C"],
        ["components/program/programDetail.html", "UU5ghT9CwsHQ2q02hJiCvS095sFIGpWS"],
        ["components/program/registeredProgram.controller.js", "XJ4O20jqJ3kF9sKaItmrZpn19uAPF4ro"],
        ["components/program/registeredProgram.html", "FIQhNYLl3qG8IDigShh0wBiUlQApIkr2"],
        ["components/static/about.html", "T4vpw2fGk1lz49AXNcZ0wIlWpxUbiZ0Y"],
        ["components/static/contactDetails.html", "meTIk9YSes3PUsvzLj4V3yGyfemv4dMn"],
        ["components/static/profile.html", "dOiBKQKC9S4yYt6sxdBYX1NXvZ3zDAGZ"],
        ["components/static/venue.html", "dOiBKQKC94yYt6sxdBYXBYX1NXvZ3zDAGZ"],
        ["components/static/venueCtrl.js", "dOiBKQKC94yY6sxdBYXBYX1NXvZ3zDAGZ"],
        ["components/static/staticCtrl.js", "oZ4xhieFnlGloNmrZJXF4RoknjEYoNk1"],
        ["components/user/forgot.controller.js", "d5TwXt8KxEeA9GPUKamuP8Mlt4vrEshw"],
        ["components/user/forgot.html", "spM8N6gHRONxvEgabQDVK9X6H5vUDkz2"],
        ["components/user/login.controller.js", "sia6iuKsVQLvCzEci5BUerRXWjImmNvY"],
        ["components/user/login.html", "0BvM3xSAXWTLeE8rU1OYSSee99UOdzT4"],
        ["components/user/newuser.controller.js", "scxFNh6bj7lthIJ7HPDgLOqAvq1YA555"],
        ["components/user/newuser.html", "ES3q4mPqc5Q1KaN5qyp3d1uawEigx622"],
        ["css/all.css", "Z1UeTxyNU0Y8SYhk9LXDpRBRvjtnR1LZ"],
        ["css/all.min.css", "LB1c2eWUTKpUsgToBJQDNoQz2To17Asj"],
        ["css/bootstrap.css", "IoQKDg9plleZyyr3aFufZEl1pd7I2vg0"],
        ["css/bootstrap.min.css", "F2qyhIBfmQP191CdKDDRtrn58QRjQHsb"],
        ["css/libs", "T1FTCKYPbVlgLgVk21DT7tUhsssq0U0b"],
        ["css/mdb.css", "Mswuj4JvLUyIyZU1g5SROT9xYn0fmQwG"],
        ["css/mdb.min.css", "YTSC6u9I6qyx3daz1jWT3dMW6SPRK4ry"],
        ["css/style.css", "W1CeMcZ5sRcCWpVrqajoKMLh8O6cpJVE"],
        ["css/style.min.css", "3S1zPUY9EdBaDR4IfE4ykKloFSbUhN9K"],
        ["css/addons/datatables-select.css", "tBOHInrZpZ6yK4CTtTYgOXAQQHCGmqf2"],
        ["css/addons/datatables-select.min.css", "gd0bLVfLoW8ihyaasRrQ3o5ZRJzgUloT"],
        ["css/addons/datatables.css", "2mnFDDv5GfBtstJKPCIJ0ZaLwGm0MSJc"],
        ["css/addons/datatables.min.css", "0HdN3f09MiNh8MjRDBq4ELsBy3Q0aMm4"],
        ["css/addons/directives.css", "nv6FmqEMQmKP20EhxI55Dq7YSJ7e7i1D"],
        ["css/addons/directives.min.css", "05LyzpLtEcoPdJ08ZFRQDTtqLVRs4Ox9"],
        ["css/libs/font-awesome.min.css", "C7I0PqXl3bXe7g3aPFz03SDj159cRCoX"],
        ["css/libs/jquery.dataTables.min.css", "NrYvKyY8mpahOKJ5pMTiCNQtvHlGqIvo"],
        ["css/modules/animations-extended.css", "bPPg4763XbLYBH2bB50ONwjHerLMW7EN"],
        ["css/modules/animations-extended.min.css", "b3BZYJtkV1LANb33WXobn8vpSf8H4vqE"],
        ["css/temp/register.controller.js", "iCpYKaAvWCAABNcE7aY7hsb3SHHmsT0d"],
        ["css/temp/register.html", "DOmpDfUcK0OkpPVcPgkLpYVIpsiFwQSG"],
        ["font/fa5/fa-brands-400.eot", "YLdh55BRGBgfj1RXXIGScjItA6oqKE1C"],
        ["font/fa5/fa-brands-400.svg", "J2kwWqVBEbXrLQTRtAmVSKyeFc1BwERf"],
        ["font/fa5/fa-brands-400.ttf", "iRTypq5YhOrIf52bGbj7iEDEUVoL2awO"],
        ["font/fa5/fa-brands-400.woff", "BW82sQNZaeHF9CJec4bYa5Adc7j0M4WC"],
        ["font/fa5/fa-brands-400.woff2", "UFAZI0XOvRTyqwltahEpsAoiObBvlbrm"],
        ["font/fa5/fa-regular-400.eot", "8FXtk9MTzSCqc6gMNUlD8m5eL8RhHPHh"],
        ["font/fa5/fa-regular-400.svg", "N9Ua4L5xBHpuPhaz6LpCn19kPQJLxqky"],
        ["font/fa5/fa-regular-400.ttf", "zaRWwzonG2GJg0JYWCX2Q29AdjujFcGW"],
        ["font/fa5/fa-regular-400.woff", "iFaJy66Lg1dkXQtKfMfK0ihoeLpsMREW"],
        ["font/fa5/fa-regular-400.woff2", "Zg2EYvk8jMN7pIAws9udKA9I7MIO1sZO"],
        ["font/fa5/fa-solid-900.eot", "s3Y38vWGYzIRHvwhhTafUpaEtlolofiJ"],
        ["font/fa5/fa-solid-900.svg", "A5qrCmpYpzbh2oClAFnuv1wFj22I5sqw"],
        ["font/fa5/fa-solid-900.ttf", "NamvMtToW4RRGb2Tr4yXeAi4B30L1cnL"],
        ["font/fa5/fa-solid-900.woff", "yQ530ssowd6igxrfYgsK35PtpTbnyXRB"],
        ["font/fa5/fa-solid-900.woff2", "qVyhI8Fa9fpj5kFjEHzv1hepQVfyk2d2"],
        ["font/roboto/Roboto-Bold.eot", "4fqdJ43uh48qtrcnLxASCZKQ4frTZN6C"],
        ["font/roboto/Roboto-Bold.ttf", "S4rAAp0t2LkjF4MPJMLQiGHbFXqNrXgG"],
        ["font/roboto/Roboto-Bold.woff", "7JRJY1sPWMLPjuH2quPgNpCUQW9vg4Zr"],
        ["font/roboto/Roboto-Bold.woff2", "pICGotg9aemG9AZn1UL7pBLvBsEzB2oe"],
        ["font/roboto/Roboto-Light.eot", "DFFCbFqjKPBel39qu6Gb2nfe2mKawgGX"],
        ["font/roboto/Roboto-Light.ttf", "jusRGf2WRiSEJDSDsLjfprIzk7oDPP1Y"],
        ["font/roboto/Roboto-Light.woff", "CEdcE0gdfrmiiQTxThynlrSjHkBrX6QT"],
        ["font/roboto/Roboto-Light.woff2", "FyV5eJY5gDEUuZkMgX0h054GkV0upJnV"],
        ["font/roboto/Roboto-Medium.eot", "HSiUolacwELLgpN36LNdd6eEYvB7X7z1"],
        ["font/roboto/Roboto-Medium.ttf", "A72JmfKg4jEApVs5786wgilu9R7xc730"],
        ["font/roboto/Roboto-Medium.woff", "12zpZkVe7SjYcGk7Rl8wkIHhQ52y5u0b"],
        ["font/roboto/Roboto-Medium.woff2", "CxTWQRBgKKRSsJA3uXnPGHTpHHZZu95n"],
        ["font/roboto/Roboto-Regular.eot", "8QJC82Ifnkv41xohToD5vjJRTL9DSXzG"],
        ["font/roboto/Roboto-Regular.ttf", "ileFFf1l5hGej35DDFrflqt0XnMjnu9i"],
        ["font/roboto/Roboto-Regular.woff", "WarImIREuatLCZlgXQ0ce9Asbj5vekfh"],
        ["font/roboto/Roboto-Regular.woff2", "3ib1awEwz5Z4IvpB14DQHAXpRYER2Qks"],
        ["font/roboto/Roboto-Thin.eot", "XklMf4kbFPYkESmdzNSYBLjOO0v0YbJe"],
        ["font/roboto/Roboto-Thin.ttf", "KDAsXeGrUFqKdTka7PYpZELkIZwmmBJG"],
        ["font/roboto/Roboto-Thin.woff", "CKohkNXyhUu1JSUuzjamrdNYF2TgJjHZ"],
        ["font/roboto/Roboto-Thin.woff2", "KjypOog5Gzri6FMub47PhWBtDLSeMcpM"],
        ["images/favicon/android-chrome-192x192.png", "pGt3b5opnG7mdIbn3FnOYu6fz8dbaklO"],
        ["images/favicon/android-chrome-512x512.png", "kdmGBUklqYGkkUWNw3DqzwSYH3djCEWv"],
        ["images/favicon/apple-touch-icon.png", "FdUvPJxEcqq8PLOzcpKluKbNobW37x4f"],
        ["images/favicon/browserconfig.xml", "dvhmXSCTaQchjC3BtU9dY2SaRUfTXNfH"],
        ["images/favicon/favicon-16x16.png", "KRm9obCUl6Cy4C65HPVn3ZW7Ay0bN7cR"],
        ["images/favicon/favicon-32x32.png", "iWNsaAQcXMiSAz6XAKjY2Vg6KjqFTS73"],
        ["images/favicon/favicon.ico", "A9uvaMOBGR7V832mQp0Zr4p1QDPJ10KB"],
        ["images/favicon/mstile-150x150.png", "MxsShPcaxOuqaXk0elRvYdmF6kivqDKf"],
        ["images/favicon/safari-pinned-tab.svg", "hf9KxECjJktBUVfhsczdcZJ9mQvcXsCE"],
        ["images/icons/apple-touch-icon.png", "te0Fc9YFDHbsy86AcKF9Bbf77FovSTLf"],
        ["images/icons/icon-128x128.png", "nSjCUHiXpAjQD2bcjmLoa4RERjpQB7FN"],
        ["images/icons/icon-144x144.png", "jYwuyWsuEhL5TMkSkbLCFLBI30nW84EJ"],
        ["images/icons/icon-152x152.png", "ppc9Lo4rJ1zZrRbORh0mkKAKl4mmhcoi"],
        ["images/icons/icon-192x192.png", "awc4JLxOtGmSunbYakOYCfPbocdw9OS6"],
        ["images/icons/icon-384x384.png", "geRI2YY7TBhIV4ZGhk2tb18UouXZg83N"],
        ["images/icons/icon-512x512.png", "x0Z0yyqRd3rg7mwO4a2QVKDP9kEdYPI5"],
        ["images/icons/icon-72x72.png", "ugB5LpXO3ItNxuzMykPrkaXbUdIW29Jt"],
        ["images/icons/icon-96x96.png", "GmOl1JLWgIEvGuw1SwZmiSSrCTWHTseD"],
        ["images/splash/launch-1125x2436.png", "yNzwelsRyn9Aa1AtyM9Pp9NFScMKYZsS"],
        ["images/splash/launch-1242x2148.png", "XhnabUH4GKCG4rxlVPDvRm6DEJPVQahb"],
        ["images/splash/launch-1536x2048.png", "PNI0Oed4TcK203AVat5rXSaPEuoR7xXJ"],
        ["images/splash/launch-1668x2224.png", "Rpa5KxKCX0SqUTlXRI0o7wfSP5ToPNJj"],
        ["images/splash/launch-2048x2732.png", "BSa9LsHOcUQCNQn7uOb1RFdKjkeZUDsh"],
        ["images/splash/launch-640x1136.png", "m1y0NN5LOlgV8pF93vjPwlyeSLnS0O2t"],
        ["images/splash/launch-750x1294.png", "1fZfzmtyu4bkT1t5nDXxNLPyvTM80D3j"],
        ["img/abo.jpg", "VxLromE55KITF3fGCnbZLiLZiSYfUv8l"],
        ["img/app_icon.png", "xphmUPx3RZqb8j7t0tnO2M3GHLleqdCz"],
        ["img/arrow_down-min.png", "VrO8cU4ipv7ROzZoOsK0rQI8tWIjeAUP"],
        ["img/arrow_up-min.png", "QmqmJwcO5X4blme81f6TeviXnuUW1AIJ"],
        ["img/avat.png", "uvYyL0INxU1u5BJxRymFBw4eN1HBxeZs"],
        ["img/BALLET-FOLCLORIC-DE-CHILE-BAFOCHI-min.jpg", "IOvEtu5QRuYv4VtJbt98oUXpM1Exiv5h"],
        ["img/bottom-border.png", "K36n52V0ip8jGNTJE8Az3pZVPpgiG9LB"],
        ["img/calender.png", "UWbPn05aVPgIlNdi6hqRe1j84EEMxAux"],
        ["img/check_act-min.png", "Jz8yRWx8PgBTGYGJgWGLh6f0OYpswrlJ"],
        ["img/check_inact-min.png", "SK0niSMV9ctT1lsMadL799hPGZSx080i"],
        ["img/dummy.jpg", "kdE9qFCNW2DeWXmEivoKl6boqHM4nZ0k"],
        ["img/fb.png", "scMG5TCddOCTlcfauDsh7DnpJOD0LC2p"],
        ["img/flags.png", "T8zBZkUdAa6ShUYWsAaiQy1KpANinlfH"],
        ["img/forgot-min.png", "ylFUmKmon4Fh2TLxjnqOWD1ZvZ3gxLlh"],
        ["img/HA-NOI-DUO-min.jpg", "Rn9u9Z3uwdkFk5E7qNtKJ7YRrjrk1oby"],
        ["img/inner_bg-min.jpg", "OmL1IUen32GxRiPO35lwUaHNVaErBllr"],
        ["img/inner_bg-min.png", "3Zlg5uPaCeGiapex4cu4TTJLXb90eaIM"],
        ["img/insta.png", "DxsRp9tRisXQL945S9y5dF0utc4kqBpK"],
        ["img/lightbox", "jlot5WIrFWxHLjvugFWKEXzlXlJv5hok"],
        ["img/load.png", "DUDTnXEmpAkwjiKExt64eknqMLDcpH6Z"],
        ["img/loader.gif", "P0G5PDJ1l51Q1L4uNFGuwaWvyJR0mfwp"],
        ["img/location.png", "g933b8Zh8VD5QnPewAo1AN6QaGoNNaWT"],
        ["img/login-min.png", "EvC2C5dF9x4U4B6rhubfRL1sgZJgHwfG"],
        ["img/mail-min.png", "M1U4VK6hxbm3x52ZWd3ekFw9h3LCD3Ji"],
        ["img/map.png", "pn1XAazuTuIaMvngn7QJTrkvAfjsANg2"],
        ["img/MEHDI-NASSOULI-min.jpg", "Xlb79sqRwozO0VL6O3A0JMpCJ2EtrCML"],
        ["img/OLGA-CERPA-Y-MESTISAY-min.jpg", "2D8bK3scqO2txWCzspo9VHRcoQcIq3Rx"],
        ["img/OTAVA-YO-min.jpg", "WHlA2cSfdIJU3Eb50uS5O0BdXO3NN9LL"],
        ["img/overlays", "iE1CYltODFO2Lv3tCkqmBkD86M8MJ53Y"],
        ["img/password_min.png", "fd11SQavlk8t6MEDihQuwaUMY4wFBcvl"],
        ["img/plus.png", "Ql8awS9qKNWvl5yw5olGSKL9hARLNWOR"],
        ["img/RAJERY-min.jpg", "E3Aw3qh6Wjtz4GYmhGhQNCfIwHNNQZ43"],
        ["img/registration_bg.png", "hwwolLJvWgXJYOVjLgD5X4XzBymHK7RA"],
        ["img/registration_desktop_bg.png", "3Xv0ep00U45IgVjtywJhMfhVzPtWRbUc"],
        ["img/registration_logo.png", "OmqYelULC4bYkEgUoOEYuqaFU0duUeek"],
        ["img/rwmf-02.png", "XXr9TqFuWeilj0fkP5aiDcEdmaDCJynl"],
        ["img/searchicon.png", "fItxN2YjIuNkyz0h1ozayeQgjFczW8Bk"],
        ["img/share.png", "DPhh3eC1GVjK9mdzL3PFHpQvNUfLJqlX"],
        ["img/sidenav.jpg", "G1gnKw35eMHGuYoG71jtQKWlcqDpSC78"],
        ["img/SPIRIT-OF-THE-HORNBILLS-min.jpg", "J14l5vreupa6Yb2IaChULUWErl18aMzo"],
        ["img/SUK-BINIE-min.jpg", "x3uBtnYLnWK8AxLNNwnI8B7LMFEfMgWv"],
        ["img/svg", "HEGykNHxteXPiGe47HqY5T5RnUobofkm"],
        ["img/TALISK-min.jpg", "948n9XqVkB0vH48NvVnAeKYNFCwR3K7a"],
        ["img/ticket.jpg", "djLBYPOxRnTDc1dOCVQ1Nc5mVIOxYxQJ"],
        ["img/time.png", "HzPn2vcNWATgB5xdPpBjthLktnUXXcAR"],
        ["img/twt.png", "nw2ptpjlQgDAKOtEuWT0npPGBRR2PCqC"],
        ["img/user-min.png", "nmz9VRltMi33NUSXgj6z0T94JxXUiSun"],
        ["img/lightbox/default-skin.png", "ooU3jVjxZMbilFDUNYBJq5huHRcaUGDj"],
        ["img/lightbox/default-skin.svg", "8r3jNCavUgdEEei5FWQ6DbEOILOWX7HE"],
        ["img/lightbox/preloader.gif", "N6pfD5HildNk6RSQoKS1bbU7ZZPb2xIo"],
        ["img/overlays/01.png", "VnBORSXGT94DXo3ALgiFDv9Uz0s872k9"],
        ["img/overlays/02.png", "hGtLnAZMglioXDRq4OlOYd9GkuaUCS2Q"],
        ["img/overlays/03.png", "rT7XAbXCBNEV0Ov0De0vUA6eKLjEyne1"],
        ["img/overlays/04.png", "nRdoh0ofA8wMPVhjZTOKcIR1X8prCUaA"],
        ["img/overlays/05.png", "l6sy7RV3rqkEhsLIWcBZFzq5I5jue9UK"],
        ["img/overlays/06.png", "gQ5hnMsZL30Wg7r44R7oMVPby1X538aj"],
        ["img/overlays/07.png", "wrrxZf78NWow7EMTsb2iJsD5NrBNlSVa"],
        ["img/overlays/08.png", "fOsM50QbwDtj5MWS9TXOQFbFxfxA5vRH"],
        ["img/overlays/09.png", "g85rWbmQnaO5seGcxy8qq1JdSAw1nVR9"],
        ["img/svg/arrow_left.svg", "BgEQPrVkpxw3JI9ZNOqhdKLjVuUamC4U"],
        ["img/svg/arrow_right.svg", "zJ7u2NOYWB3E8omEsTnG0oGz5u5fq9tO"],
        ["img/svg/flags.png", "pjlcvg9BQcmbDRIQoA7NsanL8z5M2MzC"],
        ["js/bootstrap.js", "Oohkp7Fm50Zzx5O9cgLSO7BuifVTZIGF"],
        ["js/bootstrap.min.js", "a9SeNZE8KjsgHoWlxGKjDIoe53fqvPbK"],
        ["js/custom.js", "J4YLSIx3EcSM773ZjlkWTJJY6NCbNrFh"],
        ["js/jquery-3.4.1.min.js", "rslRIQFabKUQqAY8dc2jwkZgDoGxExTn"],
        ["js/main.js", "AbljssAITwcoyAX2Kml0eIqp4sTuCkZI"],
        ["js/idb.js", "AbljssAITwcoyAX2Kml0eITwcoyAX2KmCkZI"],
        ["js/mdb.js", "tiCfqZ4dRqAV9WgRlkLZ3iXnJqckvUOh"],
        ["js/mdb.min.js", "3jr2NkULwXbojBt3CtLjSjUO81kOQeT4"],
        ["js/popper.min.js", "9o92Fh9uQB3aVdD3NNmnj6D7D336P8iF"],
        ["js/addons/datatables-select.js", "2aCxXIKoJ5y6bVeHEkeRCCaTuALRjb0T"],
        ["js/addons/datatables-select.min.js", "Q2vk9y6sZl54Lm7GzvM3yn93HGHkoteO"],
        ["js/addons/datatables.js", "CvuS9ahagWBYcWrzqTcRGB6f7BUhpGIK"],
        ["js/addons/datatables.min.js", "CWPwIXENH4wm8EFJYQ3fvS5qQXFFOM6b"],
        ["js/addons/imagesloaded.pkgd.min.js", "WQL2Up2ywfQz9ncgZ5CUtIqJdyIVyvqP"],
        ["js/addons/jquery.zmd.hierarchical-display.js", "fiywWYW9re6s7rmPAn1OKsiikbF9Tlib"],
        ["js/addons/jquery.zmd.hierarchical-display.min.js", "Wa6M0H8dlbCFjnqiHaHb9N8vGcfcUZrY"],
        ["js/addons/masonry.pkgd.min.js", "WXQWnBDYxLU7oXD98EMg7rTOeTPbUPNJ"],
        ["js/addons/rating.js", "dCK3p6AiU09ayEqkZoitq3xJNfwUJlAS"],
        ["js/libs/angular-animate.min.js", "tjcrRweYT65oiA4fD751jlWo0hBiVjkZ"],
        ["js/libs/map.js", "tjcrRweYT65oiA4fDrRweYT65ohBiVjkZ"],
        ["js/libs/angular-animate.min.js.map.txt", "ZGZtwk4taU3sklUmdoU8YnB2JLiI8D07"],
        ["js/libs/angular-sanitize.min.js.map", "QHMmJ6arDjqpKy20HoFp19vyuPQU9rP0"],
        ["js/libs/angular-ui-router.js", "lPvrKehKHTbxwnLzO9BeyHNTDktEOP1h"],
        ["js/libs/angular.min.js", "srivIAmyso9U0dG5pLeCMxzcWh1t8aES"],
        ["js/libs/bootstrap-lighthouse.js", "ssgs4OiP6l4rU25wCFxELdE8R6Wt1mfx"],
        ["js/libs/clipboard.js", "bEig9Igi1I2UrJtPssbRJTVQXUh1GN4O"],
        ["js/libs/cookies.js", "aQQ6vEcYJRJ0OJjvAHkx9CRDrtHpIGjK"],
        ["js/libs/jquery.js", "GYZoYcHyqRAf54X2YTXtvX1oPEbmF4RX"],
        ["js/libs/ng-sanitize.js", "ON904j32Zq2PJQJsInyEPL163UVqiVWx"],
        ["js/libs/platform.js", "fReDLS47TegVGzF1roEbJtozLuewlxDh"],
        ["js/modules/bs-custom-file-input.js", "mEWYzPZTtoJuTy83ypsZ59BmcPP9zsHI"],
        ["js/modules/chart.js", "8QaOUOXLy6R0dsv1nhxQWNrAReS6QcwV"],
        ["js/modules/enhanced-modals.js", "8GVTczvqMrXYAbk6yUiT9x9Xtm19aDHZ"],
        ["js/modules/forms-free.js", "WugrrlCorQm5DHN8nyK7wBM3sDW3uobG"],
        ["js/modules/jquery.easing.js", "9ZVXyYSUZnG3xxxof0U6xYTDOPPu1AjQ"],
        ["js/modules/scrolling-navbar.js", "D2VEpALNpv9MfwO8EEZ0WvDvVzmQnYnE"],
        ["js/modules/treeview.js", "PpG2iNshStmMO7fFWreJpgRxJqIAuhAh"],
        ["js/modules/velocity.js", "UzkjbF4kh9KvtZyiQyj24W5Nqm7JDMSv"],
        ["js/modules/velocity.min.js", "ptZVdGqJrs06L2kpQawWwSiSLlkcgihF"],
        ["js/modules/waves.js", "ouOjwCh9sZV5xKXUhExkeGlEOuStEwNF"],
        ["js/modules/wow.js", "N7WvkXwERNQXn3Ivxe9PsQSOf3ux2fme"]
    ]
    //     /* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-sw-precache-' + (this.registration ? this.registration.scope : '') + '-';
var IgnoreUrlParametersMatching = [/^utm_/];

var addDirectoryIndex = function(originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
        url.pathname += index;
    }
    return url.toString();
};

var getCacheBustedUrl = function(url, param) {
    param = param || Date.now();

    var urlWithCacheBusting = new URL(url);
    urlWithCacheBusting.search += (urlWithCacheBusting.search ? '&' : '') +
        'sw-precache=' + param;

    return urlWithCacheBusting.toString();
};

var isPathWhitelisted = function(whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
        return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
        return path.match(whitelistedPathRegex);
    });
};

var populateCurrentCacheNames = function(precacheConfig, cacheNamePrefix, baseUrl) {
    var absoluteUrlToCacheName = {};
    var currentCacheNamesToAbsoluteUrl = {};
    precacheConfig.forEach(function(cacheOption) {
        var absoluteUrl = new URL(cacheOption[0], baseUrl).toString();
        var cacheName = cacheNamePrefix + absoluteUrl + '-' + cacheOption[1];
        currentCacheNamesToAbsoluteUrl[cacheName] = absoluteUrl;
        absoluteUrlToCacheName[absoluteUrl] = cacheName;
    });

    return {
        absoluteUrlToCacheName: absoluteUrlToCacheName,
        currentCacheNamesToAbsoluteUrl: currentCacheNamesToAbsoluteUrl
    };
};

var stripIgnoredUrlParameters = function(originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
        .split('&') // Split into an array of 'key=value' strings
        .map(function(kv) {
            return kv.split('='); // Split each 'key=value' string into a [key, value] array
        })
        .filter(function(kv) {
            return ignoreUrlParametersMatching.every(function(ignoredRegex) {
                return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
            });
        })
        .map(function(kv) {
            return kv.join('='); // Join each [key, value] array into a 'key=value' string
        })
        .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
};


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, this.location);
var AbsoluteUrlToCacheName = mappings.absoluteUrlToCacheName;
var CurrentCacheNamesToAbsoluteUrl = mappings.currentCacheNamesToAbsoluteUrl;

function deleteAllCaches() {
    return caches.keys().then(function(cacheNames) {
        return Promise.all(
            cacheNames.map(function(cacheName) {
                return caches.delete(cacheName);
            })
        );
    });
}

this.addEventListener('install', function(event) {
    event.waitUntil(
        // Take a look at each of the cache names we expect for this version.
        Promise.all(Object.keys(CurrentCacheNamesToAbsoluteUrl).map(function(cacheName) {
            return caches.open(cacheName).then(function(cache) {
                // Get a list of all the entries in the specific named cache.
                // For caches that are already populated for a given version of a
                // resource, there should be 1 entry.
                return cache.keys().then(function(keys) {
                    // If there are 0 entries, either because this is a brand new version
                    // of a resource or because the install step was interrupted the
                    // last time it ran, then we need to populate the cache.
                    if (keys.length === 0) {
                        // Use the last bit of the cache name, which contains the hash,
                        // as the cache-busting parameter.
                        // See https://github.com/GoogleChrome/sw-precache/issues/100
                        var cacheBustParam = cacheName.split('-').pop();
                        var urlWithCacheBusting = getCacheBustedUrl(
                            CurrentCacheNamesToAbsoluteUrl[cacheName], cacheBustParam);

                        var request = new Request(urlWithCacheBusting, { credentials: 'same-origin' });
                        return fetch(request).then(function(response) {
                            if (response.ok) {
                                return cache.put(CurrentCacheNamesToAbsoluteUrl[cacheName],
                                    response);
                            }

                            console.error('Request for %s returned a response status %d, ' +
                                'so not attempting to cache it.',
                                urlWithCacheBusting, response.status);
                            // Get rid of the empty cache if we can't add a successful response to it.
                            return caches.delete(cacheName);
                        });
                    }
                });
            });
        })).then(function() {
            return caches.keys().then(function(allCacheNames) {
                return Promise.all(allCacheNames.filter(function(cacheName) {
                    return cacheName.indexOf(CacheNamePrefix) === 0 &&
                        !(cacheName in CurrentCacheNamesToAbsoluteUrl);
                }).map(function(cacheName) {
                    return caches.delete(cacheName);
                }));
            });
        }).then(function() {
            if (typeof this.skipWaiting === 'function') {
                // Force the SW to transition from installing -> active state
                this.skipWaiting();
            }
        })
    );
});

if (this.clients && (typeof this.clients.claim === 'function')) {
    this.addEventListener('activate', function(event) {
        event.waitUntil(this.clients.claim());
    });
}

this.addEventListener('message', function(event) {
    if (event.data.command === 'delete_all') {
        console.log('About to delete all caches...');
        deleteAllCaches().then(function() {
            console.log('Caches deleted.');
            event.ports[0].postMessage({
                error: null
            });
        }).catch(function(error) {
            console.log('Caches not deleted:', error);
            event.ports[0].postMessage({
                error: error
            });
        });
    }
});


this.addEventListener('fetch', function(event) {
    if (event.request.method === 'GET') {
        var urlWithoutIgnoredParameters = stripIgnoredUrlParameters(event.request.url,
            IgnoreUrlParametersMatching);

        var cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
        var directoryIndex = 'index.html';
        if (!cacheName && directoryIndex) {
            urlWithoutIgnoredParameters = addDirectoryIndex(urlWithoutIgnoredParameters, directoryIndex);
            cacheName = AbsoluteUrlToCacheName[urlWithoutIgnoredParameters];
        }

        var navigateFallback = '';
        // Ideally, this would check for event.request.mode === 'navigate', but that is not widely
        // supported yet:
        // https://code.google.com/p/chromium/issues/detail?id=540967
        // https://bugzilla.mozilla.org/show_bug.cgi?id=1209081
        if (!cacheName && navigateFallback && event.request.headers.has('accept') &&
            event.request.headers.get('accept').includes('text/html') &&
            /* eslint-disable quotes, comma-spacing */
            isPathWhitelisted([], event.request.url)) {
            /* eslint-enable quotes, comma-spacing */
            var navigateFallbackUrl = new URL(navigateFallback, this.location);
            cacheName = AbsoluteUrlToCacheName[navigateFallbackUrl.toString()];
        }

        if (cacheName) {
            event.respondWith(
                // Rely on the fact that each cache we manage should only have one entry, and return that.
                caches.open(cacheName).then(function(cache) {
                    return cache.keys().then(function(keys) {
                        return cache.match(keys[0]).then(function(response) {
                            if (response) {
                                return response;
                            }
                            // If for some reason the response was deleted from the cache,
                            // raise and exception and fall back to the fetch() triggered in the catch().
                            throw Error('The cache ' + cacheName + ' is empty.');
                        });
                    });
                }).catch(function(e) {
                    console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
                    return fetch(event.request);
                })
            );
        }
    }

});