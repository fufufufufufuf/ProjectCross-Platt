export function toast(message: string, duration = 2000) {
    const toast = document.createElement('ion-toast');
    toast.message = message;
    toast.duration = duration;
  
    document.body.appendChild(toast);
  
    // Ensure the toast element is fully ready before calling present
    setTimeout(() => {
      toast.present();
    }, 50);
  
    // Clean up the toast element after it is dismissed
    toast.addEventListener('ionToastDidDismiss', () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  
    return toast;
  }
  