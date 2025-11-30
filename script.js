// otel verileri
const rooms = [
    {
        id: 1,
        name: "Standart Oda",
        category: "Bütçe",
        price: 350,
        icon: "🛏️",
        image: "https://picsum.photos/seed/room1/600/400",
        description: "Konforlu, temiz ve rahat bir oda.",
        features: ["WiFi", "TV", "Klima", "Duş"],
        capacity: "2 Kişi",
        budget: "budget"
    },
    {
        id: 2,
        name: "Deluxe Oda",
        category: "Standart",
        price: 750,
        icon: "🏨",
        image: "https://picsum.photos/seed/room2/600/400",
        description: "Modern tasarım ve lüks donanımlarla dolu.",
        features: ["WiFi", "Smart TV", "Klima", "Duş", "Mini Bar"],
        capacity: "2-3 Kişi",
        budget: "standard"
    },
    {
        id: 3,
        name: "Premium Suit",
        category: "Premium",
        price: 1500,
        icon: "🌟",
        image: "https://picsum.photos/seed/room3/600/400",
        description: "Ayrı oturma alanı ve panoramik manzara ile.",
        features: ["WiFi", "4K TV", "Klima", "Jacuzzi", "Mini Bar", "Balkon"],
        capacity: "3-4 Kişi",
        budget: "premium"
    },
    {
        id: 4,
        name: "Lüks Penthouse",
        category: "Lüks",
        price: 2500,
        icon: "👑",
        image: "https://picsum.photos/seed/room4/600/400",
        description: "Şehrin en güzel manzarası, özel hizmetler.",
        features: ["WiFi", "4K TV", "Klima", "Jacuzzi", "Concierge", "Balkon", "Sauna"],
        capacity: "4-5 Kişi",
        budget: "luxury"
    },
    {
        id: 5,
        name: "Ekonomi Oda",
        category: "Bütçe",
        price: 300,
        icon: "🏠",
        image: "https://picsum.photos/seed/room5/600/400",
        description: "Uygun fiyatla konforlu konaklama.",
        features: ["WiFi", "TV", "Klima"],
        capacity: "1-2 Kişi",
        budget: "budget"
    },
    {
        id: 6,
        name: "Aile Odası",
        category: "Standart",
        price: 900,
        icon: "👨‍👩‍👧‍👦",
        image: "https://picsum.photos/seed/room6/600/400",
        description: "Geniş ve rahat, aileler için ideal.",
        features: ["WiFi", "TV", "Klima", "Duş", "Oturma Alanı"],
        capacity: "4-5 Kişi",
        budget: "standard"
    },
    {
        id: 7,
        name: "Business Suit",
        category: "Premium",
        price: 1200,
        icon: "💼",
        image: "https://picsum.photos/seed/room7/600/400",
        description: "İşletmeler için tam donanımlı.",
        features: ["WiFi", "TV", "Klima", "Çalışma Masası", "Telefon"],
        capacity: "1-2 Kişi",
        budget: "premium"
    },
    {
        id: 8,
        name: "Royal Suite",
        category: "Lüks",
        price: 3000,
        icon: "🎩",
        image: "https://picsum.photos/seed/room8/600/400",
        description: "En yüksek standartlarda hizmet.",
        features: ["WiFi", "4K TV", "Klima", "Spa", "Chef Hizmeti", "Balkon"],
        capacity: "5+ Kişi",
        budget: "luxury"
    }
    ,
    {
        id: 9,
        name: "Deniz Manzaralı Oda",
        category: "Premium",
        price: 1600,
        icon: "🌊",
        image: "https://picsum.photos/seed/room9/600/400",
        description: "Panoramik deniz manzarası ile rahat bir konaklama.",
        features: ["WiFi", "TV", "Klima", "Balkon"],
        capacity: "2-3 Kişi",
        budget: "premium"
    },
    {
        id: 10,
        name: "Dağ Manzaralı Oda",
        category: "Standart",
        price: 800,
        icon: "🏔️",
        image: "https://picsum.photos/seed/room10/600/400",
        description: "Doğa ile iç içe, huzurlu bir konaklama.",
        features: ["WiFi", "TV", "Klima"],
        capacity: "2 Kişi",
        budget: "standard"
    },
    {
        id: 11,
        name: "Aile Suiti",
        category: "Lüks",
        price: 2200,
        icon: "👨‍👩‍👧‍👦",
        image: "https://picsum.photos/seed/room11/600/400",
        description: "Geniş aileler için özel suit, ekstra hizmetlerle.",
        features: ["WiFi", "4K TV", "Klima", "Mini Bar", "Balkon"],
        capacity: "4-6 Kişi",
        budget: "luxury"
    }
];

