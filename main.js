


// Grab elements
const cardPreview = document.getElementById("card-preview");

// Forms
const birthdayForm = document.getElementById("birthday-form");
const weddingForm = document.getElementById("wedding-form");
const businessForm = document.getElementById("business-form");

// Tabs
const birthdayTab = document.getElementById("birthday-tab");
const weddingTab = document.getElementById("wedding-tab");
const businessTab = document.getElementById("business-tab");

// Download buttons
const downloadImgBtn = document.getElementById("download-img");
const downloadPdfBtn = document.getElementById("download-pdf");

// Listen to tab change to update preview
const tabs = document.querySelectorAll('button[data-bs-toggle="tab"]');
tabs.forEach(tab => {
  tab.addEventListener('shown.bs.tab', () => {
    updatePreview();

    // Also update background classes on body
    const activeTabId = document.querySelector('.nav-link.active').id;
    document.body.classList.remove('body-birthday', 'body-wedding', 'body-business');
    if (activeTabId === 'birthday-tab') {
      document.body.classList.add('body-birthday');
    } else if (activeTabId === 'wedding-tab') {
      document.body.classList.add('body-wedding');
    } else if (activeTabId === 'business-tab') {
      document.body.classList.add('body-business');
    }
  });
});

// Listen to input changes in forms
birthdayForm.addEventListener("input", updatePreview);
weddingForm.addEventListener("input", updatePreview);
businessForm.addEventListener("input", updatePreview);

// Initial preview and body background class
window.addEventListener('DOMContentLoaded', () => {
  updatePreview();
  const activeTabId = document.querySelector('.nav-link.active').id;
  document.body.classList.remove('body-birthday', 'body-wedding', 'body-business');
  if (activeTabId === 'birthday-tab') {
    document.body.classList.add('body-birthday');
  } else if (activeTabId === 'wedding-tab') {
    document.body.classList.add('body-wedding');
  } else if (activeTabId === 'business-tab') {
    document.body.classList.add('body-business');
  }
});

function updatePreview() {
  const activeTab = document.querySelector('.nav-link.active').id;

  let html = '';
  if (activeTab === "birthday-tab") {
    html = generateBirthdayCard();
  } else if (activeTab === "wedding-tab") {
    html = generateWeddingCard();
  } else if (activeTab === "business-tab") {
    html = generateBusinessCard();
  }

  cardPreview.innerHTML = html;
}

function generateBirthdayCard() {
  const name = document.getElementById("birthday-name").value || "Friend";
  const date = document.getElementById("birthday-date").value;
  const message = document.getElementById("birthday-message").value || "Wishing you all the best!";
  const theme = document.getElementById("birthday-theme").value;

  return `
    <div class="card-template ${theme}">
      <h2>Happy Birthday, ${escapeHTML(name)}! 🎉</h2>
      <p><strong>Date:</strong> ${date ? escapeHTML(date) : "Not set"}</p>
      <p>${escapeHTML(message)}</p>
    </div>
  `;
}

function generateWeddingCard() {
  const bride = document.getElementById("wedding-bride").value || "Bride";
  const groom = document.getElementById("wedding-groom").value || "Groom";
  const date = document.getElementById("wedding-date").value;
  const message = document.getElementById("wedding-message").value || "Wishing you a lifetime of happiness!";
  const theme = document.getElementById("wedding-theme").value;

  return `
    <div class="card-template ${theme}">
      <h2>Wedding Invitation</h2>
      <p><strong>${escapeHTML(bride)}</strong> & <strong>${escapeHTML(groom)}</strong></p>
      <p><strong>Date:</strong> ${date ? escapeHTML(date) : "Not set"}</p>
      <p>${escapeHTML(message)}</p>
    </div>
  `;
}

function generateBusinessCard() {
  const business = document.getElementById("business-name").value || "Your Business";
  const contact = document.getElementById("business-contact").value || "Contact info here";
  const message = document.getElementById("business-message").value || "Your trusted partner.";
  const theme = document.getElementById("business-theme").value;

  return `
    <div class="card-template ${theme}">
      <h2>${escapeHTML(business)}</h2>
      <p>${escapeHTML(message)}</p>
      <p><strong>Contact:</strong> ${escapeHTML(contact)}</p>
    </div>
  `;
}

// Utility: Escape HTML to prevent XSS
function escapeHTML(text) {
  return text.replace(/[&<>"']/g, function (m) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[m];
  });
}

// Download Image (PNG) using html2canvas
downloadImgBtn.addEventListener("click", () => {
  html2canvas(cardPreview).then(canvas => {
    const link = document.createElement("a");
    link.download = "card.png";
    link.href = canvas.toDataURL();
    link.click();
  });
});

// Download PDF using jsPDF and html2canvas
downloadPdfBtn.addEventListener("click", () => {
  setTimeout(() => {
    html2canvas(cardPreview, {
      scrollY: -window.scrollY,
      useCORS: true
    }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new window.jspdf.jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: [canvas.width, canvas.height]
      });
      pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save("card.pdf");
    });
  }, 350);
});


