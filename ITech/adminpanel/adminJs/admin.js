



/* Back Prevent */
if (window.history && window.history.pushState) {
    window.history.pushState('forward', null, './');
    $(window).on('popstate', function() {
      window.history.pushState('forward', null, './');
    });
  }

  document.addEventListener('DOMContentLoaded', function() {
    // Get the current selected tab index from local storage
    var selectedTab = localStorage.getItem('selectedTab');
  
    // If there is a selected tab index, activate the corresponding tab and its content
    if (selectedTab) {
      var tabLink = document.querySelector(`a.nav-link[href="#v-tabs-${selectedTab}"]`);
      var tabContent = document.querySelector(`#v-tabs-${selectedTab}`);
      if (tabLink && tabContent) {
        tabLink.classList.add('active');
        tabLink.setAttribute('aria-selected', 'true');
        tabContent.classList.add('show', 'active');
      }
    }
  
    // Add event listener to store the selected tab index in local storage when a tab is clicked
    var tabLinks = document.querySelectorAll('a.nav-link');
    tabLinks.forEach(function(tabLink) {
      tabLink.addEventListener('click', function(event) {
        var tabIndex = event.target.getAttribute('href').split('-').pop();
        localStorage.setItem('selectedTab', tabIndex);
      });
    });
  });
  
  function deleteRecord(id) {
    if (confirm("Are you sure you want to delete this record?")) {
        // Send an AJAX request to the server
        const xhr = new XMLHttpRequest();
        xhr.open('POST', './query/examinationController.php'); // Replace 'your_php_file.php' with the actual PHP file that handles the deletion
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            if (xhr.status === 200) {
                // Request was successful
                console.log('Record deleted successfully');
                // Remove the table row from the DOM
                const button = document.querySelector('[data-id="' + id + '"]');
                if (button) {
                    button.closest('tr').remove();
                }
            } else {
                // Request failed
                console.error('Failed to delete record');
            }
        };
        xhr.send('delete_id=' + encodeURIComponent(id));
    }
}

function showEditModal(element) {
  var id = element.getAttribute("data-id");
  var question = element.getAttribute("data-question");
  var answer = element.getAttribute("data-answer");
  var option1 = element.getAttribute("data-option1");
  var option2 = element.getAttribute("data-option2");
  var option3 = element.getAttribute("data-option3");
  var option4 = element.getAttribute("data-option4");

  document.getElementById("editId").value = id;
  document.getElementById("editQuestion").value = question;
  document.getElementById("editAnswer").value = answer;
  document.getElementById("editOption1").value = option1;
  document.getElementById("editOption2").value = option2;
  document.getElementById("editOption3").value = option3;
  document.getElementById("editOption4").value = option4;

  var editModal = new bootstrap.Modal(document.getElementById("editModal"));
  editModal.show();
}

// JavaScript code to fade out the alert after 3 seconds
document.addEventListener('DOMContentLoaded', function() {
  var alertElement = document.querySelector('.alert');
  setTimeout(function() {
    alertElement.classList.remove('show');
    alertElement.classList.add('fade');
  }, 2000);
});


// Get the Resend OTP button
var resendOTPButton = document.getElementById('resend-otp');

// Set the countdown duration in seconds
var countdownDuration = 30;

// Function to start the countdown
function startCountdown() {
  // Disable the Resend OTP button
  resendOTPButton.disabled = true;

  // Check if the countdown value is already stored in localStorage
  var storedCountdown = localStorage.getItem('resendOTPCountdown');

  if (storedCountdown) {
    // Retrieve the countdown value from localStorage
    var countdown = parseInt(storedCountdown, 10);
  } else {
    // Set the initial countdown value
    var countdown = countdownDuration;
  }

  // Update the button text with the initial countdown value
  resendOTPButton.textContent = 'Resend OTP (' + countdown + ')';

  // Decrement the countdown value every second
  var countdownInterval = setInterval(function() {
    countdown--;

    // Update the button text with the updated countdown value
    resendOTPButton.textContent = 'Resend OTP (' + countdown + ')';

    // Check if the countdown has reached 0
    if (countdown <= 0) {
      // Enable the Resend OTP button
      resendOTPButton.disabled = false;
      resendOTPButton.textContent = 'Resend OTP';

      // Clear the countdown interval
      clearInterval(countdownInterval);

      // Remove the countdown value from localStorage
      localStorage.removeItem('resendOTPCountdown');
    } else {
      // Store the countdown value in localStorage
      localStorage.setItem('resendOTPCountdown', countdown);
    }
  }, 1000);
}

// Start the countdown when the page loads
startCountdown();
