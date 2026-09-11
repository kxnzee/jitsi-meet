# Conference entry point (client side)

This document describes the client-side code that starts a conference join and
hands off to the focus service (Jicofo), and what happens when that hand-off
fails because the focus service is unavailable. It does not describe the XMPP
wire format of that exchange — see `conference-request.md` in the `jitsi-control`
repository for that.

## Starting a join

`ConferenceConnector.connect()` (`conference.js:347`, inside the
`ConferenceConnector` class starting at `conference.js:233`) is the entry point
that starts a conference join. Its body calls `room.join(...)`
(`conference.js:351`), which joins the conference MUC through lib-jitsi-meet.
This triggers the XMPP signaling exchange with the focus service (Jicofo) that
creates or looks up the conference on the server side — see
`jitsi-control/doc/conference-entrypoint.md` in the `jitsi-control` repository
(a separate checkout from this one) for the receiving side of that exchange.

## Failure branch: focus service unavailable

If the focus service is unavailable, the failure is handled inside
`ConferenceConnector._onConferenceFailed()` (`conference.js:259`):

- `case JitsiConferenceErrors.FOCUS_DISCONNECTED` (`conference.js:290`), preceded
  by a comment at `conference.js:286-289` noting that this case fires when
  "Jicofo is not available, but it is going to give it another try".
- `case JitsiConferenceErrors.FOCUS_LEFT` (`conference.js:300`), handled together
  with `ICE_FAILED`, `VIDEOBRIDGE_NOT_AVAILABLE`, and `OFFER_ANSWER_FAILED`: the
  client leaves the room and disconnects (`room.leave(...).then(() =>
  APP.connection.disconnect())`).

## See also

- [`jicofo/doc/conference-entrypoint.md`](https://github.com/kxnzee/jicofo/blob/master/doc/conference-entrypoint.md) —
  documents the corresponding entry point on the focus-service side.