// rezervasyon verileri
let reservations = JSON.parse(localStorage.getItem('reservations')) || {};
let users = JSON.parse(localStorage.getItem('users')) || {};
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
let currentAdmin = JSON.parse(localStorage.getItem('currentAdmin')) || null;
let currentPage = 1;
let currentFilter = 'all';
const itemsPerPage = 6;

// ilk yükleme
document.addEventListener('DOMContentLoaded', () => {
    initializeRooms();
    updateAuthUI();
    showHome();
    loadTheme();
});

// oda rezervasyon verilerini başlat
function initializeRooms() {
    rooms.forEach(room => {
        if (!reservations[room.id]) {
            reservations[room.id] = { available: true, bookedDates: [] };
        }
    });
    saveReservations();
}

// bölümlerin yönetimi
function showHome() {
    hideAllSections();
    document.getElementById('home').classList.add('active');
    currentPage = 1;
}

function showRooms() {
    hideAllSections();
    document.getElementById('rooms').classList.add('active');
    currentPage = 1;
    displayRooms();
}

function showAbout() {
    hideAllSections();
    document.getElementById('about').classList.add('active');
}

function hideAllSections() {
    document.getElementById('home').classList.remove('active');
    document.getElementById('rooms').classList.remove('active');
    document.getElementById('about').classList.remove('active');
}

function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    modal.classList.toggle('active');
}

function toggleSignup() {
    const authModal = document.getElementById('authModal');
    const signupModal = document.getElementById('signupModal');
    authModal.classList.toggle('active');
    signupModal.classList.toggle('active');
}

// Burger Menü Toggle
function toggleMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
}

// Burger Menüyü Kapat
function closeMenu() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
}

function closeRoomDetail() {
    document.getElementById('roomDetailModal').classList.remove('active');
}

function closeReservation() {
    document.getElementById('reservationModal').classList.remove('active');
}

function closeAdminPanel() {
    document.getElementById('adminPanelModal').classList.remove('active');
}

// GİRİŞ/KAYDOL
function login(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Umut Bey (admin) girişi
    if (username === 'admin' && password === '123') {
        currentAdmin = { username: 'admin', name: 'Umut Bey' };
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));
        updateAuthUI();
        toggleAuthModal();
        showRooms();
        alert('Hoşgeldiniz Umut Bey!');
        return;
    }

    // Burak Bey (admin) girişi
    if (username === 'admin' && password === '1234') {
        currentAdmin = { username: 'admin', name: 'Burak Bey' };
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));
        updateAuthUI();
        toggleAuthModal();
        showRooms();
        alert('Hoşgeldiniz Burak Bey!');
        return;
    }

    // Normal kullanıcı girişi
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (storedUsers[username] && storedUsers[username].password === password) {
        currentUser = { username: username, email: storedUsers[username].email };
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        updateAuthUI();
        toggleAuthModal();
        alert('Giriş başarılı hoşgeldiniz ' + username + '!');
    } else {
        alert('Kullanıcı adı veya şifre hatalı!');
    }
}

