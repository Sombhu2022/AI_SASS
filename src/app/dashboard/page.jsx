
import MyDocument from '@/components/MyDocument'
import ReactPDF, { PDFViewer } from '@react-pdf/renderer'
import React from 'react'

function page() {
  return (
    <div>
      {/* <PDFViewer>
        <MyDocument/>
      </PDFViewer> */}
    </div>
  )
}

export default page

// ReactPDF.render(<MyDocument />, `${__dirname}/example.pdf`);