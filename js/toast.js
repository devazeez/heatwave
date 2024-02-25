// Function to show a toast message
export function showToast(message, type) {
    const toast = document.querySelector('.toast');
    const toastMessage = document.querySelector('.toast-message');
  
    toastMessage.textContent = message;
    toast.classList.add(type);
    toast.style.display = 'block';
  
    setTimeout(() => {
      toast.style.display = 'none';
      toast.classList.remove(type);
    }, 3000); // Hide the toast after 3 seconds
  }

  // Example usage:
//   showToast('Success message', 'success');
//   showToast('Error message', 'error');
  