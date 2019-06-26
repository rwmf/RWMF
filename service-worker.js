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
            ["images/favicon/android-chrome-192x192.png", "Za8CtXJf0WmwkVQYgu0kxMJ7x1DW37aZ"],
            ["images/favicon/android-chrome-512x512.png", "0St38RgONsqFGfJPI3l4SpbIFI2Wu1XH"],
            ["images/favicon/apple-touch-icon.png", "V0ep7N65rjAoFLo3o2OfsB9oB5z7KU8N"],
            ["images/favicon/favicon-16x16.png", "GNF0EiyaeTv6RFRcexBo4s4oY4iMy8OD"],
            ["images/favicon/favicon-32x32.png", "11JgfuCy8fU1OZrVGSkcPkk2u2frLV3r"],
            ["images/favicon/favicon.ico", "Mi0fucHUUaKinObaMhayYXwaJVyPKXWZ"],
            ["images/favicon/mstile-150x150.png", "eIK1b3aOQVzq5f7Ymlmd3xfML3nB0MNc"],
            ["images/favicon/safari-pinned-tab.svg", "Kw32bjR9MAgqhRz0f45yJtpBBhaetzgn"],
            ["images/icons/apple-touch-icon.png", "m4tRKs4fGyJ0E1vXBQDEDlpkowXuV6Xi"],
            ["images/icons/icon-128x128.png", "KoDoSekZdRs6mhYK3q89BwhRCAfWearx"],
            ["images/icons/icon-144x144.png", "L6EYE7VoFWXSeIVcsnPwjX3yAKLwc1pb"],
            ["images/icons/icon-152x152.png", "e6nx9utxlYdBpLjz26PJVKpwakIQ98tZ"],
            ["images/icons/icon-192x192.png", "MBCf3WM6nWv6qILGgz8emut9154OpI7a"],
            ["images/icons/icon-384x384.png", "cfN3oKJ07yFHZoS9J0RjdhhWfwQVP58U"],
            ["images/icons/icon-512x512.png", "qwTTh77BPkPX2kfdYxW23gf60Cdh4Upl"],
            ["images/icons/icon-72x72.png", "JgEzy34GOkSCOXRRG9ymaZkiHTwlWjjQ"],
            ["images/icons/icon-96x96.png", "RN2G22hDNPq728XhrFkY7LCWjqh1zYmo"],
            ["images/splash/launch-1125x2436.png", "9jg8wzY8FKuqmZ5SEeoUxsEKRR0s0Ory"],
            ["images/splash/launch-1136x640.png", "uOgMFwHbxDi3bSGLKU1YNgXgHXVIGGvE"],
            ["images/splash/launch-1242x2148.png", "4wh303zSYD417zgVwt27kzl9qge7hMzu"],
            ["images/splash/launch-1242x2208.png", "EksMYj8eIPgsn1v6gzs2YAV4AaTOnHw3"],
            ["images/splash/launch-1242x2688.png", "UafwPts6jVsqXfKfSnbluHM0He3uDksV"],
            ["images/splash/launch-1334x750.png", "6oU8iaE8rd9m5JIt5syen6vKwusmpdYt"],
            ["images/splash/launch-1536x2048.png", "NrcUTpbufXtt9ai6YvzSg2UgjjNcQw3z"],
            ["images/splash/launch-1668x2224.png", "RVkGgk30nagiTlkroT7v4kGEAQmUUz6b"],
            ["images/splash/launch-1668x2388.png", "8SBl4SODY958MuQZYv0fzLvKs8vGrqmI"],
            ["images/splash/launch-1792x828.png", "xScTMP0v499bnyJQ44oQKOe8ECC6A4sN"],
            ["images/splash/launch-2048x1536.png", "uqIsuqRe4POmubTnl9VaIJyB9MV9esnD"],
            ["images/splash/launch-2048x2732.png", "8XRIO3t9ZHNlWXyj89bwhQasaE0uUtOz"],
            ["images/splash/launch-2208x1242.png", "xHta9jkWcqxoitV1AujXH0T5n0buHnNT"],
            ["images/splash/launch-2224x1668.png", "nkKYh2LYIqeXB1rUQnOjwl7f78rKcqxN"],
            ["images/splash/launch-2388x1668.png", "X6uJSPLW5nTbSnaliNKPOcH4qVJzsatJ"],
            ["images/splash/launch-2436x1125.png", "UJ8OLuTAbG5zd7qlvTpAp9GJO5KjurQK"],
            ["images/splash/launch-2688x1242.png", "apUibVoKgoEdamJ74BLlRaw3IT1Nsttk"],
            ["images/splash/launch-2732x2048.png", "5kqeXX06tIMjlsTLlMqE8lwEAyy5CFyN"],
            ["images/splash/launch-640x1136.png", "9wZrtXGbkuF8gBdrz9wop7ANvvC4JjwM"],
            ["images/splash/launch-750x1294.png", "HvEXGAyWkkCi9HiO16kcABVrjNq7tGfm"],
            ["images/splash/launch-750x1334.png", "MxHO2Z3SjsTbGzR4GYNhqroqp4w4dPBE"],
            ["images/splash/launch-828x1792.png", "G1A2DDGvqdvXzj24e2EViNphLn13hk2w"],
            ["app.js", "ilrgZJ9WeG7bzax9WXZfYMnmuICoWTGy"],
            ["favicon.ico", "g66J7jqlkTutmHgfptiDEd9ooojXwVvj"],
            ["index.html", "KrDLW9Ih1lPBJL7PP8TqepLkTOYMxnEK"],
            ["main.js", "xZipZykTsFaiw9bclg1w4G0j4w0KjC0Q"],
            ["manifest.json", "ZQGqpzsLuWvkb7EAlkNxFBiSnGRfHByt"],
            ["runtime-caching.js", "kJfqlGsYYbfCMFlvPZ2AjGOcJ7QBdzz8"],
            ["service-worker.js", "WsxMqNXQ9pLkemk4nBS6q2zTUkJqYm7u"],
            ["sw-precache-config.json", "CAyQ9nz4ZimwzqPUqcysspDATkSJlaS1"],
            ["sw-toolbox.js", "NDYQ4u1leAuQBDnlZwR3IoL3P8VhRMaV"],
            ["admin/uploads/ads_image/ads_1.png", "orLq8kU9R75SONNqgsoWXcO5S0717YiG"],
            ["admin/uploads/app_icons/app_1/144x144.png", "38TTRjQNRXPGqOVwul8xKICUHeiPS4zW"],
            ["admin/uploads/app_icons/app_1/168x168.png", "8xiKZiTnkgEgTmkb1B0GpqVSxLBHAka0"],
            ["admin/uploads/app_icons/app_1/192x192.png", "fIsYjQQK4QhLajKIKTrt1EMNEUcTZFBE"],
            ["admin/uploads/app_icons/app_1/48x48.png", "ovM8801ULPI97xbCUhLWKZdV0HVrFWbV"],
            ["admin/uploads/app_icons/app_1/512x512.png", "0ArfqofdGJ4Ad7k6mfZL6S11Cmoaa1aD"],
            ["admin/uploads/app_icons/app_1/72x72.png", "khc6aYTv4x4pqW8Ou6pYzHT0GbcKTeyX"],
            ["admin/uploads/app_icons/app_1/96x96.png", "KA7AyldTSzKkRwufJAw5WVLBhpIsldnz"],
            ["admin/uploads/default_image/ads.png", "zWj953RMGuF88s3a7haGZojE3XsfWavf"],
            ["admin/uploads/default_image/loading.gif", "opmNhGhg4wNHvRXgay8Aqv2LU08AD2rG"],
            ["admin/uploads/default_image/logo.png", "XoNuKEz2oBvpQ9oDj1nPthIxYnQ3vG00"],
            ["admin/uploads/default_image/noimage.png", "4E2eFTqJK37HzX29Eh1xTZfFBp7t7D8I"],
            ["admin/uploads/default_image/programme.png", "udya4xri9UnotTlnE7Y6jrXjkIyuhmGe"],
            ["admin/uploads/default_image/programme_bck.png", "Gpk3Xczic3z0fqR05g7uSkLPIYGFCuzp"],
            ["admin/uploads/default_image/user.png", "3LjHMgVLMz6K48crxcEwnrucGxyemUcC"],
            ["admin/uploads/gallery_image/gallery_1.png", "ZoKqzRzvYWqZqalmNW2uJ83xGSDdi9R7"],
            ["admin/uploads/gallery_image/gallery_5.png", "J8HnPRslAWfZQ5Yj9uGvkIY47vMyC6bt"],
            ["admin/uploads/privacy/privacy.pdf", "B8GfPOeTGDGJmgaltkgQMf8S8WcYf5c9"],
            ["admin/uploads/programme_image/programme_1.png", "FY1zI9fLRWnuvkBqA9iwL1cv944PSFDS"],
            ["admin/uploads/programme_image/programme_10.png", "5aLQvbwrHouzWE8VOKMkDe7B5uj0N6ua"],
            ["admin/uploads/programme_image/programme_11.png", "1DGn7TVungJ6AZxnz4xS5O2up3uHaSg9"],
            ["admin/uploads/programme_image/programme_12.png", "JAlgiVcqBmVtWW9RyjF0SLSPq2cQtHFe"],
            ["admin/uploads/programme_image/programme_15.png", "FwTKKsnwR1hTnhLad1qThGC91ONlJVU7"],
            ["admin/uploads/programme_image/programme_16.png", "64wWgourlTdpNUnw99tHiKFKZOwjotV4"],
            ["admin/uploads/programme_image/programme_17.png", "OUvWsgiOYUWjQrFj9PUEPKh2f5YtjjoE"],
            ["admin/uploads/programme_image/programme_19.png", "vAFv4wNrRkAiSlKwJDUGfKeYyVL5Ex1k"],
            ["admin/uploads/programme_image/programme_2.png", "75VKypyQyrodvnRMiD2vFxG4szKHI4Al"],
            ["admin/uploads/programme_image/programme_20.png", "MMfCk0LeXE0MxfIyAo6u7ECEaPkGZ4OR"],
            ["admin/uploads/programme_image/programme_21.png", "aywC9jQOzSTwfXP0fVjM8rmI8aqMsiDL"],
            ["admin/uploads/programme_image/programme_28.png", "RFTF8ZeQdTQFoPOe6OMW46ui9zAUooqm"],
            ["admin/uploads/programme_image/programme_3.png", "vZ6e9vvIWMoUD38040I164i6ZSRInH1H"],
            ["admin/uploads/programme_image/programme_4.png", "PuXf3kcujMVgF4DXqTVEgmt2w2nCRkZ8"],
            ["admin/uploads/programme_image/programme_42.png", "9sRYcNQTMcHbIi6kP0wPrwelIhWQLFO3"],
            ["admin/uploads/programme_image/programme_5.png", "a2CsByp3Ou799QJYTEcgX7WxZr8yqyvl"],
            ["admin/uploads/programme_image/programme_6.png", "MEdMKx6PXqNrmagtsJ43tdlaW9TpgZbx"],
            ["admin/uploads/programme_image/programme_7.png", "X8vuRieWMNdguq0mmM77wXdfDTzLD87t"],
            ["admin/uploads/programme_image/programme_8.png", "PVYa29IgMErhQIAmM2BGutrmr8AasAHH"],
            ["admin/uploads/programme_image/programme_9.png", "DOvcWAokzj3IPhpAhzBMBKNzrFwaNdoR"],
            ["admin/uploads/rwmf_image/rwmf_bus_1.png", "C8HDDy77pN9l5z8TTYYgHDWMOC39Wj0s"],
            ["admin/uploads/rwmf_image/rwmf_ticket_1.png", "CYVWPgwKj8iocl6fDWf4UXnmLrs9SDA6"],
            ["admin/uploads/user_image/user_2.png", "xu6r0B3oFcYI3uK1zgYuyC0t9oqjXiLV"],
            ["admin/uploads/user_image/user_6.png", "Abw4X020bpkzGDu0In60lcGDSPX2kZP2"],
            ["components/general/ads.html", "gu1nfHm1cLIxYX3RXQ8veSml4SJuOk6x"],
            ["components/general/busSchedule.html", "RtcPmNRHhskaYuE0JCJPGd09UP3qMGjz"],
            ["components/general/general.controller.js", "kwnJ2xe5BG6jb2j87eBaPhL7vEs5iAD6"],
            ["components/general/ticketInfo.html", "WEgyRuJEDVuAJWGIpav4c8r2COp2x47p"],
            ["components/header/header.controller.js", "iGAwz81Bo25rtk98cWKieSJ6uoHCBdps"],
            ["components/header/header.html", "ku6FMmyjJamRRWZEoTTyTOhCaI42ck7Z"],
            ["components/home/home.controller.js", "QgnKhbdnBT07L4Q9BQhszhAJpdDXHRqY"],
            ["components/home/home.html", "7PAIHqOzNt6PbeMgfbMGu9HauRd2uOS6"],
            ["components/home/homeSearch.controller.js", "NSvEesdABToDf4YJcPTQgqX80oC39yix"],
            ["components/home/homeSearch.html", "BaCACryjsW80IXs2CGeeSoK7BhJz7kiw"],
            ["components/program/programDetail.controller.js", "WmUVtWSC6e9j4s8R6qjbcq8p27U8SQPs"],
            ["components/program/programDetail.html", "XJm4aS1F1vV8TE7P7aXnqYbU4WkxUQv1"],
            ["components/program/registeredProgram.controller.js", "HXLBuv9WR8Z7x7f1KOs5ImLlI79lEyep"],
            ["components/program/registeredProgram.html", "msXtt5B9LMatM3WJDgWkJ5X4z0GOYPPA"],
            ["components/static/about.html", "CDNeqaf5SOrzHuXrW77EZSU9zmVcbTf3"],
            ["components/static/contactDetails.html", "iLvAp4MgBGSYzxNDmOOcz1inml3Lc3tS"],
            ["components/static/profile.controller.js", "qMLIpHCGRSrjJGfUlB2XyFc0ssjPE9wt"],
            ["components/static/profile.html", "RxVtwJ71DuTsPV61WoYbAymTuZax6BeA"],
            ["components/static/staticCtrl.js", "hl7uefyjELRgBdBwRDWvv3wxhf2V75tL"],
            ["components/static/venue.html", "1qoOGNa3GpTXEaXQZhq4xUZGJcKcmVPG"],
            ["components/static/venueCtrl.js", "XbWVqH2A6U6BgOz1vUQFlSCMh9Cn8Ohm"],
            ["components/static/venueLocator.html", "BIujgYX6NCrzeL5CHOOJQ9Vc4bA6MWWd"],
            ["components/user/forgot.controller.js", "o7QQHLazW1ZbZ0nttvnaELdIF1VoMSWA"],
            ["components/user/forgot.html", "tz4bh6ErV1XzSuRLUwp2gwXmelac71Oh"],
            ["components/user/login.controller.js", "tVY5pGZ6blTlm2FTJZu4zXqgSNNWLY15"],
            ["components/user/login.html", "uz5CLO9xOv3Ta4SmFZWpL9kLlCIZMAxH"],
            ["components/user/newuser.controller.js", "8fSPQUSnk5LBRmBuBly0BHblzQw3KFYe"],
            ["components/user/newuser.html", "ruPWqXKamrVhx6dr0vCV31JHQ1fSA1yL"],
            ["css/all.css", "NjS8GiRmaipCveQF6gxOJUWNaw4OfZs0"],
            ["css/all.min.css", "3qaS3rAjJRfbW36mZFxp56fPKWqRItAl"],
            ["css/bootstrap.css", "iJoTuKAi7Z86D8s4WgEaY02BfUWPFjnc"],
            ["css/bootstrap.min.css", "ANGBTTmvaeroP2XBcZRiIfIkcDO4gsb7"],
            ["css/mdb.css", "kAgZdJkUMPVmiCyb5r7SMLg57nRsjywf"],
            ["css/mdb.min.css", "6FR8iA7cKJFtV30oWaCx2F35GiDrhN5A"],
            ["css/style.css", "JDLjRcsYLOpvQllzFQN24adWllNt1onD"],
            ["css/style.min.css", "WAAiLU8BibfGup45hx3jMLK4T51Q2M3g"],
            ["css/addons/datatables-select.css", "3ZS32U6AXjCflndinQIXgBRlUxWs22Jk"],
            ["css/addons/datatables-select.min.css", "7aziJmaiQRpRPB3AzIISsnrfFcAEjSAk"],
            ["css/addons/datatables.css", "6SgMCUyXuScDFbrFnuR9QHzfDRFjUwxj"],
            ["css/addons/datatables.min.css", "EKAdBSvkk2RZayXvi9UmJzkQEVIvqh9e"],
            ["css/addons/directives.css", "kEgdLzmWX8hiX6BPKpqHCipP5kWElX4o"],
            ["css/addons/directives.min.css", "kfh6uqPKsg8CdXOYbKWJKChLwIOSSLzO"],
            ["css/libs/font-awesome.min.css", "paiXVFhAQu2YxIa9BA728iOxm0uVTwJO"],
            ["css/libs/jquery.dataTables.min.css", "We7YfTX0f4s18DTuQUSMM1At85tbtomh"],
            ["css/modules/animations-extended.css", "EcBF9HD6jXWERw2vII9IzTV7Iz7ohrOa"],
            ["css/modules/animations-extended.min.css", "OYAP9b5x59dEa9W8Q9paEfZABnj8GUEq"],
            ["font/fa5/fa-brands-400.eot", "VX1hIWMym82wlemVuA68afBFm6oPYyMa"],
            ["font/fa5/fa-brands-400.svg", "rRVEtrEkUt76AxFQU0iAeL8gBwkaExLd"],
            ["font/fa5/fa-brands-400.ttf", "BuLcywrifqhawgke5GLj1YpZqgzIlSVJ"],
            ["font/fa5/fa-brands-400.woff", "Su3jxvR1auuc76FpvONXkarK6ZFb4ALs"],
            ["font/fa5/fa-brands-400.woff2", "4hNwNQb74WNhAD1hGMwI6FUDpPVv1HIe"],
            ["font/fa5/fa-regular-400.eot", "SxA4LhyYA3ParNjRAhzoH0kA5c4TTZgC"],
            ["font/fa5/fa-regular-400.svg", "kBCXvCjNYRWAH3GiAxLM5y3Bj1iMt6l1"],
            ["font/fa5/fa-regular-400.ttf", "6IF3egbJbxNDkmXDyOL5IcMNdMp93dD9"],
            ["font/fa5/fa-regular-400.woff", "YO58kuJGXljPWordOw801fT57p9mPF3J"],
            ["font/fa5/fa-regular-400.woff2", "8rQQ0VYHpJp1qZNDBfGt7TYCxmAasaVv"],
            ["font/fa5/fa-solid-900.eot", "YgIY22x5u2G8zIrnUXk9xZpfOg1cRZUH"],
            ["font/fa5/fa-solid-900.svg", "tWUyvKCkc6SuQNWfamFOm1WkdNUrKcpA"],
            ["font/fa5/fa-solid-900.ttf", "CQcDcBWXbAlMtrHEqopFwJTJG6dYlFXq"],
            ["font/fa5/fa-solid-900.woff", "QObKjCzpkNMGIxVDZFhbM145R5IxdoA9"],
            ["font/fa5/fa-solid-900.woff2", "k6ch7xPfWnRTe1KgTzyKppMjdB73ucdJ"],
            ["font/roboto/Roboto-Bold.eot", "Se3mVaTt4HoQ2u3LSgU9HsGD8fevto45"],
            ["font/roboto/Roboto-Bold.ttf", "zidE62bUrBaMfiqujlpTPJHa0sfp4kZP"],
            ["font/roboto/Roboto-Bold.woff", "DS0eB4UpktKTLfeMOKzeDhj2BhwHEBYF"],
            ["font/roboto/Roboto-Bold.woff2", "VH6BRSE5W2W6HviQ9nYlhD2mkQ6UyR3o"],
            ["font/roboto/Roboto-Light.eot", "uzm9ysVfXy6MaRPHLETvOj34kDn3Ss6a"],
            ["font/roboto/Roboto-Light.ttf", "V2pA6CfryuMre1STxxCLD0UTiM4uquSg"],
            ["font/roboto/Roboto-Light.woff", "8SqA6hJjjGfLoPKW0pnfS7rohrIxketU"],
            ["font/roboto/Roboto-Light.woff2", "OJECFYZJnR2HayJQ3yttTr1o9nQ9BCs6"],
            ["font/roboto/Roboto-Medium.eot", "8IXKs7Eq4H6rm9hc8qmvIAhVYayem07a"],
            ["font/roboto/Roboto-Medium.ttf", "UkAmsuycHWsJRIhCml5BxlEdRrVRcP2D"],
            ["font/roboto/Roboto-Medium.woff", "bgmDo1XfaJYoWNft3SzxJ9TTKQGOuIDq"],
            ["font/roboto/Roboto-Medium.woff2", "stxFrmY0gLTxe86r3wVE597Z6bAnWrwO"],
            ["font/roboto/Roboto-Regular.eot", "8JsrS9Vrwfkuig2jocgRncfsnFdEcFnv"],
            ["font/roboto/Roboto-Regular.ttf", "iOIIs5ixAr5qnSbmxshccbND1Al30VyR"],
            ["font/roboto/Roboto-Regular.woff", "czQhKnYYXuQzQsio2yjxd8nMtYIg146I"],
            ["font/roboto/Roboto-Regular.woff2", "nHlGdcLWyw0HMV61KFe3PV6o6AlyOrnh"],
            ["font/roboto/Roboto-Thin.eot", "4CYnSfSivKkYwgwluOdBFXw7tfFUnM8N"],
            ["font/roboto/Roboto-Thin.ttf", "mh5TQ3nsUuN1fRvrL2rZrtJpyFDiM8X4"],
            ["font/roboto/Roboto-Thin.woff", "52Va4HGx8zc3Cw4XEYiOVMA5dljvMocH"],
            ["font/roboto/Roboto-Thin.woff2", "2L4qdRN5EavTHcLM4sEdcY51rLIIHpwr"],            
            ["img/abo.jpg", "Ctwio1zYBXjDH1PAkKH4JCOljfYGGTxE"],
            ["img/app_icon.png", "GmGWikkcux6ZvRtp9afQgATGIElNx89k"],
            ["img/arrow_down-min.png", "L8NeAtQz62lyl9yG6167K2FXOOPBddaO"],
            ["img/arrow_up-min.png", "UfGvEizH86Bq0vHGGeukDtzho2hc6pVl"],
            ["img/avat.png", "RD4kahQRkQRuJgQ6adROBOfX8EQvOuzm"],
            ["img/BALLET-FOLCLORIC-DE-CHILE-BAFOCHI-min.jpg", "sjHsbVpij66uWiWCTwCvB9rUtw7I9asd"],
            ["img/bottom-border.png", "RlRQda3HJNC4NACBpw1Wfj0H1RhKTPw5"],
            ["img/calender.png", "jhQ3fRG0jwfWVNFVNwRZyGeMC7vJgu6s"],
            ["img/call-min.png", "uzy3oOxgDEroDISsP7bsWmzUdhfxMJob"],
            ["img/check_act-min.png", "vUKTBT84rv3Y86TthETPwBGQSm0cxxHc"],
            ["img/check_inact-min.png", "UTOgHEP5aVFR7b9NUi9b4joNQZtsuYue"],
            ["img/dummy.jpg", "hB53GCgDKepseSG6Um3rv03Qw44kVO2X"],
            ["img/fb.png", "XsCp1uKuLsPLCPymCsannesVBXr2kxTi"],
            ["img/flags.png", "d6PIeMaTbJymxIh2rwJ88jpFB94Hi2Hx"],
            ["img/forgot-min.png", "yBsk6XcAAUZMXQt33fGcuDjJFNm57jNm"],
            ["img/HA-NOI-DUO-min.jpg", "0wq30mSMQOTOS3IFT1S6CMkX9nXueJMf"],
            ["img/inner_bg-min.jpg", "8rC7OVq6PXN9CEUMttXKSphF0ufYJbzT"],
            ["img/inner_bg-min.png", "lZEYZLNdeuvzfFwIs2Wu5B9r7phyeuZG"],
            ["img/insta.png", "zKlTf53rhGVDpRFZJhfrdxqLLIuY3orf"],
            ["img/load.png", "rXeYXepXcmILl35WYjtt0Qs2Rf2I7ZsS"],
            ["img/loader.gif", "Wg4x2i3TJNk7DJgnAmeYj1nBCoRh3cea"],
            ["img/location.png", "lGX3w4p8CCI3HnUFAKiuzIFllnMu74Vc"],
            ["img/login-min.png", "emcEpFg0JGDFL1DdpS3SVJwb2JBFpZ6D"],
            ["img/mail-min.png", "8KWJTzO55ifF0KBLUTYikQSm7eDPc3CR"],
            ["img/map.png", "pswTo2FXZ18u5Sosg4SnoV2YLu5cWL09"],
            ["img/MEHDI-NASSOULI-min.jpg", "JRXcwzKQ6ys8HcItKf7CZo2ZjQLuxoOZ"],
            ["img/OLGA-CERPA-Y-MESTISAY-min.jpg", "9tCl4FAMoDhQBoQEeyhfImNneruTqwPx"],
            ["img/OTAVA-YO-min.jpg", "ha4J0FhRTWWHmPxpDL8LYvc4iUya7WqP"],
            ["img/password_min.png", "Qch62989QERrm1xVOTy4Z9ru2gwFNQYf"],
            ["img/plus.png", "1Z1nq8CEaoEBZJA0GlRRK4YhcMsYMPoj"],
            ["img/RAJERY-min.jpg", "kZYFfJs2o0IyinFju0bM7GSLbi6yX77p"],
            ["img/registration_bg.png", "P2aUHoPJDSbAMGYBUpZ1cIOl58YZaMbH"],
            ["img/registration_desktop_bg.png", "O6KVNgmiublLJXfhp2pGuckHEklXwoma"],
            ["img/registration_logo.png", "rHcBGIRLGrpzhcKjc7eaWZmIxJvMIT8S"],
            ["img/rwmf-02.png", "ybNoCQymAEV9aIs3BwQozUiRH1OJ6wQr"],
            ["img/searchicon.png", "QuzgCPcJRgPhgTAqo4jvpNkfe3bOxFLl"],
            ["img/share.png", "CiqWbqUWbPvBqdHCZ0S9r7PZNueBoEWE"],
            ["img/sidenav.jpg", "i8h90jThIE33L51rIAK6o9dqCS7AHRLA"],
            ["img/SPIRIT-OF-THE-HORNBILLS-min.jpg", "RU1114l3kPcQUf4lIfkuGo8gFCDTlxYE"],
            ["img/SUK-BINIE-min.jpg", "PPBmZvsteNRFOBd5EsZbHnmw8Rhy9iOT"],
            ["img/TALISK-min.jpg", "epOapOm7XJ5ncq4l9p990W6C5Fv9pyrn"],
            ["img/ticket.jpg", "78x3DlbnZKgLors6pimX96Wx7Rp1mfuv"],
            ["img/time.png", "aSedw3UmKZ8daUvmmHWpmdg9MRODnJmu"],
            ["img/twt.png", "Db7iTiWfar7WzRjh5AOmVpdaUF3SmX9x"],
            ["img/user-min.png", "MAI6PImzIKGOCLt2fsPQB3eNDFx0e3rt"],
            ["img/lightbox/default-skin.png", "5ZUgPF9drKCg5lAZ5vCR0o6nSMG0ma0P"],
            ["img/lightbox/default-skin.svg", "fCsghfXG6HeyDwBOuBpPEq5sTC6xmFOg"],
            ["img/lightbox/preloader.gif", "6BjLG36BtrWKbTI3t8bW5ekgLXfnrdkv"],
            ["img/overlays/01.png", "FdSc3XgYpGYzHW4qgKqt8AsJ9Mf1njDh"],
            ["img/overlays/02.png", "pXZTSbZdmqjZhwJAEWmE8Cuo20PELre4"],
            ["img/overlays/03.png", "N72hdSdnudFswYR0ujhwcyoIKUfwjoEO"],
            ["img/overlays/04.png", "Pb6Um5tYz4xr6k5VAOZg555dOZQLDKCG"],
            ["img/overlays/05.png", "0nDAj6E3rs6Dhnk4yOjXmqxXGHUcGuca"],
            ["img/overlays/06.png", "BbJdWjkDyKiGK98birjvudh3lBHCLl63"],
            ["img/overlays/07.png", "fbpSpefVwUVdCGZW7p4lojusICxvYR85"],
            ["img/overlays/08.png", "tSfcdjHFgpbyJUCUDfQmro4brxi0jEfO"],
            ["img/overlays/09.png", "YkLLlNizyrbsty1RrUBz4IC97sZefEIs"],
            ["img/svg/arrow_left.svg", "p0lKmEqATj8NbZFsScsPzB5b8HDLL4uo"],
            ["img/svg/arrow_right.svg", "w2pytlCpnn7ddyMPQGv8VZ9ohjggqNQK"],
            ["img/svg/flags.png", "IIJ7XouhBRCuduUpQoyyVXWIjZ8yc42Q"],
            ["js/bootstrap.js", "9Z0dnnYikXiQJvRc2Xo0Jj9NUPkNfPUH"],
            ["js/bootstrap.min.js", "T5UkKohL7DZDpaEZzos2a4VE83b3Cveu"],
            ["js/custom.js", "yERtrRytslTDM2tYuueK1pN8yEHLfK2S"],
            ["js/idb.js", "03SCgDx0ksQ4fNJaY4hQLPj3As329fOx"],
            ["js/jquery-3.4.1.min.js", "Z5t9meYwzfkDJkoPBQUPtCk5s6jYCvQV"],
            ["js/main.js", "ux6zg8LJMHQi26pf4xSvri9je51bsRrR"],
            ["js/mdb.js", "o5CWRvAhb3auHyz3xsGKLm9hBzUwbInE"],
            ["js/mdb.min.js", "6BoLFdKewqE4eBrB7gj24HN79ISIZvgl"],
            ["js/popper.min.js", "Xq5nr0LQM62dNf5NqTV2xmesDMwx4iXP"],
            ["js/addons/datatables-select.js", "L0JELQD5RLPYKTKw9pql2yFVd6RqYez4"],
            ["js/addons/datatables-select.min.js", "G0rZNmaaKDjPDZGWa17mZLpzr4AOidzK"],
            ["js/addons/datatables.js", "INRRVYFikXSwPVb6GySNEhNP1SNlZL6q"],
            ["js/addons/datatables.min.js", "iFoxzSbtAVlC0vwG2QAuH916zfW8rMH2"],
            ["js/addons/imagesloaded.pkgd.min.js", "4RXiVaBhrMiVoPABEXFtVDHY0mj9JMvd"],
            ["js/addons/jquery.zmd.hierarchical-display.js", "rhcBU1mLVqaixRIjYV18g0BOgnpy7HNA"],
            ["js/addons/jquery.zmd.hierarchical-display.min.js", "VvCIQ8H4RWfxqWzvzslQ75tKJYRbKJZP"],
            ["js/addons/masonry.pkgd.min.js", "ArckIrqyrh6rpu8al9Q5NXUX533HdtOF"],
            ["js/addons/rating.js", "s3fC2ljU41TKyHPRGbM08SKohj1D6Efo"],
            ["js/libs/angular-animate.min.js", "CDruo2PO0wNMpNF6J7jBQ7qDa5ptss8z"],
            ["js/libs/angular-animate.min.js.map.txt", "X1kL83JXVzduEkSgIA3JAl9bc5oF4iLH"],
            ["js/libs/angular-sanitize.min.js.map", "1XqBmEjYAOgd9zM1sdRalcl3o2oMRsTm"],
            ["js/libs/angular-ui-router.js", "UvKwO1ro8NCCA78kHRKJVYgERp4b15zP"],
            ["js/libs/angular.min.js", "KwiK558LxetpsBTHNJJRUiHS5Da3SWE3"],
            ["js/libs/bootstrap-lighthouse.js", "PFaK2WdqoEp4wMWDhyURUMFWYCDtgQdh"],
            ["js/libs/clipboard.js", "Pi3Yv0uQkRqC3poFmuW2zLF36SakxG0z"],
            ["js/libs/cookies.js", "e9bv1b4MopMkaISx2GuiACC3Peh7Rv9C"],
            ["js/libs/jquery.js", "hxXpJXCu94IwLnSmYEj3mymukcpdOnLr"],
            ["js/libs/ng-sanitize.js", "Y6V6Jj7eTBSfX4Jn32FHfKEDpGfkVp5b"],
            ["js/libs/platform.js", "0K4h4dIGMY4YDpMSlUFCVJvRfIH69Aqx"],
            ["js/modules/bs-custom-file-input.js", "ubC3Yq2tV7Zg91GvXwVgje4JKQB5OJfX"],
            ["js/modules/chart.js", "P9fIWOQZnXX9q05Zp2aH5yPh1yKyVtuo"],
            ["js/modules/enhanced-modals.js", "hj7ob1u4Ez7IqFY1wY4g80cfZaHhAWhj"],
            ["js/modules/forms-free.js", "fTfTGJhjkGZvlJZW5EEw2vMsCOs5eXzR"],
            ["js/modules/jquery.easing.js", "vxPEnu2WlbVtYKcULozEGts0p8bsmNpg"],
            ["js/modules/scrolling-navbar.js", "MYg2bxcedXHoo5qbO6duYXJyZ8yTYDFJ"],
            ["js/modules/treeview.js", "jFQLCI6vxx3xflFL3yPVZGlGqoCNwKdq"],
            ["js/modules/velocity.js", "sXTV7NQTnsiQQ77pTeuYHfwIsE3q26tR"],
            ["js/modules/velocity.min.js", "whp6DJ5gMDWks9wKvQuqREZPDBik945z"],
            ["js/modules/waves.js", "zvjXTZbfFUwxxVwjRD7ZnoU4JSR2WNbl"],
            ["js/modules/wow.js", "9H7edRlwarzXX4dti55SIdQu0rI9LgPE"],
            ["services/appConstants.js", "JrcKPP8DGQy7LShnOuIPLF8yQ9NpVWVJ"],
            ["services/authentication.service.js", "uX6tbCHLNE9TiECDLT57vrZyvU6LZnb0"],
            ["services/CoreService.js", "UDQH9YgTr04ISoTncM6GGgawJ5WwxRYM"],
            ["services/flash.service.js", "T5ofKkgE3Fgn7dh4mivkYCinTu1o5DzR"],
            ["services/HttpRequest.js", "EWhmKAmUy0XnMTdUce00bzSSAhtCL8iN"]
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