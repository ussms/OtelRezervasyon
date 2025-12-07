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
    loadTheme();
    displayRooms(); // Odaları göster
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
    document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
}

function showRooms() {
    document.getElementById('rooms').scrollIntoView({ behavior: 'smooth' });
    currentPage = 1;
    displayRooms();
}

function showAbout() {
    document.getElementById('about').scrollIntoView({ behavior: 'smooth' });
}

function hideAllSections() {
    // Artık kullanılmıyor ama uyumluluk için bırakıldı
    document.getElementById('priceEdit').classList.remove('active');
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
        currentUser = null; // Normal kullanıcı değil
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));
        localStorage.removeItem('currentUser');
        updateAuthUI();
        toggleAuthModal();
        displayRooms(); // Admin kontrollerini göster
        showToast('Hoşgeldiniz Umut Bey! 👨‍💼', 'success');
        return;
    }

    // Burak Bey (admin) girişi
    if (username === 'admin' && password === '1234') {
        currentAdmin = { username: 'admin', name: 'Burak Bey' };
        currentUser = null; // Normal kullanıcı değil
        localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));
        localStorage.removeItem('currentUser');
        updateAuthUI();
        toggleAuthModal();
        displayRooms(); // Admin kontrollerini göster
        showToast('Hoşgeldiniz Burak Bey! 👨‍💼', 'success');
        return;
    }

    // Normal kullanıcı girişi
    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};
    if (storedUsers[username] && storedUsers[username].password === password) {
        currentUser = { username: username, email: storedUsers[username].email };
        currentAdmin = null; // Admin değil
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
        localStorage.removeItem('currentAdmin');
        updateAuthUI();
        toggleAuthModal();
        displayRooms(); // Admin kontrollerini gizle
        showToast('Hoşgeldiniz ' + username + '! 👋', 'success');
    } else {
        showToast('Kullanıcı adı veya şifre hatalı!', 'error');
    }
}

