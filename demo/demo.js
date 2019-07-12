const React = require('react')
const ReactDOM = require('react-dom')
const Image = require('../src/Image')

function Demo () {
  return (
    <div>
      <h1>Cloudinary React Image</h1>
      <div className='section'>
        <h2>Responsive Image</h2>
        <Image />
      </div>
    </div>
  )
}

ReactDOM.render(<Demo />, document.getElementById('demo'))
