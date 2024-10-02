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

/* **** **** ** **** **** */
/* **** Popup Setting **** */
/* **** **** ** **** **** */
document.querySelectorAll(".order").forEach((button) => {
  button.addEventListener("click", function () {
    const orderClass = this.getAttribute("data-order");
    window.location.hash = orderClass;
    const popup = document.querySelector(orderClass);
    popup.classList.add("active");
    popup.scrollIntoView({ behavior: "smooth" });
    document.addEventListener("keydown", handleKeyPress);
    window.addEventListener("popstate", handlePopState);
  });
});

document.querySelectorAll(".close").forEach((button) => {
  button.addEventListener("click", closePopup);
});

function closePopup() {
  const activePopup = document.querySelector(".popup-item.active");
  if (activePopup) {
    activePopup.classList.remove("active");
    history.pushState("", document.title, window.location.pathname);
    document.removeEventListener("keydown", handleKeyPress);
    window.removeEventListener("popstate", handlePopState);
  }
}

function handleKeyPress(event) {
  if (event.key === "Escape") {
    closePopup();
  }
}

function handlePopState() {
  closePopup();
}

/* **** **** ** **** **** */
/* **** Change Order **** */
/* **** **** ** **** **** */
document.addEventListener("DOMContentLoaded", function () {
  const items = Array.from(
    document.querySelectorAll(".services-boost .category")
  );

  const orders = items.map((_, index) => index + 1);

  orders.sort(() => Math.random() - 0.5);

  items.forEach((item, index) => {
    item.style.order = orders[index];
  });
});