document.addEventListener("DOMContentLoaded", () => {
    const navBtn = document.getElementById('test2');
    const dropdownContainer = document.querySelector('.dropdown');

    // cek apakah perangkat menggunakan layar sentuh (touch) atau tidak
    const isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || window.matchMedia("(pointer: coarse)").matches;

    if (navBtn && dropdownContainer) {
        if (isTouchDevice) {
            //handphone mode
            navBtn.addEventListener('click', (e) => {
                e.preventDefault(); // Cegah halaman melompat
                navBtn.classList.toggle('active');
            });

            //tutup dropdown jika menyentuh area di luar menu
            document.addEventListener('click', (e) => {
                if (!dropdownContainer.contains(e.target)) {
                    navBtn.classList.remove('active');
                }
            });

        } else {
            //cursor mode
            dropdownContainer.addEventListener('mouseenter', () => {
                navBtn.classList.add('active'); // Buka saat kursor masuk
            });

            dropdownContainer.addEventListener('mouseleave', () => {
                navBtn.classList.remove('active'); // Tutup saat kursor keluar
            });

            //cegah halaman melompat jika pengguna desktop iseng mengkliknya
            navBtn.addEventListener('click', (e) => {
                e.preventDefault();
            });
        }
    }
});
