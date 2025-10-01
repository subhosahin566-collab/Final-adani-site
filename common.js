// This script handles the sidebar functionality and loads basic user data on every page.
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.getElementById('menuBtn');
    const sideMenu = document.getElementById('sideMenu');
    const closeBtn = document.getElementById('closeBtn');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    const openSidebar = () => document.body.classList.add('sidebar-open');
    const closeSidebar = () => document.body.classList.remove('sidebar-open');

    if (menuBtn) menuBtn.addEventListener('click', openSidebar);
    if (closeBtn) closeBtn.addEventListener('click', closeSidebar);
    if (sidebarOverlay) sidebarOverlay.addEventListener('click', closeSidebar);

    const sidebarIdEl = document.getElementById('sidebarId');
    const sidebarVIPEl = document.getElementById('sidebarVIP');

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            const db = firebase.firestore();
            db.collection('users').doc(user.uid).onSnapshot(doc => {
                if (doc.exists) {
                    const userData = doc.data();
                    if (sidebarIdEl) sidebarIdEl.textContent = `ID: ${userData.userId || 'N/A'}`;
                    if (sidebarVIPEl) sidebarVIPEl.textContent = `VIP ${userData.vipLevel || 0}`;
                }
            });
        }
    });
});
              
