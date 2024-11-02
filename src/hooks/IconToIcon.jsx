import React from 'react'

export default function IconToIcon({ icon1, icon2 }) {
  return (
    <div style={{ position: 'relative' }}>
      <img
        style={{ borderRadius: '15px', position: 'relative', zIndex: 0 }}
        width={50}
        height={50}
        src={icon1}
        alt="XX"
      />
      <img
        width={30}
        height={30}
        style={{
          position: 'absolute',
          zIndex: 1,
          left: 25,
          top: 25,
          borderRadius: '50%',
        }}
        src={icon2}
        alt="XX"
      />
    </div>
  )
}
