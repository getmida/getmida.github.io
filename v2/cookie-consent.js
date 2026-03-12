document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.querySelector('.cookie-consent');
    const acceptButton = document.querySelector('.accept-cookies');
    const declineButton = document.querySelector('.decline-cookies');

    // Check if user has already made a choice
    const consentStatus = localStorage.getItem('cookieConsent');

    if (!consentStatus) {
        // Show the cookie consent popup after a short delay
        setTimeout(() => {
            cookieConsent.classList.add('active');
        }, 1000);
    }

    // Handle accept button click
    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'accepted');
        cookieConsent.classList.remove('active');
        
        // Here you can initialize your analytics and tracking scripts
        // For example: initializeGoogleAnalytics();
    });

    // Handle decline button click
    declineButton.addEventListener('click', () => {
        localStorage.setItem('cookieConsent', 'declined');
        cookieConsent.classList.remove('active');
        
        // Here you can disable or not initialize tracking scripts
        // For example: disableTracking();
    });
}); 