function buttonClicked(self) {
  self.setData({
    'buttonClicked': true
  })

  setTimeout(function() {
    self.setData({
      'buttonClicked': false
    })
  }, 600)
}

function setButtonClicked(self, disabled) {
  self.setData({
    'buttonClicked': disabled
  })
}

module.exports = {
  'buttonClicked': buttonClicked,
  'setButtonClicked': setButtonClicked,
}