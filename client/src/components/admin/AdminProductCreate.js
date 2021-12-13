import React from 'react'
import { connect } from 'react-redux'
import { createProduct, getCategories } from '../../actions/product'
import { useHistory } from 'react-router'
import Spinner from '../layout/Spinner'

const AdminProductCreate = ({ createProduct, getCategories, categories, isLoading }) => {
  const history = useHistory()

  React.useEffect(() => {
    getCategories()
  }, [getCategories])

  const [name, setName] = React.useState('')
  const [category, setCategory] = React.useState('')
  const [price, setPrice] = React.useState(1)
  const [description, setDescription] = React.useState('')
  const [shippingFee, setShippingFee] = React.useState(1)
  const [pictures, setPictures] = React.useState([])
  const inputRef = React.useRef()

  const fileSelectedHandler = e => {
    let newPictures = [...e.target.files]
    let addedPictures = []
    newPictures.forEach(picture1 => {
      var count = 0
      pictures.forEach(picture2 => {
        if (picture1.name === picture2.name) {
          alert('There is only a file(files) in files you selected. That will be ignored!')
          count++
        }
      })
      if (count === 0) addedPictures.push(picture1)
    })
    let picturesAdded = [...pictures, ...addedPictures]
    setPictures(picturesAdded)
  }

  const removeProduct = item => {
    setPictures(pictures.filter(element => element !== item))
  }

  const onSubmit = e => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('name', name)
    formData.append('category', category)
    formData.append('price', price)
    formData.append('shippingFee', shippingFee)
    pictures.forEach(picture => {
      formData.append('pictures', picture)
    })
    formData.append('description', description)
    if (pictures.length) {
      createProduct(formData, history)
    } else {
      alert("You didn't pick the images.")
    }
  }

  return (
    <div className='admin-create-product'>
      <div className='font-36 pt-3'>Create A Product</div>
      <div className='row my-3'>
        <div className='col-md-12'>
          <div className='p-3 bg-white keto-rounded-lg mt-3 keto-shadow'>
            {isLoading ?
              <Spinner />
              : <form className='form' onSubmit={onSubmit}>
                <div className='form-group'>
                  <label>Product Name</label>
                  <input
                    type='text'
                    name='name'
                    className='form-control product-field'
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Product Category</label>
                  <select
                    name='category'
                    className='form-control product-field'
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    required
                  >
                    <option value=''>SELECT</option>
                    {categories.map((item, index) => 
                      <option key={index} value={item._id}>{item.name}</option>
                    )}
                  </select>
                </div>
                <div className='form-group'>
                  <label>Product Price</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text product-field">$</span>
                    </div>
                    <input
                      type='number'
                      name='price'
                      className='form-control product-field'
                      value={price}
                      onChange={e => setPrice(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Shipping Fee</label>
                  <div className="input-group mb-3">
                    <div className="input-group-prepend">
                      <span className="input-group-text product-field">$</span>
                    </div>
                    <input
                      type='number'
                      name='shippingFee'
                      className='form-control product-field'
                      value={shippingFee}
                      onChange={e => setShippingFee(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className='form-group'>
                  <label>Product Picture</label>
                  <input
                    type='button'
                    className='form-control product-field'
                    onClick={() => inputRef.current.click()}
                    value={'Select Pictures'}
                  />
                  <input
                    type='file'
                    accept='image/*'
                    multiple
                    className='file'
                    name='pictures'
                    onChange={fileSelectedHandler}
                    ref={inputRef}
                    required
                  /><span>{pictures.length} files selected.</span>
                </div>
                {pictures.map((item, index) =>
                  <span className='mr-1' key={index}>
                    <img alt='SETIMAGE' src={URL.createObjectURL(item)} width='50px' height='35px' />
                    <button className='btn btn-sm bg-keto-secondary' onClick={e => {
                      e.preventDefault()
                      removeProduct(item)
                    }}><i className='fa fa-remove'></i></button>
                  </span>
                )}
                <div className='form-group'>
                  <label>Product Description</label>
                  <textarea
                    type='text'
                    name='description'
                    className='form-control'
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                    required
                  />
                </div>
                <div className='d-flex justify-content-end'>
                  <button className='btn bg-keto-primary'>
                    Submit
                  </button>
                </div>
              </form>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  isLoading: state.admin.pageIsLoading,
  categories: state.product.categories
})

export default connect(mapStateToProps, { createProduct, getCategories })(AdminProductCreate)