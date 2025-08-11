import React from 'react'
import FacultyNav from './FacultyNav';
export const ResultsView = () => {
  return (
    <div>
      <FacultyNav />
      <h2>Student Results</h2>
      <div>
        <div>
          <div>
            <h4>Search</h4>
            <input type="text" />
          </div>
          <div>
            <h5 className='filter-title'>Filter</h5>
            <select name="" id=""></select>

          </div>
        </div>
      </div>

    </div>
  )
}
export default ResultsView;