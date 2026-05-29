/* localStorage utilities for RishtaGPT */
(function () {
  const FORM_KEY = "rg_form_v2";
  const BIOS_KEY = "rg_bios_v2";

  function safeParse(s, fallback) {
    try { return s ? JSON.parse(s) : fallback; } catch (e) { return fallback; }
  }

  const Store = {
    loadForm() {
      return safeParse(localStorage.getItem(FORM_KEY), null);
    },
    saveForm(data) {
      try { localStorage.setItem(FORM_KEY, JSON.stringify(data)); } catch (e) {}
    },
    clearForm() {
      localStorage.removeItem(FORM_KEY);
    },
    listBios() {
      return safeParse(localStorage.getItem(BIOS_KEY), []);
    },
    saveBio(bio) {
      const bios = Store.listBios();
      // de-dupe by id, prepend newest
      const filtered = bios.filter(b => b.id !== bio.id);
      filtered.unshift(bio);
      // cap at 10
      const capped = filtered.slice(0, 10);
      try { localStorage.setItem(BIOS_KEY, JSON.stringify(capped)); } catch (e) {}
      return capped;
    },
    deleteBio(id) {
      const bios = Store.listBios().filter(b => b.id !== id);
      try { localStorage.setItem(BIOS_KEY, JSON.stringify(bios)); } catch (e) {}
      return bios;
    },
    clearBios() {
      localStorage.removeItem(BIOS_KEY);
    },
  };

  window.RG_Store = Store;
})();
