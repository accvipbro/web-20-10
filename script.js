/**
 * ===== SCRIPT.JS — Website Tri Ân 20/10 Lớp 9A1 =====
 * Dành tặng Cô giáo chủ nhiệm và các bạn nữ 9A1
 * Người tạo: Phạm Minh Đan
 */

// ==========================
// 1. DOM REFERENCES
// ==========================
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const teacherSection = document.getElementById("teacher-spotlight");
const heartsLayer = document.getElementById("hearts-layer");
const introEl = document.getElementById("intro");

// ==========================
// 2. CUỘN XUỐNG PHẦN TRI ÂN
// ==========================
function onOpenClick() {
  if (teacherSection) {
    teacherSection.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

// ==========================
// 3. LIGHTBOX — PHÓNG TO ẢNH
// ==========================
function openLightbox(src) {
  if (!src) return;
  lightboxImg.src = src;
  lightbox.classList.add("is-open");
  document.documentElement.classList.add("overlay-open");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.documentElement.classList.remove("overlay-open");
  setTimeout(() => {
    if (!lightbox.classList.contains("is-open")) {
      lightboxImg.src = "";
    }
  }, 300);
}

// Phím Esc đóng lightbox
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox.classList.contains("is-open")) {
    closeLightbox();
  }
});

// ==========================
// 4. THIỆP CHÚC MỪNG TƯƠNG TÁC
// ==========================
function toggleWishCard(card) {
  card.classList.toggle("is-active");

  // Tạo hiệu ứng tim nhỏ bung ra ngay tại thiệp
  const rect = card.getBoundingClientRect();
  for (let i = 0; i < 5; i++) {
    createMicroHeart(rect.left + rect.width / 2, rect.top + rect.height / 2);
  }
}

function createMicroHeart(x, y) {
  const el = document.createElement("span");
  el.className = "micro-heart";
  const icons = ["💖", "✨", "🌸", "🌷", "💕", "⭐"];
  el.textContent = icons[Math.floor(Math.random() * icons.length)];

  const angle = Math.random() * Math.PI * 2;
  const distance = 40 + Math.random() * 60;
  const destX = Math.cos(angle) * distance;
  const destY = Math.sin(angle) * distance;

  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty("--tx", `${destX}px`);
  el.style.setProperty("--ty", `${destY}px`);

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1000);
}

// ==========================
// 5. CƠN MƯA HOA & TIM CHÚC MỪNG
// ==========================
function triggerHeartShower() {
  const emojis = ["💖", "🌸", "🌷", "🌹", "✨", "💗", "💕", "🌺", "💐", "⭐"];
  const count = 40;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const heart = document.createElement("div");
      heart.className = "shower-item";
      heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];

      const startLeft = Math.random() * 100; // 0% - 100%
      const size = 16 + Math.random() * 24; // 16px - 40px
      const duration = 2.5 + Math.random() * 2.5; // 2.5s - 5s
      const drift = -100 + Math.random() * 200; // trôi ngang

      heart.style.left = `${startLeft}vw`;
      heart.style.fontSize = `${size}px`;
      heart.style.animationDuration = `${duration}s`;
      heart.style.setProperty("--drift", `${drift}px`);

      heartsLayer.appendChild(heart);

      setTimeout(() => heart.remove(), duration * 1000);
    }, i * 70);
  }
}

// ==========================
// 6. KHỞI TẠO & INTRO
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // Ẩn màn hình Xin Chào sau 6s hoặc cho phép bấm để vào ngay
  if (introEl) {
    const dismissIntro = () => {
      introEl.classList.add("is-hidden");
      setTimeout(() => introEl.remove(), 1000);
    };

    // Tự động đóng sau 6s
    const timer = setTimeout(dismissIntro, 6000);

    // Bấm vào bất kỳ đâu trên màn hình intro để bỏ qua nếu không muốn đợi
    introEl.addEventListener("click", () => {
      clearTimeout(timer);
      dismissIntro();
    });
  }

  // Thêm hiệu ứng cuộn mượt khi xuất hiện cho các story card (Intersection Observer)
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll(".story-item, .teacher-spotlight__card, .wish-card").forEach((el) => {
      el.classList.add("fade-on-scroll");
      observer.observe(el);
    });
  }
});
