import React from 'react'
import VideoPlayer from '../component/VideoPlayer'

const SingleCourse = () => {

       const { id } = useParams();
       const course = courses.find((c) => c.id === id);



  return (
    <div>
     <VideoPlayer/>
    </div>
  )
}

export default SingleCourse