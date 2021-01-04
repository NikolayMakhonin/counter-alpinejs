# Realtime Database Rules

https://console.firebase.google.com/u/1/project/counter-f4e44/database/counter-f4e44-default-rtdb/rules

```
{
  "rules": {
    "counter": {
      "$uid": {
        "options": {
          "timer": {
            "time": {
              ".validate": "newData.isNumber() && newData.val() > 0 && newData.val() <= 24 * 60 * 60 * 1000",
            },
            "interval": {
              ".validate": "newData.isNumber() && newData.val() > 0 && newData.val() <= 24 * 60 * 60 * 1000",
            },
			"$other": {
			  ".read": false,
			  ".write": false,
			}
          }
        },
        "sessions": {
          ".read": "auth !== null && auth.uid === $uid",
          ".write": "auth !== null && auth.uid === $uid",
          "$sessionId": {
            ".validate": "newData.hasChildren(['events']) && newData.child('events').hasChildren()",
            "events": {
              "$eventsId": {
                ".validate": "newData.hasChildren(['date', 'value'])",
                "date": {
                  ".validate": "newData.isNumber() && newData.val() > now - 10 * 366 * 24 * 60 * 60 * 1000 && newData.val() <= now + 24 * 60 * 60 * 1000",
                },
                "value": {
                  ".validate": "newData.isNumber() && newData.val() >= 0 && newData.val() <= 100",
                },
                "$other": {
                  ".read": false,
                  ".write": false,
                }
              }
            },
            "$other": {
              ".read": false,
              ".write": false,
            }
          }
        },
        "$other": {
          ".read": false,
          ".write": false,
        }
      }
    },
    "$other": {
      ".read": false,
      ".write": false,
    }
  }
}
```