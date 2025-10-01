document.addEventListener('DOMContentLoaded', () => {
    const db = firebase.firestore();
    const auth = firebase.auth();
    let currentUser = null;

    auth.onAuthStateChanged(user => {
        if (user) {
            currentUser = user;
            loadPlans('primary'); // Load primary plans by default
        } else {
            window.location.href = 'login.html';
        }
    });

    const tabs = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelector('.tab-button.active').classList.remove('active');
            tab.classList.add('active');
            
            const activeTab = tab.dataset.tab;
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(activeTab).classList.add('active');

            if (activeTab === 'primary' || activeTab === 'vip') {
                loadPlans(activeTab);
            } else if (activeTab === 'purchased') {
                loadPurchasedPlans();
            }
        });
    });

    function loadPlans(planType) {
        const container = document.getElementById(planType);
        if (!container) return;

        container.innerHTML = '<p>Loading plans...</p>';

        db.collection('plans').where('type', '==', planType).get().then(querySnapshot => {
            container.innerHTML = '';
            if (querySnapshot.empty) {
                container.innerHTML = `<p>No ${planType} plans available.</p>`;
                return;
            }
            querySnapshot.forEach(doc => {
                const plan = doc.data();
                const planId = doc.id;
                const planCard = `
                    <div class="plan-card-new">
                        <h4>${plan.name}</h4>
                        <p>Day Income: <span>₹${plan.dailyIncome}</span></p>
                        <p>Income Days: <span>${plan.cycle} days</span></p>
                        <p>Invest Price: <span>₹${plan.price}</span></p>
                        <button class="invest-btn" data-id="${planId}">Invest Now</button>
                    </div>
                `;
                container.innerHTML += planCard;
            });
        }).catch(error => {
            console.error(`Error fetching ${planType} plans:`, error);
            container.innerHTML = `<p style="color: red;">Could not load plans. Please check your Firebase setup.</p>`;
        });
    }
    
    // ... (Your loadPurchasedPlans and handlePurchase logic goes here) ...
});