function signup(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupPasswordConfirm').value;

    if (username in users) {
        alert('Bu kullanıcı adı zaten kullanılmakta!');
        return;
    }

    if (password !== confirmPassword) {
        alert('Şifreler eşleşmiyor!');
        return;
    }

    users[username] = { email: email, password: password };
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = { username: username, email: email };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    toggleSignup();
    alert('Kayıt başarılı hoşgeldiniz ' + username + '!');
}

// ADMIN GİRİŞİ
function adminLogin(event) {
    event.preventDefault();
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;

    if (username === 'admin' && password === '123') {
        currentAdmin = { username: 'admin' };
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));
        updateAuthUI();
        toggleAdminModal();
        showAdminPanel();
        alert('Admin paneline hoşgeldiniz!');
    } else {
        alert('Admin kullanıcı adı veya şifre hatalı!');
    }
}

// ÇIKIŞ YAP
function logout() {
    if (confirm('Çıkış yapmak istediğinizden emin misiniz?')) {
        currentUser = null;
        currentAdmin = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentAdmin');
        updateAuthUI();
        showHome();
    }
}

// UI GÜNCELLE
function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authBtnMobile = document.getElementById('authBtnMobile');
    const logoutBtnMobile = document.getElementById('logoutBtnMobile');
    const reservationsLink = document.getElementById('navReservationsLink');
    const reservationsLinkMobile = document.getElementById('navReservationsLinkMobile');

    if (currentUser) {
        authBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        logoutBtn.textContent = `${currentUser.username} - Çıkış Yap`;
        authBtnMobile.style.display = 'none';
        logoutBtnMobile.style.display = 'block';
        logoutBtnMobile.textContent = `${currentUser.username} - Çıkış Yap`;
        if (reservationsLink) reservationsLink.style.display = 'inline-block';
        if (reservationsLinkMobile) reservationsLinkMobile.style.display = 'block';
    } else if (currentAdmin) {
        authBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        logoutBtn.textContent = `${currentAdmin.name} - Çıkış Yap`;
        authBtnMobile.style.display = 'none';
        logoutBtnMobile.style.display = 'block';
        logoutBtnMobile.textContent = `${currentAdmin.name} - Çıkış Yap`;
        if (reservationsLink) reservationsLink.style.display = 'none';
        if (reservationsLinkMobile) reservationsLinkMobile.style.display = 'none';
    } else {
        authBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        authBtnMobile.style.display = 'block';
        logoutBtnMobile.style.display = 'none';
        authBtn.textContent = 'Giriş Yap';
        if (reservationsLink) reservationsLink.style.display = 'none';
        if (reservationsLinkMobile) reservationsLinkMobile.style.display = 'none';
    }
}

// ODALARI GÖSTER
function displayRooms() {
    const filtered = filterByPrice();
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    
    const start = (currentPage - 1) * itemsPerPage;
    const paginatedRooms = filtered.slice(start, start + itemsPerPage);

    let html = '';
    paginatedRooms.forEach(room => {
        const isAvailable = reservations[room.id].available;
        html += `
            <div class="room-card">
                <div class="room-image">
                    ${room.image ? `<img src="${room.image}" alt="${room.name}">` : room.icon}
                </div>
                <div class="room-info">
                    <span class="room-category">${room.category}</span>
                    <h3 class="room-title">${room.name}</h3>
                    <div class="room-price">₺${room.price}/Gece</div>
                    <p class="room-description">${room.description}</p>
                    <div class="room-features">
                        ${room.features.map(f => `<span class="feature"><i class="fas fa-check"></i>${f}</span>`).join('')}
                    </div>
                    <div class="room-status ${isAvailable ? 'available' : 'reserved'}">
                        ${isAvailable ? '✓ Müsait' : '✗ Rezerveli'}
                    </div>
                    <div class="room-actions">
                        <button class="view-btn" onclick="viewRoomDetail(${room.id})">Detayları Gör</button>
                        <button class="reserve-btn" ${!isAvailable ? 'disabled' : ''} onclick="checkLogin(${room.id})">
                            ${isAvailable ? 'Rezervasyon Yap' : 'Müsait Değil'}
                        </button>
                    </div>
                    ${currentAdmin ? `
                        <div class="admin-controls">
                            <h4>Admin Kontrolü</h4>
                            <div class="admin-buttons">
                                <button class="admin-toggle-btn" onclick="toggleRoomStatus(${room.id})" title="Durum Değiştir">
                                    <i class="fas fa-power-off"></i> ${isAvailable ? 'Rezerveli Yap' : 'Boşalt'}
                                </button>
                                <button class="admin-edit-btn" onclick="editRoomPrice(${room.id})" title="Fiyat Düzenle">
                                    <i class="fas fa-edit"></i> Fiyat Düzenle
                                </button>
                                <button class="admin-info-btn" onclick="viewReservations(${room.id})" title="Rezervasyonlar">
                                    <i class="fas fa-calendar"></i> Rezervasyonlar
                                </button>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });

    document.getElementById('roomsGrid').innerHTML = html;
    displayPagination(totalPages);
}

