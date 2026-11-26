'use strict';

const toggle = (element) => element && element.classList.toggle('active');

const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
sidebarBtn?.addEventListener('click', () => toggle(sidebar));

const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modal = document.querySelector('[data-modal-container]');
const modalClose = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');
const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const closeModal = () => {
  modal?.classList.remove('active');
  overlay?.classList.remove('active');
};
const openModal = (item) => {
  const avatar = item.querySelector('[data-testimonials-avatar]');
  const title = item.querySelector('[data-testimonials-title]');
  const text = item.querySelector('[data-testimonials-text]');
  if (!avatar || !title || !text || !modal) return;
  modalImg.src = avatar.src;
  modalImg.alt = avatar.alt;
  modalTitle.textContent = title.textContent;
  modalText.innerHTML = text.innerHTML;
  modal.classList.add('active');
  overlay?.classList.add('active');
};
testimonialsItems.forEach((item) => item.addEventListener('click', () => openModal(item)));
modalClose?.addEventListener('click', closeModal);
overlay?.addEventListener('click', closeModal);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

const filterItems = document.querySelectorAll('[data-filter-item]');
const filterButtons = document.querySelectorAll('[data-filter-btn]');
const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-selecct-value]');

const applyFilter = (value) => {
  filterItems.forEach((item) => {
    const category = (item.dataset.category || '').toLowerCase();
    item.classList.toggle('active', value === 'semua' || category === value);
  });
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.textContent.trim().toLowerCase() === value);
  });
  if (selectValue) {
    const selected = [...selectItems].find((item) => item.textContent.trim().toLowerCase() === value);
    if (selected) selectValue.textContent = selected.textContent.trim();
  }
};
select?.addEventListener('click', () => toggle(select));
selectItems.forEach((item) => {
  item.addEventListener('click', () => {
    applyFilter(item.textContent.trim().toLowerCase());
    select?.classList.remove('active');
  });
});
filterButtons.forEach((button) => {
  button.addEventListener('click', () => applyFilter(button.textContent.trim().toLowerCase()));
});

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formButton = document.querySelector('[data-form-btn]');
const updateFormState = () => {
  if (formButton && form) formButton.disabled = !form.checkValidity();
};
formInputs.forEach((input) => input.addEventListener('input', updateFormState));
form?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  const subject = encodeURIComponent('Pesan portofolio dari ' + data.get('fullname'));
  const body = encodeURIComponent(
    'Nama: ' + data.get('fullname') + '\nEmail: ' + data.get('email') +
    '\n\nPesan:\n' + data.get('message')
  );
  window.location.href = 'mailto:syawalaja0712@gmail.com?subject=' + subject + '&body=' + body;
});

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');
navigationLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const target = link.textContent.trim().toLowerCase();
    const pageName = target === 'tentang' ? 'tentang' : target;
    const matchingPage = [...pages].find((page) => page.dataset.page === pageName);
    if (!matchingPage) return;
    pages.forEach((page) => page.classList.toggle('active', page === matchingPage));
    navigationLinks.forEach((navLink) => navLink.classList.toggle('active', navLink === link));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});
