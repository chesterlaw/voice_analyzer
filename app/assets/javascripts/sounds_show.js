$(document).ready(function() {
  var audio = document.querySelector('.sounds-show audio');

  if (audio) { main(); }

  function main() {
    // Update audio currentTime display for user.
    audio.ontimeupdate = function() {
      var currentTimeElement = document.querySelector('.sounds-show .current-time')
      currentTimeElement.innerHTML = Math.floor(audio.currentTime*1000);
    };

    // Play sections when Play button is clicked.
    $('.section-box button').on('click', function() {
      var startTime = $(this).parents('.section-box').data('start-time')/1000;
      var endTime = $(this).parents('.section-box').data('end-time')/1000;
      playFromHereToHere(startTime, endTime);
    });

    // Visit new section's desired start_time.
    $('.visit-here').on('click', function() {
      var value = Number($(this).parents('.field').children('input')[0].value)/1000;
      audio.currentTime = value;
    });

    // Play/Pause functionality in New Section form.
    $('.play-pause').on('click', function() {
      if (audio.paused === true) {
        audio.play();
      } else {
        audio.pause();
      }
    });

    $('.preview-section').on('click', function() {
      var startTime = Number($(this).parents('form').find('#section_start_time')[0].value)/1000;
      var endTime = Number($(this).parents('form').find('#section_end_time')[0].value)/1000;
      playFromHereToHere(startTime, endTime);
    });
  }

  function playFromHereToHere(startTime, endTime) {
    var src = document.querySelector('.sound audio').src;
    // Create new audio element instead of using main one,
    // so that multiple audios can play at the same time.
    var backgroundAudio = new Audio(src);

    backgroundAudio.currentTime = startTime;
    backgroundAudio.play()
    checkIfSectionEnded();

    function checkIfSectionEnded() {
      if (backgroundAudio.currentTime <= endTime) {
        requestAnimationFrame(checkIfSectionEnded);
      } else {
        backgroundAudio.pause();
      }
    }
  }
});