function filterByPrice() {
    let filtered = rooms;
    
    if (currentFilter !== 'all') {
        filtered = rooms.filter(room => room.budget === currentFilter);
    }

    return filtered;
}

function filterRooms() {
    currentFilter = document.getElementById('priceFilter').value;
    currentPage = 1;
    displayRooms();
}

function displayPagination(totalPages) {
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button class="${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">${i}</button>`;
    }
    
    document.getElementById('paginationBottom').innerHTML = html;
}

function goToPage(page) {
    currentPage = page;
    displayRooms();
    window.scrollTo(0, 0);
}

// ODA DETAYLARI
function viewRoomDetail(roomId) {
    const room = rooms.find(r => r.id === roomId);
    const isAvailable = reservations[room.id].available;
    
    const html = `
        <div class="room-detail-content">
            <h3>${room.name}</h3>
            <div class="room-image" style="height: 200px; margin-bottom: 20px; border-radius: 5px;">
                ${room.icon}
            </div>
            <div class="detail-price">₺${room.price}/Gece</div>
            <div class="detail-description">${room.description}</div>
            
            <div class="detail-info">
                <strong>Kapasite:</strong> ${room.capacity}
            </div>
            <div class="detail-info">
                <strong>Kategori:</strong> ${room.category}
            </div>
            <div class="detail-info">
                <strong>Durum:</strong> ${isAvailable ? '<span style="color: green;">✓ Müsait</span>' : '<span style="color: red;">✗ Rezerveli</span>'}
            </div>
            
            <div class="detail-info">
                <strong>Özellikleri:</strong><br>
                ${room.features.map(f => `<span style="display: inline-block; margin: 5px; padding: 5px 10px; background: #e8f4f8; border-radius: 3px;">✓ ${f}</span>`).join('')}
            </div>
        </div>
    `;
    
    document.getElementById('roomDetail').innerHTML = html;
    document.getElementById('roomDetailModal').classList.add('active');
}

// RESERVASYONu KONTROL ET
function checkLogin(roomId) {
    if (!currentUser) {
        alert('Lütfen rezervasyon yapmak için giriş yapınız!');
        toggleAuthModal();
        return;
    }
    
    openReservation(roomId);
}

function openReservation(roomId) {
    document.getElementById('reservationRoomId').value = roomId;
    document.getElementById('checkInDate').value = '';
    document.getElementById('checkOutDate').value = '';
    document.getElementById('notes').value = '';
    document.getElementById('reservationModal').classList.add('active');
}

// RESERVASYONu YAP
function makeReservation(event) {
    event.preventDefault();
    
    const roomId = document.getElementById('reservationRoomId').value;
    const checkIn = document.getElementById('checkInDate').value;
    const checkOut = document.getElementById('checkOutDate').value;
    const notes = document.getElementById('notes').value;
    
    if (new Date(checkOut) <= new Date(checkIn)) {
        alert('Çıkış tarihi giriş tarihinden sonra olmalıdır!');
        return;
    }
    
    const room = rooms.find(r => r.id == roomId);
    const days = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const totalPrice = days * room.price;
    
    // Ödeme sayfasını aç
    closeReservation();
    openPayment(totalPrice, checkIn, checkOut, roomId);
}

// ADMIN PANELİ
function showAdminPanel() {
    if (!currentAdmin) {
        alert('Yetkiniz yok!');
        return;
    }
    
    let html = '';
    rooms.forEach(room => {
        const isAvailable = reservations[room.id].available;
        const reservationDetails = reservations[room.id].reservationDetails || [];
        
        html += `
            <div class="admin-room-item">
                <div class="admin-room-info">
                    <h4>${room.name} (₺${room.price}/Gece)</h4>
                    <p style="font-size: 0.9rem; color: #555;">
                        ${isAvailable ? '✓ Müsait' : '✗ Rezerveli'}
                    </p>
                    ${reservationDetails.length > 0 ? `
                        <p style="font-size: 0.85rem; color: #7f8c8d;">
                            <strong>Rezervasyonlar:</strong> ${reservationDetails.length}
                        </p>
                    ` : ''}
                </div>
                <div class="admin-room-actions">
                    <button class="admin-btn-toggle ${isAvailable ? '' : 'reserved'}" 
                        onclick="toggleRoomAvailability(${room.id})">
                        ${isAvailable ? 'Rezerveli Göster' : 'Boşalt'}
                    </button>
                </div>
            </div>
        `;
    });
    
    document.getElementById('adminRooms').innerHTML = html;
    document.getElementById('adminPanelModal').classList.add('active');
}

// ODA DURUMUNU DEĞİŞTİR
function toggleRoomAvailability(roomId) {
    reservations[roomId].available = !reservations[roomId].available;
    saveReservations();
    showAdminPanel();
}

// ADMIN: ODA DURUMUNU DEĞIŞTIR (ODALAR SAYFASINDA)
function toggleRoomStatus(roomId) {
    reservations[roomId].available = !reservations[roomId].available;
    saveReservations();
    displayRooms();
}

// ADMIN: FIYAT DÜZENLE
function editRoomPrice(roomId) {
    const room = rooms.find(r => r.id == roomId);
    const newPrice = prompt(`${room.name} için yeni fiyat girin (Şimdiki: ₺${room.price}):`, room.price);
    
    if (newPrice && !isNaN(newPrice) && newPrice > 0) {
        room.price = parseInt(newPrice);
        displayRooms();
        alert('Fiyat güncellendi!');
    } else if (newPrice !== null) {
        alert('Geçerli bir fiyat girin!');
    }
}

// ADMIN: REZERVASYONLARI GÖR
function viewReservations(roomId) {
    const room = rooms.find(r => r.id == roomId);
    const reservationDetails = reservations[roomId].reservationDetails || [];
    
    if (reservationDetails.length === 0) {
        alert(`${room.name} için aktif rezervasyon yok.`);
        return;
    }
    
    let reservationText = `${room.name} - Rezervasyonlar:\n\n`;
    reservationDetails.forEach((res, index) => {
        reservationText += `${index + 1}. Kullanıcı: ${res.user}\n`;
        reservationText += `   Giriş: ${res.checkIn} | Çıkış: ${res.checkOut}\n`;
        reservationText += `   Tutar: ₺${res.totalPrice}\n`;
        if (res.notes) {
            reservationText += `   Not: ${res.notes}\n`;
        }
        reservationText += '\n';
    });
    
    alert(reservationText);
}

// VERİ KAYDET
function saveReservations() {
    localStorage.setItem('reservations', JSON.stringify(reservations));
}

// TEMA YÖNETİMİ
function setTheme(theme) {
    localStorage.setItem('theme', theme);
    
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        if (document.getElementById('darkModeBtn')) {
            document.getElementById('darkModeBtn').classList.add('active');
            document.getElementById('lightModeBtn').classList.remove('active');
        }
    } else {
        document.body.classList.remove('dark-mode');
        if (document.getElementById('lightModeBtn')) {
            document.getElementById('lightModeBtn').classList.add('active');
            document.getElementById('darkModeBtn').classList.remove('active');
        }
    }
}

// ÖDEME MODAL İ AÇ/KAPAMA
function openPayment(totalPrice, checkIn, checkOut, roomId) {
    const room = rooms.find(r => r.id == roomId);
    
    const nights = Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24));
    const subtotal = totalPrice;
    const tax = Math.round(subtotal * 0.18); // KDV %18
    const total = subtotal + tax;
    
    // Ödeme özeti oluştur
    let summaryHTML = `
        <div class="payment-item">
            <span>${room.name}</span>
            <span>${nights} Gece</span>
            <span class="price">₺${subtotal}</span>
        </div>
        <div class="payment-item">
            <span>KDV (%18)</span>
            <span></span>
            <span class="price">₺${tax}</span>
        </div>
        <div class="payment-total">
            <span>Toplam Tutar:</span>
            <span class="total-price">₺${total}</span>
        </div>
    `;
    
    document.getElementById('paymentSummary').innerHTML = summaryHTML;
    document.getElementById('paymentModal').classList.add('active');
    
    // Ödeme verilerini sakla
    window.currentPayment = {
        roomId: roomId,
        checkIn: checkIn,
        checkOut: checkOut,
        nights: nights,
        subtotal: subtotal,
        tax: tax,
        total: total
    };
}

function closePayment() {
    document.getElementById('paymentModal').classList.remove('active');
}

// KART NUMARASI FORMATLAMA
function formatCardNumber(input) {
    let value = input.value.replace(/\s+/g, '');
    let formattedValue = '';
    
    for (let i = 0; i < value.length; i++) {
        if (i > 0 && i % 4 === 0) {
            formattedValue += ' ';
        }
        formattedValue += value[i];
    }
    
    input.value = formattedValue;
}

// SON KULLANIM TARİHİ FORMATLAMA
function formatExpiryDate(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    
    input.value = value;
}

// ÖDEME İŞLEMİ
function processPayment(event) {
    event.preventDefault();
    
    const cardNumber = document.getElementById('cardNumber').value.replace(/\s+/g, '');
    const expiryDate = document.getElementById('expiryDate').value;
    const cvv = document.getElementById('cvv').value;
    
    // Basit validasyon
    if (cardNumber.length !== 16 || !/^\d+$/.test(cardNumber)) {
        alert('Geçerli bir kart numarası girin!');
        return;
    }
    
    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        alert('Geçerli bir son kullanım tarihi girin (MM/YY)!');
        return;
    }
    
    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
        alert('Geçerli bir CVV girin!');
        return;
    }
    
    // Ödeme işlemi
    const payment = window.currentPayment;
    const notes = document.getElementById('notes') ? document.getElementById('notes').value : '';
    
    const reservation = {
        user: currentUser.username,
        checkIn: payment.checkIn,
        checkOut: payment.checkOut,
        totalPrice: payment.total,
        notes: notes,
        paymentInfo: {
            cardholderName: document.getElementById('cardholderName').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zipCode: document.getElementById('zipCode').value
        },
        paymentDate: new Date().toLocaleDateString('tr-TR')
    };
    
    // Rezervasyonu kaydet
    if (!reservations[payment.roomId].reservationDetails) {
        reservations[payment.roomId].reservationDetails = [];
    }
    reservations[payment.roomId].reservationDetails.push(reservation);
    reservations[payment.roomId].available = false;
    saveReservations();
    
    // Başarı mesajı
    closePayment();
    alert(`Ödeme başarılı! ${payment.total} TL tutarında ödeme alındı.\nRezervasyonunuz kaydedildi.`);
    showRooms();
}

// TEMA YÖNETİMİ (DARK/LIGHT MODE)
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }
}
