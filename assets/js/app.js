$(function () {

    function updateCount() {
      $('#count').text($('.video-col:visible').length);
    }

    function applyFilters() {
      const q = $('#search').val().trim().toLowerCase();
      const activeCat = $('.btn-filter.active').data('cat');

      $('.video-col').each(function () {
        const title = ($(this).data('title') || "").toString().toLowerCase();
        const vcat = $(this).data('cat');
        const matchesQuery = q === "" || title.indexOf(q) !== -1;
        const matchesCat = activeCat === 'all' || vcat === activeCat;

        if (matchesQuery && matchesCat) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });

      updateCount();
    }

    // Initial count
    applyFilters();

    // Search
    $('#search').on('input', function () {
      applyFilters();
    });

    // Category pills
    $('.btn-filter').on('click', function () {
      $('.btn-filter').removeClass('active');
      $(this).addClass('active');
      applyFilters();
    });

    // Open video in modal and set iframe src for YouTube embed
    $('.video-card').on('click keypress', function (e) {
      // allow Enter (13) and Space (32) for keyboard activation
      if (e.type === 'keypress' && e.which !== 13 && e.which !== 32) return;
      const video_name = $(this).data('videoid');
      if (!video_name) return;
      const url = "./upload/videos/" + video_name;
      $('#videoFrame').attr('src', url);
      // If click triggered via keyboard, show modal programmatically
      if (e.type === 'keypress') {
        $('#videoModal').modal('show');
      }
    });

    // Stop video when modal closes
    $('#videoModal').on('hidden.bs.modal', function () {
      $('#videoFrame').attr('src', '');
    });

    // Staggered animation delay for cards
    $('.video-col.fade-in-up').each(function (i) {
      $(this).css('animation-delay', (i * 90) + 'ms');
    });

  });