document.querySelectorAll(".order").forEach((button) => {
  button.addEventListener("click", function () {
    const orderClass = this.getAttribute("data-order");

    // 1. إضافة الهاش "#" مع data-order إلى الرابط
    window.location.hash = orderClass;

    // 2. إظهار العنصر المطلوب مع التأثير السلس
    const popup = document.querySelector(orderClass);
    popup.classList.add("active");

    // 3. منع الذهاب إلى أعلى الصفحة
    popup.scrollIntoView({ behavior: "smooth" });

    // إضافة استماع للأزرار لإغلاق الـ popup عند الضغط على ESC أو زر الرجوع في الهاتف
    document.addEventListener("keydown", handleKeyPress);
    window.addEventListener("popstate", handlePopState);
  });
});

document.querySelectorAll(".close").forEach((button) => {
  button.addEventListener("click", closePopup);
});

// دالة لإغلاق الـ popup
function closePopup() {
  const activePopup = document.querySelector(".popup-item.active");
  if (activePopup) {
    activePopup.classList.remove("active");

    // إعادة الرابط لوضعه الطبيعي
    history.pushState("", document.title, window.location.pathname);

    // إزالة الاستماع على الأحداث بعد الإغلاق
    document.removeEventListener("keydown", handleKeyPress);
    window.removeEventListener("popstate", handlePopState);
  }
}

// دالة لمعالجة الضغط على ESC
function handleKeyPress(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

// دالة لمعالجة الضغط على زر الرجوع في الهاتف
function handlePopState() {
  closePopup();
}

/* **** **** ** **** **** */
/* **** Navbar Background **** */
/* **** **** ** **** **** */
document.addEventListener("DOMContentLoaded", function () {
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 50) {
      navbar.style.background = "var(--bgColor1)";
      navbar.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    } else {
      navbar.style.background = "transparent";
      navbar.style.boxShadow = "none";
    }
  });
});

/* **** **** ** **** **** */
/* **** Navbar Links **** */
/* **** **** ** **** **** */
function updateActiveLinkOnScroll() {
  const sections = document.querySelectorAll(
    "section[id], article[id], header[id]"
  );
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.scrollY;

    if (scrollPosition >= sectionTop - sectionHeight / 3) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

document.querySelectorAll(".nav-link").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    document.querySelectorAll(".nav-link").forEach((link) => {
      link.classList.remove("active");
    });
    this.classList.add("active");

    const targetId = this.getAttribute("href").substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const offset = 70;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  });
});

document.addEventListener("scroll", updateActiveLinkOnScroll);

/* **** **** ** **** **** */
/* **** Change Logo **** */
/* **** **** ** **** **** */
let linksLogo = document.querySelectorAll(".themeColor li");

let logo = document.querySelectorAll(".navbar-brand img");

window.onload = function () {
  let savedTheme = localStorage.getItem("selectedTheme");

  if (savedTheme) {
    logo.forEach((logo) => {
      logo.style.display = "none";
    });
    document.querySelectorAll(savedTheme).forEach((ca) => {
      ca.style.display = "block";
    });
  } else {
    document.querySelector(".themeLogo1").style.display = "block";
  }
};

linksLogo.forEach((li) => {
  li.addEventListener("click", shuffle);
});

function shuffle() {
  // إخفاء جميع الشعارات
  logo.forEach((logo) => {
    logo.style.display = "none";
  });

  // عرض الشعار المتعلق بالعنصر الذي تم النقر عليه
  let selectedLogo = this.dataset.logo;
  document.querySelectorAll(selectedLogo).forEach((ca) => {
    ca.style.display = "block";
  });

  // حفظ الشعار المختار في localStorage
  localStorage.setItem("selectedTheme", selectedLogo);
}

/* **** **** ** **** **** */
/* **** Change Color **** */
/* **** **** ** **** **** */
var themeCSS = {
  ".theme1": {
    "--mainColor": "#c49c4dff",
  },
  ".theme2": {
    "--mainColor": "#f20231",
  },
  ".theme3": {
    "--mainColor": "#41a7f5",
  },
  ".theme4": {
    "--mainColor": "#628b35",
  },
};

let linksColor = document.querySelectorAll("li[data-theme]");

let root = document.documentElement;

window.onload = function () {
  let savedTheme = localStorage.getItem("selectedTheme");

  if (savedTheme && themeCSS[savedTheme]) {
    applyTheme(savedTheme);
  } else {
    applyTheme(".theme1");
  }
};

linksColor.forEach((li) => {
  li.addEventListener("click", function () {
    let selectedTheme = this.getAttribute("data-theme");
    applyTheme(selectedTheme);
    localStorage.setItem("selectedTheme", selectedTheme);
  });
});

function applyTheme(themeClass) {
  let selectedTheme = themeCSS[themeClass];

  for (let variable in selectedTheme) {
    if (selectedTheme.hasOwnProperty(variable)) {
      root.style.setProperty(variable, selectedTheme[variable]);
    }
  }
}

/* **** **** ** **** **** */
/* **** Change Text Of Slider **** */
/* **** **** ** **** **** */
document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "Professional & attractive website design",
    "Design logos that show your brand personality",
    "Innovative QR code designs to encourage customers to interact",
    "Provide professional services for Microsoft Office programs",
    "Data analysis services with the best advanced means",
    "Social media services to enhance your presence",
  ];

  let index = 0;
  let charIndex = 0;
  let currentText = "";
  let isDeleting = false;
  let cursorVisible = true;

  const speed = 40; // سرعة الكتابة والحذف
  const holdTime = 2000; // المدة الزمنية للاحتفاظ بالنص الكامل قبل البدء في الحذف

  const pElement = document.querySelector(".slider-text");
  const cursorElement = document.createElement("span");
  cursorElement.innerText = "|";
  cursorElement.style.display = "inline-block";
  cursorElement.style.opacity = "1";
  pElement.appendChild(cursorElement);

  function updateText() {
    if (isDeleting) {
      currentText = texts[index].substring(0, charIndex--);
    } else {
      currentText = texts[index].substring(0, charIndex++);
    }

    pElement.innerText = currentText;
    pElement.appendChild(cursorElement);

    if (!isDeleting && charIndex === texts[index].length) {
      setTimeout(() => (isDeleting = true), holdTime);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      index = (index + 1) % texts.length;
    }

    setTimeout(updateText, speed);
  }

  function blinkCursor() {
    cursorVisible = !cursorVisible;
    cursorElement.style.opacity = cursorVisible ? "1" : "0";
    setTimeout(blinkCursor, 500);
  }

  updateText();
  blinkCursor();
});

/* **** **** ** **** **** */
/* **** Shuffle Category **** */
/* **** **** ** **** **** */
var mixer = mixitup(".category-box", {
  selectors: {
    target: ".category",
  },
  animation: {
    duration: 500,
  },
});
