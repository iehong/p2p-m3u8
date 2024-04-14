import "./style.css";
if (!window.ReactNativeWebView) {
  window.ReactNativeWebView = {
    postMessage: function (message) {
      // console.log("ReactNativeWebView.postMessage", message);
    },
  };
}
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var engine = new p2pml.hlsjs.Engine({
  loader: {
    trackerAnnounce: [
      "wss://tracker.openwebtorrent.com",
      "wss://tracker.webtorrent.dev",
      "https://tracker.loligirl.cn",
    ],
    rtcConfig: {
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:stun1.l.google.com:19302",
            "stun:stun2.l.google.com:19302",
            "stun:stun3.l.google.com:19302",
            "stun:stun4.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
      ],
    },
  },
});
var video = document.getElementById("video");
var hls = new Hls({
  liveSyncDurationCount: 7,
  loader: engine.createLoaderClass(),
});
p2pml.hlsjs.initHlsJsPlayer(hls);
hls.loadSource(
  urlParams.get("u") || "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
);
hls.attachMedia(video);

video.addEventListener("canplay", function () {
  // console.log("Can play");
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "CanPlay" }));
});

video.addEventListener("pause", function () {
  // console.log("Pause");
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "Pause" }));
});

video.addEventListener("play", function () {
  // console.log("Play");
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "Play" }));
});

video.addEventListener("seeking", function () {
  // console.log("Seeking");
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "Seeking" }));
});

video.addEventListener("seeked", function () {
  // console.log("Seeked");
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "Seeked" }));
});

video.addEventListener("timeupdate", function (e) {
  // console.log("Timeupdate", e.timeStamp);
  ReactNativeWebView?.postMessage(
    JSON.stringify({ event: "Timeupdate", timeStamp: e.timeStamp })
  );
});

video.addEventListener("ended", function () {
  // console.log("Ended");
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "Ended" }));
});

video.addEventListener("error", function (e) {
  // console.log("Error", e);
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "Error", error: e }));
});

video.addEventListener("ratechange", function () {
  // console.log("Ratechange");
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "Ratechange" }));
});

video.addEventListener("waiting", function () {
  // console.log("Waiting");
  ReactNativeWebView?.postMessage(JSON.stringify({ event: "Waiting" }));
});

engine.on(p2pml.core.Events.SegmentLoaded, function (segment, peerId) {
  // console.log("Segment loaded", segment, peerId);
  ReactNativeWebView?.postMessage(
    JSON.stringify({
      event: "SegmentLoaded",
      segment: segment,
      peerId: peerId,
    })
  );
});
engine.on(p2pml.core.Events.SegmentError, function (segment, error, peerId) {
  // console.log("Segment error", segment, error, peerId);
  ReactNativeWebView?.postMessage(
    JSON.stringify({
      event: "SegmentError",
      segment: segment,
      error: error,
      peerId: peerId,
    })
  );
});

engine.on(p2pml.core.Events.SegmentAbort, function (segment) {
  // console.log("Segment abort", segment);
  ReactNativeWebView?.postMessage(
    JSON.stringify({
      event: "SegmentAbort",
      segment: segment,
    })
  );
});
engine.on(p2pml.core.Events.PeerConnect, function (peer) {
  // console.log("Peer connected", peer);
  ReactNativeWebView?.postMessage(
    JSON.stringify({
      event: "PeerConnect",
      peer: peer,
    })
  );
});
engine.on(p2pml.core.Events.PeerClose, function (peerId) {
  // console.log("Peer disconnected", peerId);
  ReactNativeWebView?.postMessage(
    JSON.stringify({
      event: "PeerClose",
      peerId: peerId,
    })
  );
});
engine.on(
  p2pml.core.Events.PieceBytesDownloaded,
  function (method, bytes, peerId) {
    // console.log("PieceBytesDownloaded", method, bytes, peerId);
    ReactNativeWebView?.postMessage(
      JSON.stringify({
        event: "PieceBytesDownloaded",
        method: method,
        bytes: bytes,
        peerId: peerId,
      })
    );
  }
);
engine.on(p2pml.core.Events.PieceBytesUploaded, function (method, bytes) {
  // console.log("PieceBytesUploaded", method, bytes);
  ReactNativeWebView?.postMessage(
    JSON.stringify({
      event: "PieceBytesUploaded",
      method: method,
      bytes: bytes,
    })
  );
});
