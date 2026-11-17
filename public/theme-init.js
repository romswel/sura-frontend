try {
  var theme = localStorage.getItem('sura.theme') === 'light' ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme
  document
    .querySelector('meta[name="theme-color"]')
    .setAttribute('content', theme === 'light' ? '#f7f7f3' : '#151617')
} catch {
  document.documentElement.dataset.theme = 'dark'
}
