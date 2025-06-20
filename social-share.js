document.addEventListener('DOMContentLoaded', function() {
  // Get current page URL and title automatically
  const urlToShare = window.location.href;
  const textToShare = document.title;

  // Share function for all platforms
  function shareOnSocial(platform) {
    let shareUrl;
    
    switch(platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlToShare)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(urlToShare)}&text=${encodeURIComponent(textToShare)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(urlToShare)}&title=${encodeURIComponent(textToShare)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(textToShare)}&body=Check%20out%20this%20page:%20${encodeURIComponent(urlToShare)}`;
        break;
      default:
        console.error('Unknown platform');
        return;
    }

    // Open share window (with popup blocker workaround)
    const shareWindow = window.open(shareUrl, 'social-share', 'width=600,height=500');
    
    // Focus the window if it exists (helps with some popup blockers)
    if (shareWindow) {
      shareWindow.focus();
    } else {
      // Fallback for strict popup blockers
      window.location.href = shareUrl;
    }
  }

  // Event listeners for your current button structure
  const shareButtons = document.querySelectorAll('.share-btn');
  shareButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const platform = this.getAttribute('data-platform');
      shareOnSocial(platform);
    });
  });
});