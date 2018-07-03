module.exports.clapback = function(text) {
  // 1. trim outside whitespace
  // 2. capitalize
  // 3. split by internal whitespace
  // 4. append 👏🏾 to the end of each work
  // 5. join back together
  return text.trim()
    .toUpperCase()
    .split(' ')
    .map(word => `${word} :clap::skin-tone-5:`)
    .join(' ')
}

module.exports.getFormData = function getFormData(object) {
  const formData = new FormData();
  Object.keys(object).forEach(key => formData.append(key, object[key]));
  return formData
}