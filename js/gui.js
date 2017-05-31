$(function() {
  'use strict';
  console.log('gui.js is loaded');

  // CLOCK
  var secondHand = document.querySelector('.second-hand');
  var minuteHand = document.querySelector('.minutes-hand');
  var hourHand = document.querySelector('.hour-hand');

  function setDate() {
    var now = new Date();

    var seconds = now.getSeconds();
    var secondsDegrees = ((seconds / 60) * 360) + 90;

    var minutes = now.getMinutes();
    var minutesDegrees = ((minutes / 60) * 360) + 90;

    var hours = now.getHours();
    var hoursDegrees = ((hours / 12) * 360) + 90;

    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;
    hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
  }
  setInterval(setDate, 1000);
  // END CLOCK


  // Play key and show animation
  function playKey(e) {

    var key = document.querySelector(`.key[data-key='${e.keyCode}']`); // select key based on key class and data-key
    var audio = document.querySelector(`audio[data-key='${e.keyCode}']`);
    var video = document.querySelector(`video[data-key='${e.keyCode}']`);

    if (!audio || !video) return; // stop the function from running if no audio or video on key
    audio.currentTime = 0; // rewind before playing
    audio.play();

    video.currentTime = 0;
    video.play();

    $(key).addClass('playing'); // adds display block

    audio.onended = function() {
      $(key).removeClass('playing'); // removes display block
    };
  }

  // END Play key

  // Event listeners
  var keys = document.querySelectorAll('.key');
  keys.forEach(key => key.addEventListener('transitionend', playKey));
  window.addEventListener('keydown', playKey);
  // END Event linsteners
});
