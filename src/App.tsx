import { useState } from 'react'
import TopazSignComponent from './TopazSignComponent'

function App() {

  const [signatureImage, setSignatureImage] = useState<string | null>(null);

  const handleonSuccess = (data: string) => {
    // console.log("image b64 result", data)
    setSignatureImage(data);
  }

  return (
    <>
      <div className="signContainer">
        <TopazSignComponent onSuccess={handleonSuccess} />
      </div>
      {signatureImage ? (
        <img src={signatureImage} alt="Firma Capturada" style={{ width: "280px", height: "110px" }} />
      ) : (
        <p>No hay firma capturada aún.</p>
      )}
    </>
  )
}

export default App