function signup(event) {
    event.preventDefault();
    const username = document.getElementById('signupUsername').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupPasswordConfirm').value;

    if (username in users) {
        showToast('Bu kullanıcı adı zaten kullanılmakta!', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showToast('Şifreler eşleşmiyor!', 'error');
        return;
    }

    users[username] = { email: email, password: password };
    localStorage.setItem('users', JSON.stringify(users));

    currentUser = { username: username, email: email };
    currentAdmin = null; // Admin değil
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    localStorage.removeItem('currentAdmin');
    updateAuthUI();
    toggleSignup();
    displayRooms(); // Admin kontrollerini gizle
    showToast('Kayıt başarılı! Hoşgeldiniz ' + username + '! 🎉', 'success');
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
    // Çıkış onay panelini göster
    document.getElementById('logoutConfirmPanel').classList.add('active');
}

// Çıkış onayını kapat
function closeLogoutConfirm() {
    document.getElementById('logoutConfirmPanel').classList.remove('active');
}

// Çıkışı onayla
function confirmLogout() {
    currentUser = null;
    currentAdmin = null;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAdmin');
    updateAuthUI();
    displayRooms(); // Admin kontrollerini gizle
    closeLogoutConfirm();
    showToast('Başarıyla çıkış yaptınız 👋', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// UI GÜNCELLE
function updateAuthUI() {
    const authBtn = document.getElementById('authBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const authBtnMobile = document.getElementById('authBtnMobile');
    const logoutBtnMobile = document.getElementById('logoutBtnMobile');
    const reservationsLink = document.getElementById('navReservationsLink');
    const reservationsLinkMobile = document.getElementById('navReservationsLinkMobile');
    const messagesLink = document.getElementById('navMessagesLink');
    const messagesLinkMobile = document.getElementById('navMessagesLinkMobile');

    if (currentUser) {
        authBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        logoutBtn.textContent = `${currentUser.username} - Çıkış Yap`;
        authBtnMobile.style.display = 'none';
        logoutBtnMobile.style.display = 'block';
        logoutBtnMobile.textContent = `${currentUser.username} - Çıkış Yap`;
        if (reservationsLink) reservationsLink.style.display = 'inline-block';
        if (reservationsLinkMobile) reservationsLinkMobile.style.display = 'block';
        if (messagesLink) messagesLink.style.display = 'none';
        if (messagesLinkMobile) messagesLinkMobile.style.display = 'none';
    } else if (currentAdmin) {
        authBtn.style.display = 'none';
        logoutBtn.style.display = 'block';
        logoutBtn.textContent = `${currentAdmin.name} - Çıkış Yap`;
        authBtnMobile.style.display = 'none';
        logoutBtnMobile.style.display = 'block';
        logoutBtnMobile.textContent = `${currentAdmin.name} - Çıkış Yap`;
        if (reservationsLink) reservationsLink.style.display = 'none';
        if (reservationsLinkMobile) reservationsLinkMobile.style.display = 'none';
        if (messagesLink) messagesLink.style.display = 'inline-block';
        if (messagesLinkMobile) messagesLinkMobile.style.display = 'block';
    } else {
        authBtn.style.display = 'block';
        logoutBtn.style.display = 'none';
        authBtnMobile.style.display = 'block';
        logoutBtnMobile.style.display = 'none';
        authBtn.textContent = 'Giriş Yap';
        if (reservationsLink) reservationsLink.style.display = 'none';
        if (reservationsLinkMobile) reservationsLinkMobile.style.display = 'none';
        if (messagesLink) messagesLink.style.display = 'none';
        if (messagesLinkMobile) messagesLinkMobile.style.display = 'none';
    }
}

// ODALARI GÖSTER
function displayRooms() {
    const filtered = filterByPrice();
    
    // Eğer filtrede oda yoksa mesaj göster
    const noRoomsMessage = document.getElementById('noRoomsMessage');
    const roomsGrid = document.getElementById('roomsGrid');
    
    if (filtered.length === 0) {
        roomsGrid.style.display = 'none';
        noRoomsMessage.style.display = 'flex';
        return;
    } else {
        roomsGrid.style.display = 'grid';
        noRoomsMessage.style.display = 'none';
    }

    let html = '';
    filtered.forEach(room => {
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
                        <div class="admin-badge">
                            <i class="fas fa-crown"></i> Admin Modu
                        </div>
                        <div class="admin-panel-card">
                            <div class="admin-action" onclick="toggleRoomStatus(${room.id})">
                                <div class="admin-action-icon ${isAvailable ? 'status-available' : 'status-reserved'}">
                                    <i class="fas fa-${isAvailable ? 'lock-open' : 'lock'}"></i>
                                </div>
                                <div class="admin-action-content">
                                    <span class="admin-action-title">${isAvailable ? 'Rezerveli Yap' : 'Müsait Yap'}</span>
                                    <span class="admin-action-desc">Oda durumunu değiştir</span>
                                </div>
                            </div>
                            <div class="admin-action" onclick="editRoomPrice(${room.id})">
                                <div class="admin-action-icon price-icon">
                                    <i class="fas fa-tag"></i>
                                </div>
                                <div class="admin-action-content">
                                    <span class="admin-action-title">Fiyat Düzenle</span>
                                    <span class="admin-action-desc">₺${room.price}/Gece</span>
                                </div>
                            </div>
                            <div class="admin-action" onclick="viewReservations(${room.id})">
                                <div class="admin-action-icon info-icon">
                                    <i class="fas fa-info-circle"></i>
                                </div>
                                <div class="admin-action-content">
                                    <span class="admin-action-title">Rezervasyonlar</span>
                                    <span class="admin-action-desc">Detayları görüntüle</span>
                                </div>
                            </div>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    });

    document.getElementById('roomsGrid').innerHTML = html;
}

function filterByPrice() {
    let filtered = rooms;
    
    const minPrice = parseFloat(document.getElementById('minPrice').value) || 0;
    const maxPrice = parseFloat(document.getElementById('maxPrice').value) || Infinity;
    
    // Eğer min veya max girilmişse filtrele
    if (minPrice > 0 || maxPrice < Infinity) {
        filtered = rooms.filter(room => {
            return room.price >= minPrice && room.price <= maxPrice;
        });
    }

    return filtered;
}

function filterRooms() {
    currentPage = 1;
    displayRooms();
}

function clearPriceFilter() {
    document.getElementById('minPrice').value = '';
    document.getElementById('maxPrice').value = '';
    filterRooms();
}

// Sayfalama kaldırıldı - Tüm odalar tek sayfada gösteriliyor

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
                <strong>Durum:</strong> ${isAvailable ? '<span class="status-available">✓ Müsait</span>' : '<span class="status-reserved">✗ Rezerveli</span>'}
            </div>
            
            <div class="detail-info">
                <strong>Özellikleri:</strong><br>
                ${room.features.map(f => `<span class="feature-badge">✓ ${f}</span>`).join('')}
            </div>
        </div>
    `;

    document.getElementById('roomDetail').innerHTML = html;
    document.getElementById('roomDetailModal').classList.add('active');
}

// RESERVASYONu KONTROL ET
function checkLogin(roomId) {
    if (!currentUser) {
        showToast('Lütfen rezervasyon yapmak için giriş yapınız!', 'warning');
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
        showToast('Çıkış tarihi giriş tarihinden sonra olmalıdır!', 'error');
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

// ADMIN: FIYAT DÜZENLE SAYFASI
function editRoomPrice(roomId) {
    // Tüm section'ları gizle
    document.querySelectorAll('section').forEach(section => {
        section.classList.remove('active');
    });

    // Fiyat düzenleme sayfasını göster
    const priceEditSection = document.getElementById('priceEdit');
    priceEditSection.classList.add('active');

    // Eğer belirli bir oda seçildiyse, sadece onu göster
    if (roomId) {
        showPriceEditForRoom(roomId);
    } else {
        showAllRoomsForPriceEdit();
    }
}

function showPriceEditForRoom(roomId) {
    const room = rooms.find(r => r.id == roomId);
    if (!room) return;

    const html = `
        <div class="price-edit-room-card">
            <div class="price-edit-room-header">
                <div class="price-edit-room-icon">${room.icon}</div>
                <div class="price-edit-room-info">
                    <h3>${room.name}</h3>
                    <p class="price-edit-room-category">${room.category}</p>
                </div>
            </div>
            <div class="price-edit-form">
                <div class="price-edit-current">
                    <label>Mevcut Fiyat</label>
                    <div class="current-price">₺${room.price}/Gece</div>
                </div>
                <div class="price-edit-input-group">
                    <label for="newPrice">Yeni Fiyat (₺)</label>
                    <input type="number" id="newPrice" value="${room.price}" min="1" step="1" placeholder="Fiyat girin">
                    <span class="price-input-hint">Gece başına fiyat</span>
                </div>
                <div class="price-edit-actions">
                    <button class="price-save-btn" onclick="saveRoomPrice(${room.id})">
                        <i class="fas fa-save"></i> Fiyatı Kaydet
                    </button>
                    <button class="price-cancel-btn" onclick="closePriceEdit()">
                        <i class="fas fa-times"></i> İptal
                    </button>
                </div>
            </div>
        </div>
    `;

    document.getElementById('priceEditContent').innerHTML = html;
}

function showAllRoomsForPriceEdit() {
    let html = '<div class="price-edit-rooms-grid">';

    rooms.forEach(room => {
        html += `
            <div class="price-edit-room-item">
                <div class="price-edit-room-item-header">
                    <div class="price-edit-room-item-icon">${room.icon}</div>
                    <div>
                        <h4>${room.name}</h4>
                        <p class="price-edit-room-item-category">${room.category}</p>
                    </div>
                </div>
                <div class="price-edit-room-item-price">
                    <span class="current-price-label">Mevcut Fiyat:</span>
                    <span class="current-price-value">₺${room.price}/Gece</span>
                </div>
                <div class="price-edit-room-item-input">
                    <input type="number" id="price_${room.id}" value="${room.price}" min="1" step="1" placeholder="Yeni fiyat">
                </div>
                <button class="price-edit-room-item-btn" onclick="saveRoomPrice(${room.id})">
                    <i class="fas fa-save"></i> Kaydet
                </button>
            </div>
        `;
    });

    html += '</div>';
    html += `
        <div class="price-edit-bulk-actions">
            <button class="price-save-all-btn" onclick="saveAllRoomPrices()">
                <i class="fas fa-save"></i> Tüm Fiyatları Kaydet
            </button>
            <button class="price-cancel-btn" onclick="closePriceEdit()">
                <i class="fas fa-times"></i> İptal
            </button>
        </div>
    `;

    document.getElementById('priceEditContent').innerHTML = html;
}

function saveRoomPrice(roomId) {
    const room = rooms.find(r => r.id == roomId);
    if (!room) return;

    // Tek oda düzenleme modunda mı yoksa tüm odalar modunda mı kontrol et
    const priceInput = document.getElementById('newPrice') || document.getElementById(`price_${roomId}`);
    if (!priceInput) return;

    const newPrice = parseInt(priceInput.value);

    if (!newPrice || isNaN(newPrice) || newPrice <= 0) {
        showToast('Geçerli bir fiyat girin!', 'error');
        return;
    }

    room.price = newPrice;
    saveRooms();
    displayRooms();

    // Başarı mesajı
    const successMsg = document.createElement('div');
    successMsg.className = 'price-edit-success';
    successMsg.innerHTML = '<i class="fas fa-check-circle"></i> Fiyat başarıyla güncellendi!';
    document.getElementById('priceEditContent').prepend(successMsg);

    setTimeout(() => {
        successMsg.remove();
    }, 3000);
}

function saveAllRoomPrices() {
    let updated = 0;

    rooms.forEach(room => {
        const priceInput = document.getElementById(`price_${room.id}`);
        if (priceInput) {
            const newPrice = parseInt(priceInput.value);
            if (newPrice && !isNaN(newPrice) && newPrice > 0) {
                room.price = newPrice;
                updated++;
            }
        }
    });

    if (updated > 0) {
        saveRooms();
        displayRooms();

        const successMsg = document.createElement('div');
        successMsg.className = 'price-edit-success';
        successMsg.innerHTML = `<i class="fas fa-check-circle"></i> ${updated} oda fiyatı başarıyla güncellendi!`;
        document.getElementById('priceEditContent').prepend(successMsg);

        setTimeout(() => {
            successMsg.remove();
        }, 3000);
    } else {
        alert('Güncellenecek fiyat bulunamadı!');
    }
}

function closePriceEdit() {
    document.getElementById('priceEdit').classList.remove('active');
    showRooms();
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
        showToast('Geçerli bir kart numarası girin!', 'error');
        return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiryDate)) {
        showToast('Geçerli bir son kullanım tarihi girin (MM/YY)!', 'error');
        return;
    }

    if (cvv.length !== 3 || !/^\d+$/.test(cvv)) {
        showToast('Geçerli bir CVV girin!', 'error');
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
    showToast(`Ödeme başarılı! ${payment.total} TL tutarında ödeme alındı. Rezervasyonunuz kaydedildi. 🎉`, 'success');
    showRooms();
}

// TEMA YÖNETİMİ (DARK/LIGHT MODE)
function toggleTheme() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const mobileThemeIcon = document.getElementById('mobileThemeIcon');
    const mobileThemeText = document.getElementById('mobileThemeText');

    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.classList.remove('fa-moon');
            mobileThemeIcon.classList.add('fa-sun');
        }
        if (mobileThemeText) {
            mobileThemeText.textContent = 'Aydınlık Mod';
        }
        localStorage.setItem('theme', 'dark');
    } else {
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.classList.remove('fa-sun');
            mobileThemeIcon.classList.add('fa-moon');
        }
        if (mobileThemeText) {
            mobileThemeText.textContent = 'Karanlık Mod';
        }
        localStorage.setItem('theme', 'light');
    }
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const mobileThemeIcon = document.getElementById('mobileThemeIcon');
    const mobileThemeText = document.getElementById('mobileThemeText');

    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.classList.remove('fa-moon');
            mobileThemeIcon.classList.add('fa-sun');
        }
        if (mobileThemeText) {
            mobileThemeText.textContent = 'Aydınlık Mod';
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeIcon) {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.classList.remove('fa-sun');
            mobileThemeIcon.classList.add('fa-moon');
        }
        if (mobileThemeText) {
            mobileThemeText.textContent = 'Karanlık Mod';
        }
    }
}

// İLETİŞİM FORMU FONKSİYONLARI
function handleSubjectChange() {
    const subjectSelect = document.getElementById('contactSubject');
    const customSubjectGroup = document.getElementById('customSubjectGroup');
    const customSubjectInput = document.getElementById('customSubject');
    
    if (subjectSelect.value === 'ozel') {
        customSubjectGroup.classList.add('show');
        customSubjectInput.setAttribute('required', 'required');
        subjectSelect.removeAttribute('required');
        setTimeout(() => {
            customSubjectInput.focus();
        }, 300);
    } else {
        customSubjectGroup.classList.remove('show');
        customSubjectInput.removeAttribute('required');
        customSubjectInput.value = '';
        subjectSelect.setAttribute('required', 'required');
    }
}

function sendFeedback(event) {
    event.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const subjectSelect = document.getElementById('contactSubject');
    const customSubjectInput = document.getElementById('customSubject');
    const message = document.getElementById('contactMessage').value;
    
    let subject;
    if (subjectSelect.value === 'ozel') {
        subject = customSubjectInput.value.trim();
        if (!subject) {
            showToast('Lütfen özel konunuzu yazın.', 'warning');
            customSubjectInput.focus();
            return;
        }
        subject = 'Özel: ' + subject;
    } else {
        if (!subjectSelect.value) {
            showToast('Lütfen bir konu seçin.', 'warning');
            subjectSelect.focus();
            return;
        }
        const selectedOption = subjectSelect.options[subjectSelect.selectedIndex];
        subject = selectedOption.text;
    }
    
    const feedback = {
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString('tr-TR')
    };
    
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks.push(feedback);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    showToast('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız. 📧', 'success');
    
    event.target.reset();
    document.getElementById('customSubjectGroup').classList.remove('show');
}


// TOAST NOTIFICATION SİSTEMİ
function showToast(message, type = 'info') {
    // Mevcut toast'ları temizle
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => toast.remove());

    // Yeni toast oluştur
    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    
    // İkon seç
    let icon = '';
    switch(type) {
        case 'success':
            icon = '<i class="fas fa-check-circle"></i>';
            break;
        case 'error':
            icon = '<i class="fas fa-exclamation-circle"></i>';
            break;
        case 'warning':
            icon = '<i class="fas fa-exclamation-triangle"></i>';
            break;
        default:
            icon = '<i class="fas fa-info-circle"></i>';
    }
    
    toast.innerHTML = `
        ${icon}
        <span>${message}</span>
    `;
    
    document.body.appendChild(toast);
    
    // Animasyon için kısa gecikme
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // 3 saniye sonra kaldır
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}


// MESAJLAR PANELİ (ADMIN)
function openMessagesPanel() {
    if (!currentAdmin) {
        showToast('Bu özellik sadece adminler için!', 'error');
        return;
    }
    
    const modal = document.getElementById('messagesModal');
    modal.classList.add('active');
    displayMessages();
}

function closeMessagesPanel() {
    const modal = document.getElementById('messagesModal');
    modal.classList.remove('active');
}

function displayMessages() {
    const feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    const container = document.getElementById('messagesContainer');
    
    if (feedbacks.length === 0) {
        container.innerHTML = `
            <div class="no-messages">
                <i class="fas fa-inbox"></i>
                <h3>Henüz Mesaj Yok</h3>
                <p>Müşterilerden gelen mesajlar burada görünecek</p>
            </div>
        `;
        return;
    }
    
    // En yeni mesajlar önce
    const sortedFeedbacks = feedbacks.sort((a, b) => b.id - a.id);
    
    let html = '';
    sortedFeedbacks.forEach((feedback, index) => {
        html += `
            <div class="message-card" data-index="${index}">
                <div class="message-header">
                    <div class="message-sender">
                        <i class="fas fa-user-circle"></i>
                        <div>
                            <strong>${feedback.name}</strong>
                            <span class="message-email">${feedback.email}</span>
                        </div>
                    </div>
                    <div class="message-date">
                        <i class="far fa-clock"></i> ${feedback.date}
                    </div>
                </div>
                <div class="message-subject">
                    <i class="fas fa-tag"></i> ${feedback.subject}
                </div>
                <div class="message-body">
                    ${feedback.message}
                </div>
                <div class="message-actions">
                    <button class="message-delete-btn" onclick="deleteMessage(${feedback.id})">
                        <i class="fas fa-trash"></i> Sil
                    </button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function deleteMessage(messageId) {
    if (!confirm('Bu mesajı silmek istediğinizden emin misiniz?')) {
        return;
    }
    
    let feedbacks = JSON.parse(localStorage.getItem('feedbacks') || '[]');
    feedbacks = feedbacks.filter(f => f.id !== messageId);
    localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    
    showToast('Mesaj silindi', 'success');
    displayMessages();
}
