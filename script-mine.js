// This script handles the "My Account" page functionality.
document.addEventListener('DOMContentLoaded', () => {
    const profileIdEl = document.getElementById('profileId');
    const profileEmailEl = document.getElementById('profileEmail');
    const profileBalanceEl = document.getElementById('profileBalance');
    const logoutBtn = document.getElementById('logoutBtn');
    const rechargeBtn = document.getElementById('rechargeBtn');
    
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // Use onSnapshot for real-time updates of the balance
            firebase.firestore().collection('users').doc(user.uid).onSnapshot(doc => {
                if (doc.exists) {
                    const userData = doc.data();
                    profileIdEl.textContent = `ID: ${userData.userId || 'N/A'}`;
                    profileEmailEl.textContent = userData.email || user.email;
                    profileBalanceEl.textContent = `₹${(userData.balance || 0).toFixed(2)}`;
                }
            });
        } else {
            // If no user is signed in, redirect to login
            window.location.href = 'login.html';
        }
    });

    // --- Button Logic ---
    if (rechargeBtn) {
        rechargeBtn.addEventListener('click', () => {
            window.location.href = 'recharge.html';
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            firebase.auth().signOut().then(() => {
                window.location.href = 'login.html';
            });
        });
    }
});
  
