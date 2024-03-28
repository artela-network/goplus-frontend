import React from "react"
export const notStarted = () => {
    return (
      <>
        <text style={{ color: 'grey' }}> 👷 Not Started</text>
      </>
    )
  }
export const failed = () => {
    return (
        <>
            <text style={{ color: 'red' }}> ❌ Failed</text>
        </>
    )
}
export const ongoing = () => {
    return (
        <>
            <text style={{ color: 'orange' }}> ⏳ Procesing</text>
        </>
    )
}
export const finish = () => {
    return (
        <>
            <text style={{ color: 'green' }}> ✅ Finish</text>
        </>
    )
}

