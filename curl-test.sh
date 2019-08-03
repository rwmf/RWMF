#!/bin/bash
curl -X POST -H "Authorization: key=AAAArOh5t8g:APA91bGUYZweULkENac1lWU1CS5zwY1c2tAAzRE-fM8vXadV5OwVEKQfTZvpzrXOGFXPw0Xi28cSoHfiikKYc0RxJZ44_1PTKWUzq0iXKu4yhJGjhEJW4nSTRAUPgE9KBtmUNjbGgqdE" -H "Content-Type: application/json" \
   -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "/itwonders-web-logo.png",
    }
  },
  "to": "djfzLvmis_s:APA91bEg6QP7lXd1bvrJJ6SR-VSJ3Lt7BkQsu484s2t5bGVMdn24IhRa_VUZ87symrQc5BD7KTGHqHqEb87Om8lGif406b7W9kELVY7Jbz9A7_SkGIH3rHAe2DA-Foh0Xh8sBJkLgoy9"
}' https://fcm.googleapis.com/fcm/send
