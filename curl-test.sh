#!/bin/bash
curl -X POST -H "Authorization: key=AAAArOh5t8g:APA91bGUYZweULkENac1lWU1CS5zwY1c2tAAzRE-fM8vXadV5OwVEKQfTZvpzrXOGFXPw0Xi28cSoHfiikKYc0RxJZ44_1PTKWUzq0iXKu4yhJGjhEJW4nSTRAUPgE9KBtmUNjbGgqdE" -H "Content-Type: application/json" \
   -d '{
  "data": {
    "notification": {
        "title": "FCM Message",
        "body": "This is an FCM Message",
        "icon": "itwonders-web-logo.png",
    }
  },
  "to": "e71JyUFcDak:APA91bHMyhwyoKbTQ_1bOv_Hm6Q94hJOC4ZULB5O8SM9UJNEYkpfm8yNg1a-GxJOE4bvHHB8oDVIMWFg72f2VeoR2epj-mBOTkV3j2sLUi-GAgILXjYBkrkwoN7OdAp-YiqDMy8UP7AZ"
}' https://fcm.googleapis.com/fcm/send
