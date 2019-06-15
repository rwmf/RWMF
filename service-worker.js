/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren */
'use strict';




importScripts("sw-toolbox.js", "runtime-caching.js");


/* eslint-disable quotes, comma-spacing */
var PrecacheConfig = [
        ["/app.js", "HkLukmheMwqaGQJdc83G69HXxE6n6nhg"],
        ["/components", "sOV72YZrQ3fNMHDe0hGnpmyNEsv0CwXZ"],
        ["/css", "deX5szQ1lwC2x6SdxIezBDr6LsXGt9PO"],
        ["/data", "xJ7G3bcqjtxe9vANrnK5SnEeoGn450nC"],
        ["/dist", "7c1ZqmDidmVd7osU9QzAGnOFbatKo1eb"],
        ["/font", "w9ytPOOawsfZI2P0fMG0YxzyK9E45Zey"],
        ["/images", "fvPPzWvptxqoKrcp6yMOxpEi7rm8tGmF"],
        ["/img", "EbwYnZDgpoPvnwwG4fflT7ktSWbeYFlm"],
        ["/index.html", "9H70ma0IxzLY9IT1hHXs7WJMGFMDTfRH"],
        ["/js", "zrynOycuTEFlTmhnDHrMzE7MG8ZSCRgS"],
        ["/manifest.json", "AgygkxI6pY5pJf54FmZ2jzPGTSmTkcCa"],
        ["/services", "k2g4pnviFFDn0cTEwnB2eecjTzEoOX9D"],
        ["/components/general", "6AQB6UwFDKx3SPYv5TuR6v4kvKkOvKES"],
        ["/components/header", "rf1C1Ng0qYFa6urQNwKHVoBMo8Dk2Tj0"],
        ["/components/home", "fABt5bd04tHETG5C6EtlLLvsWvYiw75L"],
        ["/components/program", "AhoyXAnwMglh2PRXBdtwgrDxZw8WNs9l"],
        ["/components/user", "R7z35i3D8ynBrbcaTgXxr90MbdjEglAQ"],
        ["/components/general/busSchedule.html", "ArVyN4bE2VzX8Vp0bEKoqeNMahTpoDrG"],
        ["/components/general/general.controller.js", "7VADdp9VEZd1YuoNdQdtDmtS3gAvW8e6"],
        ["/components/general/ticketInfo.html", "WuCWQhfFe2YI3lDtA1MaoTmQF28mcCwG"],
        ["/components/header/header.controller.js", "nwD2TDRJqNFXiO7Pt3HekpuSB0NjMvMM"],
        ["/components/header/header.html", "bu7q1YuYMRCXhEZPzQXEwFFsqCV1Xe6v"],
        ["/components/home/home.controller.js", "MhyqRsRYR5Z8KADKe5wvZoXWIcYG2E0r"],
        ["/components/home/home.html", "GUscoSUBRYvqOVVEtpq2bkwV07soRxZO"],
        ["/components/program/programDetail.controller.js", "1aWeam5sOgSX3dPxZUktmnU3XtvKw7Y9"],
        ["/components/program/programDetail.html", "ucRJ10v1tP9Qb3AWZWKX9RIsPtpkE095"],
        ["/components/program/registeredProgram.controller.js", "OqdQazTKZE2vMIDqFwJih04eWEMhfJwV"],
        ["/components/program/registeredProgram.html", "qsINcSoNRuwWNJHGDiMUPBXA8SF88Bo8"],
        ["/components/user/forgot.controller.js", "uayEbjUueWJ7XqFfBeoBLILyQ28PnV4C"],
        ["/components/user/forgot.html", "OYyu1jDrPwIkdqi6gJeh6yZoPhx56SPk"],
        ["/components/user/login.controller.js", "JbYxpzm32Jzc6o0DHZqEJ1ACxKABFtKc"],
        ["/components/user/login.html", "YguLYccUkluWlqp9JmM72ktLau9ycr1L"],
        ["/components/user/newuser.controller.js", "CYPAqp06V0VZD9wLoqek3DVCanwsC817"],
        ["/components/user/newuser.html", "JEezIOP8t0MbkwxVLCYnbg2uDmVrseNC"],
        ["/css/addons", "evl0KthhMilpDfLWoHVAP4WgE9ct7Pvo"],
        ["/css/all.css", "eGlOoSGGcH5gCIOv5gDyJz9PLMbsWCNX"],
        ["/css/all.min.css", "Bn5k36VkjRrQkdY8rVliceTCVjtaTl55"],
        ["/css/bootstrap.min.css", "Pl8ZbFlNOme4U4Xh162wBdpGVc79HWG9"],
        ["/css/bootstrap.css", "pDZRY6ymBIEa6AK3YrjATMBNd62vfN0H"],
        ["/css/libs", "Qs2CddtZNN3WWVRMt1kKth99pcWOBaPI"],
        ["/css/mdb.css", "TchyFX9EB7oopfMYfmgmulauo8gsKSjA"],
        ["/css/mdb.min.css", "NPwjf5eV1piE4716XEwB7up4gFScfJn0"],
        ["/css/modules", "lGDKKtf7ANT1Fo1Fkx7bfMk9wSx6zuno"],
        ["/css/style.css", "oXMvP0VONKamYLYLgWlMAZUh6aZ4mn9F"],
        ["/css/style.min.css", "1xBXpKjEnLiw75RwKwWQfZndfMboZxEM"],
        ["/css/addons/datatables-select.css", "zE3SLnsjGaSeITmr2q9ghD0UDhSdTcTS"],
        ["/css/addons/datatables-select.min.css", "BXbYisWQ1yM8OoAdCZ8Bvh1sU1vyI7ql"],
        ["/css/addons/datatables.css", "qm7BABOdWYn3xB6AV4yK5OYatmHOqOHS"],
        ["/css/addons/datatables.min.css", "ZRxL8eKKJzjrQGUHFfYZIeAmJdMz8rVY"],
        ["/css/addons/directives.css", "sEW4AIqofgu2ZXeSWbxv5YgNQantz1c0"],
        ["/css/addons/directives.min.css", "g09fwW2Na7Dvr9WQpdqislajJEYkYDEA"],
        ["/css/libs/font-awesome.min.css", "PsTPy8674izkWgnVuQs07gflTqge9v4u"],
        ["/css/libs/jquery.dataTables.min.css", "NAtnHVm2nlDZ2Epnh2qU2DQ5Fw7geSOs"],
        ["/css/modules/animations-extended.css", "aeVTem20l2e0cmrZwGD4OlDKuM3L2rPe"],
        ["/css/modules/animations-extended.min.css", "shd9L0UUNY1BnvpavtKBdOXNlWHDie6R"],
        ["/data/rwmf.json", "VwKHXkvEfHxQWgXW58pAdoRgFF4LE7xA"],
        ["/dist/css", "i2J2V221AxRYd3ehpc60nzVSAUB6zQlJ"],
        ["/dist/js", "fljCe44uGO51OLZjFwAPIDsaoaleYxa8"],
        ["/font/fa5", "oovs5IlDTx4ExlBpuS7DECDnipLVca86"],
        ["/font/roboto", "YJ5JMD9X73YNRtJ7hesAAj0UdSNzXyG7"],
        ["/font/fa5/fa-brands-400.eot", "VIfcf61IicLI4akDgzeCbNwfbBHjnkvo"],
        ["/font/fa5/fa-brands-400.svg", "KkR5FCYJTgYoclhbMaC8HrN0DCXnNvSj"],
        ["/font/fa5/fa-brands-400.ttf", "Nct5cZUiU5tH14Hqo172msHKGZ05zr2e"],
        ["/font/fa5/fa-brands-400.woff", "hYXEfCHbZmp6Ga1zllEZTIVwlJ9oyGsc"],
        ["/font/fa5/fa-brands-400.woff2", "I0B5A93xjs1Frwd5G5yMEe3x40bgJKRn"],
        ["/font/fa5/fa-regular-400.eot", "VCXAqZTqP37peIJ8dM3LpIrZ17A3JDuN"],
        ["/font/fa5/fa-regular-400.svg", "nuiEeVBwk8E7QqkuXnTyfv97aK1wh9PZ"],
        ["/font/fa5/fa-regular-400.ttf", "MZWPnFIFxZjwozBqfVhWMXeurlXOccMM"],
        ["/font/fa5/fa-regular-400.woff", "l2FbBSD645l1D6YfSNILX8jG56jOnQl6"],
        ["/font/fa5/fa-regular-400.woff2", "jvnk9sK1ucUaR63lrjMw0KnTOOF1rOWu"],
        ["/font/fa5/fa-solid-900.eot", "Dex2wuenyJ7oGsgT5f4zADK6kIG3dWcn"],
        ["/font/fa5/fa-solid-900.svg", "G2MScesQtiNB0fBh9fRhWe8clhTIqXWs"],
        ["/font/fa5/fa-solid-900.ttf", "91xl6VFz4wemKDIZ0VzFzjtU4dZgalBe"],
        ["/font/fa5/fa-solid-900.woff", "rs4F8dwrjc8KgWvm5XHYH789Rp35zBMs"],
        ["/font/fa5/fa-solid-900.woff2", "ciF0kMvDv7wbw2s8kcPYwWikQNtIHMca"],
        ["/font/roboto/Roboto-Bold.eot", "gEfq0O6S4KKJoi06CQWcfHX188EwNzff"],
        ["/font/roboto/Roboto-Bold.ttf", "KQsNJpocuDVpxN2Zms8IOKX152X1DufT"],
        ["/font/roboto/Roboto-Bold.woff", "cbucPJCSieBKxGUGwmuSn7auvUJM7dLw"],
        ["/font/roboto/Roboto-Bold.woff2", "rBVJ3yuKk8OpRYEDSbsQRNVoqpizbZ8s"],
        ["/font/roboto/Roboto-Light.eot", "4aK1jeXBZN61rJXUiMv9Myv9DHnlVHmt"],
        ["/font/roboto/Roboto-Light.ttf", "up05HK3FOVN4zrmfv99pdl62XFfZTyZr"],
        ["/font/roboto/Roboto-Light.woff", "N6Z3pN48uYN5ioQNyNi152JRGQFV0C1a"],
        ["/font/roboto/Roboto-Light.woff2", "aUpXmn8xZhoe9HMNyb7z7fQeu4GCeyA2"],
        ["/font/roboto/Roboto-Medium.eot", "dHwFM3P1sQAoVH7NvTDQH7ZB03FxIRhU"],
        ["/font/roboto/Roboto-Medium.ttf", "7K8vTwZjdtsVi5gz6DIXuGHbR9TIsaAp"],
        ["/font/roboto/Roboto-Medium.woff", "YWR6qBPBAecfGtoTN5yjwbMQbnxXzpnJ"],
        ["/font/roboto/Roboto-Medium.woff2", "pjXlzgqWoomptA8NETTzvpj6ggyNNpzA"],
        ["/font/roboto/Roboto-Regular.eot", "sr03qGvxrJFREB8yM0Ik9W88K8MaKd0M"],
        ["/font/roboto/Roboto-Regular.ttf", "QMJTRMzllBnDrhwwrk3uusy2CTviv0Zw"],
        ["/font/roboto/Roboto-Regular.woff", "did5GhsUPJFGDrsDpJIg3d1MPaSUG0Pm"],
        ["/font/roboto/Roboto-Regular.woff2", "2wYxvyYQIEyJ2e7SAUAGtB6rMN9Fln8u"],
        ["/font/roboto/Roboto-Thin.eot", "fZaBV1wtwHQ8TLi10ygFKCn7EMhDFr6d"],
        ["/font/roboto/Roboto-Thin.ttf", "JsnewGtlBbWv8pI0C744o4U16WKTdzPv"],
        ["/font/roboto/Roboto-Thin.woff", "H1H7nkYfK8gwza8LAke68RFbsMSk9Gap"],
        ["/font/roboto/Roboto-Thin.woff2", "lFmkTXjMpDJ594jyc5tGho5aab5auUbF"],
        ["/images/icons", "kIoommxp9FBv2CV3pb5FnqZiLfzKMnpG"],
        ["/images/icons/icon-128x128.png", "Z0sL0cmOPtVKgu7CPu9aRbs3KuUgM97Y"],
        ["/images/icons/icon-144x144.png", "WgywHV4384sotweFsAt067aSwhOUtqYk"],
        ["/images/icons/icon-152x152.png", "HWsOcmQJJedvD4Z6rdSeIvJyUkGUGIXM"],
        ["/images/icons/icon-192x192.png", "dKf2qjOoCrZx5hpB88vcdLViUipBc1tc"],
        ["/images/icons/icon-384x384.png", "sgxqJWrz2snO1dAMjoT9k7OHtXLAFlkN"],
        ["/images/icons/icon-512x512.png", "45QOrwd76IyEAuEXnGv3Gq5Lu7jH6Vws"],
        ["/images/icons/icon-72x72.png", "TbrX0zGM22TRXM1L3UQyWIJpJa89jVgv"],
        ["/images/icons/icon-96x96.png", "l5oXPaWZ6UyFCtRepppPGM2pk0sGgcQB"],
        ["/img/arrow_down-min.png", "5ebk3zhF5s29sDpof2pNAjQnrFm0fvE2"],
        ["/img/load.png", "5ebk3zhF5s29sDpof2pNAjPGM2pk0vE2"],
        ["/img/arrow_up-min.png", "kvktHI35c8emgtXeRn6kIYAJgldxmS61"],
        ["/img/bottom-border.png", "wDqNa2KaYWXVRzuhWOVkybtvgj1mxwiU"],
        ["/img/calender.png", "4D9a4DR9JmdrDPWFdlpaS6KcT6NCghOT"],
        ["/img/check_act-min.png", "mv6KUo1sQ0zwlM6wM3YzZVq3TT3Myt9n"],
        ["/img/check_inact-min.png", "OXFLhtXRFyEOBdVrO4FHHtoSPNSjEHBr"],
        ["/img/dummy.jpg", "W7r642p58TN5CFtqD3K3ZBSctju0tWt3"],
        ["/img/fb.png", "Vy9ZV6CrkEOdkMXMc58nJAvOrkhby7O0"],
        ["/img/flags.png", "WHpYJl5Wcun5OcWXLiwOlj2p1mzeXFa1"],
        ["/img/inner_bg-min.jpg", "gxNXOgDJLRunVXX345fE3XxrXI3sDWoD"],
        ["/img/inner_bg-min.png", "SFuPQzJtZeUJRQ3waprhAQRdhVMHW0om"],
        ["/img/insta.png", "YJFImzwZhFosz0inYeqjWYQ8AMtTxuqy"],
        ["/img/lightbox", "f6wbkUzXCWVrYsinJcePV7PQ8nR8xlbv"],
        ["/img/loader.gif", "fFHPyEKmEHNFPLiVR2a7GE2XnOx6VYah"],
        ["/img/location.png", "hX5zDWNOx9Fb66SSkukoJseJG5lELoGk"],
        ["/img/mail-min.png", "y8v2eGWu0Its9IDzTlAo5mwhUYJW3TXk"],
        ["/img/map.png", "VhAoMKcZOgpZEH20LHi9VwPrOXgSEzCb"],
        ["/img/overlays", "Wk1Dk3o5cNJE5TDO0A2hfH91XHpIsXsI"],
        ["/img/password_min.png", "dQFIGz7LEGfZHJEmCp354R51B6UhrG7D"],
        ["/img/registration_bg.png", "p13bRwKArmE9KHd8XfpuCkYphZEKH5Rm"],
        ["/img/registration_desktop_bg.png", "2wC1DBReBrLYhIPb0eEN8fVOuW9RAfCl"],
        ["/img/registration_logo.png", "NF2AVdSvPU0dWTTW2rNz9Th6WSEXcT6t"],
        ["/img/rwmf-02.png", "Whlonj6IGP7xd6vEp6TOr4IdBTMrbmtw"],
        ["/img/share.png", "JEZgbClfpg2dAnN6gv3Jq0YvrymVYGe3"],
        ["/img/sidenav.jpg", "Cp9dbK3Cq3xlrSTgBQDtts2y5IG2EnZg"],
        ["/img/svg", "gWFkUWVxfzGFysaNJ3DNC15ytTfSlecV"],
        ["/img/ticket.jpg", "NeCupkIJNJvQGOrlNkpo8GrbdIbEbbAE"],
        ["/img/time.png", "fenmOPu4JVBAw2iA9yJDfNwcqOQEyKgP"],
        ["/img/twt.png", "iJXfIhuWxAOvbUWQcVCUT59qxMvcYbLr"],
        ["/img/user-min.png", "npG5ljU1lSb3OrrGBIWXGfHUulqDnqM4"],
        ["/img/lightbox/default-skin.png", "GN1DW4rGaysc2YC4VKVIxTEpADhDOtun"],
        ["/img/lightbox/default-skin.svg", "VFUe4N3rxktL4iFOgmhFubIEJ4QYEXMQ"],
        ["/img/lightbox/preloader.gif", "Q22WuPEwrLpymqq4fu4vk9vwrvajr671"],
        ["/img/overlays/01.png", "5onJE04cp5dEawMXQLvffx4pOxywrOOu"],
        ["/img/overlays/02.png", "IDFHp48zZ2lcLyfywxpVLukSloJ0px2P"],
        ["/img/overlays/03.png", "vo94eveptMl5d4PAVHJkmvZ5R5RIaYBb"],
        ["/img/overlays/04.png", "wwZgqKJzOzrNlgw8r9PdZfok2Mq1icp7"],
        ["/img/overlays/05.png", "ObBg7h6aXYAijXqmhU2rY2uFYPEL31mH"],
        ["/img/overlays/06.png", "vfypqPDmsxlJfNzirsJRUAKy7GHZIn7v"],
        ["/img/overlays/07.png", "e5M9Kx3lQfb9lypGdGMAEKTqQy1dMyPa"],
        ["/img/overlays/08.png", "tOYLZfnaYuwxSDUaw2NtcIZiDSnCtS0o"],
        ["/img/overlays/09.png", "iK3YtnnP4PdfpqBMyqAbrSgqRBf35Z69"],
        ["/img/svg/arrow_left.svg", "RDHqDO39LwvrJjoVRzJRIWfS3hk1ZHlM"],
        ["/img/svg/arrow_right.svg", "0IrzZrngP3WzKC98LdSes525YY8FgmGN"],
        ["/img/svg/flags.png", "IRg7l9SWW4B8KntCqdpxljoiIZQBFGz6"],
        ["/js/addons", "bnuYujQ4KyQGcqbLO1L2Vdo1CtloW6M9"],
        ["/js/bootstrap.js", "v06ZOmFayrqopyMsbhUuJp8pzl8LQp76"],
        ["/js/bootstrap.min.js", "z8EphwWR2D7JuWPCpEjccw8czrHgj94H"],
        ["/js/custom.js", "xUnAHigMJapeTEBheHMPq7QEV2ynIfNc"],
        ["/js/jquery-3.4.1.min.js", "MxQ8c2kgDK85hb3SrWhf3tjJm2l5t5rw"],
        ["/js/libs", "OC6eJ0dxvOG9AxPBpLQsXhKxWJR4lrHm"],
        ["/js/main.js", "EWu8wHYerIg0SWG8Lw4VvnUcshydRcQg"],
        ["/js/mdb.js", "eXmeANm67iiWhx9qwgqBwjhNGhxW5wdq"],
        ["/js/mdb.min.js", "sUiQvDefRW2bhOqJhp3Pa1Cy1ZkIoSsV"],
        ["/js/modules", "g1w8ev3W1HE8IpOOUHzJUy5cC5YeewMV"],
        ["/js/popper.min.js", "LaQlcuzAqY579KTHIHqTOcy0hdZnd30N"],
        ["/js/addons/datatables-select.js", "RhDZGyQrcEXsXIdbRcota3VvaqTPVKo9"],
        ["/js/addons/datatables-select.min.js", "LhiYjBVwe5ekZakqOeuIC4ASmbMZbUip"],
        ["/js/addons/datatables.js", "xm7U3i1skTJAXpCNRDGGYyzW7FL6Tulf"],
        ["/js/addons/datatables.min.js", "egGcdOQ67VAunAibroFO6NXp9TexzdV2"],
        ["/js/addons/imagesloaded.pkgd.min.js", "fhs7lqDlzOcJdBZ79EiSgp0VuApD8iLs"],
        ["/js/addons/jquery.zmd.hierarchical-display.js", "3XRJsHW8pdW4O60JRgZXAml5kUETdkho"],
        ["/js/addons/jquery.zmd.hierarchical-display.min.js", "HlKGqJGoeM5mDF7Tupo3fMpXuQa8UoGG"],
        ["/js/addons/masonry.pkgd.min.js", "p8jHMHohyYAis6iYFpWuhLZCzHwU0zKZ"],
        ["/js/addons/rating.js", "DvkLXEncBtAPucdJRyTCPBila7UZApvG"],
        ["/js/libs/angular-animate.min.js", "QmxJazkUdDaT42cqwWUe3Xhkhc6m2l0N"],
        ["/js/libs/angular-animate.min.map.txt", "BEJnUX4EDgQb6lXV82CPIRd7EhDCPpWc"],
        ["/js/libs/angular-ui-router.js", "cgNjz4cSQQCOUg66hTJfFETWR8R2AM1l"],
        ["/js/libs/angular.min.js", "OcT9u0SMxwy0kbq7mkHMpXEvhverlUYq"],
        ["/js/libs/bootstrap-lighthouse.js", "vgqXcD5ojzLYJo00VDxk6JKgJv8hW78p"],
        ["/js/libs/clipboard.js", "PIxfxRjVPjtVsKhBKsTW7Q3XSRmw3Y1T"],
        ["/js/libs/cookies.js", "vJIsrvPcfcITBRSoX4o4elReuyhl0wiq"],
        ["/js/libs/jquery.js", "oNfbNbEaU0jNfJTmuYOyI9I9Vso4hjMp"],
        ["/js/modules/bs-custom-file-input.js", "Bfk3O45y7LfQmhctGTLzuFcfBtD6wyfw"],
        ["/js/modules/chart.js", "1WdzcW2MoASLiKvCaE8AYnY02wg5238t"],
        ["/js/modules/enhanced-modals.js", "gpcRJ12hDFK91Aa4G1M1EjeGmlVE2Bjs"],
        ["/js/modules/forms-free.js", "PvxbwwBXcwTHT76hRzpIWROL3HVUh47E"],
        ["/js/modules/jquery.easing.js", "Ji9ryAeDLcmtoy4x3f7vgC21nKSkgODw"],
        ["/js/modules/scrolling-navbar.js", "tD9jIEVvXV43BtMx8OPQOEMkx6C6eKIe"],
        ["/js/modules/treeview.js", "6JHjQgSt4hOTd2DaN9ru1yXWnZnfbHFZ"],
        ["/js/modules/velocity.js", "GxMAsSt21lEQ3XBGd2szjQz5v2XtJSpQ"],
        ["/js/modules/velocity.min.js", "76UBqnEb0SHYdGap1R8oJWH0iEuJKCPj"],
        ["/js/modules/waves.js", "KFuqui8NvNzmN9zUnpxWjLlZVJVrS2IF"],
        ["/js/modules/wow.js", "ALrBf8pOmTzS4uCqVnPPYXFSvglS2aEf"],
        ["/services/appConstants.js", "8wUKOS9N1wqDY1XCsowfSLufZX3Z2jDQ"],
        ["/services/authentication.service.js", "vexCGGpUeXP5DUJz55mjC8wFnwfSanHk"],
        ["/services/CoreService.js", "5GskrpqZRhyVcLLjVD7AUspu0GmmlCVx"],
        ["/services/flash.service.js", "SiOAiKQH4GkmAwQZwmtGfcmLSXfgUJ8X"],
        ["/services/HttpRequest.js", "P3LvPRb6Bg2WcDRMNJI75tmHZ2yf5e2n"],
        ["/services/user.service.js", "rLEYpFON5BS35RBg3K8KMEomWREmLQLS"],
        ["/admin/uploads/programme_image/programme_1.png", "DORKAN0qVAIIPaiFPq9NyCawLRxiNe0L"],
        ["/admin/uploads/programme_image/programme_2.png", "hyyRSwLEB5S6cX2OJ6QKja4HCB9fEK2b"],
        ["/admin/uploads/programme_image/programme_3.png", "kS3F79Mej3QqwbePKUmHvPmQ5yyjJSoO"],
        ["/admin/uploads/programme_image/programme_4.png", "VuHYvmMnXDMU17Rn4FxHzdT8zwToFvKz"],
        ["/admin/uploads/programme_image/programme_5.png", "44CPjx60MVaMbq9YYvCwURQNCZ2j3pjK"],
        ["/admin/uploads/programme_image/programme_6.png", "uM4YpufjY7GnJNVhDqOINplqmAxbqKx1"],
        ["/admin/uploads/rwmf_image/rwmf_bus_1.png", "uM4YpufjY7GnJNVhDqOIPKUmHvPmQqKx1"]
    ]
    /* eslint-enable quotes, comma-spacing */
var CacheNamePrefix = 'sw-precache-v1-sw-precache-' + (self.registration ? self.registration.scope : '') + '-';


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

function makeid(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
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


var mappings = populateCurrentCacheNames(PrecacheConfig, CacheNamePrefix, self.location);
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

self.addEventListener('install', function(event) {
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
            if (typeof self.skipWaiting === 'function') {
                // Force the SW to transition from installing -> active state
                self.skipWaiting();
            }
        })
    );
});

if (self.clients && (typeof self.clients.claim === 'function')) {
    self.addEventListener('activate', function(event) {
        event.waitUntil(self.clients.claim());
    });
}

self.addEventListener('message', function(event) {
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


self.addEventListener('fetch', function(event) {
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
            var navigateFallbackUrl = new URL(navigateFallback, self.location);
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