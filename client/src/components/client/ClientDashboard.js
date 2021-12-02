import React from 'react'
import { connect } from 'react-redux'
import { getCourses } from '../../actions/course'
import { useHistory } from 'react-router'

const ClientDashboard = ({ getCourses, courses }) => {
  const history = useHistory()

  React.useEffect(() => {
    getCourses()
  }, [getCourses])

  return (
    <div className='client-dashboard'>
      <div className='d-flex align-items-center pt-3'>
        <div className='font-36 mr-3'>Academy</div>
      </div>
      <div className='row my-3'>
        <div className='col-lg-12'>
          {courses.map((item, index) =>
            <div className='row cursor-pointer' key={index} onClick={() => history.push(`/academy/${item._id}`)}>
              <div className='col-md-10'>
                <div className='d-flex align-items-center'>
                  <div className='px-2'>
                    <div className='font-21'>
                      {item.title}
                    </div>
                    <br />
                    <div className='font-12'>
                      {item.description}
                    </div>
                  </div>
                </div>
              </div>
              <div className='col-md-2 pt-2 text-right font-12'>
                
              </div>
              <div className='col-md-12'>
                <hr />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  courses: state.course.courses
})

export default connect(mapStateToProps, { getCourses })(ClientDashboard)