import React from 'react'
import "../styles/home.scss"

const Home = () => {
  return (
    <main class="home">
        <div class="left">
            <div class="section-header">
                <h2>Job Description</h2>
            </div>

            <textarea placeholder="Paste job description here..."></textarea>
        </div>

        <div class="right">
            <div class="section-header">
                <h2>Candidate Details</h2>
            </div>

            <div class="input-grp">
                <label>Upload Resume</label>
            <div class="upload-box">
                <input type="file" accept=".pdf" />
                <span>Click to upload or drag PDF</span>
            </div>
        </div>

            <div class="input-grp">
            <label>Self Description</label>
            <textarea placeholder="Tell us about yourself..."></textarea>
            </div>

            <button class="generate-btn">Generate Report</button>
        </div>
    </main>
  )
}

export default Home
